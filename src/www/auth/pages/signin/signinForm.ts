import * as Yup from 'yup'
import { validationMessages } from '../../../../constants/formik'

export const validationSchema = Yup.object({
  name: Yup.string().required(validationMessages.required),
  email: Yup.string()
    .email(validationMessages.invalid.replace('$', 'Email'))
    .required(validationMessages.required),
  phone: Yup.string().required(validationMessages.required),
  legalId: Yup.string().max(20, validationMessages.maxLength.replace('$', '20')).required(validationMessages.required),
  profile: Yup.string().required(validationMessages.required),
  password: Yup.string()
    .min(5, validationMessages.minLength.replace('$', '5'))
    .max(20, validationMessages.maxLength.replace('$', '20'))
    .required(validationMessages.required),
})

export const initialValues = {
  name: '',
  email: '',
  phone: '',
  legalId: '',
  profile: 'student',
  familyLegalId: '',
  password: '',
}

export const formFields = {
  name: 'Nombre',
  legalId: "Identificación",
  phone: "Telefono",
  profile: {
    label: 'Tipo de usuario',
    values: [{
      label: 'Estudiante',
      value: 'student'
    }, {
      label: 'Administrativo',
      value: 'employee'
    }, {
      label: 'Familiar',
      value: 'family'
    }],
    type: 'select',
  },
  email: 'Correo',
  password: {
    type: 'password',
    label: 'Contrasena',
  },
}