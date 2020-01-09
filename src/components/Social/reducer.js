import * as actions from './actions';
import {Map, fromJS} from 'immutable';

export Social = (state = Map(), action) => {
	switch(action.type) {

	// case actions.CREATE_USER_REQUEST:
 //      return state.setIn(['contact', 'loading'], true)
 //      .deleteIn(['contact', 'errors'])
 //      .deleteIn(['contact', 'success'])
 //    case actions.CREATE_USER_SUCCESS: {
 //      // const loginId = action.user.id

 //      return state
 //      .setIn(['contact', 'success'], fromJS(action.data))
 //      .setIn(['conatct', 'loading'], false)
 //    }
 //    case actions.CREATE_USER_ERROR: {
 //     return state
 //      .setIn(['contact', 'errors'], fromJS(action.errors))
 //      .setIn(['contact', 'loading'], false)
 //    }
    
	  default:
	      return state
	}
}