import React, { Component } from 'react'
import store from './store'


export class Count extends Component {
    componentDidMount() {
        // 如果没有 subscribe ，显示的求和结果不会更新，即redux的状态更新并不会主动驱动组件更新
        // 只要 redux 中的任何一 state 更新，都会调用下面的回调
        store.subscribe(() => {
            this.setState() // 虽然没有设置任何state，但是这仍然能引起重新render（render不能手动调用）
            // 调用 render 并不会导致效率低下的问题，因为diff算法在那呢（实际上setState后也会调render）
        })
    }
    handleIncrease = () => {
        store.dispatch({ type: 'increment', data: 1 })
    }
    handleDecrease = () => {
        store.dispatch({ type: 'decrement', data: 1 })
    }
    render() {
        return (
            <div>
                <h1>当前求和为：{store.getState().count}</h1>
                <button onClick={this.handleIncrease}>加1</button>
                <button onClick={this.handleDecrease}>减1</button>
            </div>
        )
    }
}
