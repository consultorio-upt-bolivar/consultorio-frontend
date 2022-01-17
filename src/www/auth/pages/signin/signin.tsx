// React
import React, { useEffect } from 'react'
import { Container, Typography, Avatar, Button, Grid, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

// Forms
import { useFormik } from 'formik'

// Logic
import { authActions } from '../../../../_actions'

// Material
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { formFields, initialValues, validationSchema } from './signinForm'

import {
  formStyles,
  GetFormikFields,
} from '../../../components/formik'
import { PublicLayout } from '../../../components/publicLayout';

export function SigninPage() {
  const formOptions = {
    title: 'Registro',
    loadingText: 'Registrando',
  }
  const dispatch = useDispatch()
  const classes = formStyles()
  const { loading } = useSelector((store: any) => store.authentication)

  // Logout user
  useEffect(() => {
    //dispatch(authActions.logout())
  }, [])

  // Form
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data: any) => {
      const { phone, legalId, ...rest } = data;

      dispatch(authActions.signin({
        phone: phone + "",
        legalId: legalId + "",
        ...rest
      }))
    },
  })

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()

    if (formik.isValid) {
      formik.submitForm()
    }
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
          <Typography component="h1" variant="h5">
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
              Registrarme
            </Button>

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
                  href="/login"
                >¿Ya tienes cuenta? Ingresar</Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Box>
    </PublicLayout>
  )
}
