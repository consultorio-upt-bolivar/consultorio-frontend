import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Paper, styled } from '@mui/material'
import { schedulesActions } from '../../../../_actions'
import { Alert } from '@material-ui/lab'
import { getUserData } from '../../../../helpers/userStorage'

const Item = styled(Paper)(_ => {
  return ({
    padding: '20px 20px',
    width: '100%'
  });
});

const renderAlert = (message: string) => {
  return <Grid item width="100%"><Alert severity="info">{message}</Alert></Grid>
}

const ScheduleInfo = ({ data }: any) => <>
  <div><b>Fecha:</b> {data.date} {data.startHour} - {data.dateEnd} {data.endHour}</div>
  <div><b>Especialidad:</b> {data.speciality.name}</div>
</>

export default function SpecialistScheduleList({ selectedSchedule, setSelectedSchedule }: {
  selectedSchedule: number | undefined;
  setSelectedSchedule: React.Dispatch<React.SetStateAction<number | undefined>>;
}): React.ReactElement {
  const { items = [] } = useSelector((state: any) => state.schedules)
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = getUserData()

    dispatch(schedulesActions.getAll({
      offset: 0,
      limit: 1000,
      where: `specialist.id==${userData.id}`
    }))
  }, [])

  return (
    <Grid container overflow="auto" spacing={2} style={{ marginTop: '20px', height: '700px', paddingBottom: '10px', paddingRight: '10px' }}>
      {!items.length ? renderAlert("Aun no te han asignado jornadas laborales!") : items.map((el: any) => {
        return <Grid item width="100%" padding={0} key={'schedule-' + el.id} onClick={() => setSelectedSchedule(el.id)}>
          <Item elevation={el.id == selectedSchedule ? 5 : 1} style={el.id == selectedSchedule ? { border: "1px solid black" } : {}}>
            <ScheduleInfo data={el} />
          </Item>
        </Grid>
      })}
    </Grid>
  )
}
