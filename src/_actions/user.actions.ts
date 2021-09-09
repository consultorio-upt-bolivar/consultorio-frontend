import { genericActionConstants as constants } from '../_constants'
import { alertActions } from '.'

import { Dispatch } from 'redux'

import {
  CreateUserDTO,
  UsersApi,
  PaginatedResponse,
  CreateUserResponse,
} from '../_api'
import { GetALL } from '../common/interfaces/getAll.interface'
import { getConfiguration } from '../config/api.config'
import { ActionFn } from '../common/interfaces/action.interface'

export const userActions = {
  getAll,
  getOne,
  updateOne,
  disableOne,
}

function getAll(params: GetALL): ActionFn {
  const api = new UsersApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(params))

    api.getAllUsers(params.limit, params.offset, params.where).then(
      (res) => {
        dispatch(success(res.data))
      },
      (error) => {
        dispatch(failure(error))
        dispatch(alertActions.error(error))
      }
    )
  }

  function request(params: GetALL) {
    return { type: constants.GET_ALL_REQUEST, params }
  }
  function success(data: PaginatedResponse) {
    return { type: constants.GET_ALL_SUCCESS, data }
  }
  function failure(error: Error) {
    return { type: constants.GET_ALL_FAILURE, error }
  }
}

function getOne(id: number): ActionFn {
  const api = new UsersApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(id))

    api.getOneUsers(id).then(
      (res) => {
        dispatch(success(res.data))
      },
      (error) => {
        dispatch(failure(error))
        dispatch(alertActions.error(error))
      }
    )
  }

  function request(id: number) {
    return { type: constants.GET_ONE_REQUEST, id }
  }
  function success(data: CreateUserDTO) {
    return { type: constants.GET_ONE_SUCCESS, data }
  }
  function failure(error: Error) {
    return { type: constants.GET_ONE_FAILURE, error }
  }
}

function updateOne(id: number, body: CreateUserDTO): ActionFn {
  const api = new UsersApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(id))

    api.updateUsers(id, body).then(
      (res) => {
        dispatch(success(res.data))
      },
      (error) => {
        dispatch(failure(error))
        dispatch(alertActions.error(error))
      }
    )
  }

  function request(id: number) {
    return { type: constants.UPDATE_REQUEST, id }
  }
  function success(data: CreateUserResponse) {
    return { type: constants.UPDATE_SUCCESS, data }
  }
  function failure(error: Error) {
    return { type: constants.UPDATE_FAILURE, error }
  }
}

function disableOne(id: number): ActionFn {
  const api = new UsersApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(id))

    api.logicalDisableUsers(id).then(
      () => {
        dispatch(success(id))
      },
      (error) => {
        dispatch(failure(error))
        dispatch(alertActions.error(error))
      }
    )
  }

  function request(id: number) {
    return { type: constants.TOGGLE_ACTIVE_REQUEST, id }
  }
  function success(id: number) {
    return { type: constants.TOGGLE_ACTIVE_SUCCESS, id }
  }
  function failure(error: Error) {
    return { type: constants.TOGGLE_ACTIVE_FAILURE, error }
  }
}
