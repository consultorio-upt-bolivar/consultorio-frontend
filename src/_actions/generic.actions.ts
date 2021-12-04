import { ActionModel, genericActionConstants } from '../_constants'
import { toastActions } from '.'

import { Dispatch } from 'redux'

import { PaginatedResponse } from '../_api'
import { GetALL } from '../common/interfaces/getAll.interface'
import { getConfiguration } from '../config/api.config'
import { ActionFn } from '../common/interfaces/action.interface'
import { handleError } from '../common/utils/handleApiError'
import { AppHistory } from '../helpers'
import { loadingActions } from './loading.actions'

interface GenericActionParams {
  model: ActionModel,
  Api: any,
  successMessages: {
    getAll: string
    getOne: string
    createOne: string
    updateOne: string
    deleteOne: string
    toggleActive: string
  }
}

export interface ActionOptions {
  toast?: string | false
  redirect?: string
  callback?: () => void
}

const handleOptions = (dispatch: Dispatch, defaultToastMessage: string, options?: ActionOptions) => {
  if (!options) return dispatch(toastActions.success(defaultToastMessage));

  const {
    toast,
    redirect,
    callback
  } = options;

  if (toast) {
    dispatch(toastActions.success(toast))
  } if (toast !== false) {
    dispatch(toastActions.success(defaultToastMessage))
  }

  if (redirect) {
    AppHistory.replace(redirect)
  }

  if (callback) {
    callback()
  }
}

export const GenericActions = ({
  model,
  Api,
  successMessages
}: GenericActionParams) => {
  const constants = genericActionConstants(model);

  function getAll(params: GetALL, options?: ActionOptions): ActionFn {
    const api = new Api(getConfiguration())

    return (dispatch: Dispatch) => {
      dispatch(request(params))
      dispatch(loadingActions.show())

      api[`getAll${model}`](params.limit, params.offset, params.where).then(
        (res: any) => {
          if (params.filter) {
            res.data.results = res.data.results.filter(params.filter)
          }

          dispatch(success(res.data))
          handleOptions(dispatch, successMessages.getAll, options)
        },
        (error: Error) => {
          const errMessage = handleError(error)
          dispatch(failure(errMessage))
          dispatch(toastActions.error(errMessage))
        }
      ).finally(() => setTimeout(() => dispatch(loadingActions.hide()), 1000))
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

  function getOne(id: number, options?: ActionOptions): ActionFn {
    const api = new Api(getConfiguration())

    return (dispatch: Dispatch) => {
      dispatch(request(id))

      api[`getOne${model}`](id).then(
        (res: any) => {
          dispatch(success(res.data))
          handleOptions(dispatch, successMessages.getOne, options)
        },
        (error: Error) => {
          const errMessage = handleError(error)
          dispatch(failure(errMessage))
          dispatch(toastActions.error(errMessage))
        }
      ).finally(() => setTimeout(() => dispatch(loadingActions.hide()), 1000))
    }

    function request(id: number) {
      return { type: constants.GET_REQUEST, id }
    }
    function success(data: any) {
      return { type: constants.GET_SUCCESS, data }
    }
    function failure(error: string) {
      return { type: constants.GET_FAILURE, error }
    }
  }

  function createOne(body: any, options?: ActionOptions): ActionFn {
    const api = new Api(getConfiguration())

    return (dispatch: Dispatch) => {
      dispatch(request())

      api[`create${model}`](body).then(
        (res: any) => {
          dispatch(success(res.data))
          handleOptions(dispatch, successMessages.createOne, options)
        },
        (error: Error) => {
          const errMessage = handleError(error)
          dispatch(failure(errMessage))
          dispatch(toastActions.error(errMessage))
        }
      ).finally(() => setTimeout(() => dispatch(loadingActions.hide()), 1000))
    }

    function request() {
      return { type: constants.CREATE_REQUEST }
    }
    function success(data: any) {
      return { type: constants.CREATE_SUCCESS, data }
    }
    function failure(error: string) {
      return { type: constants.CREATE_FAILURE, error }
    }
  }

  function updateOne(id: number, body: any, options?: ActionOptions): ActionFn {
    const api = new Api(getConfiguration())

    return (dispatch: Dispatch) => {
      dispatch(request(id))

      api[`update${model}`](id, body).then(
        (res: any) => {
          dispatch(success(res.data))

          dispatch(toastActions.success(JSON.stringify(options)))
          handleOptions(dispatch, successMessages.updateOne, options)
        },
        (error: Error) => {
          const errMessage = handleError(error)
          dispatch(failure(errMessage))
          dispatch(toastActions.error(errMessage))
        }
      ).finally(() => setTimeout(() => dispatch(loadingActions.hide()), 1000))
    }

    function request(id: number) {
      return { type: constants.UPDATE_REQUEST, id }
    }
    function success(data: any) {
      return { type: constants.UPDATE_SUCCESS, data }
    }
    function failure(error: string) {
      return { type: constants.UPDATE_FAILURE, error }
    }
  }

  function deleteOne(id: number, options?: ActionOptions): ActionFn {
    const api = new Api(getConfiguration())

    if (!api[`delete${model}`]) {
      throw Error('Method not implemented')
    }

    return (dispatch: Dispatch) => {
      dispatch(request(id))

      api[`delete${model}`](id).then(
        () => {
          dispatch(success(id))
          handleOptions(dispatch, successMessages.deleteOne, options)
        },
        (error: Error) => {
          const errMessage = handleError(error)
          dispatch(failure(errMessage))
          dispatch(toastActions.error(errMessage))
        }
      ).finally(() => setTimeout(() => dispatch(loadingActions.hide()), 1000))
    }

    function request(id: number) {
      return { type: constants.DELETE_REQUEST, id }
    }
    function success(id: number) {
      return { type: constants.DELETE_SUCCESS, id }
    }
    function failure(error: string) {
      return { type: constants.DELETE_FAILURE, error }
    }
  }

  function toggleActive(id: number, options?: ActionOptions): ActionFn {
    const api = new Api(getConfiguration())

    if (!api[`logicDisable${model}`]) {
      throw Error('Method not implemented')
    }

    return (dispatch: Dispatch) => {
      dispatch(request(id))

      api[`logicDisable${model}`](id).then(
        () => {
          dispatch(success(id))
          handleOptions(dispatch, successMessages.toggleActive, options)
        },
        (error: Error) => {
          const errMessage = handleError(error)
          dispatch(failure(errMessage))
          dispatch(toastActions.error(errMessage))
        }
      ).finally(() => setTimeout(() => dispatch(loadingActions.hide()), 1000))
    }

    function request(id: number) {
      return { type: constants.TOGGLE_ACTIVE_REQUEST, id }
    }
    function success(id: number) {
      return { type: constants.TOGGLE_ACTIVE_SUCCESS, id }
    }
    function failure(error: string) {
      return { type: constants.TOGGLE_ACTIVE_FAILURE, error }
    }
  }

  return {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    toggleActive
  }
}

