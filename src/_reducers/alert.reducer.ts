import { alertConstants } from '../_constants'

interface AlertAction {
  show: boolean
  type?: string
  title?: string
  description?: string
  callback?: () => void
}

export function alert(state: AlertAction = { show: false }, action: AlertAction): AlertAction {
  switch (action.type) {
    case alertConstants.SHOW:
      return {
        show: true,
        title: action.title,
        description: action.description,
        callback: action.callback
      }
    case alertConstants.HIDE:
      return {
        show: false,
        title: state.title,
        description: state.description
      }
    case alertConstants.CLEAR:
      return {
        show: false,
        title: state.title,
        description: state.description
      }
    default:
      return state
  }
}
