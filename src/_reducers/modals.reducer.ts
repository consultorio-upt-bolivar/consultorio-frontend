import { GetALL } from '../common/interfaces/getAll.interface'
import { genericActionConstants as constants } from '../_constants'

interface GenericStateAction {
  loading?: boolean
  updated?: boolean
  created?: boolean
  type?: string
  data?: any
  params?: GetALL
  items?: Array<any>
  id?: number
  error?: string
}

export function modals(
  state: GenericStateAction = {},
  action: GenericStateAction
): GenericStateAction {
  switch (action.type) {
    case constants.GET_ALL_REQUEST:
      return {
        loading: true,
        params: action.params,
      }
    case constants.GET_ALL_SUCCESS: {
      const { results: items, ...params } = action.data

      return {
        loading: false,
        params,
        items,
      }
    }
    case constants.GET_ALL_FAILURE:
      return {
        loading: false,
        updated: false,
        error: action.error,
      }

    case constants.GET_ONE_REQUEST:
      return {
        loading: true,
        id: action.id,
      }
    case constants.GET_ONE_SUCCESS:
      return {
        loading: false,
        data: action.data,
      }
    case constants.GET_ONE_FAILURE:
      return {
        loading: false,
        updated: false,
        error: action.error,
      }

    case constants.CREATE_REQUEST:
      return {
        loading: true,
      }
    case constants.CREATE_SUCCESS: {
      return {
        loading: false,
        created: true,
        data: action.data,
      }
    }
    case constants.CREATE_FAILURE:
      return {
        loading: false,
        updated: false,
        error: action.error,
      }

    case constants.UPDATE_REQUEST: {
      const { data } = state
      return {
        loading: true,
        id: action.id,
        data,
      }
    }
    case constants.UPDATE_SUCCESS: {
      return {
        loading: false,
        updated: true,
        data: action.data,
      }
    }
    case constants.UPDATE_FAILURE: {
      const { data } = state
      return {
        loading: false,
        error: action.error,
        data,
      }
    }

    case constants.DELETE_ONE_REQUEST: {
      const { params, items } = state

      return {
        loading: true,
        id: action.id,
        params,
        items,
      }
    }
    case constants.DELETE_ONE_SUCCESS: {
      const { params } = state
      const items = state.items?.filter((el: any) => el.id != action.id)
      return {
        loading: false,
        params,
        items,
      }
    }
    case constants.DELETE_ONE_FAILURE: {
      const { params, items } = state

      return {
        loading: false,
        error: action.error,
        params,
        items,
      }
    }
    default:
      return state
  }
}
