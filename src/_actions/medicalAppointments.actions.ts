import { MedicalAppointmentsApi } from '../_api'
import { GenericActions } from './generic.actions'

export const medicalAppointmentsActions = GenericActions({
  model: 'MedicalAppointments',
  Api: MedicalAppointmentsApi,
  successMessages: {
    getAll: 'Citas medicas obtenidas!',
    getOne: 'Cita medica obtenida!',
    createOne: 'Cita medica creada!',
    updateOne: 'Cita medica actualizada!',
    deleteOne: 'Cita medica eliminada!',
    toggleActive: 'Cita medica actualizada!',
  }
})