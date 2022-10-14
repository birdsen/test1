import { createStore, combineReducers } from 'redux'
import countReducer from './count/reducer'

/**
 * combineReducers用于结合多个reducer。
 * 一旦 createStore 传入的是这种结合后的 reducer，就需要把 connect 中的 mapStateToProps 也改了，
 * 因为原来 redux 中存的就是 countReducer 的 state ，现在有多个 reducer，所以需要在原来的基础上包一层，
 * 那你取用 state 的时候就得再深入一层拿到相应 reducer 的 state。（其余部分无需改动）
 */
const allReducer = combineReducers({
    countState: countReducer,
    xxxState: xxxReducer, // fake 的数据
})

const store = createStore(allReducer)

export default store