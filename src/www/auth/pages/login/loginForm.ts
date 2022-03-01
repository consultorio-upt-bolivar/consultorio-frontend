import * as Yup from 'yup'
import { validationMessages } from '../../../../constants/formik'

export const validationSchema = Yup.object({
  email: Yup.string()
    .email(validationMessages.email.replace('$', 'Email'))
    .required(validationMessages.required),
  password: Yup.string()
    .min(5, validationMessages.minLength.replace('$', '5'))
    .max(20, validationMessages.maxLength.replace('$', '20'))
    .required(validationMessages.required),
})

export const initialValues = {
  email: '',
  password: '',
}
