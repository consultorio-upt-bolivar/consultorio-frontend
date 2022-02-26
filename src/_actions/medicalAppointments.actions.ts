import { MedicalAppointmentsApi } from '../_api'
import { GenericActions } from './generic.actions'

export const medicalAppointmentsActions = GenericActions({
  model: 'MedicalAppointments',
  Api: MedicalAppointmentsApi,
  successMessages: {
    getAll: 'Citas medicas obtenidas!',
    getOne: 'Cita médica obtenida!',
    createOne: 'Cita médica creada!',
    updateOne: 'Cita médica actualizada!',
    deleteOne: 'Cita médica eliminada!',
    toggleActive: 'Cita médica actualizada!',
  }
})