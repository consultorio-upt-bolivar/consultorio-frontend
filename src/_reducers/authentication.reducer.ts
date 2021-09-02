import { authConstants, axiosConstants } from '../_constants'

const getUserData = (): string | boolean => {
  const s = localStorage.getItem(axiosConstants.USER_DATA_KEY)
  if (!s) return false

  return JSON.parse(s)
}

const user = getUserData()

const initialState = user ? { loggedIn: true, user } : {}

export function authentication(
  state = initialState,
  action: any
): any {
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
      console.log(user)

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
      localStorage.removeItem(axiosConstants.AUTH_KEY)
      localStorage.removeItem(axiosConstants.USER_DATA_KEY)

      return {}
    default:
      return state
  }
}
