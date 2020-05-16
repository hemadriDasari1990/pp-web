import * as actions from './Types'
import { Map, fromJS } from 'immutable'

export const Notifications = (state = Map(), action) => {
  switch (action.type) {
    case actions.GET_NOTIFICATIONS_REQUEST:
      return state
        .setIn(['loading'], true)
        .deleteIn(['errors'])
        .deleteIn(['success'])

    case actions.GET_NOTIFICATIONS_SUCCESS:
      return state.setIn(['success'], action.data).setIn(['loading'], false)

    case actions.GET_NOTIFICATIONS_ERROR:
      return state.setIn(['errors'], action.errors).setIn(['loading'], false)

    case actions.MARK_NOTIFICATION_READ_REQUEST:
      return state
        .setIn(['markRead', 'loading'], true)
        .deleteIn(['markRead', 'errors'])
        .deleteIn(['markRead', 'success'])

    case actions.MARK_NOTIFICATION_READ_SUCCESS:
      return state
        .setIn(['markRead', 'success'], action.data)
        .setIn(['markRead', 'loading'], false)

    case actions.MARK_NOTIFICATION_READ_ERROR:
      return state
        .setIn(['markRead', 'errors'], action.errors)
        .setIn(['markRead', 'loading'], false)

    case actions.DELETE_NOTIFICATION_REQUEST:
      return state
        .setIn(['delete', 'loading'], true)
        .deleteIn(['delete', 'errors'])
        .deleteIn(['delete', 'success'])

    case actions.DELETE_NOTIFICATION_SUCCESS:
      return state
        .setIn(['delete', 'success'], action.data)
        .setIn(['delete', 'loading'], false)

    case actions.DELETE_NOTIFICATION_ERROR:
      return state
        .setIn(['delete', 'errors'], action.errors)
        .setIn(['delete', 'loading'], false)
    default:
      return state
  }
}
