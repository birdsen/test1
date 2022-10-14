import React, { Component } from 'react'
import Count from './Count'
import store from './redux/store'
import { Provider } from "react-redux";

export default class App extends Component {
    render() {
        return (
            <div>
                {/* <Count store={store} /> 
                相比于上面的写法，下面这种可以保证Provider内的所有组件都能接收到 store */}
                <Provider store={store}>
                    <Count />
                </Provider>
            </div>
        )
    }
}
