import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { medicalAppointmentsActions } from '../../../../_actions'
import { AppointmentDialog } from '../../../../common/components/appointmentDialog'
import { PublicLayout } from '../../components/publicLayout'
import { DataTablaParams, DataTable } from '../../../../common/components/table'
import { format } from 'date-fns'
import SpecialistScheduleList from './schedulesList'
import { TakeMedicalAppointmentDialog } from './takeMedicalAppointment'

export const SpecialistDashboardPage = (): React.ReactElement => {
    const [open, setOpen] = useState(false)
    const [selectedSchedule, setSelectedSchedule] = useState<number | undefined>()
    const [medicalAppointment, setMedicalAppointment] = useState<number | undefined>()
    const { items } = useSelector((state: any) => state.medicalAppointments)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            medicalAppointmentsActions.getAll({
                limit: 1000,
                offset: 0,
                where: `schedule.id==${selectedSchedule}`
            })
        )
    }, [selectedSchedule])

    const toggleAction = (id: number) => {
        setMedicalAppointment(id)
        setOpen(true)
    }

    const params: DataTablaParams = {
        columns: [
            {
                field: 'id',
                headerName: 'ID',
                description: 'Id unico en la DB',
                width: 100,
            },
            {
                field: 'cancelled',
                headerName: 'Fue cancelada?',
                description: 'Cancelada?',
                width: 200,
            },
            {
                field: 'specialityName',
                headerName: 'Especialidad',
                description: 'Especialidad de la jornada',
                width: 200,
            },
            {
                field: 'date',
                headerName: 'Fecha',
                description: 'Fecha',
                width: 200
            },
            {
                field: 'userName',
                headerName: 'Normbre del usuario',
                description: 'Normbre del usuario',
                flex: 1,
            },
            {
                field: 'userType',
                headerName: 'Tipo de usuario',
                description: 'Tipo de usuario',
                width: 200,
            },
        ],
        rows: items?.map((el: any) => {
            el.specialityName = el.schedule.speciality.name
            el.userName = el.user.name + " | " + el.user.email
            el.userType = el.user.profile.name
            el.cancelled = el.cancellationDate && el.cancellationReason ? el.cancellationReason : 'No'
            el.date = format(new Date(el.date), 'yyyy-MM-dd HH:mm')

            return el
        }) ?? [],
        toggleAction,
    }

    return (
        <PublicLayout>
            <>
                <Grid container spacing={2} justifyContent="center" style={{ marginTop: '10px', marginBottom: '50px' }}>
                    <Grid item xs={12} sm={3} md={4}>
                        <Typography noWrap fontWeight={500} my={2} textAlign="center">JORNADAS</Typography>

                        <SpecialistScheduleList selectedSchedule={selectedSchedule} setSelectedSchedule={setSelectedSchedule} />
                    </Grid>

                    <Grid item xs={12} sm={9} md={8}>
                        <Typography noWrap fontWeight={500} my={2} textAlign="center">CITAS MEDICAS</Typography>

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
                    setOpen
                }} />
            </>
        </PublicLayout>
    )
}
