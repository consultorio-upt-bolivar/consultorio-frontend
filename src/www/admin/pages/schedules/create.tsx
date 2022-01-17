// React
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, FormHelperText, Typography } from '@mui/material';
import { useParams } from 'react-router'
import { format, parse } from 'date-fns'

import {
  formStyles,
  GetFormikFields,
} from '../../../components/formik'

import { AdminLayout } from '../../components/adminLayout'
import { formFields, initialValues, validationSchema } from './form'

// Variable
import { schedulesActions as actions, specialitiesActions, usersActions } from '../../../../_actions'
import { PublicRoles } from '../../../../_api'
import { ActionOptions } from '../../../../_actions/generic.actions'

const dispatchOptions: ActionOptions = {
  redirect: '/admin/jornadas'
}

export function CreateSchedulesPage(): React.ReactElement {
  // Variable
  const formName = 'Jornada';
  const { loading, data } = useSelector((store: any) => store.schedules)
  const { items: specialitiesList } = useSelector((store: any) => store.specialities)
  const { items: usersList } = useSelector((store: any) => store.users)

  const classes = formStyles()
  const dispatch = useDispatch()

  const params = useParams<{ id?: string | undefined }>()

  // Get offices
  useEffect(() => {
    dispatch(specialitiesActions.getAll({
      limit: 1000,
      offset: 0,
    }))

    dispatch(usersActions.getAll({
      limit: 1000,
      offset: 0,
      where: `profile.id==${PublicRoles.MedicalSpecialist}`
    }))
  }, [])

  // Edit listener
  useEffect(() => {
    if (params.id) {
      dispatch(actions.getOne(+params.id))
    }
  }, [params.id])

  // Edit form listener
  useEffect(() => {
    if (data) {
      const options = {
        specialityId: data.speciality.id,
        specialistId: data.specialist.id,
        date: parse(data.date, 'yyyy-MM-dd', new Date()),
        dateEnd: parse(data.dateEnd, 'yyyy-MM-dd', new Date()),
        startHour: parse(data.startHour, 'HH:mm:ss', new Date()),
        endHour: parse(data.endHour, 'HH:mm:ss', new Date()),
        appointmentInterval: data.appointmentInterval,
        isActive: data.isActive
      }

      formik.setValues(options)
    }
  }, [data])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const options = {
        specialityId: values.specialityId,
        specialistId: values.specialistId,
        date: format(values.date, 'yyyy-MM-dd'),
        dateEnd: format(values.dateEnd, 'yyyy-MM-dd'),
        startHour: format(values.startHour, 'HH:mm:ss'),
        endHour: format(values.endHour, 'HH:mm:ss'),
        appointmentInterval: values.appointmentInterval,
        isActive: values.isActive
      }

      if (params.id) {
        dispatch(actions.updateOne(+params.id, options, dispatchOptions))
      } else {
        dispatch(actions.createOne(options, dispatchOptions))
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
          {data && params.id ? `Actualizar ${formName}` : `Crear ${formName}`}
        </Typography>
        <form className={classes.form} noValidate>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            sx={{ mb: 3 }}
          >
            <InputLabel className={classes.selectLabel} id='select-especialidad'>
              Especialidad
            </InputLabel>
            <Select
              labelId='select-especialidad'
              label="specialityId"
              {...formik.getFieldProps("specialityId")}
            >
              <MenuItem value="">
                Seleccionar
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
              {formik.errors.specialityId ? formik.errors.specialityId : null}
            </FormHelperText>
          </FormControl>

          <FormControl
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel className={classes.selectLabel} id='select-especialista'>
              Doctor Especialista
            </InputLabel>
            <Select
              labelId='select-especialista'
              label="specialistId"
              {...formik.getFieldProps("specialistId")}
            >
              <MenuItem value="">
                Seleccionar
              </MenuItem>
              {usersList?.map((el: any) => {
                return (
                  <MenuItem key={el.name} value={el.id}>
                    {el.name}
                  </MenuItem>
                )
              })}
            </Select>
            <FormHelperText error id="my-helper-text">
              {formik.errors.specialistId ? formik.errors.specialistId : null}
            </FormHelperText>
          </FormControl>

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
    </AdminLayout >
  )
}
