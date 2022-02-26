import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, styled, Typography } from '@mui/material'
import { schedulesActions } from '../../../../_actions'
import { Alert } from '@material-ui/lab'
import { getUserData } from '../../../../helpers/userStorage'
import { format, parse, isFuture } from 'date-fns'

const Item = styled(Box)(_ => {
  return ({
    width: '100%',
    borderRadius: "3px",
    cursor: 'pointer',
    color: "black",
    fontSize: "18px",
    '&:hover': {
      background: "rgb(158 158 158 / 10%)"
    }
  });
});

const renderAlert = (message: string) => {
  return <Grid item width="100%"><Alert severity="info">{message}</Alert></Grid>
}

const ScheduleInfo = ({ data }: any) => {
  const startDate = parse(`${data.date} ${data.startHour}`, 'yyyy-MM-dd HH:mm:ss', new Date());
  const endDate = parse(`${data.dateEnd} ${data.endHour}`, 'yyyy-MM-dd HH:mm:ss', new Date());

  return <Box style={{
    border: "1px solid silver",
    borderRadius: "3px"
  }}>
    <div style={{
      borderBottom: "1px solid silver",
      padding: "10px 15px",
      backgroundColor: "#5eaab1",
      color: "white"
    }}>
      <Typography sx={{ fontSize: 16 }} margin="0">
        Especialidad médica: {data.speciality.name}
      </Typography>
    </div>

    <Box style={{ padding: "10px 15px", overflow: 'hidden' }}>
      <Typography sx={{ fontSize: 16 }} margin="0">
        Desde: {format(startDate, 'yyyy-MM-dd HH:mm')}
      </Typography>
      <Typography sx={{ fontSize: 16 }} margin="0">
        Hasta: {format(endDate, 'yyyy-MM-dd HH:mm')}
      </Typography>
    </Box>
  </Box>
}

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
      limit: 25000,
      where: `specialist.id==${userData.id};isActive==1`
    }))
  }, [])

  return (
    <Grid container alignContent="start" alignItems="start" overflow="auto" spacing={2} style={{ marginTop: '20px', height: '700px', paddingBottom: '10px', paddingRight: '10px' }}>
      {!items.length ? renderAlert("Aun no te han asignado jornadas laborales!") : items.map((el: any) => {
        return <Grid item width="100%" padding={0} key={'schedule-' + el.id} onClick={() => setSelectedSchedule(el.id)}>
          <Item style={el.id == selectedSchedule ? { background: "rgb(158 158 158 / 10%)" } : {}}>
            <ScheduleInfo data={el} />
          </Item>
        </Grid>
      })}
    </Grid>
  )
}
