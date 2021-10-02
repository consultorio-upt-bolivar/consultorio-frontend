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

import { modalsActions as actions } from '../../../../_actions'

export function CreateModalPage(): React.ReactElement {
  // Variable
  const formName = 'Modal';
  const { loading, data } = useSelector((store: any) => store.modals)

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
      formik.setValues(data)
    }
  }, [data])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (params.id) {
        dispatch(actions.updateOne(+params.id, values))
      } else {
        dispatch(actions.createOne(values))
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
