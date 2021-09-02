import { userConstants } from '../_constants';
import { alertActions } from '.';

import { Dispatch } from 'redux';

import { CreateUserDTO, UsersApi } from '../_services/api';
import httpClient from '../helpers/axios';
import { GetALL } from '../common/interfaces/getAll.interface';

export const userActions = {
    getAll
};

const api = new UsersApi(undefined, '', httpClient);

function getAll(params: GetALL) {
    return (dispatch: Dispatch) => {
        dispatch(request(params));

        api.getAllUsers(params.limit, params.offset, params.where)
        .then(
            (res) => {
                dispatch(success(res.data));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request(params: GetALL) { return { type: userConstants.GET_ALL_REQUEST, params } }
    function success(data: CreateUserDTO[]) { return { type: userConstants.GET_ALL_SUCCESS, data } }
    function failure(error: Error) { return { type: userConstants.GET_ALL_FAILURE, error } }
}