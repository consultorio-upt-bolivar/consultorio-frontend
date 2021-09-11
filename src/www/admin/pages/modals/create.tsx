// React
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AdminLayout } from '../../components/adminLayout'
import { formFields, initialValues, validationSchema } from './modalForm'

import {
  formStyles,
  GetFormikFields,
} from '../../../../common/components/formik'

import { Button, Container, Typography } from '@material-ui/core'
import { modalsActions } from '../../../../_actions'
import { useParams } from 'react-router'

export function CreateModalPage(): React.ReactElement {
  const classes = formStyles()
  const { loading, data } = useSelector((store: any) => store.modals)
  const dispatch = useDispatch()

  const params = useParams<{ id?: string | undefined }>()

  // Edit listener
  useEffect(() => {
    if (params.id) {
      dispatch(modalsActions.getOne(+params.id))
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
        dispatch(modalsActions.updateOne(+params.id, values))
      } else {
        dispatch(modalsActions.createOne(values))
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
          {data ? 'Actualizar modal' : 'Crear modal'}
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
