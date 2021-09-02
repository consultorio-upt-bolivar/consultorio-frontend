import { userConstants } from '../_constants';

export function users(state = {}, action: any) {
  switch (action.type) {
    case userConstants.GET_ALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_ALL_SUCCESS:
      return {
        items: action.data
      };
    case userConstants.GET_ALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}