import { clearUserStorage, getUserData } from '../common/utils/userStorage'
import { authConstants } from '../_constants'

const user = getUserData()

const initialState = user ? { loggedIn: true, user } : {}

interface AuthAction {
  loading?: boolean
  loggedIn?: boolean
  user?: unknown
}

export function authentication(
  state = initialState,
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
      return {}

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
      return {}
    case authConstants.LOGOUT:
      clearUserStorage()
      return {}
    default:
      return state
  }
}
