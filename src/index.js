import Offline from 'offline-plugin/runtime'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import {
  HashRouter,
  BrowserRouter,
  browserHistory,
  hashHistory,
} from 'react-router-dom'
import { store } from './store'
import '../assets/css/app.scss'
import App from './components/App'
import * as serviceWorker from './serviceworker'

if (process.env.NODE_ENV === 'production') Offline.install()

export const Root = () => (
  <Provider store={store}>
    <HashRouter history={hashHistory}>
      <App />
    </HashRouter>
  </Provider>
)

if (!module.hot) render(<Root />, document.querySelector('react'))

serviceWorker.unregister()
