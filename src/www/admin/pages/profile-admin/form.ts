import * as Yup from 'yup'
import { validationMessages } from '../../../../constants/formik'

export const validationSchema = Yup.object({
  name: Yup.string().required(validationMessages.required),
  email: Yup.string()
    .email(validationMessages.email.replace('$', 'Email'))
    .required(validationMessages.required),
  phone: Yup.string().required(validationMessages.required),
  legalId: Yup.string().required(validationMessages.required),
  password: Yup.string()
    .min(5, validationMessages.minLength.replace('$', '5'))
    .max(20, validationMessages.maxLength.replace('$', '20'))
})

export const initialValues = {
  name: '',
  email: '',
  phone: '',
  legalId: '',
  password: '',
}

export const formFields = {
  name: 'Nombre',
  phone: {
    type: 'number',
    label: 'Teléfono',
    required: true
  },
  legalId: {
    type: 'text',
    label: 'Cédula',
    readonly: true
  },
  email: {
      type: 'text',
      label: 'Correo electrónico',
      readonly: true
  },
  divider: {
    type: 'divider'
  },
  password: {
    type: 'password',
    label: 'Contraseña',
    required: false
  },
}
