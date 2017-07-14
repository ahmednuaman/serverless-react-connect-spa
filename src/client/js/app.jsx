import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import React from 'react'
import Routes from './route'

render(
  <AppContainer>
    <Routes />
  </AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept()
}
