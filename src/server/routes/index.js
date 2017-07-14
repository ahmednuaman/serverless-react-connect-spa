import auth from './auth'

export default (app) =>
  [
    auth
  ].map((routes) => routes(app))
