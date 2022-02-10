import { toastConstants } from '../_constants'

interface ToastAction {
  show: boolean,
  type?: string
  message?: string
}

export function toast(state: ToastAction = { show: false }, action: ToastAction): ToastAction {
  switch (action.type) {
    case toastConstants.SUCCESS:
      return {
        show: true,
        type: 'success',
        message: action.message,
      }
    case toastConstants.ERROR:
      return {
        show: true,
        type: 'error',
        message: action.message,
      }
    case toastConstants.CLEAR:
      return {
        show: false,
        type: state.type,
        message: state.message
      }
    default:
      return state
  }
}
