import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Roles } from '../../_api'
import { getToken, getUserData } from '../utils/userStorage'

export const PrivateRoute = ({
  path,
  exact,
  roles,
  component: Component,
  routes = [],
}: any) => {
  console.log({
    path,
    exact,
    routes,
  })

  const auth = getToken()
  const userData = getUserData()
  const isOkStorage = auth && userData
  const hasPremissions = roles.find((el: Roles) => el == userData.profile.id)

  const redirect = !(isOkStorage && hasPremissions)

  return redirect ? (
    <Redirect to={{ pathname: '/login' }} />
  ) : (
    <Route
      path={path}
      exact={exact}
      render={(props) => <Component {...props} routes={routes} />}
    />
  )
}
