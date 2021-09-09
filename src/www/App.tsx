import React, { useEffect } from 'react'
import { AppHistory } from '../helpers'

import { Router, Route, Switch } from 'react-router-dom'

import { alertActions } from '../_actions'
import { useDispatch } from 'react-redux'

import AlertModal from '../common/components/modal'
import { AuthRoutes } from './auth/routes'
import { PublicRoutes } from './public/routes'
import { AdminRoutes } from './admin/routes'
import { RoutesConfig } from '../common/interfaces/routesConfig.interface'
import { PrivateRoute } from '../common/components/privateRoute'
import { NotFound } from '../common/components/notFound'
import ToastMessage from '../common/components/toast'

export function App(): React.ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    AppHistory.listen(() => {
      dispatch(alertActions.clear())
    })
  }, [])

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

          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  )
}
