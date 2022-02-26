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
            return {
                loading: false,
                items: action.data,
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
            return {
                loading: false
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