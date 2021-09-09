import { genericActionConstants as constants } from '../_constants'
import { toastActions } from '.'

import { Dispatch } from 'redux'

import { CreateModalDTO, ModalsApi, PaginatedResponse } from '../_api'
import { GetALL } from '../common/interfaces/getAll.interface'
import { getConfiguration } from '../config/api.config'
import { ActionFn } from '../common/interfaces/action.interface'
import { handleError } from '../common/utils/handleApiError'

export const modalsActions = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
}

function getAll(params: GetALL): ActionFn {
  const api = new ModalsApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(params))

    api.getAllModals(params.limit, params.offset, params.where).then(
      (res) => {
        dispatch(success(res.data))
        dispatch(toastActions.success('Modales obtenidos!'))
      },
      (error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))
      }
    )
  }

  function request(params: GetALL) {
    return { type: constants.GET_ALL_REQUEST, params }
  }
  function success(data: PaginatedResponse) {
    return { type: constants.GET_ALL_SUCCESS, data }
  }
  function failure(error: string) {
    return { type: constants.GET_ALL_FAILURE, error }
  }
}

function getOne(id: number): ActionFn {
  const api = new ModalsApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(id))

    api.getOneModals(id).then(
      (res) => {
        dispatch(success(res.data))
        dispatch(toastActions.success('Modal obtenido!'))
      },
      (error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))
      }
    )
  }

  function request(id: number) {
    return { type: constants.GET_ONE_REQUEST, id }
  }
  function success(data: CreateModalDTO) {
    return { type: constants.GET_ONE_SUCCESS, data }
  }
  function failure(error: string) {
    return { type: constants.GET_ONE_FAILURE, error }
  }
}

function createOne(body: CreateModalDTO): ActionFn {
  const api = new ModalsApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request())

    api.createModals(body).then(
      (res) => {
        dispatch(success(res.data))
        dispatch(toastActions.success('Modal creado!'))
      },
      (error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))
      }
    )
  }

  function request() {
    return { type: constants.CREATE_REQUEST }
  }
  function success(data: CreateModalDTO) {
    return { type: constants.CREATE_SUCCESS, data }
  }
  function failure(error: string) {
    return { type: constants.CREATE_FAILURE, error }
  }
}

function updateOne(id: number, body: CreateModalDTO): ActionFn {
  const api = new ModalsApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(id))

    api.updateModals(id, body).then(
      (res) => {
        dispatch(success(res.data))
        dispatch(toastActions.success('Modal actualizado!'))
      },
      (error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))
      }
    )
  }

  function request(id: number) {
    return { type: constants.UPDATE_REQUEST, id }
  }
  function success(data: CreateModalDTO) {
    return { type: constants.UPDATE_SUCCESS, data }
  }
  function failure(error: string) {
    return { type: constants.UPDATE_FAILURE, error }
  }
}

function deleteOne(id: number): ActionFn {
  const api = new ModalsApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(id))

    api.deleteModals(id).then(
      () => {
        dispatch(success(id))
        dispatch(toastActions.success('Modal eliminado!'))
      },
      (error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))
      }
    )
  }

  function request(id: number) {
    return { type: constants.UPDATE_REQUEST, id }
  }
  function success(id: number) {
    return { type: constants.UPDATE_SUCCESS, id }
  }
  function failure(error: string) {
    return { type: constants.UPDATE_FAILURE, error }
  }
}
