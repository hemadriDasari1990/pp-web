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
    type: action.DELETE_POST_FAILURE,
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
    type: action.UPDATE_POST_FAILURE,
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
    type: action.GET_POSTS_SUMMARY_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const getPostsSummary = (userId, postedBy, postedTo) => {
  console.log('check', userId)
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getPostsSummaryRequest())
    return fetch(
      config.URL_PREFIX +
        `/user/${userId}/postsSummary?postedBy=${postedBy}&postedTo=${postedTo}`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(getPostsSummarySuccess(data)))
      .catch(errors => dispatch(getPostsSummaryError(errors)))
  }
}

export const getPostsByUserRequest = () => {
  return {
    type: action.GET_POSTS_BY_USER_REQUEST,
    loading: true,
  }
}

export const getPostsByUserSuccess = posts => {
  return {
    type: action.GET_POSTS_BY_USER_SUCCESS,
    loading: false,
    data: posts,
  }
}

export const getPostsByUserError = errors => {
  return {
    type: action.GET_POSTS_BY_USER_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const getPostsByUser = (userId, postedBy, postedTo) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getPostsByUserRequest())
    return fetch(
      config.URL_PREFIX +
        `/post/user/${userId}?postedBy=${postedBy}&postedTo=${postedTo}`,
      options,
    )
      .then(response => response.json())
      .then(data => dispatch(getPostsByUserSuccess(data)))
      .catch(errors => dispatch(getPostsByUserError(errors)))
  }
}

export const getPostsPostedByUserRequest = () => {
  return {
    type: action.GET_USER_POSTS_SELF_REQUEST,
    loading: true,
  }
}

export const getPostsPostedByUserSuccess = posts => {
  return {
    type: action.GET_USER_POSTS_SELF_SUCCESS,
    loading: false,
    data: posts,
  }
}

export const getPostsPostedByUserError = errors => {
  return {
    type: action.GET_USER_POSTS_SELF_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const getPostsPostedByUser = userId => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getPostsPostedByUserRequest())
    return fetch(config.URL_PREFIX + `/post/user/posts/${userId}`, options)
      .then(response => response.json())
      .then(data => dispatch(getPostsPostedByUserSuccess(data)))
      .catch(errors => dispatch(getPostsPostedByUserError(errors)))
  }
}
