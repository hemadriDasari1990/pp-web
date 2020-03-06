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

export const createShareRequest = () => {
  return {
    type: action.CREATE_SHARE_REQUEST,
    loading: true,
  }
}

export const createShareSuccess = res => {
  return {
    type: action.CREATE_SHARE_SUCCESS,
    loading: false,
    data: res,
  }
}

export const createShareError = errors => {
  return {
    type: action.CREATE_SHARE_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const createShare = (userId, postId) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: userId, post: postId }),
  }
  return dispatch => {
    dispatch(createShareRequest())
    return fetch(config.URL_PREFIX + `/post/share/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(createShareSuccess(data)))
      .catch(errors => dispatch(createShareError(errors)))
  }
}
