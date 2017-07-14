import { combineReducers } from 'redux'
import auth from './auth'
import form from './form'
import router from './router'

export default combineReducers({
  auth,
  form,
  router
})
