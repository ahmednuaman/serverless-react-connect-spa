import { session } from 'middleware/auth'
import connect from 'connect'
import createResponse from 'helper/create-response'
import decorateRequest from 'helper/decorate-request'
import routes from './routes'

export const handler = ({ body }, context, done) => {
  const respond = (statusCode, body, error) =>
    done(error || statusCode === 500, {
      statusCode,
      body: JSON.stringify(body)
    })

  const handleResponse = (error) => {
    if (error) {
      respond(500, error, error)
    } else {
      respond(response.statusCode, {
        body: response._body,
        headers: response._headers
      })
    }
  }

  const app = connect()
  const request = decorateRequest(JSON.parse(body))
  let response = createResponse(handleResponse)

  console.log(request)

  app.use(session())

  routes(app)
  app(request, response, handleResponse)
}
