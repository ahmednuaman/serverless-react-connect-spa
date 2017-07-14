import { compose } from 'compose-middleware'
import * as authMiddleware from 'middleware/auth'
import * as authPath from 'path/auth'

export default (app) => {
  app.use('/auth/login', compose([
    authMiddleware.isLoggedOut,
    authMiddleware.authenticate,
    authPath.login
  ]))

  app.use('/auth/logout', compose([
    authMiddleware.isLoggedIn,
    authMiddleware.logout,
    authPath.logout
  ]))

  app.use('/auth/logged-in', compose([
    authMiddleware.isLoggedIn,
    authPath.login
  ]))
}
