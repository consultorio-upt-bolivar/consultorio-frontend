import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { AdminLayout } from '../../components/adminLayout'
import { Paper, Typography } from '@mui/material';
import { stadisticsActions } from '../../../../_actions/stadistics.actions';
import { format, subDays, addDays } from 'date-fns'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const DashboardPage = (): React.ReactElement => {
  const [params, setParams] = useState({
    dateFrom: format(subDays(new Date(), 365), "yyyy-MM-dd"),
    dateEnd: format(addDays(new Date(), 500), "yyyy-MM-dd")
  })
  const { refferedUsers = [], mostUsedSpecialities = [] } = useSelector((store: any) => store.stadistics)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(stadisticsActions.GetStadistics(params));
  }, [])

  return (
    <AdminLayout>
      <>
        <Typography
          component="h1"
          variant="h5"
          style={{
            textAlign: 'center',
          }}
        >
          Estadisticas del sistema
        </Typography>

        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '30px', marginBottom: '50px' }}>
          <Grid item xs={12} sm={3} md={4}>
            <Typography noWrap fontWeight={500} my={2} textAlign="center">Usuarios referidos</Typography>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
              elevation={5}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={refferedUsers.map((el: any) => {
                    return {
                      name: el.targetSpeciality.name,
                      total: el.total
                    }
                  })}
                  margin={{
                    top: 25,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={9} md={8}>
            <Typography noWrap fontWeight={500} my={2} textAlign="center">Especialidades mas usadas</Typography>

            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
              elevation={5}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={mostUsedSpecialities.map((el: any) => {
                    return {
                      name: el.name,
                      total: el.used
                    }
                  })}
                  margin={{
                    top: 25,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </>
    </AdminLayout >
  )
}
