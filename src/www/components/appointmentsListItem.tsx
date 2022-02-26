import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Grid, Paper, Stack, styled, Typography } from '@mui/material'
import { alertActions, appointmentsActions, medicalAppointmentsActions } from '../../_actions'
import { format, isFuture, isPast } from 'date-fns'
import { Alert } from '@material-ui/lab'
import { Delete } from '@material-ui/icons'

const Item = styled(Box)(_ => {
  return ({
    width: '100%',
    borderRadius: "3px",
    cursor: 'pointer',
    color: "black",
    fontSize: "18px"
  });
});

const renderAlert = (message: string) => {
  return <Grid item width="100%"><Alert severity="info">{message}</Alert></Grid>
}

const AppointmentInfo = ({ data, cancel }: any) => <Box>
  <div style={{
    padding: "10px 15px",
    backgroundColor: "#5eaab1",
    color: "white",
    borderRadius: "3px"
  }}>
    <Typography sx={{ fontSize: 16 }} margin="0">
      Especialidad: {data.schedule.speciality.name}
    </Typography>
  </div>

  <Box style={{ padding: "15px", overflow: 'hidden', border: "1px solid #c0c0c054", borderRadius: "3px" }}>
    <Typography sx={{ fontSize: 16 }} margin="0">
      Fecha: {format(new Date(data.date), 'yyyy-MM-dd HH:mm')} hrs
    </Typography>
    <Typography sx={{ fontSize: 16 }} margin="0">
      Especialista: {data.schedule.specialist.name}
    </Typography>
    <Typography sx={{ fontSize: 16 }} margin="0">
      Consultorio médico: {data.schedule.speciality.office.name}
    </Typography>
    <Typography sx={{ fontSize: 16 }} margin="0">
       Dirección: {data.schedule.speciality.office.place}
    </Typography>
  </Box>

  {cancel ? <div style={{
    border: "1px solid #c0c0c054", borderRadius: "3px"
  }}>
    {cancel}
  </div> : null}
</Box>;

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
    dispatch(alertActions.show({
        title: `Cita médica`,
        description: `¿Está seguro que quiere cancelar esta cita médica?`,
        callback: () => {
          dispatch(appointmentsActions.cancelAppointment(appointmentId, 'Cancelado por el usuario!', getAppointments))
        }
    }));
  }

  const typedItems = items as any[]

  const notFoundNextAppointments = "No tienes citas programadas!"
  const notFoundPastAppointments = "Aun no has solicitado una cita médica!"

  const renderNextAppointments = () => {
    if (!typedItems.length) return renderAlert(notFoundNextAppointments)

    const filteredAppointments = typedItems.filter(el => {
      return isFuture(new Date(el.date)) && (!el.cancellationDate && (!el.report && !el.report?.length))
    })

    if (!filteredAppointments.length) return renderAlert(notFoundNextAppointments)

    return filteredAppointments.map((el: any) => {
      return <Grid item width="100%" padding={0} key={'d-' + el.date}>
        <Item>
          <AppointmentInfo data={el} cancel={<Stack direction="row">
            <Button
              color="primary"
              startIcon={<Delete />}
              disabled={loading}
              style={{
                width: "100%"
              }}
              onClick={() => handleCancelAppointment(el.id)}
            >
              Cancelar
            </Button>
          </Stack>} />
        </Item>
      </Grid>
    })
  }

  const renderPastAppointments = () => {
    if (!typedItems.length) return renderAlert(notFoundPastAppointments)

    const filteredAppointments = typedItems.filter(el => isPast(new Date(el.date)) || el.cancellationDate || (el.report || el.report?.length))

    if (!filteredAppointments.length) return renderAlert(notFoundPastAppointments)

    return filteredAppointments.map((el: any) => {
      return <Grid item width="100%" padding={0} key={'d-' + el.date}>
        <Item>
          <AppointmentInfo data={el} />
        </Item>
      </Grid>
    })
  }

  return (
    <Grid container overflow="auto" spacing={2} style={{ marginTop: '30px', marginBottom: '30px', maxHeight: '600px', paddingBottom: '10px', paddingRight: '20px'  }}>
      {showPast ? renderPastAppointments() : renderNextAppointments()}
    </Grid>
  )
}
