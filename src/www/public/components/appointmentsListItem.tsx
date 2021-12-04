import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Grid, Paper, Stack, styled } from '@mui/material'
import { appointmentsActions, medicalAppointmentsActions } from '../../../_actions'
import { format, isFuture, isPast } from 'date-fns'
import { Alert } from '@material-ui/lab'
import { Delete } from '@material-ui/icons'

const Item = styled(Paper)(_ => {
  return ({
    padding: '20px 20px',
    width: '100%'
  });
});

const renderAlert = (message: string) => {
  return <Grid item width="100%"><Alert severity="info">{message}</Alert></Grid>
}

const AppointmentInfo = ({ data }: any) => <>
  <div><b>Fecha:</b> {format(new Date(data.date), 'yyyy-MM-dd')}</div>
  <div><b>Hora:</b> {format(new Date(data.date), 'HH:mm')} hrs</div>
  <div><b>Duracion:</b> {data.schedule.appointmentInterval} minuntos</div>
  <div><b>Especialidad:</b> {data.schedule.speciality.name}</div>
  <div><b>Doctor:</b> {data.schedule.specialist.name}</div>
  <div><b>Nombre del consultorio:</b> {data.schedule.speciality.office.name}</div>
  <div><b>Lugar:</b> {data.schedule.speciality.office.place}</div>
  <div><b>Estado:</b> {data.cancellationDate ? 'Cancelada' : 'Activa'}</div>
</>

export default function MedicalAppointmentsListItem({ showPast = false }: { showPast?: boolean }) {
  const { items = [] } = useSelector((state: any) => state.medicalAppointments)
  const { loading } = useSelector((state: any) => state.appointments)
  const dispatch = useDispatch()

  const getAppointments = () => dispatch(medicalAppointmentsActions.getAll({
    offset: 0,
    limit: 0
  }))

  useEffect(() => {
    getAppointments()
  }, [])

  const handleCancelAppointment = (appointmentId: number) => {
    dispatch(appointmentsActions.cancelAppointment(appointmentId, 'Cancelado por el usuario!', getAppointments))
  }

  const typedItems = items as any[]

  const notFoundNextAppointments = "No tienes citas programadas!"
  const notFoundPastAppointments = "Aun no has ido a ninguna cita medicas!"

  const renderNextAppointments = () => {
    if (!typedItems.length) return renderAlert(notFoundNextAppointments)

    const filteredAppointments = typedItems.filter(el => {
      return isFuture(new Date(el.date)) && el.cancellationDate == null
    })

    if (!filteredAppointments.length) return renderAlert(notFoundNextAppointments)

    return filteredAppointments.map((el: any) => {
      return <Grid item width="100%" padding={0} key={'d-' + el.date} onClick={(e) => console.log('hola')}>
        <Item elevation={1}>
          <AppointmentInfo data={el} />
          <Stack mt={2} direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Delete />}
              disabled={loading}
              onClick={() => handleCancelAppointment(el.id)}
            >
              Cancelar
            </Button>
          </Stack>
        </Item>
      </Grid>
    })
  }

  const renderPastAppointments = () => {
    if (!typedItems.length) return renderAlert(notFoundPastAppointments)

    const filteredAppointments = typedItems.filter(el => isPast(new Date(el.date)) || el.cancellationDate)

    if (!filteredAppointments.length) return renderAlert(notFoundPastAppointments)

    return filteredAppointments.map((el: any) => {
      return <Grid item width="100%" padding={0} key={'d-' + el.date} onClick={(e) => console.log('hola')}>
        <Item elevation={1}>
          <AppointmentInfo data={el} />
        </Item>
      </Grid>
    })
  }

  return (
    <Grid container overflow="auto" spacing={2} style={{ marginTop: '30px', marginBottom: '30px', maxHeight: '600px', paddingBottom: '10px' }}>
      {showPast ? renderPastAppointments() : renderNextAppointments()}
    </Grid>
  )
}
