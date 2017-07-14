import * as AUTH_ACTION from 'constant/auth-action'
import { handleActions } from 'redux-actions'

const initialState = {
  autoLoginCheckCompleted: false,
  user: null
}

export default
  handleActions({
    [AUTH_ACTION.UPDATE_AUTH_STATE]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [AUTH_ACTION.USER_LOGGED_OUT]: () => ({
      ...initialState,
      autoLoginCheckCompleted: true
    })
  }, initialState)
