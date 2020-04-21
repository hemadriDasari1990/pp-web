import * as actions from '../../constants/actionTypes'
import { Map, fromJS } from 'immutable'

export const UserProfile = (state = Map(), action) => {
  switch (action.type) {
    case actions.CREATE_OR_UPDATE_REACTION_REQUEST:
      return state
        .setIn(['reaction', 'create', 'loading'], true)
        .deleteIn(['reaction', 'create', 'errors'])
        .deleteIn(['reaction', 'create', 'success'])

    case actions.CREATE_OR_UPDATE_REACTION_SUCCESS:
      return state
        .setIn(['reaction', 'create', 'success'], action.data)
        .setIn(['reaction', 'create', 'loading'], false)

    case actions.CREATE_OR_UPDATE_REACTION_FAILURE:
      return state
        .setIn(['reaction', 'create', 'errors'], action.errors)
        .setIn(['reaction', 'create', 'loading'], false)

    case actions.CREATE_OR_UPDATE_PROFILE_REACTION_REQUEST:
      return state
        .setIn(['userlike', 'create', 'loading'], true)
        .deleteIn(['userlike', 'create', 'errors'])
        .deleteIn(['userlike', 'create', 'success'])

    case actions.CREATE_OR_UPDATE_PROFILE_REACTION_SUCCESS:
      return state
        .setIn(['userlike', 'create', 'success'], action.data)
        .setIn(['userlike', 'create', 'loading'], false)

    case actions.CREATE_OR_UPDATE_PROFILE_REACTION_FAILURE:
      return state
        .setIn(['userlike', 'create', 'errors'], action.errors)
        .setIn(['userlike', 'create', 'loading'], false)
    case actions.GET_USER_REACTION_REQUEST:
      return state
        .setIn(['userlike', 'get', 'loading'], true)
        .deleteIn(['userlike', 'get', 'errors'])
        .deleteIn(['userlike', 'get', 'success'])

    case actions.GET_USER_REACTION_SUCCESS:
      return state
        .setIn(['userlike', 'get', 'success'], action.data)
        .setIn(['userlike', 'get', 'loading'], false)

    case actions.GET_USER_REACTION_FAILURE:
      return state
        .setIn(['userlike', 'get', 'errors'], action.errors)
        .setIn(['userlike', 'get', 'loading'], false)

    case actions.CREATE_OR_UPDATE_PROFILE_FOLLOWER_REQUEST:
      return state
        .setIn(['follower', 'create', 'loading'], true)
        .deleteIn(['follower', 'create', 'errors'])
        .deleteIn(['follower', 'create', 'success'])

    case actions.CREATE_OR_UPDATE_PROFILE_FOLLOWER_SUCCESS:
      return state
        .setIn(['follower', 'create', 'success'], action.data)
        .setIn(['follower', 'create', 'loading'], false)

    case actions.CREATE_OR_UPDATE_PROFILE_FOLLOWER_FAILURE:
      return state
        .setIn(['follower', 'create', 'errors'], action.errors)
        .setIn(['follower', 'create', 'loading'], false)
    case actions.GET_USER_FOLLOWER_REQUEST:
      return state
        .setIn(['follower', 'get', 'loading'], true)
        .deleteIn(['follower', 'get', 'errors'])
        .deleteIn(['follower', 'get', 'success'])

    case actions.GET_USER_FOLLOWER_SUCCESS:
      return state
        .setIn(['follower', 'get', 'success'], action.data)
        .setIn(['follower', 'get', 'loading'], false)

    case actions.GET_USER_FOLLOWER_FAILURE:
      return state
        .setIn(['follower', 'get', 'errors'], action.errors)
        .setIn(['follower', 'get', 'loading'], false)

    default:
      return state
  }
}
