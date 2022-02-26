import * as Yup from 'yup'
import { add } from 'date-fns'

const today = new Date()

export const validationSchema = Yup.object({
  refferedSpecialityId: Yup.string(),
  report: Yup.string(),
  cancellationReason: Yup.string()
})

export const initialValues = ({
  date: today,
  specialityId: '',
  userId: '',
  cancellationReason: '',
  report: '',
  refferedSpecialityId: ''
})

export const formFields = ({
  date: {
    type: 'date',
    label: 'Fecha cita',
    readonly: true,
    disablePast: false,
    maxDate: add(today, {
      days: 1
    }),
    width: '49%'
  },
  specialityId: {
    label: 'Especialidad',
    type: 'text',
    readonly: true,
    width: '49%'
  },
  userId: {
    label: 'Usuario',
    type: 'text',
    readonly: true,
    width: '100%'
  },
  divider: {
    type: 'divider'
  },
  cancellationReason: {
    label: 'Razon de cancelación',
    type: 'multiline',
    maxRows: 6,
    width: '100%'
  },
  divider_report: {
    type: 'divider'
  },
  report: {
    label: 'Reporte médico',
    type: 'multiline',
    maxRows: 6,
    width: '100%'
  }
})