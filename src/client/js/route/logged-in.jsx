import { Route } from 'react-router'
import React from 'react'
import Home from 'view/page/home'
import * as ROUTES from 'constant/routes'

export default () =>
  <Route>
    <Route path={ROUTES.ROOT} exact component={Home} />
  </Route>
