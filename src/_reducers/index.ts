import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { users } from './users.reducer'
import { alert } from './alert.reducer'
import { toast } from './toast.reducer'
import { modals } from './modals.reducer'

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  toast,
  modals,
})

export default rootReducer
