import { INCREMENT, DECREMENT } from '../constants'

// 事实上，通常会将 reducer 和 action 合并到一起
export const createIncrementAction = data => ({ type: INCREMENT, data }) // 圆括号是为了返回对象
export const createDecrementAction = data => ({ type: DECREMENT, data })