import * as action from './Types'
import config from '../../config'

export const getNotificationsRequest = () => {
  return {
    type: action.GET_NOTIFICATIONS_REQUEST,
    loading: true,
  }
}

export const getNotificationsSuccess = data => {
  return {
    type: action.GET_NOTIFICATIONS_SUCCESS,
    loading: false,
    data: data,
  }
}

export const getNotificationsError = errors => {
  return {
    type: action.GET_NOTIFICATIONS_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const getNotifications = (userId, type, limit) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getNotificationsRequest())
    return fetch(
      config.URL_PREFIX + `/notifications/${userId}/${type}?limit=${limit}`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(getNotificationsSuccess(data)))
      .catch(errors => dispatch(getNotificationsError(errors)))
  }
}

export const markReadRequest = () => {
  return {
    type: action.MARK_NOTIFICATION_READ_REQUEST,
    loading: true,
  }
}

export const markReadSuccess = res => {
  return {
    type: action.MARK_NOTIFICATION_READ_SUCCESS,
    loading: false,
    data: res,
  }
}

export const markReadError = errors => {
  return {
    type: action.MARK_NOTIFICATION_READ_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const markRead = notificationId => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read: true }),
  }
  return dispatch => {
    dispatch(markReadRequest())
    return fetch(
      config.URL_PREFIX + `/notifications/${notificationId}/markRead`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(markReadSuccess(data)))
      .catch(errors => {
        dispatch(markReadError(errors))
      })
  }
}
