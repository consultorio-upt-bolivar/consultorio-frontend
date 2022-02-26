import * as Yup from 'yup'
import { validationMessages } from '../../../../constants/formik'

export const validationSchema = Yup.object({
  name: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5')),
  image: Yup.string().nullable(true)
    .required(validationMessages.required),
})

export const initialValues = {
  name: '',
  isMain: 0,
  isActive: 0,
  image: ''
}

export const formFields = {
  name: 'Nombre',
  isMain: {
    type: 'checkbox',
    label: 'Destacado',
    required: true
  },
  isActive: {
    type: 'checkbox',
    label: 'Visible',
    required: true
  },
}
