
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appointmentsActions, medicalAppointmentsActions } from '../../_actions'
import { format } from 'date-fns'
import { Box, Button, Grid, Paper, styled } from '@material-ui/core'
import { formStyles } from './formik'
import Typography from '@mui/material/Typography'
import { Alert, Card, CardContent } from '@mui/material'
import { ActionOptions } from '../../_actions/generic.actions'
import { boolean } from 'yup/lib/locale'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.primary,
    height: 60,
    fontSize: '20px',
    lineHeight: '60px',
    cursor: 'pointer'
}));

export const AvaliableDates = (params: {
    dateFrom: Date
    dateEnd: Date
    specialityId: string
    submitCallback?: () => void
}) => {
    const [step, setStep] = useState('findAvaliableDates')
    const [selectedDate, setSelectedDate] = useState<any>({})
    const { loading: creatingAppointment, error: errorAppointments } = useSelector((state: any) => state.medicalAppointments)
    const { items: avaliableDates } = useSelector((state: any) => state.appointments)
    const userData = useSelector((state: any) => state.authentication.user)

    const dispatch = useDispatch()
    const classes = formStyles()

    const getAvaliableDates = () => {
        if (params.specialityId == "") {
            return
        }

        setStep('findAvaliableDates')
        setSelectedDate({})

        dispatch(appointmentsActions.getAvaliableDates({
            dateFrom: format(params.dateFrom, 'yyyy-MM-dd'),
            dateEnd: format(params.dateEnd, 'yyyy-MM-dd'),
            specialityId: params.specialityId
        }, false))
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

        const options = {
            date: `${selectedDate.date} ${selectedDate.hour.split(' ')[0]}:00`,
            scheduleId: params.specialityId,
            userId: userData.id
        }

        const dispatchOptions: ActionOptions = {
            toast: "Cita medica creada!",
            callback: params.submitCallback
        }

        dispatch(medicalAppointmentsActions.createOne(options, dispatchOptions))
    }

    // Listen if the params changes to get dates
    useEffect(() => {
        getAvaliableDates()
    }, [params.specialityId, params.dateFrom, params.dateEnd])

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
        if (params.specialityId == "") return;

        if (!avaliableDates?.length) return (
            <Typography component="p" variant="h6" mb={2} mt={2} align='center' gutterBottom>
                No hay fechas disponibles para el rango seleccionado
            </Typography>
        );

        const avaliable = avaliableDates?.map((el: any, i: number) => {
            if (el.hours.length == 0) return;

            return (
                <Grid item xs={4} key={'d-' + el.date + '-' + i} onClick={(e) => handleSelectDate(e, el)}>
                    <Item elevation={2}>{el.date}</Item>
                </Grid>
            )
        })

        return (
            <Box>
                <Typography component="p" variant="h6" mb={2} mt={2} align='center' gutterBottom>
                    Fechas disponibles:
                </Typography>

                <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px', overflow: 'hidden' }}>
                    {avaliable}
                </Grid>
            </Box>
        )
    }

    // Render avaliable hours
    const renderHours = () => {
        const hours = selectedDate.hours.map((hour: string, i: number) => {
            return (
                <Grid item xs={4} key={'h-' + selectedDate.date + '-' + hour + '-' + i} onClick={(e) => handleSelectHour(e, hour)}>
                    <Item elevation={2}>{hour}</Item>
                </Grid>
            )
        })

        return (
            <Box>
                <Typography component="p" variant="h6" mb={2} mt={2} align='center' gutterBottom>
                    Fecha elegida: {selectedDate.date}
                </Typography>

                <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px', overflow: 'hidden' }}>
                    {hours}
                </Grid>

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
                        <Box display='flex' justifyContent='center'>
                            <Card sx={{ minWidth: 500, maxWidth: 600, marginTop: '20px', marginBottom: '20px' }}>
                                <CardContent>
                                    <Typography component="p" variant="h6" align='center' gutterBottom>
                                        Confirmacion de cita medica
                                    </Typography>
                                    <Typography mt={'35px'} component="div">
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
                                </CardContent>
                            </Card>

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