import { applyMiddleware, compose, createStore } from 'redux'

import { Map } from 'immutable'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

// import { loginWithToken } from './actions'
// import { saveState, loadState } from './helpers'

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose

export const store = createStore(
  rootReducer,
  Map(),
  composeEnhancers(
    applyMiddleware(thunk),
    window && window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)

// store.subscribe(throttle(() => saveState(store.getState()), 1000))
// store.dispatch(loginWithToken())
