import { toastConstants } from '../_constants'

export const toastActions = {
  success,
  error,
  clear,
}

function success(message: string) {
  return { type: toastConstants.SUCCESS, message }
}

function error(message: string) {
  return { type: toastConstants.ERROR, message }
}

function clear() {
  return { type: toastConstants.CLEAR }
}
