// React
import React, { useEffect } from 'react'
import { Container, Avatar, Button, Grid, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

// Forms
import { useFormik } from 'formik'

// Logic
import { authActions } from '../../../../_actions'

// Material
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { initialValues, validationSchema } from './loginForm'

import {
  formStyles,
  GetFormikFields,
} from '../../../components/formik'
import { PublicLayout } from '../../../components/publicLayout';

export function LoginPage() {
  const formOptions = {
    title: 'Iniciar sesion',
    loadingText: 'Iniciando sesion',
  }
  const dispatch = useDispatch()
  const classes = formStyles()

  const { loading } = useSelector((store: any) => store.authentication)

  // Logout user
  useEffect(() => {
    dispatch(authActions.logout())
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(authActions.login(values.email, values.password))
    },
  })

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()

    if (formik.isValid) {
      formik.submitForm()
    }
  }
  const formFields = {
    email: 'Correo',
    password: {
      type: 'password',
      label: 'Contrasena',
    },
  }

  const formikFields = GetFormikFields(formik, formFields)

  return (
    <PublicLayout>
      <Box
        sx={{ display: 'flex', justifyContent: "center", alignItems: "center", overflow: 'hidden', my: 10, width: "100%", height: "100%" }}
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
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
              disabled={loading}
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
                component="a"
                href="/forgot-password"
              >¿Olvidaste tu contraseña?</Button>
            </Grid>
            <Grid item>
              <Button
                sx={{
                  color: "secondary",
                  fontSize: "12",
                  textTransform: "none"
                }}
                component="a"
                href="/signin"
              >¿No tienes cuenta? Crear una</Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </PublicLayout>
  )
}
