import { Footer } from '../components/Footer/reducer'
import { LOCATION_CHANGE } from 'react-router-redux'
import { Notifications } from '../components/Notifications/reducer'
import { Post } from '../components/Post/reducer'
import { Region } from '../components/Countries/reducer'
import { Timeline } from '../components/Timeline/reducer'
import { UserProfile } from '../components/UserProfile/reducer'
import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import { user } from './user'

const initialState = fromJS({
  locationBeforeTransitions: null,
})

const Routes = (state = initialState, { type, payload } = {}) => {
  if (type === LOCATION_CHANGE) {
    return state.merge({ locationBeforeTransitions: fromJS(payload) })
  }
  return state
}

const appReducer = combineReducers({
  Routes,
  user,
  Post,
  UserProfile,
  Timeline,
  Footer,
  Notifications,
  Region,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT_SUCCESS') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
