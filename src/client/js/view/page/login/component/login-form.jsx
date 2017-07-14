import * as FORMS from 'constant/forms'
import { Alert, Button, Col, Modal, Row } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import FormControl from 'view/component/form/form-control'

export const LoginForm = ({
  handleSubmit,
  submitting,
  invalid
}) => (
  <form onSubmit={handleSubmit}>
    <Modal.Body>
      <Row>
        <Col xs={8} xsPush={2}>
          {['Email', 'Password'].map((placeholder, i) => (
            <Field
              component={FormControl}
              key={i}
              name={placeholder.toLowerCase()}
              type={placeholder.toLowerCase()}
              placeholder={placeholder}
            />
          ))}
          {invalid &&
            <Alert bsStyle='danger'>Sorry, please try again</Alert>
          }
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Row>
        <Col xs={8} xsPush={2}>
          <Button
            type='submit'
            bsStyle='primary'
            disabled={submitting}
            className='btn-primary-outline'
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Modal.Footer>
  </form>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired
}

export default reduxForm({
  form: FORMS.LOGIN_FORM
})(LoginForm)
