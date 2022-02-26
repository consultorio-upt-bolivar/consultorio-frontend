import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions, medicalAppointmentsActions } from '../../../../_actions'
import { PublicLayout } from '../../../components/publicLayout'
import { DataTablaParams, DataTable, RowMenuProps, useRowMenuStyles } from '../../../components/table'
import { format } from 'date-fns'
import SpecialistScheduleList from './schedulesList'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import { RemoveRedEyeOutlined } from '@material-ui/icons'
import { CancelMedicalAppointmentDialog } from '../../../components/cancelMedicalAppointment'
import { TakeMedicalAppointmentDialog } from '../../../components/takeMedicalAppointment'

export const SpecialistDashboardPage = (): React.ReactElement => {
    const [open, setOpen] = useState(false)
    const [medicalAppointment, setMedicalAppointment] = useState<number | undefined>()
    const [openCancel, setOpenCancel] = useState(false)
    const [cancelAppointmentId, setCancelAppointment] = useState<number | undefined>()
    const [selectedSchedule, setSelectedSchedule] = useState<number | undefined>()
    const { items } = useSelector((state: any) => state.medicalAppointments)
    const dispatch = useDispatch()

    const getMedicalAppointments = () => {
        dispatch(
            medicalAppointmentsActions.getAll({
                limit: 25000,
                offset: 0,
                where: `schedule.id==${selectedSchedule}`
            })
        )
    }

    useEffect(() => {
        getMedicalAppointments()
    }, [selectedSchedule])

    const handleClick = (event: any, row: any) => {
        event.stopPropagation();

        dispatch(alertActions.show({
            title: `Citas médica`,
            description: `¿Quiere ${row.cancellationDate ? 'modificar' : 'atender'} esta cita médica?`,
            callback: () => {
                setMedicalAppointment(row.id)
                setOpen(true);
            }
        }));
    }

    const handleCancel = (event: any, row: any) => {
        event.stopPropagation();

        dispatch(alertActions.show({
            title: `Citas médica`,
            description: `¿Quiere cancelar esta cita médica?`,
            callback: () => {
                setCancelAppointment(row.id)
                setOpenCancel(true);
            }
        }));
    }

    const rowMenuClasses = useRowMenuStyles()

    const params: DataTablaParams = {
        columns: [
            {
                field: 'id',
                headerName: 'ID',
                description: 'Id único en la BD',
                width: 100,
                hide: true
            },
            {
                field: 'specialityName',
                headerName: 'Especialidad médica',
                description: 'Especialidad de la jornada',
                width: 200,
                hide: true
            },
            {
                field: 'date',
                headerName: 'Fecha',
                description: 'Fecha',
                width: 150
            },
            {
                field: 'userName',
                headerName: 'Nombre del paciente',
                description: 'Nombre del usuario',
                flex: 150
            },
            {
                field: 'userType',
                headerName: 'Tipo de usuario',
                description: 'Tipo de usuario',
                width: 150,
            },
            {
                field: 'cancelled',
                headerName: 'Cancelada',
                description: 'Cancelada',
                type: "boolean",
                width: 100,
            },
            {
                field: 'attended',
                headerName: 'Atendida',
                description: 'Atendida por el especialista',
                type: "boolean",
                width: 100,
            },
            {
                field: 'actions',
                headerName: 'Acciones',
                renderCell: (props: RowMenuProps) => {
                    const { row } = props;

                    if (row.cancellationDate || (row.report && row.report.length > 0)) return <></>;

                    return (
                        <div className={rowMenuClasses.root}>
                            <IconButton
                                color="inherit"
                                className={rowMenuClasses.textPrimary}
                                size="small"
                                aria-label="toggle"
                                onClick={(e) => handleClick(e, row)}
                            >
                                <RemoveRedEyeOutlined fontSize="small" />
                            </IconButton>

                            <IconButton
                                color="inherit"
                                className={rowMenuClasses.textPrimary}
                                size="small"
                                aria-label="toggle"
                                onClick={(e) => handleCancel(e, row)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </div>
                    )
                },
                sortable: false,
                width: 100,
                headerAlign: 'center',
                filterable: false,
                align: 'center',
                disableColumnMenu: true,
                disableReorder: true
            }
        ],
        rows: items?.map((el: any) => {
            el.specialityName = el.schedule.speciality.name
            el.userName = el.user.name + " | " + el.user.email
            el.userType = el.user.profile.name
            el.cancelled = !!el.cancellationDate && el.cancellationReason
            el.date = format(new Date(el.date), 'yyyy-MM-dd HH:mm')
            el.attended = el.report && el.report.length > 0;

            return el
        }) ?? []
    }

    return (
        <PublicLayout>
            <Container
                maxWidth="xl"
                sx={{ overflow: 'hidden', width: "100%", height: "100%" }}
            >
                <Grid container spacing={2} justifyContent="center" style={{ marginTop: '10px', marginBottom: '50px' }}>
                    <Grid item xs={12} sm={3} md={4}>
                        <Typography noWrap fontWeight={500} my={2} textAlign="center">JORNADAS</Typography>

                        <SpecialistScheduleList selectedSchedule={selectedSchedule} setSelectedSchedule={setSelectedSchedule} />
                    </Grid>

                    <Grid item xs={12} sm={9} md={8}>
                        <Typography noWrap fontWeight={500} my={2} textAlign="center">CITAS MÉDICAS</Typography>

                        <Box
                            display="flex"
                            style={{
                                height: '700px',
                                width: '100%',
                            }}
                        >
                            <DataTable {...params} />
                        </Box>
                    </Grid>
                </Grid>

                <TakeMedicalAppointmentDialog {...{
                    medicalAppointment,
                    setMedicalAppointment,
                    open,
                    setOpen,
                    getMedicalAppointments
                }} />

                <CancelMedicalAppointmentDialog {...{
                    medicalAppointmentId: cancelAppointmentId,
                    setMedicalAppointment: setCancelAppointment,
                    open: openCancel,
                    setOpen: setOpenCancel,
                    getMedicalAppointments
                }} />
            </Container>
        </PublicLayout>
    )
}
