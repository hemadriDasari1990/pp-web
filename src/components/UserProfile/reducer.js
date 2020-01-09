import * as actions from './components/Types';
import {Map, fromJS} from 'immutable';

export const UserProfile = (state = Map(), action) => {
	switch(action.type) {
    case actions.GET_USER_POSTS_REQUEST:
      return state.setIn(['posts', 'loading'], true)
      .deleteIn(['posts', 'errors'])
      .deleteIn(['posts', 'success'])

    case actions.GET_USER_POSTS_SUCCESS:
      return state
      .setIn(['posts', 'success'], action.data)
      .setIn(['posts', 'loading'], false)

    case actions.GET_USER_POSTS_FAILURE: 
     return state
      .setIn(['posts', 'errors'], action.errors)
      .setIn(['posts', 'loading'], false)
    case actions.GET_USER_POSTS_SELF_REQUEST:
      return state.setIn(['posts', 'self', 'loading'], true)
      .deleteIn(['posts', 'self', 'errors'])
      .deleteIn(['posts', 'self', 'success'])

    case actions.GET_USER_POSTS_SELF_SUCCESS:
      return state
      .setIn(['posts', 'self', 'success'], action.data)
      .setIn(['posts', 'self', 'loading'], false)

    case actions.GET_USER_POSTS_SELF_FAILURE: 
     return state
      .setIn(['posts', 'self', 'errors'], action.errors)
      .setIn(['posts', 'self', 'loading'], false)

	  default:
	      return state
	}
}