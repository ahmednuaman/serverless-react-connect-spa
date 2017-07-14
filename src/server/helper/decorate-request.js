import _ from 'lodash'

export default (input) => {
  const request = _.defaults(input, {
    headers: {},
    url: '/'
  })

  if (!request.url.startsWith('/')) {
    request.url = `/${request.url}`
  }

  return request
}
