import * as actions from '../../constants/actionTypes'
import { Map, fromJS } from 'immutable'

export const Post = (state = Map(), action) => {
  switch (action.type) {
    case actions.SAVE_USER_PREFERENCES_REQUEST:
      return state
        .setIn(['preferences', 'save', 'loading'], true)
        .deleteIn(['preferences', 'save', 'errors'])
        .deleteIn(['preferences', 'save', 'success'])

    case actions.SAVE_USER_PREFERENCES_SUCCESS:
      return state
        .setIn(['preferences', 'save', 'success'], fromJS(action.data))
        .setIn(['preferences', 'save', 'loading'], false)

    case actions.SAVE_USER_PREFERENCES_ERROR:
      return state
        .setIn(['preferences', 'save', 'errors'], fromJS(action.errors))
        .setIn(['preferences', 'save', 'loading'], false)

    case actions.UPDATE_USER_PREFERENCES_REQUEST:
      return state
        .setIn(['preferences', 'update', 'loading'], true)
        .deleteIn(['preferences', 'update', 'errors'])
        .deleteIn(['preferences', 'update', 'success'])

    case actions.UPDATE_USER_PREFERENCES_SUCCESS:
      return state
        .setIn(['preferences', 'update', 'success'], action.data)
        .setIn(['preferences', 'update', 'loading'], false)

    case actions.UPDATE_USER_PREFERENCES_ERROR:
      return state
        .setIn(['preferences', 'update', 'errors'], action.errors)
        .setIn(['preferences', 'update', 'loading'], false)

    case actions.GET_USER_PREFERENCES_REQUEST:
      return state
        .setIn(['preferences', 'get', 'loading'], true)
        .deleteIn(['preferences', 'get', 'errors'])
        .deleteIn(['preferences', 'get', 'success'])

    case actions.GET_USER_PREFERENCES_SUCCESS:
      return state
        .setIn(['preferences', 'get', 'success'], action.data)
        .setIn(['preferences', 'get', 'loading'], false)

    case actions.GET_USER_PREFERENCES_ERROR:
      return state
        .setIn(['preferences', 'get', 'errors'], action.errors)
        .setIn(['preferences', 'get', 'loading'], false)

    case actions.CREATE_POST_REQUEST:
      return state
        .setIn(['post', 'create', 'loading'], true)
        .deleteIn(['post', 'create', 'errors'])
        .deleteIn(['post', 'create', 'success'])

    case actions.CREATE_POST_SUCCESS:
      return state
        .setIn(['post', 'create', 'success'], fromJS(action.data))
        .setIn(['post', 'create', 'loading'], false)

    case actions.CREATE_POST_ERROR:
      return state
        .setIn(['post', 'create', 'errors'], fromJS(action.errors))
        .setIn(['post', 'create', 'loading'], false)

    case actions.GET_REACTIONS_REQUEST:
      return state
        .setIn(['reactions', 'loading'], true)
        .deleteIn(['reactions', 'errors'])
        .deleteIn(['reactions', 'success'])

    case actions.GET_REACTIONS_SUCCESS:
      return state
        .setIn(['reactions', 'success'], action.data)
        .setIn(['reactions', 'loading'], false)

    case actions.GET_REACTIONS_ERROR:
      return state
        .setIn(['reactions', 'errors'], action.errors)
        .setIn(['reactions', 'loading'], false)

    default:
      return state
  }
}
