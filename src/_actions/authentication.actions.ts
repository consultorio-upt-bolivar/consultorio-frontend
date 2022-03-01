import { authConstants } from '../_constants'
import { toastActions } from '.'

import { AppHistory } from '../helpers'

import { Dispatch } from 'redux'

import { AuthApi, PayloadDto, Roles, SigninDTO, UsersApi } from '../_api'
import { handleError } from '../helpers/handleApiError'
import { getConfiguration } from '../config/api.config'
import {
  getUserData,
  setAuthToken,
  setUserDataToken,
} from '../helpers/userStorage'
import { loadingActions } from './loading.actions'

export const authActions = {
  login,
  signin,
  getAuthData,
  logout,
  forgotPasswordMail,
  changePassword
}

function login(email: string, password: string): unknown {
  const auth = new AuthApi(getConfiguration())

  return async (dispatch: Dispatch) => {
    dispatch(request(email))

    try {
      dispatch(loadingActions.show());

      const res = await auth.loginAuth({
        email,
        password,
      })

      setAuthToken(res.data)
      await setAuthData()

      const data = getUserData()

      dispatch(success(data))

      switch (data.profile.id) {
        case Roles.Admin: {
          AppHistory.replace('/admin', {
            activeMenu: 'Dashboard',
          })
          break;
        }
        case Roles.Admin2: {
          AppHistory.replace('/admin', {
            activeMenu: 'Dashboard',
          })
          break;
        }
        case Roles.MedicalSpecialist: {
          AppHistory.replace('/especialista-dashboard')
          break;
        }
        default: {
          AppHistory.replace('/dashboard')
          break;
        }
      }
    } catch (error) {
      const errMessage = handleError(error, false)
      dispatch(failure(errMessage))
      dispatch(toastActions.error(errMessage))
    } finally {
      dispatch(loadingActions.hide());
    }
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

  return async (dispatch: Dispatch) => {
    dispatch(request(options))

    try {
      dispatch(loadingActions.show());

      const res = await auth.signinAuth(options)

      setAuthToken(res.data)
      await setAuthData()

      const data = getUserData()

      dispatch(success(data))

      switch (data.profile.id) {
        case Roles.Admin: {
          AppHistory.replace('/admin', {
            activeMenu: 'Dashboard',
          })
          break;
        }
        case Roles.Admin2: {
          AppHistory.replace('/admin', {
            activeMenu: 'Dashboard',
          })
          break;
        }
        case Roles.MedicalSpecialist: {
          AppHistory.replace('/especialista-dashboard')
          break;
        }
        default: {
          AppHistory.replace('/dashboard')
          break;
        }
      }
    } catch (error) {
      const errMessage = handleError(error)
      dispatch(failure(errMessage))
      dispatch(toastActions.error(errMessage))
    } finally {
      dispatch(loadingActions.hide());
    }
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

function getAuthData(noredirect = false): unknown {
  const auth = new AuthApi(getConfiguration())

  return async (dispatch: Dispatch) => {
    dispatch(request())

    try {
      dispatch(loadingActions.show());

      const res = await auth.getProfileAuth()

      setUserDataToken(res.data)
      dispatch(success(res.data))
    } catch (error) {
      const errMessage = handleError(error, noredirect)
      console.log(error)

      dispatch(failure(errMessage))
    } finally {
      dispatch(loadingActions.hide());
    }
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


function forgotPasswordMail(email: string): unknown {
  const auth = new UsersApi(getConfiguration())

  return async (dispatch: Dispatch) => {
    dispatch(request())

    try {
      dispatch(loadingActions.show());

      await auth.changePasswordMailUsers(email)
      dispatch(toastActions.success("Correo electrónico enviado!"))
      dispatch(success())
    } catch (error) {
      const errMessage = handleError(error)

      dispatch(failure(errMessage))
      dispatch(toastActions.error(errMessage))
    } finally {
      dispatch(loadingActions.hide());
    }
  }

  function request() {
    return { type: authConstants.SEND_MAIL_REQUEST }
  }
  function success() {
    return { type: authConstants.SEND_MAIL_SUCCESS }
  }
  function failure(error: string) {
    return { type: authConstants.SEND_MAIL_FAILURE, error }
  }
}


function changePassword(options: { email: string, token: string, password: string }): unknown {
  const auth = new UsersApi(getConfiguration())

  return async (dispatch: Dispatch) => {
    dispatch(request())

    try {
      await auth.updateForgottedPasswordUsers(options)
      dispatch(toastActions.success("Contraseña actualizada!"))
      dispatch(success())

      AppHistory.push('/login')
    } catch (error) {
      const errMessage = handleError(error)

      dispatch(failure(errMessage))
      dispatch(toastActions.error(errMessage))
    }
  }

  function request() {
    return { type: authConstants.CHANGE_PASSWORD_REQUEST }
  }
  function success() {
    return { type: authConstants.CHANGE_PASSWORD_SUCCESS }
  }
  function failure(error: string) {
    return { type: authConstants.CHANGE_PASSWORD_FAILURE, error }
  }
}