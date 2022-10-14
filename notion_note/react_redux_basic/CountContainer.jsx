// 容器组件，用来包裹UI组件--Count，为Count提供redux操作能力

// import store from './store' // 容器组件需要 store ，但是不是直接引入的，而是由其调用者（App.jsx）传过来的
import CountUI from './Count'
import { connect } from 'react-redux'
import { createIncrementAction, createDecrementAction } from './redux/count_action'

// 返回值作为传递给UI组件的state（react在调用该函数的时候已经把state传进去了，所以这里只需要接收一下即可）
function mapStateToProps(state) {
    return { count: state.count }
}

// 返回值作为传递给UI组件的操作state的方法
function mapDispatchToProps(dispatch) {
    return {
        increase: () => { dispatch(createIncrementAction(1)) },
        decrease: () => { dispatch(createDecrementAction(1)) }
    }
}

/**
 * 关于 connect
 * 1、connect用于连接UI组件和redux
 * 2、可以看到connect后跟了两个括号，这证明第一个括号调用结束后返回的是一个函数，所以才能有两个括号
 *      第一个括号用于和 redux 做关联，第二个括号用于和包裹的 UI 组件做关联。
 * 3、connect调用之后返回的是一个组件，你可以像常规组件一样使用该组件
 */
const CountContainer = connect(mapStateToProps, mapDispatchToProps)(CountUI)

export default CountContainer
// 常见的是这种简化的写法：export default connect(xxx)(xxx)