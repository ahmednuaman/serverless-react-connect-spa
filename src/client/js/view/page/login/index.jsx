import * as ROUTES from 'constant/routes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { login } from 'action/auth'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import React from 'react'
import LoginForm from './component/login-form'

@autobind
class Login extends React.Component {
  handleSubmit (values) {
    const {
      location,
      login
    } = this.props

    login(values, location.state)
  }

  render () {
    const {
      location,
      user
    } = this.props

    return !user
      ? <LoginForm onSubmit={this.handleSubmit} />
      : <Redirect
        to={{
          pathname: ROUTES.LOGIN,
          state: {
            from: location
          }
        }}
      />
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default connect(
  (state) => ({
    user: state.auth.user
  }),
  (dispatch) => ({
    login: bindActionCreators(login, dispatch)
  })
)(Login)
