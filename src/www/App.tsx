import React, { useEffect } from 'react'
import { history } from '../helpers'
import { Router, Route } from 'react-router-dom'
import { HomePage } from './public/pages/home/home'
import { LoginPage } from './auth/pages/login/login'
import AlertModal from '../common/components/modal'
import { alertActions } from '../_actions'
import { useDispatch } from 'react-redux'

export function App(): React.ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen(() => {
      dispatch(alertActions.clear())
    })
  }, [])

  return (
    <div className="App">
      <Router history={history}>
        <AlertModal />
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    </div>
  )
}
