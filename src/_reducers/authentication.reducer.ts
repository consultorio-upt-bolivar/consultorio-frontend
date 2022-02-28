import { clearUserStorage, getUserData } from '../helpers/userStorage'
import { authConstants } from '../_constants'

const user = getUserData()

const initialState = user ? { loggedIn: true, user } : {}

interface AuthAction {
  mailSent?: boolean
  loading?: boolean
  error?: boolean
  loggedIn?: boolean
  user?: unknown
}

export function authentication(
  state = {
    loading: false,
    error: false,
    ...initialState
  },
  action: {
    type: string
    user: unknown
  }
): AuthAction {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loading: true,
      }
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      }
    case authConstants.LOGIN_FAILURE:
      return {
        loading: false,
        error: true
      }

    case authConstants.SIGNIN_REQUEST:
      return {
        loading: true,
      }
    case authConstants.SIGNIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      }
    case authConstants.SIGNIN_FAILURE:
      return {
        loading: false,
        error: true
      }
    case authConstants.SEND_MAIL_REQUEST:
      return {
        loading: true,
      }
    case authConstants.SEND_MAIL_SUCCESS:
      return {
        loading: false,
        mailSent: true,
      }
    case authConstants.SEND_MAIL_FAILURE:
      return {
        loading: false,
        error: true
      }
    case authConstants.CHANGE_PASSWORD_REQUEST:
      return {
        loading: true,
      }
    case authConstants.CHANGE_PASSWORD_SUCCESS:
      return {
        loading: false,
      }
    case authConstants.CHANGE_PASSWORD_FAILURE:
      return {
        loading: false,
        error: true
      }
    case authConstants.LOGOUT:
      clearUserStorage()
      return {}
    default:
      return state
  }
}
