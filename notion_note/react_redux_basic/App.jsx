import React, { Component } from 'react'
import Count from './CountContainer'
import store from './store'
import { Provider } from "react-redux";

export default class App extends Component {
    render() {
        return (
            <div>
                {/* 容器组件需要 store ，但是不是直接引入的，而是由其调用者传过来的*/}
                <Count store={store} />
                {/* 通常会在外面包裹一层 Provider，如下所示 */}
                {/* <Provider store={store}><Count /></Provider> */}
            </div>
        )
    }
}
