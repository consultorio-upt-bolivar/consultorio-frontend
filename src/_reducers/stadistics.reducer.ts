import { stadisticsConstants } from "../_constants/stadistics.constants";

const constants = stadisticsConstants;

export function stadistics(
    state: any = {},
    action: any
): any {
    switch (action.type) {
        case constants.GET_STADISTICS_REQUEST:
            return {
                loading: true,
                params: action.params
            }
        case constants.GET_STADISTICS_SUCCESS: {
            return {
                loading: false,
                ...action.data
            }
        }
        case constants.GET_STADISTICS_FAILURE:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}