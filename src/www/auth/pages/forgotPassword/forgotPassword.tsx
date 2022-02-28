// React
import React from 'react'
import { Container, Typography, Avatar, Button, Grid, TextField, FormHelperText, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

// Forms
import { useFormik } from 'formik'

// Logic
import { authActions } from '../../../../_actions'

// Material
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { formFields, initialValues, validationSchema } from './forgotPasswordForm'

import {
  formStyles,
  GetFormikFields,
} from '../../../components/formik'
import { PublicLayout } from '../../../components/publicLayout';
import { AppHistory } from '../../../../helpers';

export function ForgotPasswordPage() {
  const dispatch = useDispatch()
  const classes = formStyles()
  const { mailSent, loading } = useSelector((store: any) => store.authentication)

  // Form
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({
      token,
      ...data
    }) => {
      dispatch(authActions.changePassword({
        token: String(token),
        ...data
      }))
    },
  })

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    const errors = await formik.validateForm();

    formik.setErrors(errors);

    if (!formik.isValid || Object.keys(errors).length > 0) {
      return;
    }

    formik.submitForm()
  }

  const handleSendCode = (e: React.MouseEvent) => {
    e.preventDefault()
    if (formik.values.email && formik.errors.email != "") {
      dispatch(authActions.forgotPasswordMail(formik.values.email))
    }
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
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Olvido de contraseña
          </Typography>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Correo"
              label="Correo electrónico"
              {...formik.getFieldProps("email")}
            />
            <FormHelperText error id="my-helper-text">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </FormHelperText>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!!loading || !!mailSent}
              onClick={(e) => handleSendCode(e)}
            >
              Enviar código de seguridad
            </Button>

            {formikFields}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!!loading}
              onClick={(e) => handleSubmit(e)}
            >
              Cambiar contraseña
            </Button>

            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <Button
                  sx={{
                    color: "secondary",
                    fontSize: "12",
                    textTransform: "none"
                  }}
                  onClick={() => {
                    AppHistory.push("/login")
                  }}
                >¿Ya tienes cuenta? Ingresar</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </PublicLayout>
  )
}
