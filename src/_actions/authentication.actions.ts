import { authConstants, axiosConstants } from '../_constants'
import { alertActions } from '.'

import { history } from '../helpers'

import { Dispatch } from 'redux'

import { AuthApi, PayloadDto, SigninDTO } from '../_services/api'
import { handleError } from '../common/utils/handleApiError'
import { getConfiguration } from '../config/api.config'

export const authActions = {
  login,
  signin,
  getAuthData,
  logout,
}

const auth = new AuthApi(getConfiguration())

function login(user: string, password: string): unknown {
  return (dispatch: Dispatch) => {
    dispatch(request(user))

    auth
      .loginAuth({
        email: user,
        password,
      })
      .then((res) => {
        localStorage.setItem(axiosConstants.AUTH_KEY, JSON.stringify(res.data))

        setAuthData().then((res) => {
          history.push('/')
          success(res)
        })
      })
      .catch((error) => {
        const errMessage = handleError(error)

        dispatch(failure(errMessage))
        dispatch(alertActions.error(errMessage))
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
  return (dispatch: Dispatch) => {
    dispatch(request(options))

    auth
      .signinAuth(options)
      .then((res) => {
        localStorage.setItem(axiosConstants.AUTH_KEY, JSON.stringify(res.data))

        setAuthData().then((res) => {
          history.push('/')
          success(res)
        })
      })
      .catch((error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(alertActions.error(errMessage))
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
  const res = await auth.getProfileAuth()
  localStorage.setItem(axiosConstants.USER_DATA_KEY, JSON.stringify(res.data))
  return res.data
}

function getAuthData(): unknown {
  return (dispatch: Dispatch) => {
    dispatch(request())

    auth
      .getProfileAuth()
      .then((res) => {
        localStorage.setItem(
          axiosConstants.USER_DATA_KEY,
          JSON.stringify(res.data)
        )
        dispatch(success(res.data))
      })
      .catch((error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(alertActions.error(errMessage))
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
