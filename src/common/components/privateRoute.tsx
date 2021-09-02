import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { axiosConstants } from '../../_constants';

export const PrivateRoute = ({ component: Component, ...rest } : any) : React.ReactElement => (
    <Route {...rest} render={props => (
        localStorage.getItem(axiosConstants.USER_DATA_KEY)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)