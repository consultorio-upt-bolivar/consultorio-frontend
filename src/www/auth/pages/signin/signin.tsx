// React
import React, { useEffect } from 'react'
import { Typography, Avatar, Button, Grid, FormControl, TextField, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

// Forms
import { useFormik } from 'formik'

// Logic
import { authActions, toastActions } from '../../../../_actions'

// Material
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { formFields, initialValues, validationSchema } from './signinForm'

import {
  formStyles,
  GetFormikFields,
} from '../../../components/formik'
import { PublicLayout } from '../../../components/publicLayout';
import { UptApi, UsersApi } from '../../../../_api';
import { getConfiguration } from '../../../../config/api.config';
import { handleError } from '../../../../helpers/handleApiError';
import { Roles } from '../../../../constants/roles';
import { AppHistory } from '../../../../helpers';
import { IsEmpty, IsNotEmptyObject, IsObject } from 'class-validator';

export function SigninPage() {
  const formOptions = {
    title: 'Registro',
    loadingText: 'Registrando',
  }
  const dispatch = useDispatch()
  const classes = formStyles()
  const { loading, error } = useSelector((store: any) => store.authentication)

  useEffect(() => {
    if(error) {
      formik.setValues(initialValues, false);
    }
  }, [error])

  // Form
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data: any) => {
      const { familyLegalId, ...rest } = data;

      if (formik.values["profile"] === Roles.Family) {
        rest.familyLegalId = familyLegalId
      }

      dispatch(authActions.signin(rest))
    },
  })

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    const errors = await formik.validateForm();

    formik.setErrors(errors);

    if (!formik.isValid || Object.keys(errors).length > 0) {
      return;
    }

    const api = new UptApi(getConfiguration())

    try {
      if (isNaN(+formik.values.legalId)) {
        dispatch(toastActions.error("Cédula inválida."))
        return;
      }

      await api.validateLegalIdUPT(formik.values.legalId, formik.values.profile)
    } catch (error) {
      const msg = handleError(error);
      dispatch(toastActions.error(msg))
      return
    }

    if (formik.values["profile"] === Roles.Family) {
      if (isNaN(+formik.values.familyLegalId)) {
        dispatch(toastActions.error("Cédula del familiar inválida."))
        return;
      }

      try {
        await api.validateLegalIdUPT(formik.values.familyLegalId, Roles.Employee)
      } catch (error) {
        dispatch(toastActions.error("Cédula del familiar inválida."))
        return
      }

      try {
        const api = new UsersApi(getConfiguration())
        await api.validateUserExistsUsers(formik.values.familyLegalId, Roles.Employee)
      } catch (error) {
        dispatch(toastActions.error("El usuario familiar no existe!"))
        return
      }
    }

    formik.submitForm()
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
            <PersonAddAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {loading ? formOptions.loadingText : formOptions.title}
          </Typography>

          <form className={classes.form} noValidate>
            {formikFields}

            {
              formik.values["profile"] === Roles.Family ?
                <FormControl
                  sx={{ marginTop: "0px !important" }}
                  variant="outlined"
                  className={classes.formControl}
                >
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="familyLegalId"
                    label="Cédula del familiar"
                    {...formik.getFieldProps("familyLegalId")}
                  />
                  <FormHelperText className={classes.errorText} error>
                    {formik.touched["familyLegalId"] && formik.errors["familyLegalId"]
                      ? formik.errors["familyLegalId"]
                      : null}
                  </FormHelperText>
                </FormControl>
                : null
            }

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
          </form>

          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
    </PublicLayout>
  )
}
