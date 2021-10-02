// React
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Typography } from '@material-ui/core'
import { useParams } from 'react-router'

import {
  formStyles,
  GetFormikFields,
} from '../../../../common/components/formik'

import { AdminLayout } from '../../components/adminLayout'
import { formFields, initialValues, validationSchema } from './form'

// Variable
import { specialistActions as actions } from '../../../../_actions'

export function CreateSpecialistPage(): React.ReactElement {
  // Variable
  const formName = 'Especialista';
  const { loading, data } = useSelector((store: any) => store.users)

  const classes = formStyles()
  const dispatch = useDispatch()

  const params = useParams<{ id?: string | undefined }>()

  // Edit listener
  useEffect(() => {
    if (params.id) {
      dispatch(actions.getOne(+params.id))
    }
  }, [params.id])

  // Edit form listener
  useEffect(() => {
    if (data) {
      const { profile, ...rest } = data;

      const options: any = {
        profile: data.profile.name,
        password: "",
        ...rest,
      }

      formik.setValues(options)
    }
  }, [data])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({
      password,
      legalId,
      ...rest
    }) => {
      const options: any = {
        legalId: legalId.toString(),
        ...rest
      }

      if (password.length) {
        options.password = password
      }

      if (params.id) {
        dispatch(actions.updateOne(+params.id, options))
      } else {
        dispatch(actions.createOne(data, '/admin/especialistas'))
      }
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
    <AdminLayout>
      <Container>
        <Typography
          component="h1"
          variant="h5"
          style={{
            textAlign: 'center',
          }}
        >
          {data ? `Actualizar ${formName}` : `Crear ${formName}`}
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
            {data ? 'Actualizar' : 'Crear'}
          </Button>
        </form>
      </Container>
    </AdminLayout>
  )
}
