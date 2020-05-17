import * as action from '../../constants/actionTypes'

import config from '../../config'

export const deletePostRequest = () => {
  return {
    type: action.DELETE_POST_REQUEST,
    loading: true,
  }
}

export const deletePostSuccess = data => {
  return {
    type: action.DELETE_POST_SUCCESS,
    loading: false,
    data: data,
  }
}

export const deletePostError = errors => {
  return {
    type: action.DELETE_POST_ERROR,
    loading: false,
    errors: errors,
  }
}

export const deletePost = postId => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(deletePostRequest())
    return fetch(config.URL_PREFIX + `/post/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(deletePostSuccess(data)))
      .catch(errors => dispatch(deletePostError(errors)))
  }
}

export const updatePostRequest = () => {
  return {
    type: action.UPDATE_POST_REQUEST,
    loading: true,
  }
}

export const updatePostSuccess = data => {
  return {
    type: action.UPDATE_POST_SUCCESS,
    loading: false,
    data: data,
  }
}

export const updatePostError = errors => {
  return {
    type: action.UPDATE_POST_ERROR,
    loading: false,
    errors: errors,
  }
}

export const updatePost = (postId, post) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  }
  return dispatch => {
    dispatch(updatePostRequest())
    return fetch(config.URL_PREFIX + `/post/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(updatePostSuccess(data)))
      .catch(errors => dispatch(updatePostError(errors)))
  }
}

export const getPostsSummaryRequest = () => {
  return {
    type: action.GET_POSTS_SUMMARY_REQUEST,
    loading: true,
  }
}

export const getPostsSummarySuccess = data => {
  return {
    type: action.GET_POSTS_SUMMARY_SUCCESS,
    loading: false,
    data: data,
  }
}

export const getPostsSummaryError = errors => {
  return {
    type: action.GET_POSTS_SUMMARY_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getPostsSummary = (userId, type) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getPostsSummaryRequest())
    return fetch(config.URL_PREFIX + `/user/${userId}/summary/${type}`, options)
      .then(response => response.json())
      .then(data => dispatch(getPostsSummarySuccess(data)))
      .catch(errors => dispatch(getPostsSummaryError(errors)))
  }
}

export const getIncomingPostsRequest = () => {
  return {
    type: action.GET_INCOMING_POSTS_REQUEST,
    loading: true,
  }
}

export const getIncomingPostsSuccess = posts => {
  return {
    type: action.GET_INCOMING_POSTS_SUCCESS,
    loading: false,
    data: posts,
  }
}

export const getIncomingPostsError = errors => {
  return {
    type: action.GET_INCOMING_POSTS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getIncomingPosts = (userId, flag) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getIncomingPostsRequest())
    return fetch(
      config.URL_PREFIX + `/post/incoming/${userId}?flag=${flag}`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(getIncomingPostsSuccess(data)))
      .catch(errors => dispatch(getIncomingPostsError(errors)))
  }
}

export const getOutgoingPostsRequest = () => {
  return {
    type: action.GET_OUTGOING_POSTS_REQUEST,
    loading: true,
  }
}

export const getOutgoingPostsSuccess = posts => {
  return {
    type: action.GET_OUTGOING_POSTS_SUCCESS,
    loading: false,
    data: posts,
  }
}

export const getOutgoingPostsError = errors => {
  return {
    type: action.GET_OUTGOING_POSTS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getOutgoingPosts = userId => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getOutgoingPostsRequest())
    return fetch(config.URL_PREFIX + `/post/outgoing/${userId}`, options)
      .then(response => response.json())
      .then(data => dispatch(getOutgoingPostsSuccess(data)))
      .catch(errors => dispatch(getOutgoingPostsError(errors)))
  }
}

export const getNotificationsCountRequest = () => {
  return {
    type: action.GET_NOTIFICATIONS_COUNT_REQUEST,
    loading: true,
  }
}

export const getNotificationsCountSuccess = data => {
  return {
    type: action.GET_NOTIFICATIONS_COUNT_SUCCESS,
    loading: false,
    data: data,
  }
}

export const getNotificationsCountError = errors => {
  return {
    type: action.GET_NOTIFICATIONS_COUNT_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getNotificationsCount = userId => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getNotificationsCountRequest())
    return fetch(config.URL_PREFIX + `/notifications/${userId}/count`, options)
      .then(response => response.json())
      .then(data => dispatch(getNotificationsCountSuccess(data)))
      .catch(errors => dispatch(getNotificationsCountError(errors)))
  }
}

export const getRecentPostsRequest = () => {
  return {
    type: action.GET_RECENT_POSTS_REQUEST,
    loading: true,
  }
}

export const getRecentPostsSuccess = posts => {
  return {
    type: action.GET_RECENT_POSTS_SUCCESS,
    loading: false,
    data: posts,
  }
}

export const getRecentPostsError = errors => {
  return {
    type: action.GET_RECENT_POSTS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getRecentPosts = userId => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getRecentPostsRequest())
    return fetch(config.URL_PREFIX + `/post/${userId}/recentPosts`, options)
      .then(response => response.json())
      .then(data => dispatch(getRecentPostsSuccess(data)))
      .catch(errors => dispatch(getRecentPostsError(errors)))
  }
}

export const getPopularPostsRequest = () => {
  return {
    type: action.GET_POPULAR_POSTS_REQUEST,
    loading: true,
  }
}

export const getPopularPostsSuccess = posts => {
  return {
    type: action.GET_POPULAR_POSTS_SUCCESS,
    loading: false,
    data: posts,
  }
}

export const getPopularPostsError = errors => {
  return {
    type: action.GET_POPULAR_POSTS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getPopularPosts = (userId, type) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getPopularPostsRequest())
    return fetch(
      config.URL_PREFIX + `/post/${userId}/popularPosts?type=${type}`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(getPopularPostsSuccess(data)))
      .catch(errors => dispatch(getPopularPostsError(errors)))
  }
}

export const getPostDetailsRequest = () => {
  return {
    type: action.GET_POST_DETAILS_REQUEST,
    loading: true,
  }
}

export const getPostDetailsSuccess = post => {
  return {
    type: action.GET_POST_DETAILS_SUCCESS,
    loading: false,
    data: post,
  }
}

export const getPostDetailsError = errors => {
  return {
    type: action.GET_POST_DETAILS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getPostDetails = postId => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getPostDetailsRequest())
    return fetch(config.URL_PREFIX + `/post/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(getPostDetailsSuccess(data)))
      .catch(errors => dispatch(getPostDetailsError(errors)))
  }
}

export const createCommentRequest = () => {
  return {
    type: action.CREATE_POST_COMMENT_REQUEST,
    loading: true,
  }
}

export const createCommentSuccess = res => {
  return {
    type: action.CREATE_POST_COMMENT_SUCCESS,
    loading: false,
    data: res,
  }
}

export const createCommentError = errors => {
  return {
    type: action.CREATE_POST_COMMENT_ERROR,
    loading: false,
    errors: errors,
  }
}

export const createComment = (postId, comment) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  }
  return dispatch => {
    dispatch(createCommentRequest())
    return fetch(config.URL_PREFIX + `/post/comment/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(createCommentSuccess(data)))
      .catch(errors => dispatch(createCommentError(errors)))
  }
}

export const savePostId = postId => {
  return {
    type: action.SAVE_POST_ID,
    id: postId,
  }
}
