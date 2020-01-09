import {Map, fromJS} from 'immutable';
import * as action from '../../constants/actionTypes';
import config from '../../config';

export const deletePostRequest = () => {
  return {
    type: action.DELETE_POST_REQUEST,
    loading: true
  }
}

export const deletePostSuccess = data => {
  return {
    type: action.DELETE_POST_SUCCESS,
    loading: false,
    data: data
  }
}

export const deletePostError = errors => {
  return {
    type: action.DELETE_POST_FAILURE,
    loading: false,
    errors: errors
  }
}

export const deletePost = postId => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  return dispatch => {
      dispatch(deletePostRequest());
    return fetch(config.URL_PREFIX + `/post/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(deletePostSuccess(data)))
      .catch(errors => dispatch(deletePostError(errors)))
  }
}

export const updatePostRequest = () => {
  return {
    type: action.UPDATE_POST_REQUEST,
    loading: true
  }
}

export const updatePostSuccess = data => {
  return {
    type: action.UPDATE_POST_SUCCESS,
    loading: false,
    data: data
  }
}

export const updatePostError = errors => {
  return {
    type: action.UPDATE_POST_FAILURE,
    loading: false,
    errors: errors
  }
}

export const updatePost = (postId, post) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  };
  return dispatch => {
      dispatch(updatePostRequest());
    return fetch(config.URL_PREFIX + `/post/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(updatePostSuccess(data)))
      .catch(errors => dispatch(updatePostError(errors)))
  }
}