import {Map, fromJS} from 'immutable';
import * as action from './components/Types';
import config from '../../config';

export const getPostsByUserRequest = () => {
  return {
    type: action.GET_USER_POSTS_REQUEST,
    loading: true
  }
}

export const getPostsByUserSuccess = posts => {
  return {
    type: action.GET_USER_POSTS_SUCCESS,
    loading: false,
    data: posts
  }
}

export const getPostsByUserError = errors => {
  return {
    type: action.GET_USER_POSTS_FAILURE,
    loading: false,
    errors: errors
  }
}

export const getPostsByUser = userId => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  return dispatch => {
      dispatch(getPostsByUserRequest());
    return fetch(config.URL_PREFIX + `/post/user/${userId}`, options)
      .then(response => response.json())
      .then(data => dispatch(getPostsByUserSuccess(data)))
      .catch(errors => dispatch(getPostsByUserError(errors)))
  }
}

export const updateLikesRequest = () => {
  return {
    type: action.UPDATE_LIKES_REQUEST,
    loading: true
  }
}

export const updateLikesSuccess = postDetails => {
  return {
    type: action.UPDATE_LIKES_SUCCESS,
    loading: false,
    data: postDetails
  }
}

export const updateLikesError = errors => {
  return {
    type: action.UPDATE_LIKES_FAILURE,
    loading: false,
    errors: errors
  }
}

export const updateLikes = (userId, postId) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  };
  return dispatch => {
      dispatch(updateLikesRequest());
    return fetch(config.URL_PREFIX + `/post/likes/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(updateLikesSuccess(data)))
      .catch(errors => dispatch(updateLikesError(errors)))
  }
}

export const updateDisLikesRequest = () => {
  return {
    type: action.UPDATE_DIS_LIKES_REQUEST,
    loading: true
  }
}

export const updateDisLikesSuccess = postDetails => {
  return {
    type: action.UPDATE_DIS_LIKES_SUCCESS,
    loading: false,
    data: postDetails
  }
}

export const updateDisLikesError = errors => {
  return {
    type: action.UPDATE_DIS_LIKES_FAILURE,
    loading: false,
    errors: errors
  }
}

export const updateDisLikes = (userId, postId) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  };
  return dispatch => {
      dispatch(updateDisLikesRequest());
    return fetch(config.URL_PREFIX + `/post/disLikes/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(updateDisLikesSuccess(data)))
      .catch(errors => dispatch(updateDisLikesError(errors)))
  }
}


export const getPostsPostedByUserRequest = () => {
  return {
    type: action.GET_USER_POSTS_SELF_REQUEST,
    loading: true
  }
}

export const getPostsPostedByUserSuccess = posts => {
  return {
    type: action.GET_USER_POSTS_SELF_SUCCESS,
    loading: false,
    data: posts
  }
}

export const getPostsPostedByUserError = errors => {
  return {
    type: action.GET_USER_POSTS_SELF_FAILURE,
    loading: false,
    errors: errors
  }
}

export const getPostsPostedByUser = userId => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  return dispatch => {
      dispatch(getPostsPostedByUserRequest());
    return fetch(config.URL_PREFIX + `/post/user/posts/${userId}`, options)
      .then(response => response.json())
      .then(data => dispatch(getPostsPostedByUserSuccess(data)))
      .catch(errors => dispatch(getPostsPostedByUserError(errors)))
  }
}