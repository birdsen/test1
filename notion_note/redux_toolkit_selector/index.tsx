import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './app'
import { HashRouter } from 'react-router-dom'
import { MSSDK } from '../../utils/MSSDK'
import { AppContainer as ReactHotContainer } from 'react-hot-loader'
import { Fragment } from 'react'
import { setupDebugKeyMap } from '@/renderer/utils/debug/debugEntance'

ReactDom.render(
    <Provider store={store}>
        <HashRouter>
            {/* APP 这里就不写了。另外，上面的 HashRouter 是在客户端场景下用的，还没搞明白有啥用，暂且留着 */}
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('app')
)