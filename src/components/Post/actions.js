import { Map, fromJS } from 'immutable'
import * as action from '../../constants/actionTypes'
import config from '../../config'

export const savePreferencesRequest = () => {
  return {
    type: action.SAVE_USER_PREFERENCES_REQUEST,
    loading: true,
  }
}

export const savePreferencesSuccess = user => {
  return {
    type: action.SAVE_USER_PREFERENCES_SUCCESS,
    loading: false,
    data: user,
  }
}

export const savePreferencesError = errors => {
  return {
    type: action.SAVE_USER_PREFERENCES_ERROR,
    loading: false,
    errors: errors,
  }
}

export const savePreferences = data => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return dispatch => {
    dispatch(savePreferencesRequest())
    return fetch(config.URL_PREFIX + '/user/preferences/save', options)
      .then(response => response.json())
      .then(data => dispatch(savePreferencesSuccess(data)))
      .catch(errors => {
        dispatch(savePreferencesError(errors))
      })
  }
}

export const getUserPreferencesRequest = () => {
  return {
    type: action.GET_USER_PREFERENCES_REQUEST,
    loading: true,
  }
}

export const getUserPreferencesSuccess = preferences => {
  return {
    type: action.GET_USER_PREFERENCES_SUCCESS,
    loading: false,
    data: preferences,
  }
}

export const getUserPreferencesError = errors => {
  return {
    type: action.GET_USER_PREFERENCES_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getUserPreferences = uid => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getUserPreferencesRequest())
    return fetch(config.URL_PREFIX + `/user/preferences/${uid}`, options)
      .then(response => response.json())
      .then(data => dispatch(getUserPreferencesSuccess(data)))
      .catch(errors => dispatch(getUserPreferencesError(errors)))
  }
}

export const updateUserPreferencesRequest = () => {
  return {
    type: action.UPDATE_USER_PREFERENCES_REQUEST,
    loading: true,
  }
}

export const updateUserPreferencesSuccess = res => {
  return {
    type: action.UPDATE_USER_PREFERENCES_SUCCESS,
    loading: false,
    data: res,
  }
}

export const updateUserPreferencesError = errors => {
  return {
    type: action.UPDATE_USER_PREFERENCES_ERROR,
    loading: false,
    errors: errors,
  }
}

export const updateUserPreferences = data => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return dispatch => {
    dispatch(updateUserPreferencesRequest())
    return fetch(config.URL_PREFIX + `/user/preferences/${data.user}`, options)
      .then(response => response.json())
      .then(data => dispatch(updateUserPreferencesSuccess(data)))
      .catch(errors => {
        dispatch(updateUserPreferencesError(errors))
      })
  }
}

export const createPostRequest = () => {
  return {
    type: action.CREATE_POST_REQUEST,
    loading: true,
  }
}

export const createPostSuccess = data => {
  return {
    type: action.CREATE_POST_SUCCESS,
    loading: false,
    data,
  }
}

export const createPostError = errors => {
  return {
    type: action.CREATE_POST_ERROR,
    loading: false,
    errors: errors,
  }
}

export const createPost = data => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return dispatch => {
    dispatch(createPostRequest())
    return fetch(config.URL_PREFIX + '/post/', options)
      .then(response => response.json())
      .then(data => dispatch(createPostSuccess(data)))
      .catch(errors => {
        dispatch(createPostError(errors))
      })
  }
}

export const getReactionsRequest = () => {
  return {
    type: action.GET_REACTIONS_REQUEST,
    loading: true,
  }
}

export const getReactionsSuccess = reactions => {
  return {
    type: action.GET_REACTIONS_SUCCESS,
    loading: false,
    data: reactions,
  }
}

export const getReactionsError = errors => {
  return {
    type: action.GET_REACTIONS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getReactions = (type, postId) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getReactionsRequest())
    return fetch(
      config.URL_PREFIX + `/post/reactions/${postId}?type=${type}`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(getReactionsSuccess(data)))
      .catch(errors => dispatch(getReactionsError(errors)))
  }
}

export const getReactionsCountRequest = () => {
  return {
    type: action.GET_REACTIONS_COUNT_REQUEST,
    loading: true,
  }
}

export const getReactionsCountSuccess = reaction => {
  return {
    type: action.GET_REACTIONS_COUNT_SUCCESS,
    loading: false,
    data: reaction,
  }
}

export const getReactionsCountError = errors => {
  return {
    type: action.GET_REACTIONS_COUNT_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getReactionsCount = postId => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getReactionsCountRequest())
    return fetch(config.URL_PREFIX + `/post/reactions/${postId}/count`, options)
      .then(response => response.json())
      .then(data => dispatch(getReactionsCountSuccess(data)))
      .catch(errors => dispatch(getReactionsCountError(errors)))
  }
}
