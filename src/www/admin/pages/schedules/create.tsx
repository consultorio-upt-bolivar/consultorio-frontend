// React
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
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
import { officesActions, schedulesActions as actions, specialitiesActions, usersActions } from '../../../../_actions'
import { PublicRoles } from '../../../../_api'
import { ActionOptions } from '../../../../_actions/generic.actions'

const dispatchOptions: ActionOptions = {
  redirect: '/admin/jornadas'
}

export function CreateSchedulesPage(): React.ReactElement {
  // Variable
  const formName = 'Jornada';
  const { loading, data } = useSelector((store: any) => store.schedules)
  const { items: officesList } = useSelector((store: any) => store.offices)
  const { items: specialitiesList } = useSelector((store: any) => store.specialities)
  const { items: usersList } = useSelector((store: any) => store.users)

  const [filteredSpecialities, setFilteredSpecialities] = useState([])

  const classes = formStyles()
  const dispatch = useDispatch()

  const params = useParams<{ id?: string | undefined }>()

  // Get offices
  useEffect(() => {
    dispatch(officesActions.getAll({
      limit: 25000,
      offset: 0,
      where: "isActive==1"
    }))

    dispatch(specialitiesActions.getAll({
      limit: 25000,
      offset: 0,
      where: "isActive==1"
    }))

    dispatch(usersActions.getAll({
      limit: 25000,
      offset: 0,
      where: `profile.id==${PublicRoles.MedicalSpecialist};isActive==1`
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
    if (data && params.id) {
      const options = {
        specialityId: data.speciality.id,
        specialistId: data.specialist.id,
        officeId: data.speciality?.office?.id ?? "",
        date: parse(data.date, 'yyyy-MM-dd', new Date()),
        dateEnd: parse(data.dateEnd, 'yyyy-MM-dd', new Date()),
        startHour: parse(data.startHour, 'HH:mm:ss', new Date()),
        endHour: parse(data.endHour, 'HH:mm:ss', new Date()),
        appointmentInterval: data.appointmentInterval,
        isActive: data.isActive
      }

      formik.setValues(options)

      setFilteredSpecialities(specialitiesList.filter((el: any) => {
        return el.office.id == data.speciality.office.id
      }))
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

  useEffect(() => {
    if (formik.values.officeId == '') return;

    if (formik.values.officeId) {
      const filtered = specialitiesList.filter((el: any) => {
        return el.office.id == formik.values.officeId
      })

      setFilteredSpecialities(filtered)

      if (filteredSpecialities.length > 0) {
        formik.setFieldValue("specialityId", filtered[0].id)
      }
    }
  }, [formik.values.officeId])

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
          >
            <InputLabel className={classes.selectLabel} id='select-consultorio'>
              Consultorio médico
            </InputLabel>
            <Select
              labelId='select-consultorio'
              label="officeId"
              {...formik.getFieldProps("officeId")}
            >
              <MenuItem value="">
                Seleccionar
              </MenuItem>
              {officesList?.map((el: any) => {
                return (
                  <MenuItem key={el.name} value={el.id}>
                    {el.name}
                  </MenuItem>
                )
              })}
            </Select>
            <FormHelperText className={classes.errorText} error>
              {formik.touched.officeId && formik.errors.officeId
                ? formik.errors.officeId
                : null}
            </FormHelperText>
          </FormControl>

          <FormControl
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel className={classes.selectLabel} id='select-especialidad'>
              Especialidad médica
            </InputLabel>
            <Select
              labelId='select-especialidad'
              label="specialityId"
              {...formik.getFieldProps("specialityId")}
            >
              <MenuItem value="">
                Seleccionar
              </MenuItem>
              {filteredSpecialities?.map((el: any) => {
                return (
                  <MenuItem key={el.name} value={el.id}>
                    {el.name}
                  </MenuItem>
                )
              })}
            </Select>
            <FormHelperText className={classes.errorText} error>
              {formik.touched.specialityId && formik.errors.specialityId
                ? formik.errors.specialityId
                : null}
            </FormHelperText>
          </FormControl>

          <FormControl
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel className={classes.selectLabel} id='select-especialista'>
              Especialista
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
            <FormHelperText className={classes.errorText} error>
              {formik.touched.specialistId && formik.errors.specialistId
                ? formik.errors.specialistId
                : null}
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
