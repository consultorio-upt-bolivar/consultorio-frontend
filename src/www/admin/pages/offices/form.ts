import * as Yup from 'yup'
import { validationMessages } from '../../../../common/constants/formik'

export const validationSchema = Yup.object({
  name: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5')),
  place: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5'))
})

export const initialValues = {
  name: '',
  place: '',
  isActive: 0,
}

export const formFields = {
  name: 'Nombre',
  place: 'Ubicacion',
  isActive: {
    type: 'checkbox',
    label: 'Esta habilitado?',
    required: true
  }
}
