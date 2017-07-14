import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import history from './history'
import * as api from 'js/redux/api'

export default applyMiddleware(thunk.withExtraArgument(api), history)
