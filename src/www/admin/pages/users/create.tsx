// React
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router'

import {
  formStyles,
  GetFormikFields,
} from '../../../components/formik'

import { AdminLayout } from '../../components/adminLayout'
import { formCreateFields, formUpdateFields, initialValues, validationSchema } from './form'

// Variable
import { toastActions, usersActions as actions } from '../../../../_actions'
import { ActionOptions } from '../../../../_actions/generic.actions'
import { Roles, UptApi, UsersApi } from '../../../../_api';
import { getConfiguration } from '../../../../config/api.config';
import { handleError } from '../../../../helpers/handleApiError';

const dispatchOptions: ActionOptions = {
  redirect: '/admin/usuarios'
}

// TODO: UPDATE STATUS
export function CreateUsersPage(): React.ReactElement {
  // Variable
  const formName = 'Usuario';
  const { loading, data } = useSelector((store: any) => store.users)

  const classes = formStyles()
  const dispatch = useDispatch()

  const params = useParams<{ id?: string | undefined }>()

  // Edit listener
  useEffect(() => {
    if (params.id) {
      dispatch(actions.getOne(+params.id))
    } else {
      formik.setValues(initialValues, false);
    }
  }, [params.id])

  // Edit form listener
  useEffect(() => {
    if (data && params.id) {
      const { profile, ...rest } = data;

      const options: any = {
        profile: data.profile.id,
        password: "",
        ...rest,
      }

      formik.setValues(options)
    }
  }, [data])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      const {
        familyLegalId,
        password,
        legalId,
        ...rest
      } : any = data;

      if (formik.values["profile"] === Roles.Family) {
        rest.familyLegalId = familyLegalId
      }

      rest.legalId = legalId.toString()

      if (password.length) {
        rest.password = password
      }

      if (params.id) {
        dispatch(actions.updateOne(+params.id, rest, dispatchOptions))
      } else {
        dispatch(actions.createOne(rest, dispatchOptions))
      }
    },
  })

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    const errors = await formik.validateForm();

    formik.setErrors(errors);

    if (!formik.isValid || Object.keys(errors).length > 0) {
      return;
    }

    if (!params.id) {
      const api = new UptApi(getConfiguration())

      if (formik.values["profile"] !== Roles.Admin2) {
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
      }
    }

    formik.submitForm()
  }

  const formikFields = GetFormikFields(formik, params.id ? formUpdateFields : formCreateFields)

  return (
    <AdminLayout>
      <Container>
        <Typography
          component="h1"
          variant="h5"
          style={{
            textAlign: 'center',
          }}
        >
          {data && params.id ? `Actualizar ${formName}` : `Crear ${formName}`}
        </Typography>
        <form className={classes.form} noValidate>
          {formikFields}

          {
            formik.values["profile"] === Roles.Family ?
              <FormControl
                sx={{ marginTop: "16px !important" }}
                variant="outlined"
                className={classes.formControl}
              >
                <TextField
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  id="familyLegalId"
                  label="Cédula del familiar"
                  disabled={!!params.id}
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
            sx={{ mt: 2 }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            onClick={handleSubmit}
          >
            {data && params.id ? 'Actualizar' : 'Crear'}
          </Button>
        </form>
      </Container>
    </AdminLayout>
  )
}
