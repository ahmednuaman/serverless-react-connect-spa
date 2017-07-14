import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { logout } from 'action/auth'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import React from 'react'

@autobind
class Menu extends React.Component {
  render () {
    const {
      logout,
      user
    } = this.props

    return (
      <Navbar.Collapse>
        <Nav pullRight>
          {user &&
            <NavItem eventKey={1} onClick={logout}>Log out</NavItem>
          }
        </Nav>
      </Navbar.Collapse>
    )
  }
}

Menu.propTypes = {
  user: PropTypes.object
}

export default connect(
  (state) => ({
    user: state.auth.user
  }),
  (dispatch) => ({
    logout: bindActionCreators(logout, dispatch)
  })
)(Menu)
