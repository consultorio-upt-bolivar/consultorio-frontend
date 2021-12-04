import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { toast } from './toast.reducer'
import { modals } from './modals.reducer'
import { offices } from './offices.reducer'
import { specialists } from './specialists.reducer'
import { specialities } from './specialities.reducer'
import { schedules } from './schedules.reducer'
import { appointments } from './appointments.reducer'
import { medicalAppointments } from './medicalAppointments.reducer'
import { databases } from './databases.reducer'
import { loading } from './loading.reducer'

const rootReducer = combineReducers({
  alert,
  toast,
  authentication,
  users,
  modals,
  offices,
  specialists,
  specialities,
  schedules,
  appointments,
  medicalAppointments,
  databases,
  loading
})

export default rootReducer
