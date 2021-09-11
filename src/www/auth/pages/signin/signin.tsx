// React
import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { useDispatch, useSelector } from 'react-redux'

// Forms
import { useFormik } from 'formik'

// Logic
import { authActions } from '../../../../_actions'

// Material
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { PublicRoles, PublicRolesApi } from '../../../../common/constants/roles'
import { initialValues, validationSchema } from './signinForm'

import {
  formStyles,
  GetFormikFields,
} from '../../../../common/components/formik'
import { Link } from 'react-router-dom'

export function SigninPage(): React.ReactElement {
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
    onSubmit: ({ profile, ...rest }) => {
      // TODO: GET familyUserId

      const options: any = {
        profile: PublicRolesApi[profile.toLowerCase()],
        ...rest,
      }

      dispatch(authActions.signin(options))
    },
  })

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()

    if (formik.isValid) {
      formik.submitForm()
    }
  }

  const formFields = {
    name: 'Nombre',
    phone: 'Telefono',
    legalId: 'Identificación',
    profile: {
      label: 'Tipo de usuario',
      id: 'name',
      values: PublicRoles,
      default: 'Estudiante',
      type: 'select',
    },
    email: 'Correo',
    password: 'Contrasena',
  }

  const formikFields = GetFormikFields(formik, formFields)

  return (
    <Container component="main" maxWidth="xs">
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
            //disabled={loading}
            onClick={(e) => handleSubmit(e)}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password">Olvidaste tu contraseña?</Link>
            </Grid>
            <Grid item>
              <Link to="/login">tienes cuenta? Ingresa</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}