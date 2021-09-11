import { authConstants } from '../_constants'
import { alertActions, toastActions } from '.'

import { AppHistory } from '../helpers'

import { Dispatch } from 'redux'

import { AuthApi, PayloadDto, Roles, SigninDTO } from '../_api'
import { handleError } from '../common/utils/handleApiError'
import { getConfiguration } from '../config/api.config'
import {
  getUserData,
  setAuthToken,
  setUserDataToken,
} from '../common/utils/userStorage'

export const authActions = {
  login,
  signin,
  getAuthData,
  logout,
}

function login(email: string, password: string): unknown {
  const auth = new AuthApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(email))

    auth
      .loginAuth({
        email,
        password,
      })
      .then((res) => {
        setAuthToken(res.data)

        return setAuthData().then(() => {
          const data = getUserData()

          dispatch(success(data))

          if (
            data.profile.id == Roles.Admin ||
            data.profile.id == Roles.Admin2
          ) {
            AppHistory.push('/admin', {
              activeMenu: 'Dashboard',
            })
          } else {
            AppHistory.push('/')
          }
        })
      })
      .catch((error) => {
        const errMessage = handleError(error)

        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))
      })
  }

  function request(user: string) {
    return { type: authConstants.LOGIN_REQUEST, user }
  }
  function success(user: PayloadDto) {
    return { type: authConstants.LOGIN_SUCCESS, user }
  }
  function failure(error: string) {
    return { type: authConstants.LOGIN_FAILURE, error }
  }
}

function signin(options: SigninDTO): unknown {
  const auth = new AuthApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(options))

    auth
      .signinAuth(options)
      .then((res) => {
        setAuthToken(res.data)

        return setAuthData().then(() => {
          const data = getUserData()

          dispatch(success(data))

          if (
            data.profile.id == Roles.Admin ||
            data.profile.id == Roles.Admin2
          ) {
            AppHistory.push('/admin', {
              activeMenu: 'Dashboard',
            })
          } else {
            AppHistory.push('/')
          }
        })
      })
      .catch((error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))
      })
  }

  function request(user: SigninDTO) {
    return { type: authConstants.SIGNIN_REQUEST, user }
  }
  function success(user: PayloadDto) {
    return { type: authConstants.SIGNIN_SUCCESS, user }
  }
  function failure(error: string) {
    return { type: authConstants.SIGNIN_FAILURE, error }
  }
}

async function setAuthData() {
  const auth = new AuthApi(getConfiguration())

  const res = await auth.getProfileAuth()

  setUserDataToken(res.data)

  return res.data
}

function getAuthData(): unknown {
  const auth = new AuthApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request())

    auth
      .getProfileAuth()
      .then((res) => {
        setUserDataToken(res.data)
        dispatch(success(res.data))
      })
      .catch((error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))
      })
  }

  function request() {
    return { type: authConstants.GET_DATA_REQUEST }
  }
  function success(user: PayloadDto) {
    return { type: authConstants.GET_DATA_SUCCESS, user }
  }
  function failure(error: string) {
    return { type: authConstants.GET_DATA_FAILURE, error }
  }
}

function logout(): unknown {
  return { type: authConstants.LOGOUT }
}
