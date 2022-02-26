import { toastActions } from '.'

import { Dispatch } from 'redux'
import { handleError } from '../helpers/handleApiError'
import { getConfiguration } from '../config/api.config'

import { ActionFn } from '../interfaces/action.interface'
import { StadisticsApi } from '../_api'
import { stadisticsConstants } from '../_constants/stadistics.constants'

export const stadisticsActions = {
  GetStadistics,
}

export interface SystemData {
  totalStudents: string;
  totalAdministratives: string;
  totalFamilies: string;
  totalSpecialists: string;
  totalUsers: string;
  totalOffices: string;
  totalSpecialities: string;
  attendedMedicalAppointments: string;
  cancelledMedicalAppointments: string;
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
      const { data: systemData } : any = await api.getSystemDataStadistics();

      const usersData = [
        {
          name: "Estudiantes",
          total: systemData.totalStudents
        },
        {
          name: "Personal universitario",
          total: systemData.totalAdministratives
        },
        {
          name: "Familiares",
          total: systemData.totalFamilies
        },
        {
          name: "Especialistas",
          total: systemData.totalSpecialists
        },
        {
          name: "Total usuarios",
          total: systemData.totalUsers
        }
      ]

      const generalData = [
        {
          name: "Consultorios médicos",
          total: systemData.totalOffices
        },
        {
          name: "Especialidades médicas",
          total: systemData.totalSpecialities
        },
        {
          name: "Citas médicas atendidas",
          total: systemData.attendedMedicalAppointments
        },
        {
          name: "Citas médicas canceladas",
          total: systemData.cancelledMedicalAppointments
        }
      ]

      dispatch({
        type: constants.GET_STADISTICS_SUCCESS, data: {
          refferedUsers,
          mostUsedSpecialities,
          usersData,
          generalData
        }
      })
    } catch (error) {
      const errMessage = handleError(error)
      dispatch({ type: constants.GET_STADISTICS_FAILURE, error: errMessage })
      dispatch(toastActions.error(errMessage))
    }
  }
}