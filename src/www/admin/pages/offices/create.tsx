// React
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Typography } from '@mui/material';
import { useParams } from 'react-router'

import {
  formStyles,
  GetFormikFields,
} from '../../../components/formik'

import { AdminLayout } from '../../components/adminLayout'
import { formFields, initialValues, validationSchema } from './form'

// Variable
import { officesActions as actions } from '../../../../_actions'
import { ActionOptions } from '../../../../_actions/generic.actions'

const dispatchOptions: ActionOptions = {
  redirect: '/admin/oficinas'
}

export function CreateOfficePage(): React.ReactElement {
  // Variable
  const formName = 'Consultorio médico';
  const { loading, data } = useSelector((store: any) => store.offices)

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
    if (data && params.id) {
      formik.setValues(data)
    }
  }, [data])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (params.id) {
        dispatch(actions.updateOne(+params.id, values, dispatchOptions))
      } else {
        dispatch(actions.createOne(values, dispatchOptions))
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

    formik.submitForm()
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
          {data && params.id ? `Actualizar ${formName}` : `Crear ${formName}`}
        </Typography>
        <form className={classes.form} noValidate>
          {formikFields}

          <Button
            sx={{ mt: 2 }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            onClick={(e) => handleSubmit(e)}
          >
            {data && params.id ? 'Actualizar' : 'Crear'}
          </Button>
        </form>
      </Container>
    </AdminLayout>
  )
}
