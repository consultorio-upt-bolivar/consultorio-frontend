import * as Yup from 'yup'
import { validationMessages } from '../../../../constants/formik'
import { PublicRoles } from '../../../../_api'
export const validationSchema = Yup.object({
  name: Yup.string().required(validationMessages.required),
  email: Yup.string()
    .email(validationMessages.email.replace('$', 'Email'))
    .required(validationMessages.required),
  phone: Yup.string().required(validationMessages.required),
  legalId: Yup.string().required(validationMessages.required),
  profile: Yup.string().required(validationMessages.required),
  password: Yup.string()
    .min(5, validationMessages.minLength.replace('$', '5'))
    .max(20, validationMessages.maxLength.replace('$', '20'))
})

export const initialValues = {
  name: '',
  email: '',
  phone: '',
  legalId: '',
  status: 'authorized',
  profile: PublicRoles.MedicalSpecialist,
  password: '',
}

export const formFields = {
  name: 'Nombre',
  phone: {
    type: 'text',
    label: 'Teléfono',
    required: true
  },
  legalId: {
    type: 'text',
    label: 'Cédula',
    required: true
  },
  email: 'Correo electrónico',
  divider: {
      type: 'divider'
  },
  password: {
    type: 'password',
    label: 'Contraseña',
  },
}
