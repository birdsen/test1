import { createStore } from 'redux'
import countReducer from './reducer'

const store = createStore(countReducer)  // reducer归store管，所以这里要把reducer交给store

export default store