import { INCREMENT, DECREMENT } from './constants'

export const createIncrementAction = data => ({ type: INCREMENT, data }) // 圆括号是为了返回对象
export const createDecrementAction = data => ({ type: DECREMENT, data })