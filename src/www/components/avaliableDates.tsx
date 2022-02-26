
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions, appointmentsActions, medicalAppointmentsActions } from '../../_actions'
import { format, parse, isFuture } from 'date-fns'
import { formStyles } from './formik'
import Typography from '@mui/material/Typography'
import { Alert, Box, Button, Card, CardContent, Grid, Paper, styled } from '@mui/material'
import { ActionOptions } from '../../_actions/generic.actions'
import { loadingActions } from '../../_actions/loading.actions'

const Item = styled(Box)(() => ({
    textAlign: 'center',
    border: "1px solid silver",
    padding: "8px",
    borderRadius: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: 'pointer',
    color: "black",
    fontSize: "18px",
    '&:hover': {
        background: "#113a3d45"
    }
}));

export const AvaliableDates = (params: {
    dateFrom: Date
    dateEnd: Date
    specialityId: string
    specialistId?: string
    user?: any
    submitCallback: () => void
}) => {
    const [step, setStep] = useState('findAvaliableDates')
    const [selectedDate, setSelectedDate] = useState<any>({})
    const [loading, setLoading] = useState<any>(false)
    const { loading: creatingAppointment, error: errorAppointments } = useSelector((state: any) => state.medicalAppointments)
    const { items: avaliablesUsers = [] } = useSelector((state: any) => state.appointments)
    const userData = useSelector((state: any) => state.authentication.user)

    const dispatch = useDispatch()
    const classes = formStyles()

    const getAvaliableDates = () => {
        if (params.specialityId == "") {
            return
        }

        setStep('findAvaliableDates')
        setSelectedDate({})

        const options = {
            dateFrom: format(params.dateFrom, 'yyyy-MM-dd'),
            dateEnd: format(params.dateEnd, 'yyyy-MM-dd'),
            specialityId: params.specialityId,
            specialistId: params.specialistId ?? ""
        }

        dispatch(appointmentsActions.getAvaliableDates(options, false))
    }

    const handleSelectDate = (e: React.MouseEvent, date: any) => {
        e.preventDefault()
        setSelectedDate(date)
        setStep('selectedDate')
    }

    const handleSelectHour = (e: React.MouseEvent, hour: string) => {
        e.preventDefault()
        setSelectedDate({
            ...selectedDate,
            hour
        })
        setStep('confirm')
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault()

        dispatch(alertActions.show({
            title: "Confirmar turno",
            description: `Has seleccionado una cita médica para el dia ${selectedDate.date} y hora: ${selectedDate.hour}, es correcto?`,
            callback: () => {
                setLoading(true)

                const options = {
                    date: `${selectedDate.date} ${selectedDate.hour.split(' ')[0]}:00`,
                    scheduleId: params.specialityId,
                    userId: params.user?.id && params.user?.id != '' ? params.user?.id : userData.id
                }

                const dispatchOptions: ActionOptions = {
                    toast: false,
                    callback: () => {
                        setLoading(false)
                        params.submitCallback()
                    }
                }

                dispatch(medicalAppointmentsActions.createOne(options, dispatchOptions))
            }
        }));
    }

    // Loading circle
    useEffect(() => {
        if(loading) {
            dispatch(loadingActions.show())
        } else {
            dispatch(loadingActions.hide())
        }
    }, [loading])

    // Listen if the params changes to get dates
    useEffect(() => {
        getAvaliableDates()
    }, [params.specialityId, params.specialistId, params.dateFrom, params.dateEnd])

    // Listen if the user cloud create an appointment
    useEffect(() => {
        if (!creatingAppointment && errorAppointments) {
            return
        }

        if (creatingAppointment) {
            return
        }

        setStep('findAvaliableDates')
        setSelectedDate({})
        getAvaliableDates()
    }, [creatingAppointment, errorAppointments])

    // Render avaliable dates
    const renderDates = () => {
        if (params.specialityId == "") return <Alert severity="info">Por favor seleccione un consultorio y una especialidad.</Alert>;
        if (!avaliablesUsers.length) return <Alert severity="info">No hay fechas disponibles para el rango seleccionado.</Alert>;

        return avaliablesUsers.map((user: any) => {
            if (!user.avaliableDates?.length) return (
                <Alert severity="info">No hay fechas disponibles para el rango seleccionado.</Alert>
            );

            const avaliable = user.avaliableDates?.map((el: any, i: number) => {
                if (el.hours.length == 0) return;

                return (
                    <Grid item xs={4} key={`${user.id}-${el.date}-box`} onClick={(e) => handleSelectDate(e, el)}>
                        <Item>
                            {el.date}
                        </Item>
                    </Grid>
                )
            })

            return (
                <Box style={{
                    border: "1px solid silver",
                    borderRadius: "3px",
                    marginBottom: "20px"
                }} key={`${user.id}-${user.name}-box`}>
                    <div style={{
                        borderBottom: "1px solid silver",
                        padding: "8px"
                    }}>
                        <Typography sx={{ fontSize: 18, textAlign: "center" }} margin="0">
                            Especialista: {user.name}
                        </Typography>
                    </div>

                    <Grid container spacing={2} style={{ padding: "20px", overflow: 'hidden' }}>
                        {avaliable}
                    </Grid>
                </Box>
            )
        })
    }

    // Render avaliable hours
    const renderHours = () => {
        const today = format(new Date(), "yyyy-MM-dd")
        const selectedDay = selectedDate.date

        // Filter past hours
        if (selectedDay === today) {
            selectedDate.hours = selectedDate.hours.filter((hour: string) => {
                const h = parse(`${selectedDay} ${hour.split(' ')[0]}`, 'yyyy-MM-dd HH:mm', new Date())
                return isFuture(h);
            })
        }

        const hours = selectedDate.hours.map((hour: string, i: number) => {
            return (
                <Grid item xs={4} key={'h-' + selectedDate.date + '-' + hour + '-' + i} onClick={(e) => handleSelectHour(e, hour)}>
                    <Item>{hour}</Item>
                </Grid>
            )
        })

        if (!hours.length) return (<Box>
            <Item style={{
                marginBottom: "20px"
            }}>Fecha elegida: {selectedDate.date}</Item>
            <Alert severity="info">No horarios disponibles para la fecha seleccionada.</Alert>
        </Box>);

        return (
            <Box>
                <Item>Fecha elegida: {selectedDate.date}</Item>

                <Box style={{
                    border: "1px solid silver",
                    borderRadius: "3px",
                    marginTop: "20px",
                    marginBottom: "20px"
                }}>
                    <div style={{
                        borderBottom: "1px solid silver",
                        padding: "8px"
                    }}>
                        <Typography sx={{ fontSize: 16, textAlign: "center", color: "black" }} margin="0">
                            Selecciona alguno de los horarios disponibles.
                        </Typography>
                    </div>

                    <Grid container spacing={2} style={{ padding: "20px", overflow: 'hidden' }}>
                        {hours}
                    </Grid>
                </Box>

                <Alert severity="info">Los horarios se muestran en formato 24 horas</Alert>
            </Box>
        )
    }

    return (
        <>
            <Box mt={2}>
                {step == 'findAvaliableDates' ? renderDates() : null}

                {step == 'selectedDate' && selectedDate.hours ? renderHours() : null}

                {step == 'confirm' && selectedDate.hours ? (
                    <>
                        <Box style={{
                            border: "1px solid silver",
                            borderRadius: "3px",
                            marginBottom: "20px"
                        }}>
                            <div style={{
                                borderBottom: "1px solid silver",
                                padding: "8px"
                            }}>
                                <Typography sx={{ fontSize: 18, textAlign: "center" }} margin="0">
                                    Confirmacion de cita médica
                                </Typography>
                            </div>
                            <div style={{
                                padding: "20px 30px"
                            }}>
                                <Typography component="div">
                                    Fecha: {selectedDate.date} a las {selectedDate.hour}
                                </Typography>
                                <Typography mt={'20px'} component="div">
                                    Consultorio: {selectedDate.office.name}
                                </Typography>
                                <Typography mt={'20px'} component="div">
                                    Lugar: {selectedDate.office.place}
                                </Typography>
                                <Typography mt={'20px'} component="div">
                                    Especialidad: {selectedDate.speciality.name}
                                </Typography>
                                <Typography mt={'20px'} component="div">
                                    Doctor: {selectedDate.specialist.name}
                                </Typography>

                                <Typography mt={'20px'} component="div">
                                    Usuario: {params.user?.id && params.user?.id != '' ? params.user?.name : userData.name}
                                </Typography>
                            </div>
                        </Box>

                        <Alert severity="info">Si desea cancelar su cita, lo puede hacer luego por el sistema.</Alert>
                    </>
                ) : null}
            </Box>

            <Box mt={2} display="flex" justifyContent="space-between">
                {
                    step == 'selectedDate' ?
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e) => {
                                setSelectedDate({})
                                getAvaliableDates()
                                setStep('findAvaliableDates')
                            }}
                            disabled={creatingAppointment}
                        >
                            Seleccionar fecha
                        </Button> : null
                }

                {
                    step == 'confirm' ?
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e) => {
                                setStep('selectedDate')
                            }}
                            disabled={creatingAppointment}
                        >
                            Seleccionar hora
                        </Button> : null
                }

                {
                    step == 'confirm' ?
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e) => handleSubmit(e)}
                            disabled={creatingAppointment}
                        >
                            Confirmar turno
                        </Button> : null
                }
            </Box>
        </>
    )
}