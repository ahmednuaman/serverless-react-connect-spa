import { createStore } from 'redux'
import middleware from './middleware'
import reducers from './reducer'

export default createStore(reducers, middleware)
