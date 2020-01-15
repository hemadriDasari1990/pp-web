import Offline from 'offline-plugin/runtime'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { BrowserRouter, browserHistory } from 'react-router-dom'
import { store } from './store'
import '../assets/css/app.css'
import App from './components/App'
import firebase from './firebase'
import * as serviceWorker from './serviceworker'

if (process.env.NODE_ENV === 'production') Offline.install()

export const Root = () => (
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <App />
    </BrowserRouter>
  </Provider>
)

if (!module.hot) render(<Root />, document.querySelector('react'))

serviceWorker.unregister()
