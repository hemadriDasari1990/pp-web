import * as actions from '../../constants/actionTypes';
import {Map, fromJS} from 'immutable';

export const Dashboard = (state = Map(), action) => {
	switch(action.type) {

    case actions.DELETE_POST_REQUEST:
      return state.setIn(['post', 'delete', 'loading'], true)
      .deleteIn(['post', 'delete', 'errors'])
      .deleteIn(['post', 'delete', 'success'])

    case actions.DELETE_POST_SUCCESS:
      return state
      .setIn(['post', 'delete', 'success'], fromJS(action.data))
      .setIn(['post', 'delete', 'loading'], false)

    case actions.DELETE_POST_ERROR: 
     return state
      .setIn(['post', 'delete', 'errors'], fromJS(action.errors))
      .setIn(['post', 'delete', 'loading'], false)

    case actions.UPDATE_POST_REQUEST:
      return state.setIn(['post', 'update', 'loading'], true)
      .deleteIn(['post', 'update', 'errors'])
      .deleteIn(['post', 'update', 'success'])

    case actions.UPDATE_POST_SUCCESS:
      return state
      .setIn(['post', 'update', 'success'], fromJS(action.data))
      .setIn(['post', 'update', 'loading'], false)

    case actions.UPDATE_POST_ERROR: 
     return state
      .setIn(['post', 'update', 'errors'], fromJS(action.errors))
      .setIn(['post', 'update', 'loading'], false)

	  default:
	      return state
	}
}