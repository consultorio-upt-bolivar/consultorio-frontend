// React
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AdminLayout } from '../../components/adminLayout'
import { formFields, initialValues, validationSchema } from './modalForm'

import {
  formStyles,
  GetFormikFields,
} from '../../../../common/components/formik'

import { Button, Container, Typography } from '@material-ui/core'
import { modalsActions } from '../../../../_actions'

export function CreateModalPage(): React.ReactElement {
  const formOptions = {
    title: 'Crear modal',
  }

  const classes = formStyles()

  const { loading } = useSelector((store: any) => store.modals)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(modalsActions.createOne(values))
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
          {formOptions.title}
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
            Crear
          </Button>
        </form>
      </Container>
    </AdminLayout>
  )
}
