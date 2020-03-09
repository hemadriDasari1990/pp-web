import * as action from '../../constants/actionTypes'
import config from '../../config'

export const getFeedbacksRequest = () => {
  return {
    type: action.GET_FEEDBACKS_REQUEST,
    loading: true,
  }
}

export const getFeedbacksSuccess = preferences => {
  return {
    type: action.GET_FEEDBACKS_SUCCESS,
    loading: false,
    data: preferences,
  }
}

export const getFeedbacksError = errors => {
  return {
    type: action.GET_FEEDBACKS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getFeedbacks = () => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getFeedbacksRequest())
    return fetch(config.URL_PREFIX + `/feedback`, options)
      .then(response => response.json())
      .then(data => dispatch(getFeedbacksSuccess(data)))
      .catch(errors => dispatch(getFeedbacksError(errors)))
  }
}

export const saveFeedbackRequest = () => {
  return {
    type: action.SAVE_FEEDBACK_REQUEST,
    loading: true,
  }
}

export const saveFeedbackSuccess = data => {
  return {
    type: action.SAVE_FEEDBACK_SUCCESS,
    loading: false,
    data,
  }
}

export const saveFeedbackError = errors => {
  return {
    type: action.SAVE_FEEDBACK_ERROR,
    loading: false,
    errors: errors,
  }
}

export const saveFeedback = data => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return dispatch => {
    dispatch(saveFeedbackRequest())
    return fetch(config.URL_PREFIX + '/feedback', options)
      .then(response => response.json())
      .then(data => dispatch(saveFeedbackSuccess(data)))
      .catch(errors => {
        dispatch(saveFeedbackError(errors))
      })
  }
}
