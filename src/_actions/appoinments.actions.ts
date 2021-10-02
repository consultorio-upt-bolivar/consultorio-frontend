import { toastActions } from '.'

import { Dispatch } from 'redux'
import { handleError } from '../common/utils/handleApiError'
import { getConfiguration } from '../config/api.config'

import { ActionFn } from '../common/interfaces/action.interface'
import { MedicalAppointmentsApi, SchedulesApi } from '../_api'
import { appointmentConstants } from '../_constants/appointment.constants'

const successMessages = {
  getAvaliableDates: 'Fechas disponibles obtenidas!',
  cancelAppointment: 'Cita medica cancelada!'
}

export const appointmentsActions = {
  getAvaliableDates,
  cancelAppointment
}

const constants = appointmentConstants;

function getAvaliableDates(params: {
  dateFrom: string
  dateEnd: string
  specialityId: string
}): ActionFn {
  const api = new SchedulesApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request(params))

    api.getAvaliableDatesSchedules(params.dateFrom, params.dateEnd, params.specialityId).then(
      (res: any) => {
        dispatch(success(res.data))
        dispatch(toastActions.success(successMessages.getAvaliableDates))
      },
      (error: Error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))
      }
    )
  }

  function request(params: any) {
    return { type: constants.GET_AVALIABLE_DATES_REQUEST, params }
  }
  function success(data: any) {
    return { type: constants.GET_AVALIABLE_DATES_SUCCESS, data }
  }
  function failure(error: string) {
    return { type: constants.GET_AVALIABLE_DATES_FAILURE, error }
  }
}

function cancelAppointment(id: number, reason: string): ActionFn {
  const api = new MedicalAppointmentsApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request())

    api.cancelMedicalAppointments(id, {
      reason
    }).then(
      () => {
        dispatch(success({
          id,
          reason
        }))

        dispatch(toastActions.success(successMessages.cancelAppointment))
      },
      (error: Error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))
      }
    )
  }

  function request() {
    return { type: constants.CANCEL_REQUEST }
  }
  function success(data: any) {
    return { type: constants.CANCEL_SUCCESS, data }
  }
  function failure(error: string) {
    return { type: constants.CANCEL_FAILURE, error }
  }
}