import { appointmentConstants } from "../_constants/appointment.constants";
import { GenericStateAction } from "./generic.reducer"

const constants = appointmentConstants;

export function appointments(
    state: GenericStateAction = {},
    action: GenericStateAction
): GenericStateAction {
    switch (action.type) {
        case constants.GET_AVALIABLE_DATES_REQUEST:
            return {
                loading: true,
                params: action.params,
            }
        case constants.GET_AVALIABLE_DATES_SUCCESS: {
            const { results: items, ...params } = action.data

            return {
                loading: false,
                params,
                items,
            }
        }
        case constants.GET_AVALIABLE_DATES_FAILURE:
            return {
                loading: false,
                updated: false,
                error: action.error,
            }

        case constants.CANCEL_REQUEST: {
            const { params, items } = state

            return {
                loading: true,
                params,
                items,
            }
        }
        case constants.CANCEL_SUCCESS: {
            const { params, data } = state

            const items = state.items?.map((el: any) => {
                if (el.id == data.id) {
                    el.isCancelled = data.reason;
                }

                return el
            })

            return {
                loading: false,
                params,
                items,
            }
        }
        case constants.CANCEL_FAILURE: {
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