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
    default:
      return state
  }
}
