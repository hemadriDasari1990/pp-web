import * as actions from '../constants/actionTypes'

import { Map, fromJS } from 'immutable'

export const user = (state = Map(), action) => {
  switch (action.type) {
    case actions.STORE_USER:
      return state.setIn(['data'], action.user)

    case actions.CREATE_OR_UPDATE_USER_REQUEST:
      return state
        .setIn(['create-or-update', 'loading'], true)
        .deleteIn(['create-or-update', 'errors'])
        .deleteIn(['create-or-update', 'success'])

    case actions.CREATE_OR_UPDATE_USER_SUCCESS:
      return state
        .setIn(['create-or-update', 'success'], fromJS(action.data))
        .setIn(['create-or-update', 'loading'], false)

    case actions.CREATE_OR_UPDATE_USER_ERROR:
      return state
        .setIn(['create-or-update', 'errors'], fromJS(action.errors))
        .setIn(['create-or-update', 'loading'], false)

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
      return state.setIn(['success'], action.data).setIn(['loading'], false)

    case actions.GET_USER_ERROR:
      return state.setIn(['errors'], action.errors).setIn(['loading'], false)

    default:
      return state
  }
}
