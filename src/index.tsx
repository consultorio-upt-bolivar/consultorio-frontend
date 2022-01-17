import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './helpers'

import reportWebVitals from './reportWebVitals'

import theme, { themeV4 } from './theme/main'

import { App } from './www/App'

import { ThemeProvider as ThemeProviderV5 } from '@mui/material/styles';
import { ThemeProvider as ThemeProviderV4, StylesProvider } from '@material-ui/core/styles';
import { createGenerateClassName } from '@material-ui/core/styles';
import { CssBaseline } from '@mui/material'

const generateClassName = createGenerateClassName({
  // By enabling this option, if you have non-MUI elements (e.g. `<div />`)
  // using MUI classes (e.g. `.MuiButton`) they will lose styles.
  // Make sure to convert them to use `styled()` or `<Box />` first.
  disableGlobal: true,
  // Class names will receive this seed to avoid name collisions.
  seed: 'mui-jss',
});

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProviderV4 theme={themeV4}>
        <ThemeProviderV5 theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProviderV5>
      </ThemeProviderV4>
    </StylesProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
