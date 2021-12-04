import { loadingConstants } from '../_constants'

interface ToastAction {
  type?: string
  show?: boolean
}

export function loading(state = {}, action: ToastAction): ToastAction {
  switch (action.type) {
    case loadingConstants.SHOW:
      return {
        show: true,
      }
    case loadingConstants.HIDE:
      return {
        show: false,
      }
    default:
      return state
  }
}
