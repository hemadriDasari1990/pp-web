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

export const createUserRequest = () => {
  return {
    type: action.CREATE_USER_REQUEST,
    loading: true,
  }
}

export const createUserSuccess = user => {
  return {
    type: action.CREATE_USER_SUCCESS,
    loading: false,
    data: user,
  }
}

export const createUserError = errors => {
  return {
    type: action.CREATE_USER_ERROR,
    loading: false,
    errors: errors,
  }
}

export const createUser = user => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  }
  return dispatch => {
    dispatch(createUserRequest())
    return fetch(config.URL_PREFIX + '/user/create', options)
      .then(response => response.json())
      .then(data => dispatch(createUserSuccess(data)))
      .catch(errors => {
        dispatch(createUserError(errors))
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
    data: user,
  }
}

export const getUsersError = errors => {
  return {
    type: action.GET_USERS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getUsers = () => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getUsersRequest())
    return fetch(config.URL_PREFIX + `/user/`, options)
      .then(response => response.json())
      .then(data => dispatch(getUsersSuccess(data)))
      .catch(errors => dispatch(getUsersError(errors)))
  }
}
