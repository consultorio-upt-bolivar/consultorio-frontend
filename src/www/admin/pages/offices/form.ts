import * as Yup from 'yup'
import { validationMessages } from '../../../../constants/formik'

export const validationSchema = Yup.object({
  name: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5')),
  phone: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5')),
  place: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5'))
})

export const initialValues = {
  name: '',
  place: '',
  phone: '',
  isActive: 0,
}

export const formFields = {
  name: 'Nombre',
  place: 'Ubicacion',
  phone: 'Telefono',
  isActive: {
    type: 'checkbox',
    label: 'Esta habilitado?',
    required: true
  }
}
