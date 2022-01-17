// React
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Container, Grid, Paper, styled } from '@mui/material';

import {
  formStyles,
  GetFormikFields,
} from '../../../components/formik'

import { Typography } from '@mui/material'

import * as Yup from 'yup'
import { validationMessages } from '../../../../constants/formik'

export const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required(validationMessages.required),
  subject: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5')),
  description: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5'))
})

export const initialValues = {
  email: '',
  subject: '',
  description: '',
}

export const formFields = {
  email: 'Correo',
  subject: 'Asunto',
  description: {
    label: 'Descripcion',
    type: 'multiline',
    maxRows: 4,
    required: true
  }
}

export function ContactForm(): React.ReactElement {
  const { loading, data } = useSelector((store: any) => store.modals)

  const classes = formStyles()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      //dispatch(actions.createOne(values))
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
    <Box
      component="section"
      sx={{ display: 'block', overflow: 'hidden', my: 10, width: "80%", mx: "auto" }}
    >
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{ mb: 5 }}
          >
            CONTACTANOS
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
              Enviar consulta
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 5 }}>
            UBICACIÓN:
          </Typography>

          <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1660.6031332382947!2d-63.55193962374905!3d8.141924059249678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5a78554099f377b2!2sInstituto%20Universitario%20de%20Tecnolog%C3%ADa%20del%20Estado%20Bol%C3%ADvar%20(IUTEB)!5e0!3m2!1ses!2sar!4v1642366528821!5m2!1ses!2sar" width="100%" height="400" style={{ border: "0" }} allowFullScreen={false} loading="lazy"></iframe>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}
