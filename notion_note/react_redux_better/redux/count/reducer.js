import { INCREMENT, DECREMENT } from '../constants'

const initState = { count: 0 } // 初始化state的时候用0来初始化
// 形参的默认赋值，因为初始化的时候store传过来的preState是undefined，所以默认赋值initState
export default function countReducer(preState = initState, action) {
    const { type, data } = action
    // reducer中一般只保存基础操作，任何基于基础操作的操作都不应该写在reducer里
    switch (type) {
        case INCREMENT:
            return { count: preState.count + data } // 有return，就不需要break了
        case DECREMENT:
            return { count: preState.count - data }
        default:
            return preState
    }
}