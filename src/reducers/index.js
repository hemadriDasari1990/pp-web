import {
    combineReducers
} from 'redux-immutable'
import { user } from './user';
import {fromJS} from 'immutable'
import {LOCATION_CHANGE} from 'react-router-redux';
import { Post } from '../components/Post/reducer';
import { UserProfile } from '../components/UserProfile/reducer';
import { Dashboard } from '../components/Dashboard/reducer';

const initialState = fromJS({
  locationBeforeTransitions: null
})

const Routes = (state = initialState, { type, payload } = {}) => {
  if (type === LOCATION_CHANGE) {
    return state.merge({locationBeforeTransitions: fromJS(payload)});
  }
  return state;
}

const appReducer = combineReducers({
	Routes,
	user,
  Post,
  UserProfile,
  Dashboard
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT_SUCCESS') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
