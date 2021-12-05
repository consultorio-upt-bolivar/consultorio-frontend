import { toastActions } from '.'

import { Dispatch } from 'redux'
import { handleError } from '../common/utils/handleApiError'
import { getConfiguration } from '../config/api.config'

import { ActionFn } from '../common/interfaces/action.interface'
import { StadisticsApi } from '../_api'
import { stadisticsConstants } from '../_constants/stadistics.constants'

export const stadisticsActions = {
  GetStadistics,
}

const constants = stadisticsConstants;

function GetStadistics(params: {
  dateFrom: string
  dateEnd: string
}): ActionFn {
  const api = new StadisticsApi(getConfiguration())

  return async (dispatch: Dispatch) => {
    dispatch({ type: constants.GET_STADISTICS_REQUEST, params })

    try {
      const { data: refferedUsers } = await api.getRefferedUsersStadistics(params.dateFrom, params.dateEnd)
      const { data: mostUsedSpecialities } = await api.getMostUsedSpecialitiesStadistics(params.dateFrom, params.dateEnd)

      dispatch({
        type: constants.GET_STADISTICS_SUCCESS, data: {
          refferedUsers,
          mostUsedSpecialities
        }
      })
    } catch (error) {
      const errMessage = handleError(error)
      dispatch({ type: constants.GET_STADISTICS_FAILURE, error: errMessage })
      dispatch(toastActions.error(errMessage))
    }
  }
}