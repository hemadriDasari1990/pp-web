import * as action from '../../constants/actionTypes'

import { Map, fromJS } from 'immutable'

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

export const getCommentsRequest = () => {
  return {
    type: action.GET_COMMENTS_REQUEST,
    loading: true,
  }
}

export const getCommentsSuccess = reactions => {
  return {
    type: action.GET_COMMENTS_SUCCESS,
    loading: false,
    data: reactions,
  }
}

export const getCommentsError = errors => {
  return {
    type: action.GET_COMMENTS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getComments = (postId, limit, offset) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getCommentsRequest())
    return fetch(
      config.URL_PREFIX +
        `/post/comments/${postId}?limit=${limit}&offset=${offset}`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(getCommentsSuccess(data)))
      .catch(errors => dispatch(getCommentsError(errors)))
  }
}

export const getCommentsCountRequest = () => {
  return {
    type: action.GET_COMMENTS_COUNT_REQUEST,
    loading: true,
  }
}

export const getCommentsCountSuccess = reaction => {
  return {
    type: action.GET_COMMENTS_COUNT_SUCCESS,
    loading: false,
    data: reaction,
  }
}

export const getCommentsCountError = errors => {
  return {
    type: action.GET_COMMENTS_COUNT_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getCommentsCount = postId => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getCommentsCountRequest())
    return fetch(config.URL_PREFIX + `/post/comments/${postId}/count`, options)
      .then(response => response.json())
      .then(data => dispatch(getCommentsCountSuccess(data)))
      .catch(errors => dispatch(getCommentsCountError(errors)))
  }
}

export const createOrUpdateCommentReactionRequest = () => {
  return {
    type: action.CREATE_OR_UPDATE_COMMENT_REACTION_REQUEST,
    loading: true,
  }
}

export const createOrUpdateCommentReactionSuccess = res => {
  return {
    type: action.CREATE_OR_UPDATE_COMMENT_REACTION_SUCCESS,
    loading: false,
    data: res,
  }
}

export const createOrUpdateCommentReactionError = errors => {
  return {
    type: action.CREATE_OR_UPDATE_COMMENT_REACTION_ERROR,
    loading: false,
    errors: errors,
  }
}

export const createOrUpdateCommentReaction = (userId, commentId, reaction) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reactedBy: userId,
      type: reaction,
      comment: commentId,
    }),
  }
  return dispatch => {
    dispatch(createOrUpdateCommentReactionRequest())
    return fetch(
      config.URL_PREFIX + `/post/comment/reaction/${commentId}`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(createOrUpdateCommentReactionSuccess(data)))
      .catch(errors => dispatch(createOrUpdateCommentReactionError(errors)))
  }
}

export const updateCommentRequest = () => {
  return {
    type: action.UPDATE_COMMENT_REQUEST,
    loading: true,
  }
}

export const updateCommentSuccess = res => {
  return {
    type: action.UPDATE_COMMENT_SUCCESS,
    loading: false,
    data: res,
  }
}

export const updateCommentError = errors => {
  return {
    type: action.UPDATE_COMMENT_ERROR,
    loading: false,
    errors: errors,
  }
}

export const updateComment = (commentId, comment) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: comment,
    }),
  }
  return dispatch => {
    dispatch(updateCommentRequest())
    return fetch(config.URL_PREFIX + `/post/comment/${commentId}`, options)
      .then(response => response.json())
      .then(data => dispatch(updateCommentSuccess(data)))
      .catch(errors => dispatch(updateCommentError(errors)))
  }
}

export const deleteCommentRequest = () => {
  return {
    type: action.DELETE_COMMENT_REQUEST,
    loading: true,
  }
}

export const deleteCommentSuccess = res => {
  return {
    type: action.DELETE_COMMENT_SUCCESS,
    loading: false,
    data: res,
  }
}

export const deleteCommentError = errors => {
  return {
    type: action.DELETE_COMMENT_ERROR,
    loading: false,
    errors: errors,
  }
}

export const deleteComment = (postId, commentId) => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(deleteCommentRequest())
    return fetch(
      config.URL_PREFIX + `/post/${postId}/comment/${commentId}`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(deleteCommentSuccess(data)))
      .catch(errors => dispatch(deleteCommentError(errors)))
  }
}
