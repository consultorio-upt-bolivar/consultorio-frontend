export type ActionModel = 'Modals' | 'Users' | 'Offices' | 'Specialities' | 'Schedules' | 'MedicalAppointments'

export const genericActionConstants = (model: string) => {
  const upperCaseModel = model.toUpperCase();

  return {
    GET_ALL_REQUEST: `GET_ALL_${upperCaseModel}_REQUEST`,
    GET_ALL_SUCCESS: `GET_ALL_${upperCaseModel}_SUCCESS`,
    GET_ALL_FAILURE: `GET_ALL_${upperCaseModel}_FAILURE`,

    GET_REQUEST: `GET_${upperCaseModel}_REQUEST`,
    GET_SUCCESS: `GET_${upperCaseModel}_SUCCESS`,
    GET_FAILURE: `GET_${upperCaseModel}_FAILURE`,

    CREATE_REQUEST: `CREATE_${upperCaseModel}_REQUEST`,
    CREATE_SUCCESS: `CREATE_${upperCaseModel}_SUCCESS`,
    CREATE_FAILURE: `CREATE_${upperCaseModel}_FAILURE`,

    UPDATE_REQUEST: `UPDATE_${upperCaseModel}_REQUEST`,
    UPDATE_SUCCESS: `UPDATE_${upperCaseModel}_SUCCESS`,
    UPDATE_FAILURE: `UPDATE_${upperCaseModel}_FAILURE`,

    TOGGLE_ACTIVE_REQUEST: `TOGGLE_ACTIVE_${upperCaseModel}_REQUEST`,
    TOGGLE_ACTIVE_SUCCESS: `TOGGLE_ACTIVE_${upperCaseModel}_SUCCESS`,
    TOGGLE_ACTIVE_FAILURE: `TOGGLE_ACTIVE_${upperCaseModel}_FAILURE`,

    DELETE_REQUEST: `DELETE_${upperCaseModel}_REQUEST`,
    DELETE_SUCCESS: `DELETE_${upperCaseModel}_SUCCESS`,
    DELETE_FAILURE: `DELETE_${upperCaseModel}_FAILURE`,
  }
}
