import Offline from 'offline-plugin/runtime'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { HashRouter, Router } from 'react-router-dom'
import { store } from './store'
import '../assets/css/app.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import App from './components/App'
import * as serviceWorker from './serviceworker'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

if (process.env.NODE_ENV === 'production') Offline.install()
export const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

if (!module.hot) render(<Root />, document.querySelector('react'))

serviceWorker.unregister()
