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

    case actions.GET_REACTIONS_COUNT_REQUEST:
      return state
        .setIn(['reactions', 'count', 'loading'], true)
        .deleteIn(['reactions', 'count', 'errors'])
        .deleteIn(['reactions', 'count', 'success'])

    case actions.GET_REACTIONS_COUNT_SUCCESS:
      return state
        .setIn(['reactions', 'count', 'success'], action.data)
        .setIn(['reactions', 'count', 'loading'], false)

    case actions.GET_REACTIONS_COUNT_ERROR:
      return state
        .setIn(['reactions', 'count', 'errors'], action.errors)
        .setIn(['reactions', 'count', 'loading'], false)

    case actions.GET_COMMENTS_REQUEST:
      return state
        .setIn(['comments', 'loading'], true)
        .deleteIn(['comments', 'errors'])
        .deleteIn(['comments', 'success'])

    case actions.GET_COMMENTS_SUCCESS:
      return state
        .setIn(['comments', 'success'], action.data)
        .setIn(['comments', 'loading'], false)

    case actions.GET_COMMENTS_ERROR:
      return state
        .setIn(['comments', 'errors'], action.errors)
        .setIn(['comments', 'loading'], false)

    case actions.GET_COMMENTS_COUNT_REQUEST:
      return state
        .setIn(['comments', 'count', 'loading'], true)
        .deleteIn(['comments', 'count', 'errors'])
        .deleteIn(['comments', 'count', 'success'])

    case actions.GET_COMMENTS_COUNT_SUCCESS:
      return state
        .setIn(['comments', 'count', 'success'], action.data)
        .setIn(['comments', 'count', 'loading'], false)

    case actions.GET_COMMENTS_COUNT_ERROR:
      return state
        .setIn(['comments', 'count', 'errors'], action.errors)
        .setIn(['comments', 'count', 'loading'], false)

    case actions.CREATE_OR_UPDATE_COMMENT_REACTION_REQUEST:
      return state
        .setIn(['comment', 'reaction', 'create', 'loading'], true)
        .deleteIn(['comment', 'reaction', 'create', 'errors'])
        .deleteIn(['comment', 'reaction', 'create', 'success'])

    case actions.CREATE_OR_UPDATE_COMMENT_REACTION_SUCCESS:
      return state
        .setIn(['comment', 'reaction', 'create', 'success'], action.data)
        .setIn(['comment', 'reaction', 'create', 'loading'], false)

    case actions.CREATE_OR_UPDATE_COMMENT_REACTION_ERROR:
      return state
        .setIn(['comment', 'reaction', 'create', 'errors'], action.errors)
        .setIn(['comment', 'reaction', 'create', 'loading'], false)

    default:
      return state
  }
}
