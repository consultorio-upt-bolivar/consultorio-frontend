// React
import React, { useEffect } from 'react'
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

// Forms
import { useFormik } from 'formik'

// Logic
import { authActions } from '../../../../_actions'

// Material
import PersonIcon from '@mui/icons-material/Person';
import { initialValues, validationSchema } from './loginForm'

import {
  formStyles,
  GetFormikFields,
} from '../../../components/formik'
import { PublicLayout } from '../../../components/publicLayout';
import { AppHistory } from '../../../../helpers';

export function LoginPage() {
  const formOptions = {
    title: 'Iniciar sesión',
    loadingText: 'Iniciando sesión',
  }
  const dispatch = useDispatch()
  const classes = formStyles()

  const { loading } = useSelector((store: any) => store.authentication)

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(authActions.login(values.email, values.password))
    },
  })

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (formik.isValid) {
      formik.submitForm()
    }
  }
  const formFields = {
    email: 'Correo electrónico',
    password: {
      type: 'password',
      label: 'Contraseña',
    },
  }

  const formikFields = GetFormikFields(formik, formFields)

  return (
    <PublicLayout>
      <Grid
        container
        sx={{ display: 'flex', justifyContent: "center", alignItems: "center", overflow: 'hidden', width: "100%", height: "100%" }}
      >
        <Grid item xs={11} sm={10} md={6} lg={4} style={{
           maxWidth: "450px"
         }} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5">
            {loading ? formOptions.loadingText : formOptions.title}
          </Typography>
          <form className={classes.form} noValidate>
            {formikFields}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading || !formik.isValid}
              onClick={(e) => handleSubmit(e)}
            >
              Ingresar
            </Button>
          </form>

          <Grid container sx={{ mt: 2 }}>
            <Grid item xs>
              <Button
                sx={{
                  color: "secondary",
                  fontSize: "12",
                  textTransform: "none"
                }}
                onClick={() => {
                  AppHistory.push("/forgot-password")
                }}
              >¿Olvidaste tu contraseña?</Button>
            </Grid>
            <Grid item>
              <Button
                sx={{
                  color: "secondary",
                  fontSize: "12",
                  textTransform: "none"
                }}
                onClick={() => {
                  AppHistory.push("/signin")
                }}
              >¿No tienes cuenta? Registrate!</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PublicLayout>
  )
}
