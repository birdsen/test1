import React, { Component } from 'react'

export default class Count extends Component {
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
