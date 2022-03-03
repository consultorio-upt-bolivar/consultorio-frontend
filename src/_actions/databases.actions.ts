import { toastActions } from '.'

import { Dispatch } from 'redux'
import { handleError } from '../helpers/handleApiError'
import { getConfiguration } from '../config/api.config'

import { ActionFn } from '../interfaces/action.interface'
import { DatabasesApi } from '../_api'
import { databasesConstants } from '../_constants/databases.constants'
import { loadingActions } from './loading.actions'

const successMessages = {
  backupDatabase: 'Base de Datos respaldada!',
  restoreDatabase: 'Base de Datos restaurada!'
}

export const databasesActions = {
  clearState,
  backupDatabase,
  restoreDatabase
}

const constants = databasesConstants;

function clearState(): ActionFn {
  return () => {
    return { type: constants.CLEAR_STATE }
  }
}

function backupDatabase(showToast = true, cb: () => void): ActionFn {
  const api = new DatabasesApi(getConfiguration())

  return (dispatch: Dispatch) => {
    dispatch(request())

    api.backupDatabaseApi().then(
      (res: any) => {
        dispatch(success(res.data))

        if (showToast) {
          dispatch(toastActions.success(successMessages.backupDatabase))
        }

        if (cb) {
          cb()
        }
      },
      (error: Error) => {
        const errMessage = handleError(error)
        dispatch(failure(errMessage))
        dispatch(toastActions.error(errMessage))

        if (cb) cb();
      }
    )
  }

  function request() {
    return { type: constants.BACKUP_REQUEST }
  }
  function success(sql: string) {
    return { type: constants.BACKUP_SUCCESS, sql }
  }
  function failure(error: string) {
    return { type: constants.BACKUP_FAILURE, error }
  }
}

function restoreDatabase(file: any, showToast = true, callback: () => void): ActionFn {
  const conf = getConfiguration()

  return (dispatch: Dispatch) => {
    const onError = () => {
      dispatch(loadingActions.hide())
      dispatch(failure("Error al restaurar la base de datos!"));
      dispatch(toastActions.error("Error al restaurar la base de datos!"));
    }

    dispatch(request())

    dispatch(loadingActions.show())

    const formData = new FormData();

    formData.append('file', file);

    fetch(conf.basePath + '/databases/restore', {
      method: 'POST',
      body: formData,
      headers: conf.baseOptions.headers
    })
      .then((res) => {
        if (res.status != 200) {
          throw new Error("Restore database error!")
        }

        dispatch(success());

        if (showToast) {
          dispatch(toastActions.success(successMessages.restoreDatabase));
        }

        if (callback) {
          callback();
        }
      }, onError).catch(onError);
  }

  function request() {
    return { type: constants.RESTORE_REQUEST }
  }
  function success() {
    return { type: constants.RESTORE_SUCCESS }
  }
  function failure(error: string) {
    return { type: constants.RESTORE_FAILURE, error }
  }
}