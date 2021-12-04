import { databasesConstants } from "../_constants/databases.constants";

const constants = databasesConstants;

export function databases(
    state: any = {},
    action: any = {}
): any {
    switch (action.type) {
        case constants.CLEAR_STATE:
            return {}
        case constants.BACKUP_REQUEST:
            return {
                loading: false,
            }
        case constants.BACKUP_SUCCESS: {
            const { sql } = action

            return {
                loading: false,
                backupSuccess: true,
                sql
            }
        }
        case constants.BACKUP_FAILURE:
            return {
                loading: false,
                error: action.error
            }
        case constants.RESTORE_REQUEST:
            return {
                loading: true,
            }

        case constants.RESTORE_SUCCESS:
            return {
                loading: false,
                retoreSuccess: true
            }
        case constants.RESTORE_FAILURE:
            return {
                loading: false,
                error: action.error
            }

        default:
            return state
    }
}