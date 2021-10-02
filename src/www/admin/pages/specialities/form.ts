import * as Yup from 'yup'
import { validationMessages } from '../../../../common/constants/formik'

export const validationSchema = Yup.object({
  name: Yup.string()
    .required(validationMessages.required)
    .min(5, validationMessages.minLength.replace('$', '5')),
  officeId: Yup.string().required(validationMessages.required)
})

export const initialValues = {
  name: '',
  isActive: 0,
  officeId: ''
}