// React
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Checkbox, Container, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { useParams } from 'react-router'

import {
  formStyles,
} from '../../../../common/components/formik'

import { AdminLayout } from '../../components/adminLayout'
import { initialValues, validationSchema } from './form'

// Variable
import { specialitiesActions as actions, officesActions } from '../../../../_actions'
import { ActionOptions } from '../../../../_actions/generic.actions'

const dispatchOptions: ActionOptions = {
  redirect: '/admin/especialidades'
}

export function CreateSpecialitiesPage(): React.ReactElement {
  // Variable
  const formName = 'Especialidad';
  const { loading, data } = useSelector((store: any) => store.specialities)
  const { items } = useSelector((store: any) => store.offices)

  const classes = formStyles()
  const dispatch = useDispatch()

  const params = useParams<{ id?: string | undefined }>()

  // Get offices
  useEffect(() => {
    dispatch(officesActions.getAll({
      limit: 1000,
      offset: 0,
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
      formik.setValues({ ...data, officeId: data.office.id })
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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()

    console.log(formik.isValid)
    if (formik.isValid) {
      formik.submitForm()
    }
  }

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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nombre"
            label="nombre"
            {...formik.getFieldProps("name")}
          />
          <FormHelperText error id="my-helper-text">
            {formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null}
          </FormHelperText>

          <FormControl
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel className={classes.selectLabel} id='select-oficina'>
              Oficina
            </InputLabel>
            <Select
              labelId='select-oficina'
              label="officeId"
              {...formik.getFieldProps("officeId")}
            >
              <MenuItem value="">
                Seleccionar
              </MenuItem>
              {items?.map((el: any) => {
                return (
                  <MenuItem key={el.name} value={el.id}>
                    {el.name}
                  </MenuItem>
                )
              })}
            </Select>
            <FormHelperText error id="my-helper-text">
              {formik.errors.officeId ? formik.errors.officeId : null}
            </FormHelperText>
          </FormControl>

          <FormControlLabel
            className={classes.formControl}
            control={
              <Checkbox
                color="primary"
                aria-describedby="checkbox-error-text"
                checked={!!formik.values.isActive}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("isActive", event.target.checked ? 1 : 0)
                }}
              />
            }
            label="Esta habilitado?"
          />
          <FormHelperText error id="checkbox-error-text">
            {formik.errors.isActive ? formik.errors.isActive : null}
          </FormHelperText>

          <Button
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
