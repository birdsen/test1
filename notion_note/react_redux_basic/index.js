// react项目的入口文件

import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
// import store from './redux/store'

ReactDom.render(<App />, document.getElementById('root'))

// 下面的代码用于监听 redux 中 state 的变化，如果 redux 中状态发生了变化，就会重新 render
// 但是 react-redux 不需要监听，它能自动 render
// store.subscribe(() => {
//     ReactDom.render(<App />, document.getElementById('root'))
// })