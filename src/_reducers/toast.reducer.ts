import { toastConstants } from '../_constants'

interface ToastAction {
  type?: string
  message?: string
}

export function toast(state = {}, action: ToastAction): ToastAction {
  switch (action.type) {
    case toastConstants.SUCCESS:
      return {
        type: 'success',
        message: action.message,
      }
    case toastConstants.ERROR:
      return {
        type: 'error',
        message: action.message,
      }
    case toastConstants.CLEAR:
      return {}
    default:
      return state
  }
}
