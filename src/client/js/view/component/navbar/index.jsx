import { Navbar as BSNavbar } from 'react-bootstrap'
import React from 'react'
import NavbarMenu from './menu'

export default () => (
  <BSNavbar>
    <BSNavbar.Header>
      <BSNavbar.Brand>Penna</BSNavbar.Brand>
    </BSNavbar.Header>
    <NavbarMenu />
  </BSNavbar>
)
