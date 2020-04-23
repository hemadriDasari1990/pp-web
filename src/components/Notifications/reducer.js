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

    case actions.GET_NOTIFICATIONS_FAILURE:
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

    case actions.MARK_NOTIFICATION_READ_FAILURE:
      return state
        .setIn(['markRead', 'errors'], action.errors)
        .setIn(['markRead', 'loading'], false)
    default:
      return state
  }
}
