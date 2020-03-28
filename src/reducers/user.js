import * as actions from '../constants/actionTypes'
import { Map, fromJS } from 'immutable'

export const user = (state = Map(), action) => {
  switch (action.type) {
    case actions.STORE_USER:
      return state.setIn(['data'], action.user)

    case actions.CREATE_USER_REQUEST:
      return state
        .setIn(['create', 'loading'], true)
        .deleteIn(['create', 'errors'])
        .deleteIn(['create', 'success'])

    case actions.CREATE_USER_SUCCESS:
      return state
        .setIn(['create', 'success'], fromJS(action.data))
        .setIn(['create', 'loading'], false)

    case actions.CREATE_USER_ERROR:
      return state
        .setIn(['create', 'errors'], fromJS(action.errors))
        .setIn(['create', 'loading'], false)

    case actions.GET_USERS_REQUEST:
      return state
        .setIn(['all', 'loading'], true)
        .deleteIn(['all', 'errors'])
        .deleteIn(['all', 'success'])

    case actions.GET_USERS_SUCCESS:
      return state
        .setIn(['all', 'success'], action.data)
        .setIn(['all', 'loading'], false)

    case actions.GET_USERS_ERROR:
      return state
        .setIn(['all', 'errors'], action.errors)
        .setIn(['all', 'loading'], false)

    case actions.GET_USER_REQUEST:
      return state
        .setIn(['loading'], true)
        .deleteIn(['errors'])
        .deleteIn(['success'])

    case actions.GET_USER_SUCCESS:
      return state
        .setIn(['success'], fromJS(action.data))
        .setIn(['loading'], false)

    case actions.GET_USER_ERROR:
      return state
        .setIn(['errors'], fromJS(action.errors))
        .setIn(['loading'], false)

    default:
      return state
  }
}
