import * as actions from '../../constants/actionTypes'
import { Map, fromJS } from 'immutable'

export const Dashboard = (state = Map(), action) => {
  switch (action.type) {
    case actions.GET_POSTS_BY_USER_REQUEST:
      return state
        .setIn(['posts', 'loading'], true)
        .deleteIn(['posts', 'errors'])
        .deleteIn(['posts', 'success'])

    case actions.GET_POSTS_BY_USER_SUCCESS:
      return state
        .setIn(['posts', 'success'], action.data)
        .setIn(['posts', 'loading'], false)

    case actions.GET_POSTS_BY_USER_ERROR:
      return state
        .setIn(['posts', 'errors'], action.errors)
        .setIn(['posts', 'loading'], false)

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
        .setIn(['posts', 'summary', 'loading'], true)
        .deleteIn(['posts', 'summary', 'errors'])
        .deleteIn(['posts', 'summary', 'success'])

    case actions.GET_POSTS_SUMMARY_SUCCESS:
      return state
        .setIn(['posts', 'summary', 'success'], action.data)
        .setIn(['posts', 'summary', 'loading'], false)

    case actions.GET_POSTS_SUMMARY_FAILURE:
      return state
        .setIn(['posts', 'summary', 'errors'], action.errors)
        .setIn(['posts', 'summary', 'loading'], false)

    case actions.GET_USER_POSTS_SELF_REQUEST:
      return state
        .setIn(['posts', 'self', 'loading'], true)
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

    case actions.GET_NOTIFICATIONS_COUNT_REQUEST:
      return state
        .setIn(['notifications', 'count', 'loading'], true)
        .deleteIn(['notifications', 'count', 'errors'])
        .deleteIn(['notifications', 'count', 'success'])

    case actions.GET_NOTIFICATIONS_COUNT_SUCCESS:
      return state
        .setIn(['notifications', 'count', 'success'], action.data)
        .setIn(['notifications', 'count', 'loading'], false)

    case actions.GET_NOTIFICATIONS_COUNT_FAILURE:
      return state
        .setIn(['notifications', 'count', 'errors'], action.errors)
        .setIn(['notifications', 'count', 'loading'], false)
    default:
      return state
  }
}
