import React, { useEffect } from 'react'
import { AppHistory } from '../helpers'

import { Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AlertModal from './components/modal'
import { AuthRoutes } from './auth/routes'
import { PublicRoutes, UserRoutes } from './public/routes'
import { AdminRoutes } from './admin/routes'
import { RoutesConfig } from '../interfaces/routesConfig.interface'
import { PrivateRoute } from './components/privateRoute'
import ToastMessage from './components/toast'
import { Roles } from '../_api'
import { Backdrop, CircularProgress, Theme } from '@mui/material'
import { authActions } from '../_actions'

import './App.css'

export function App(): React.ReactElement {
  const { show = false } = useSelector((state: any) => state.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.getAuthData(true))
  }, [])

  return (
    <div className="App">
      <div>
        <AlertModal />
        <ToastMessage />
        <Router history={AppHistory}>
          <Switch>
            {[...PublicRoutes, ...AuthRoutes].map((route: RoutesConfig) => {
              const {
                id,
                path,
                exact = false,
                component: Component,
                routes,
              } = route

              const key = id + '-route'

              return (
                <Route
                  key={key}
                  path={path}
                  exact={exact}
                  render={(props: any) => <Component {...props} routes={routes} />}
                />
              )
            })}

            {UserRoutes.map((route: RoutesConfig) => {
              const {
                id,
                path,
                exact = false,
                component: Component,
                routes,
                requiredRoles = []
              } = route

              const key = id + '-route'

              return (
                <PrivateRoute
                  routes={routes}
                  roles={requiredRoles}
                  key={key}
                  path={path}
                  exact={exact}
                  component={Component}
                />
              )
            })}

            {[...AdminRoutes].map((route: RoutesConfig) => {
              const {
                id,
                path,
                exact = false,
                component: Component,
                routes,
                requiredRoles = [],
              } = route

              const key = id + '-route'

              const roles = [Roles.Admin, Roles.Admin2, ...requiredRoles]

              return (
                <PrivateRoute
                  routes={routes}
                  roles={roles}
                  key={key}
                  path={path}
                  exact={exact}
                  component={Component}
                />
              )
            })}
          </Switch>
        </Router>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
          open={!!show}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  )
}
