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

    case actions.CREATE_OR_UPDATE_REACTION_ERROR:
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

    case actions.CREATE_OR_UPDATE_PROFILE_REACTION_ERROR:
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

    case actions.GET_USER_REACTION_ERROR:
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

    case actions.CREATE_OR_UPDATE_PROFILE_FOLLOWER_ERROR:
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

    case actions.GET_USER_FOLLOWER_ERROR:
      return state
        .setIn(['follower', 'get', 'errors'], action.errors)
        .setIn(['follower', 'get', 'loading'], false)

    case actions.SAVE_ACTION_STATE:
      return state.setIn(['action', 'save'], action.data)

    case actions.GET_WHO_TO_FOLLOW_REQUEST:
      return state
        .setIn(['whotofollow', 'get', 'loading'], true)
        .deleteIn(['whotofollow', 'get', 'errors'])
        .deleteIn(['whotofollow', 'get', 'success'])

    case actions.GET_WHO_TO_FOLLOW_SUCCESS:
      return state
        .setIn(['whotofollow', 'get', 'success'], action.data)
        .setIn(['whotofollow', 'get', 'loading'], false)

    case actions.GET_WHO_TO_FOLLOW_ERROR:
      return state
        .setIn(['whotofollow', 'get', 'errors'], action.errors)
        .setIn(['whotofollow', 'get', 'loading'], false)
    case actions.CREATE_OR_UPDATE_OPINION_REQUEST_REQUEST:
      return state
        .setIn(['opinion', 'create', 'loading'], true)
        .deleteIn(['opinion', 'create', 'errors'])
        .deleteIn(['opinion', 'create', 'success'])

    case actions.CREATE_OR_UPDATE_OPINION_REQUEST_SUCCESS:
      return state
        .setIn(['opinion', 'create', 'success'], action.data)
        .setIn(['opinion', 'create', 'loading'], false)

    case actions.CREATE_OR_UPDATE_OPINION_REQUEST_ERROR:
      return state
        .setIn(['opinion', 'create', 'errors'], action.errors)
        .setIn(['opinion', 'create', 'loading'], false)
    default:
      return state
  }
}
