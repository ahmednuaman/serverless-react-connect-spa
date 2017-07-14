import { Provider } from 'react-redux'
import React from 'react'
import Routes from './routes'
import store from 'js/redux/store'

export default () =>
  <Provider store={store}>
    <Routes />
  </Provider>
