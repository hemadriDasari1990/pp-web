import * as actions from '../../constants/actionTypes'
import { Map, fromJS } from 'immutable'

export const Footer = (state = Map(), action) => {
  switch (action.type) {
    case actions.SAVE_FEEDBACK_REQUEST:
      return state
        .setIn(['feedback', 'save', 'loading'], true)
        .deleteIn(['feedback', 'save', 'errors'])
        .deleteIn(['feedback', 'save', 'success'])

    case actions.SAVE_FEEDBACK_SUCCESS:
      return state
        .setIn(['feedback', 'save', 'success'], fromJS(action.data))
        .setIn(['feedback', 'save', 'loading'], false)

    case actions.SAVE_FEEDBACK_ERROR:
      return state
        .setIn(['feedback', 'save', 'errors'], fromJS(action.errors))
        .setIn(['feedback', 'save', 'loading'], false)

    case actions.GET_FEEDBACKS_REQUEST:
      return state
        .setIn(['feedbacks', 'get', 'loading'], true)
        .deleteIn(['feedbacks', 'get', 'errors'])
        .deleteIn(['feedbacks', 'get', 'success'])

    case actions.GET_FEEDBACKS_SUCCESS:
      return state
        .setIn(['feedbacks', 'get', 'success'], action.data)
        .setIn(['feedbacks', 'get', 'loading'], false)

    case actions.GET_FEEDBACKS_ERROR:
      return state
        .setIn(['feedbacks', 'get', 'errors'], action.errors)
        .setIn(['feedbacks', 'get', 'loading'], false)

    default:
      return state
  }
}
