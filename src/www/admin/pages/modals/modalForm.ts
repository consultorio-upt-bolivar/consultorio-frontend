import * as Yup from 'yup'
import { validationMessages } from '../../../../common/constants/formik'

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
})

export const initialValues = {
  name: '',
  title: '',
  description: '',
  isMain: 0,
  isActive: 0,
  order: 0,
}

export const formFields = {
  name: 'Nombre',
  title: 'Titulo',
  description: 'Descripcion',
  isMain: {
    type: 'checkbox',
    label: 'Es un modal principal?',
  },
  isActive: {
    type: 'checkbox',
    label: 'Activo por defecto?',
  },
  order: 0,
}
