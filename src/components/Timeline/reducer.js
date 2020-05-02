import * as actions from '../../constants/actionTypes'
import { Map, fromJS } from 'immutable'

export const Timeline = (state = Map(), action) => {
  switch (action.type) {
    case actions.GET_INCOMING_POSTS_REQUEST:
      return state
        .setIn(['incoming', 'loading'], true)
        .deleteIn(['incoming', 'errors'])
        .deleteIn(['incoming', 'success'])

    case actions.GET_INCOMING_POSTS_SUCCESS:
      return state
        .setIn(['incoming', 'success'], action.data)
        .setIn(['incoming', 'loading'], false)

    case actions.GET_INCOMING_POSTS_ERROR:
      return state
        .setIn(['incoming', 'errors'], action.errors)
        .setIn(['incoming', 'loading'], false)

    case actions.DELETE_POST_REQUEST:
      return state
        .setIn(['post', 'delete', 'loading'], true)
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
      return state
        .setIn(['post', 'update', 'loading'], true)
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

    case actions.GET_POSTS_SUMMARY_REQUEST:
      return state
        .setIn(['summary', 'loading'], true)
        .deleteIn(['summary', 'errors'])
        .deleteIn(['summary', 'success'])

    case actions.GET_POSTS_SUMMARY_SUCCESS:
      return state
        .setIn(['summary', 'success'], action.data)
        .setIn(['summary', 'loading'], false)

    case actions.GET_POSTS_SUMMARY_ERROR:
      return state
        .setIn(['summary', 'errors'], action.errors)
        .setIn(['summary', 'loading'], false)

    case actions.GET_OUTGOING_POSTS_REQUEST:
      return state
        .setIn(['outgoing', 'loading'], true)
        .deleteIn(['outgoing', 'errors'])
        .deleteIn(['outgoing', 'success'])

    case actions.GET_OUTGOING_POSTS_SUCCESS:
      return state
        .setIn(['outgoing', 'success'], action.data)
        .setIn(['outgoing', 'loading'], false)

    case actions.GET_OUTGOING_POSTS_ERROR:
      return state
        .setIn(['outgoing', 'errors'], action.errors)
        .setIn(['outgoing', 'loading'], false)

    case actions.GET_NOTIFICATIONS_COUNT_REQUEST:
      return state
        .setIn(['notifications', 'count', 'loading'], true)
        .deleteIn(['notifications', 'count', 'errors'])
        .deleteIn(['notifications', 'count', 'success'])

    case actions.GET_NOTIFICATIONS_COUNT_SUCCESS:
      return state
        .setIn(['notifications', 'count', 'success'], action.data)
        .setIn(['notifications', 'count', 'loading'], false)

    case actions.GET_NOTIFICATIONS_COUNT_ERROR:
      return state
        .setIn(['notifications', 'count', 'errors'], action.errors)
        .setIn(['notifications', 'count', 'loading'], false)

    case actions.GET_RECENT_POSTS_REQUEST:
      return state
        .setIn(['recent', 'loading'], true)
        .deleteIn(['recent', 'errors'])
        .deleteIn(['recent', 'success'])

    case actions.GET_RECENT_POSTS_SUCCESS:
      return state
        .setIn(['recent', 'success'], action.data)
        .setIn(['recent', 'loading'], false)

    case actions.GET_RECENT_POSTS_ERROR:
      return state
        .setIn(['recent', 'errors'], action.errors)
        .setIn(['recent', 'loading'], false)

    case actions.GET_POST_DETAILS_REQUEST:
      return state
        .setIn(['post', 'details', 'loading'], true)
        .deleteIn(['post', 'details', 'errors'])
        .deleteIn(['post', 'details', 'success'])

    case actions.GET_POST_DETAILS_SUCCESS:
      return state
        .setIn(['post', 'details', 'success'], action.data)
        .setIn(['post', 'details', 'loading'], false)

    case actions.GET_POST_DETAILS_ERROR:
      return state
        .setIn(['post', 'details', 'errors'], action.errors)
        .setIn(['post', 'details', 'loading'], false)

    case actions.CREATE_POST_COMMENT_REQUEST:
      return state
        .setIn(['post', 'comment', 'loading'], true)
        .deleteIn(['post', 'comment', 'errors'])
        .deleteIn(['post', 'comment', 'success'])

    case actions.CREATE_POST_COMMENT_SUCCESS:
      return state
        .setIn(['post', 'comment', 'success'], fromJS(action.data))
        .setIn(['post', 'comment', 'loading'], false)

    case actions.CREATE_POST_COMMENT_ERROR:
      return state
        .setIn(['post', 'comment', 'errors'], fromJS(action.errors))
        .setIn(['post', 'comment', 'loading'], false)

    default:
      return state
  }
}
