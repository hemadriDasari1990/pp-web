import * as action from '../constants/actionTypes'

import config from '../config'

export const storeUser = user => {
  return {
    type: action.STORE_USER,
    user,
  }
}

export const userLogout = () => {
  return {
    type: action.USER_LOGOUT_SUCCESS,
  }
}

export const createOrUpdateUserRequest = () => {
  return {
    type: action.CREATE_OR_UPDATE_USER_REQUEST,
    loading: true,
  }
}

export const createOrUpdateUserSuccess = user => {
  return {
    type: action.CREATE_OR_UPDATE_USER_SUCCESS,
    loading: false,
    data: user,
  }
}

export const createOrUpdateUserError = errors => {
  return {
    type: action.CREATE_OR_UPDATE_USER_ERROR,
    loading: false,
    errors: errors,
  }
}

export const createOrUpdateUser = user => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }
  return dispatch => {
    dispatch(createOrUpdateUserRequest())
    return fetch(config.URL_PREFIX + '/user/createOrUpdate', options)
      .then(response => response.json())
      .then(data => dispatch(createOrUpdateUserSuccess(data)))
      .catch(errors => {
        dispatch(createOrUpdateUserError(errors))
      })
  }
}

export const getUserRequest = () => {
  return {
    type: action.GET_USER_REQUEST,
    loading: true,
  }
}

export const getUserSuccess = user => {
  return {
    type: action.GET_USER_SUCCESS,
    loading: false,
    data: user,
  }
}

export const getUserError = errors => {
  return {
    type: action.GET_USER_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getUser = userId => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getUserRequest())
    return fetch(config.URL_PREFIX + `/user/${userId}/details`, options)
      .then(response => response.json())
      .then(data => dispatch(getUserSuccess(data)))
      .catch(errors => dispatch(getUserError(errors)))
  }
}

export const getUsersRequest = () => {
  return {
    type: action.GET_USERS_REQUEST,
    loading: true,
  }
}

export const getUsersSuccess = user => {
  return {
    type: action.GET_USERS_SUCCESS,
    loading: false,
    data: user.users,
  }
}

export const getUsersError = errors => {
  return {
    type: action.GET_USERS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getUsers = (userId, text) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getUsersRequest())
    return fetch(config.URL_PREFIX + `/user/${userId}?text=${text}`, options)
      .then(response => response.json())
      .then(data => dispatch(getUsersSuccess(data)))
      .catch(errors => dispatch(getUsersError(errors)))
  }
}

export const updateUserRequest = () => {
  return {
    type: action.UPDATE_USER_REQUEST,
    loading: true,
  }
}

export const updateUserSuccess = user => {
  return {
    type: action.UPDATE_USER_SUCCESS,
    loading: false,
    data: user,
  }
}

export const updateUserError = errors => {
  return {
    type: action.UPDATE_USER_ERROR,
    loading: false,
    errors: errors,
  }
}

export const updateUser = (userId, data) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return dispatch => {
    dispatch(updateUserRequest())
    return fetch(config.URL_PREFIX + `/user/update/${userId}`, options)
      .then(response => response.json())
      .then(data => dispatch(updateUserSuccess(data)))
      .catch(errors => {
        dispatch(updateUserError(errors))
      })
  }
}
