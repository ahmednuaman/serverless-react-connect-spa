import response from 'express/lib/response'

export default (done) => {
  response._headers = {}
  response._headerNames = {}
  response._removedHeader = {}

  response.end = (body) => {
    response._body = body
    done()
  }

  response.json = (obj) => response.end(obj)
  response.send = (msg) => response.end(msg)

  return response
}
