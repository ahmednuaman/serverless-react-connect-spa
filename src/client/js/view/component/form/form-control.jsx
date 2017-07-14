import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'
import React from 'react'

export default ({ input, label, meta, ...custom }) =>
  <FormGroup>
    <ControlLabel>{label || custom.placeholder}</ControlLabel>
    <FormControl
      {...custom}
      {...input}
    />
  </FormGroup>
