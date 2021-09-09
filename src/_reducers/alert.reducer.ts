import { alertConstants } from '../_constants'

interface AlertAction {
  type?: string
  message?: string
}

export function alert(state = {}, action: AlertAction): AlertAction {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message,
      }
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message,
      }
    case alertConstants.CLEAR:
      return {}
    default:
      return state
  }
}
