import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createIncrementAction, createDecrementAction } from './redux/count/action'

class Count extends Component {
    handleIncrease = () => {
        this.props.increase()
    }
    handleDecrease = () => {
        this.props.decrease()
    }
    render() {
        return (
            <div>
                <h1>当前求和为：{this.props.count}</h1>
                <button onClick={this.handleIncrease}>加1</button>
                <button onClick={this.handleDecrease}>减1</button>
            </div>
        )
    }
}

// 这两个mapper应该写在组件里，而不是独立出去，因为mapper是服务于组件的，组件根据需求来获取和修改某几个state
export const mapStateToProps = state => ({
    count: state.countState.count // **因为combineReducers，所以这里把 state.count 改成了 state.countState.count **
    // 基于此，也就看到了，当组件需要的state不止这里写的这一个的时候，这里就需要灵活配置
})

// 返回值作为传递给UI组件的操作state的方法
// 有些简化的写法会把 mapDispatchToProps 写成一个键值对的对象，这时候也不需要使用 dispatch
export const mapDispatchToProps = dispatch => ({
    increase: () => { dispatch(createIncrementAction(1)) },
    decrease: () => { dispatch(createDecrementAction(1)) }
})

// 把 connect 移到这里，这样就不会出现文件数量翻倍的问题了
//（以前是2n个文件，2是因为每个组件都要写容器组件和UI组件，现在是n）
export default connect(mapStateToProps, mapDispatchToProps)(Count)
