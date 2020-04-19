import * as action from '../../constants/actionTypes'
import config from '../../config'

export const createOrUpdateReactionRequest = () => {
  return {
    type: action.CREATE_OR_UPDATE_REACTION_REQUEST,
    loading: true,
  }
}

export const createOrUpdateReactionSuccess = res => {
  return {
    type: action.CREATE_OR_UPDATE_REACTION_SUCCESS,
    loading: false,
    data: res,
  }
}

export const createOrUpdateReactionError = errors => {
  return {
    type: action.CREATE_OR_UPDATE_REACTION_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const createOrUpdateReaction = (userId, postId, reaction) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: userId, type: reaction, post: postId }),
  }
  return dispatch => {
    dispatch(createOrUpdateReactionRequest())
    return fetch(config.URL_PREFIX + `/post/reaction/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(createOrUpdateReactionSuccess(data)))
      .catch(errors => dispatch(createOrUpdateReactionError(errors)))
  }
}

export const createOrUpdateProfileReactionRequest = () => {
  return {
    type: action.CREATE_OR_UPDATE_PROFILE_REACTION_REQUEST,
    loading: true,
  }
}

export const createOrUpdateProfileReactionSuccess = res => {
  return {
    type: action.CREATE_OR_UPDATE_PROFILE_REACTION_SUCCESS,
    loading: false,
    data: res,
  }
}

export const createOrUpdateProfileReactionError = errors => {
  return {
    type: action.CREATE_OR_UPDATE_PROFILE_REACTION_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const createOrUpdateProfileReaction = data => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return dispatch => {
    dispatch(createOrUpdateProfileReactionRequest())
    return fetch(config.URL_PREFIX + `/user/profile/reaction`, options)
      .then(response => response.json())
      .then(data => dispatch(createOrUpdateProfileReactionSuccess(data)))
      .catch(errors => dispatch(createOrUpdateProfileReactionError(errors)))
  }
}

export const getProfileReactionRequest = () => {
  return {
    type: action.GET_USER_LIKE_REQUEST,
    loading: true,
  }
}

export const getProfileReactionSuccess = res => {
  return {
    type: action.GET_USER_LIKE_SUCCESS,
    loading: false,
    data: res,
  }
}

export const getProfileReactionError = errors => {
  return {
    type: action.GET_USER_LIKE_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const getProfileReaction = (user, likedBy) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getProfileReactionRequest())
    return fetch(
      config.URL_PREFIX + `/user/profile/get/${user}/${likedBy}`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(getProfileReactionSuccess(data)))
      .catch(errors => dispatch(getProfileReactionError(errors)))
  }
}
