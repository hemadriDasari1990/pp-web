import Offline from 'offline-plugin/runtime'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { HashRouter as Router, browserHistory } from 'react-router-dom'
import { store } from './store'
import '../assets/css/app.css'
import App from './components/App'
import firebase from './firebase'
import * as serviceWorker from './serviceworker'

if (process.env.NODE_ENV === 'production') Offline.install()

export const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>
)

if (!module.hot) render(<Root />, document.querySelector('react'))

serviceWorker.unregister()
