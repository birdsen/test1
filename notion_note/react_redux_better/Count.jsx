import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './count_store/connect_mapper'

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
                <button onClick={handleIncrease}>加1</button>
                <button onClick={handleDecrease}>减1</button>
            </div>
        )
    }
}

// 把 connect 移到这里，这样就不会出现文件数量翻倍的问题了
//（以前是2n个文件，2是因为每个组件都要写容器组件和UI组件，现在是n+1，1是connect_mapper.js）
export default connect(mapStateToProps, mapDispatchToProps)(Count)
