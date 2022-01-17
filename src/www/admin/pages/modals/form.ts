import * as Yup from 'yup'
import { validationMessages } from '../../../../constants/formik'

export const validationSchema = Yup.object({
  name: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5')),
  title: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5')),
  description: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5')),
  image: Yup.string().nullable(true)
    .required(validationMessages.required),
})

export const initialValues = {
  name: '',
  title: '',
  description: '',
  isMain: 0,
  isActive: 0,
  order: 0,
  image: ''
}

export const formFields = {
  name: 'Nombre',
  title: 'Titulo',
  description: {
    label: 'Descripcion',
    type: 'multiline',
    maxRows: 4,
    required: true
  },
  isMain: {
    type: 'checkbox',
    label: 'Es un modal principal?',
    required: true
  },
  isActive: {
    type: 'checkbox',
    label: 'Activo por defecto?',
    required: true
  },
  order: 0,
}
