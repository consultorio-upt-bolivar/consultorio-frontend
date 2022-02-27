// React
import { useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Paper, styled } from '@mui/material';
import { useParams } from 'react-router'

import {
  formStyles,
  GetFormikFields,
} from '../../../components/formik'

import { AdminLayout } from '../../components/adminLayout'
import { formFields, initialValues, validationSchema } from './form'

import { modalsActions as actions } from '../../../../_actions'
import { ActionOptions } from '../../../../_actions/generic.actions'
import { FormHelperText, Grid, InputLabel, Typography } from '@mui/material'

const dispatchOptions: ActionOptions = {
  redirect: '/admin/modales'
}

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: '16px',
  cursor: 'pointer',
  width: '250px',
  padding: '20px 20px',
  height: '100px'
}));

const validateImageSize = (file: File) => {
  const fileSize = file.size / 1024 / 1024; // in MiB
  if (fileSize > 1) {
    return false
  } else {
    return true
  }
}

export function CreateModalPage(): React.ReactElement {
  // Variable
  const formName = 'Modal';
  const { loading, data } = useSelector((store: any) => store.modals)
  const inputRef = useRef(null)

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

  const handleClickButton = () => {
    if (inputRef.current) {
      (inputRef.current as any).click()
    }
  }

  const validateFile = async (e: React.SyntheticEvent) => {
    formik.setFieldValue('image', null, false);

    const file = (e as any).target?.files[0] ?? false

    if (!validateImageSize(file)) {
      formik.setFieldError("image", "El tamaño maximo de la imagen es 1 Mib")
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      formik.setFieldValue('image', reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return false;
    };
  }

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
          {formikFields}

          <InputLabel style={{ marginTop: '20px', marginBottom: '10px', fontWeight: 500 }} className={classes.selectLabel} id={'select-' + name} onClick={() => handleClickButton()}>
            Imagen
          </InputLabel>

          <Grid container spacing={2} justifyContent="center">
            <Grid item sm={12} md={4} >
              <div>
                <Item elevation={2} style={{ flexWrap: 'wrap', marginBottom: '10px', marginTop: '20px' }}>
                  <input style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }} accept=".jpg,.png" type="file" ref={inputRef} onChange={(e) => validateFile(e)}></input>


                  <div style={{ width: '100%' }} >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleClickButton()}
                    >
                      <small>
                        {formik.values.image ? 'Elegir otro archivo' : 'Selecciona un archivo'}
                      </small>
                    </Button>
                  </div>

                </Item>

                <FormHelperText className={classes.errorText} error>
                  {formik.errors.image ? formik.errors.image : null}
                </FormHelperText>
              </div>
            </Grid>

            <Grid item sm={12} md={8}>
              {formik.values.image && formik.values.image.length ? <div style={{
                padding: '16px',
                textAlign: 'center',
                border: '1px solid #c0c0c02e',
                borderRadius: '5px',
              }}>
                <img width="500px" alt="imagen" src={formik.values.image}></img>
              </div> : null}
            </Grid>
          </Grid>

          <Button
            sx={{ mt: 2 }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading || !formik.isValid}
            onClick={(e) => handleSubmit(e)}
          >
            {data && params.id ? 'Actualizar' : 'Crear'}
          </Button>
        </form>
      </Container>
    </AdminLayout>
  )
}
