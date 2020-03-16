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
    case actions.CREATE_SHARE_REQUEST:
      return state
        .setIn(['share', 'create', 'loading'], true)
        .deleteIn(['share', 'create', 'errors'])
        .deleteIn(['share', 'create', 'success'])

    case actions.CREATE_SHARE_SUCCESS:
      return state
        .setIn(['share', 'create', 'success'], action.data)
        .setIn(['share', 'create', 'loading'], false)

    case actions.CREATE_SHARE_FAILURE:
      return state
        .setIn(['share', 'create', 'errors'], action.errors)
        .setIn(['share', 'create', 'loading'], false)

    case actions.CREATE_OR_UPDATE_USER_LIKE_REQUEST:
      return state
        .setIn(['userlike', 'create', 'loading'], true)
        .deleteIn(['userlike', 'create', 'errors'])
        .deleteIn(['userlike', 'create', 'success'])

    case actions.CREATE_OR_UPDATE_USER_LIKE_SUCCESS:
      return state
        .setIn(['userlike', 'create', 'success'], action.data)
        .setIn(['userlike', 'create', 'loading'], false)

    case actions.CREATE_OR_UPDATE_USER_LIKE_FAILURE:
      return state
        .setIn(['userlike', 'create', 'errors'], action.errors)
        .setIn(['userlike', 'create', 'loading'], false)
    case actions.GET_USER_LIKE_REQUEST:
      return state
        .setIn(['userlike', 'get', 'loading'], true)
        .deleteIn(['userlike', 'get', 'errors'])
        .deleteIn(['userlike', 'get', 'success'])

    case actions.GET_USER_LIKE_SUCCESS:
      return state
        .setIn(['userlike', 'get', 'success'], action.data)
        .setIn(['userlike', 'get', 'loading'], false)

    case actions.GET_USER_LIKE_FAILURE:
      return state
        .setIn(['userlike', 'get', 'errors'], action.errors)
        .setIn(['userlike', 'get', 'loading'], false)
    default:
      return state
  }
}
