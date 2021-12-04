import React, { useEffect } from 'react'
import { AppHistory } from '../helpers'

import { Router, Route, Switch } from 'react-router-dom'

import { alertActions } from '../_actions'
import { useDispatch, useSelector } from 'react-redux'

import AlertModal from '../common/components/modal'
import { AuthRoutes } from './auth/routes'
import { PublicRoutes, UserRoutes } from './public/routes'
import { AdminRoutes } from './admin/routes'
import { RoutesConfig } from '../common/interfaces/routesConfig.interface'
import { PrivateRoute } from '../common/components/privateRoute'
import { NotFound } from '../common/components/notFound'
import ToastMessage from '../common/components/toast'
import { Roles } from '../_api'
import { Backdrop } from '@mui/material'
import { CircularProgress } from '@material-ui/core'

export function App(): React.ReactElement {
  const { show } = useSelector((state: any) => state.loading)

  return (
    <div className="App">
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
                render={(props: any) => (
                  <Component {...props} routes={routes} />
                )}
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

          <Route path="*" component={NotFound} />
        </Switch>
      </Router>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={show}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
