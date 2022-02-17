import React, { useEffect } from 'react'
import { Button, Divider, Fab, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { AdminLayout } from '../../components/adminLayout'
import { Paper, Typography } from '@mui/material';
import { stadisticsActions } from '../../../../_actions/stadistics.actions';
import { format, addDays } from 'date-fns'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFormik } from 'formik';
import { add } from 'date-fns'
import * as Yup from 'yup'
import { validationMessages } from '../../../../constants/formik';
import esLocale from 'date-fns/locale/es';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import {
  formStyles
} from '../../../components/formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker } from '@mui/lab';
import { getConfiguration } from '../../../../config/api.config';
import { makeStyles } from '@material-ui/core/styles';
import { Download } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const DashboardPage = (): React.ReactElement => {
  const { loading, refferedUsers = [], mostUsedSpecialities = [], usersData = [], generalData = [] } = useSelector((store: any) => store.stadistics)
  const dispatch = useDispatch()
  const classes = formStyles()
  const fabClasses = useStyles();

  useEffect(() => {
    dispatch(stadisticsActions.GetStadistics({
      dateFrom: format(new Date(), "yyyy-MM-dd"),
      dateEnd: format(addDays(new Date(), 10), "yyyy-MM-dd")
    }));
  }, [])

  const formik = useFormik({
    initialValues: {
      dateFrom: new Date(),
      dateEnd: add(new Date(), {
        days: 5
      })
    },
    validationSchema: Yup.object({
      dateFrom: Yup.string().required(validationMessages.required),
      dateEnd: Yup.string().required(validationMessages.required)
    }),
    onSubmit: async (values) => {
      dispatch(stadisticsActions.GetStadistics({
        dateFrom: format(values.dateFrom, "yyyy-MM-dd"),
        dateEnd: format(values.dateEnd, "yyyy-MM-dd")
      }));
    },
  })

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()

    if (formik.isValid) {
      formik.submitForm()
    }
  }

  const downloadReport = async (e: React.MouseEvent) => {
    e.preventDefault()

    const url = getConfiguration().basePath + "/stadistics/download-report";

    const link = document.createElement('a');

    link.href = url;
    // 3. Append to html page
    document.body.appendChild(link);
    // 4. Force download
    link.click();
    // 5. Clean up and remove the link
    if (link && link.parentNode) {
      link.parentNode.removeChild(link);
    }
  }

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

        <form className={classes.form} noValidate>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale} >
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={12} md={5}>
                <DesktopDatePicker
                  label="Fecha desde"
                  value={formik.values["dateFrom"]}
                  onChange={(date: Date | null) => {
                    formik.setFieldValue("dateFrom", date)
                  }}
                  renderInput={(params) => <TextField
                    margin="normal"
                    fullWidth
                    sx={{ my: 0 }}
                    required
                    {...params}
                  />}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <DesktopDatePicker
                  label="Fecha hasta"
                  value={formik.values["dateEnd"]}
                  onChange={(date: Date | null) => {
                    formik.setFieldValue("dateEnd", date)
                  }}
                  renderInput={(params) => <TextField
                    margin="normal"
                    fullWidth
                    sx={{ my: 0 }}
                    required
                    {...params}
                  />}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  sx={{ height: "100%", my: 0, py: 2 }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!!loading}
                  onClick={(e) => handleSubmit(e)}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </form>

        <Divider style={{
          display: "block",
          width: "100%",
          height: "20px",
          marginTop: "30px"
        }}></Divider>

        <Grid container spacing={2} justifyContent="start" style={{ marginTop: '30px', marginBottom: '50px', paddingTop: "50px", position: "relative" }}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' noWrap fontWeight={500} my={2} textAlign="center">Estadisticas generales</Typography>

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
                  data={generalData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={20}
                >
                  <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="total" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='h5' noWrap fontWeight={500} my={2} textAlign="center">Estadisticas de usuarios</Typography>

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
                  data={usersData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={20}
                >
                  <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="total" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='h5' noWrap fontWeight={500} my={2} textAlign="center">Usuarios referidos</Typography>
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

          <Grid item xs={12} md={6}>
            <Typography variant='h5' noWrap fontWeight={500} my={2} textAlign="center">Especialidades mas usadas</Typography>

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

          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            className={fabClasses.fab}
            onClick={downloadReport}
          >
            <Download className={fabClasses.extendedIcon} />
            Descargar reporte
          </Fab>
        </Grid>
      </>
    </AdminLayout >
  )
}
