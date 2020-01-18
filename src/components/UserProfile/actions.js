import * as action from './components/Types'
import config from '../../config'

export const updateLikesRequest = () => {
  return {
    type: action.UPDATE_LIKES_REQUEST,
    loading: true,
  }
}

export const updateLikesSuccess = postDetails => {
  return {
    type: action.UPDATE_LIKES_SUCCESS,
    loading: false,
    data: postDetails,
  }
}

export const updateLikesError = errors => {
  return {
    type: action.UPDATE_LIKES_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const updateLikes = (userId, postId) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  }
  return dispatch => {
    dispatch(updateLikesRequest())
    return fetch(config.URL_PREFIX + `/post/likes/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(updateLikesSuccess(data)))
      .catch(errors => dispatch(updateLikesError(errors)))
  }
}

export const updateDisLikesRequest = () => {
  return {
    type: action.UPDATE_DIS_LIKES_REQUEST,
    loading: true,
  }
}

export const updateDisLikesSuccess = postDetails => {
  return {
    type: action.UPDATE_DIS_LIKES_SUCCESS,
    loading: false,
    data: postDetails,
  }
}

export const updateDisLikesError = errors => {
  return {
    type: action.UPDATE_DIS_LIKES_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const updateDisLikes = (userId, postId) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  }
  return dispatch => {
    dispatch(updateDisLikesRequest())
    return fetch(config.URL_PREFIX + `/post/disLikes/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(updateDisLikesSuccess(data)))
      .catch(errors => dispatch(updateDisLikesError(errors)))
  }
}
