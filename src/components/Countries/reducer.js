import * as actions from './types'

import { Map, fromJS } from 'immutable'

export const Region = (state = Map(), action) => {
  switch (action.type) {
    case actions.GET_REGIONS_REQUEST:
      return state
        .setIn(['get', 'loading'], true)
        .deleteIn(['get', 'errors'])
        .deleteIn(['get', 'success'])

    case actions.GET_REGIONS_SUCCESS:
      return state
        .setIn(['get', 'success'], action.data)
        .setIn(['get', 'loading'], false)

    case actions.GET_REGIONS_ERROR:
      return state
        .setIn(['get', 'errors'], action.errors)
        .setIn(['get', 'loading'], false)

    default:
      return state
  }
}
