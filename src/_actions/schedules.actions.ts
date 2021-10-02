import { SchedulesApi } from '../_api'
import { GenericActions } from './generic.actions'

export const schedulesActions = GenericActions({
  model: 'Schedules',
  Api: SchedulesApi,
  successMessages: {
    getAll: 'Jornadas obtenidas!',
    getOne: 'Jornada obtenida!',
    createOne: 'Jornada creada!',
    updateOne: 'Jornada actualizada!',
    deleteOne: 'Jornada eliminada!',
    toggleActive: 'Jornada actualizada!',
  }
})