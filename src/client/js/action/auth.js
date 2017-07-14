import * as AUTH from 'constant/auth'
import * as AUTH_ACTION from 'constant/auth-action'
import * as FORMS from 'constant/forms'
import * as ROUTES from 'constant/routes'
import { createAction } from 'redux-actions'
import { history } from 'js/redux/middleware/history'
import { replace, push } from 'react-router-redux'
import { startSubmit, stopSubmit } from 'redux-form'
import localStorage from 'local-storage'

export const updateAuthState = createAction(AUTH_ACTION.UPDATE_AUTH_STATE)
export const userLoggedOut = createAction(AUTH_ACTION.USER_LOGGED_OUT)

export const autoLoginCheck = () => async (dispatch, getState, api) => {
  const sessionId = localStorage.get(AUTH.AUTH_SESSION_STORAGE_KEY)
  let user

  try {
    user = await api.loggedIn(sessionId)
  } catch (error) {
    console.log(error)
  }

  if (user) {
    if (history.location.pathname === ROUTES.LOGIN) {
      history.push(ROUTES.ROOT)
    }
  }

  dispatch(updateAuthState({
    user,
    autoLoginCheckCompleted: true
  }))
}

export const login = (values, locationState) => (dispatch, getState, api) => {
  dispatch(startSubmit(FORMS.LOGIN_FORM))

  return new Promise(async (resolve, reject) => {
    if (values.email && values.password) {
      try {
        const response = await api.login(values.email, values.password)

        localStorage.set(AUTH.AUTH_SESSION_STORAGE_KEY, response.headers.session)

        dispatch(updateAuthState({
          user: response.body
        }))

        dispatch(replace(getRedirectLocation(locationState)))
      } catch (error) {
        dispatch(stopSubmit(FORMS.LOGIN_FORM, { error }))
        reject(error)
      }
    } else {
      const error = 'Missing email and/or password'

      reject(new Error(error))
    }
  })
}

export const logout = () => {
  return async (dispatch, getState, api) => {
    try {
      await api.logout()

      localStorage.remove(AUTH.AUTH_SESSION_STORAGE_KEY)

      dispatch(userLoggedOut())
      dispatch(push(ROUTES.LOGIN, {
        from: ROUTES.ROOT
      }))
    } catch (error) {
      console.log('logout', error)
    }
  }
}

const getRedirectLocation = (locationState) =>
  locationState && locationState.from && !locationState.from.startsWith(ROUTES.LOGIN)
    ? locationState.from
    : ROUTES.ROOT
