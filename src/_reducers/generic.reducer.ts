import { GetALL } from '../common/interfaces/getAll.interface'
import { ActionModel, genericActionConstants } from '../_constants'

export interface GenericStateAction {
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

export function GenericReducer(model: ActionModel, actionModel?: string) {
    if (!actionModel) {
        actionModel = model;
    }

    const constants = genericActionConstants(actionModel);

    return (
        state: GenericStateAction = {},
        action: GenericStateAction
    ): GenericStateAction => {
        switch (action.type) {
            case constants.GET_ALL_REQUEST:
                return {
                    loading: true,
                    params: action.params,
                    items: state.items
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
                    items: state.items
                }

            case constants.GET_REQUEST:
                return {
                    loading: true,
                    id: action.id,
                    items: state.items
                }
            case constants.GET_SUCCESS:
                return {
                    loading: false,
                    data: action.data,
                    items: state.items
                }
            case constants.GET_FAILURE:
                return {
                    loading: false,
                    updated: false,
                    error: action.error,
                    items: state.items
                }

            case constants.CREATE_REQUEST:
                return {
                    loading: true,
                    items: state.items
                }
            case constants.CREATE_SUCCESS: {
                return {
                    loading: false,
                    created: true,
                    data: action.data,
                    items: state.items
                }
            }
            case constants.CREATE_FAILURE:
                return {
                    loading: false,
                    updated: false,
                    error: action.error,
                    items: state.items
                }

            case constants.UPDATE_REQUEST: {
                const { data } = state
                return {
                    loading: true,
                    id: action.id,
                    data,
                    items: state.items
                }
            }
            case constants.UPDATE_SUCCESS: {
                return {
                    loading: false,
                    updated: true,
                    data: action.data,
                    items: state.items
                }
            }
            case constants.UPDATE_FAILURE: {
                const { data } = state
                return {
                    loading: false,
                    error: action.error,
                    data,
                    items: state.items
                }
            }

            case constants.DELETE_REQUEST: {
                const { params, items } = state

                return {
                    loading: true,
                    id: action.id,
                    params,
                    items
                }
            }
            case constants.DELETE_SUCCESS: {
                const { params } = state
                const items = state.items?.filter((el: any) => el.id != action.id)
                return {
                    loading: false,
                    params,
                    items,
                }
            }
            case constants.DELETE_FAILURE: {
                const { params, items } = state

                return {
                    loading: false,
                    error: action.error,
                    params,
                    items,
                }
            }

            case constants.TOGGLE_ACTIVE_REQUEST: {
                const { params, items } = state

                return {
                    loading: true,
                    id: action.id,
                    params,
                    items,
                }
            }
            case constants.TOGGLE_ACTIVE_SUCCESS: {
                const { params } = state
                const items = state.items?.map((el: any) => {
                    if (el.id == action.id) {
                        el.isActive = !el.isActive;
                    }

                    return el
                })

                return {
                    loading: false,
                    params,
                    items,
                }
            }
            case constants.TOGGLE_ACTIVE_FAILURE: {
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
}
