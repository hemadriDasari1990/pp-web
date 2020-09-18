import '../assets/css/app.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import * as serviceWorker from './serviceworker'

import React, { Suspense, lazy } from 'react'

import Loader from './components/Loader/components/Loader'
import Offline from 'offline-plugin/runtime'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import emojis from 'emojis-list'
import { render } from 'react-dom'
import { store } from './store'

const App = lazy(() => import('./components/App'))

if (process.env.NODE_ENV === 'production') Offline.install()
export const Root = () => (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Suspense fallback={<Loader />}>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </Suspense>
    </Router>
  </Provider>
)

if (!module.hot) render(<Root />, document.querySelector('react'))

serviceWorker.unregister()
