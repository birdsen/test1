// 提供一个基础的 mapper，在 connect 的时候可以使用这里面提供的 mapper，也可以自己定义新的 mapper

import { createIncrementAction, createDecrementAction } from './action'

// 返回值作为传递给UI组件的state（react在调用该函数的时候已经把state传进去了，所以这里只需要接收一下即可）
export const mapStateToProps = state => ({
    count: state.count
})

// 返回值作为传递给UI组件的操作state的方法
// 有些简化的写法会把 mapDispatchToProps 写成一个键值对的对象，这时候也不需要使用 dispatch
export const mapDispatchToProps = dispatch => ({
    increase: () => { dispatch(createIncrementAction(1)) },
    decrease: () => { dispatch(createDecrementAction(1)) }
})