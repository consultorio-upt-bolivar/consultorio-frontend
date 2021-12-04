// React
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, FormHelperText, Typography, Box } from '@material-ui/core'
import { useParams } from 'react-router'

import {
  formStyles,
  GetFormikFields,
} from '../../../../common/components/formik'

import { AdminLayout } from '../../components/adminLayout'
import { formFields, initialValues, validationSchema } from './form'

// Variable
import { medicalAppointmentsActions as actions, appointmentsActions, specialitiesActions } from '../../../../_actions'

export function UpdateMedicalAppointmentPage(): React.ReactElement {
  // Variable
  const formName = 'Cita Medica';
  const { loading, data } = useSelector((store: any) => store.medicalAppointments)
  const { items: specialitiesList } = useSelector((store: any) => store.specialities)

  const classes = formStyles()
  const dispatch = useDispatch()

  const params = useParams<{ id?: string | undefined }>()

  // Get offices
  useEffect(() => {
    dispatch(specialitiesActions.getAll({
      limit: 1000,
      offset: 0,
    }, {
      toast: false
    }))
  }, [])

  // Edit listener
  useEffect(() => {
    if (params.id) {
      dispatch(actions.getOne(+params.id, {
        toast: false
      }))
    }
  }, [params.id])

  // Edit form listener
  useEffect(() => {
    if (data) {
      const options = {
        date: new Date(data.date),
        specialityId: data.schedule.speciality.name,
        userId: data.user.name,
        cancellationReason: data.cancellationReason,
        report: data.report,
        refferedSpecialityId: data.refferedSpeciality?.id ?? ''
      }

      formik.setValues(options)
    }
  }, [data])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => values,
  })

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()

    if (formik.isValid) {
      formik.submitForm().then(values => {
        const options: any = {
          report: values.report
        }

        if (values.refferedSpecialityId) {
          options.refferedSpecialityId = values.refferedSpecialityId;
        }

        if (params.id) {
          dispatch(actions.updateOne(+params.id, options))
        }
      })
    }
  }

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault()

    if (formik.isValid) {
      formik.submitForm().then(values => {
        if (params.id) {
          dispatch(appointmentsActions.cancelAppointment(+params.id, values.cancellationReason))
        }
      })
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
          {`Actualizar ${formName}`}
        </Typography>
        <form className={classes.form} noValidate>
          {formikFields}

          <FormControl
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel className={classes.selectLabel} id='select-especialidad'>
              Referir a otra especialidad
            </InputLabel>
            <Select
              labelId='select-especialidad'
              label="refferedSpecialityId"
              disabled={data?.cancellationReason && data?.cancellationDate}
              {...formik.getFieldProps("refferedSpecialityId")}
            >
              <MenuItem value="">
                Ninguna
              </MenuItem>
              {specialitiesList?.map((el: any) => {
                return (
                  <MenuItem key={el.name} value={el.id}>
                    {el.name}
                  </MenuItem>
                )
              })}
            </Select>
            <FormHelperText error id="my-helper-text">
              {formik.errors.refferedSpecialityId ? formik.errors.refferedSpecialityId : null}
            </FormHelperText>
          </FormControl>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading || (data?.cancellationReason && data?.cancellationDate)}
              onClick={(e) => handleSubmit(e)}
            >
              Guardar reporte
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
              onClick={(e) => handleCancel(e)}
            >
              {data?.cancellationDate && data?.cancellationReason ? 'Actualizar razon de cancelación' : "Cancelar Cita"}
            </Button>
          </Box>

        </form>
      </Container>
    </AdminLayout>
  )
}
