import * as AUTH_ACTIONS from 'action/auth'
import * as ROUTES from 'constant/routes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Redirect, Route, Switch } from 'react-router'
import { history } from 'js/redux/middleware/history'
import PropTypes from 'prop-types'
import React from 'react'
import LoggedInRoutes from './logged-in'
import Login from 'view/page/login'
import Navbar from 'view/component/navbar'

class Routes extends React.Component {
  componentWillMount () {
    this.props.autoLoginCheck()
  }

  render () {
    const {
      autoLoginCheckCompleted,
      location,
      user
    } = this.props

    return (
      <ConnectedRouter history={history}>
        {autoLoginCheckCompleted &&
          <div>
            <Navbar />
            <Switch>
              <Route path={ROUTES.LOGIN} exact component={Login} />
              <Route>
                {user
                  ? <LoggedInRoutes />
                  : <Redirect
                    to={{
                      pathname: ROUTES.LOGIN,
                      state: {
                        from: location
                      }
                    }}
                  />
                }
              </Route>
            </Switch>
          </div>
        }
      </ConnectedRouter>
    )
  }
}

Routes.propTypes = {
  autoLoginCheck: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default connect(
  (state) => ({
    autoLoginCheckCompleted: state.auth.autoLoginCheckCompleted,
    user: state.auth.user
  }),
  (dispatch) => ({
    autoLoginCheck: bindActionCreators(AUTH_ACTIONS.autoLoginCheck, dispatch)
  })
)(Routes)
