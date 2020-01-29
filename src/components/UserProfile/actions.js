import * as action from './components/Types'
import config from '../../config'

export const updateLikeInReactionRequest = () => {
  return {
    type: action.UPDATE_LIKES_REQUEST,
    loading: true,
  }
}

export const createOrUpdateReactionSuccess = postDetails => {
  return {
    type: action.UPDATE_LIKES_SUCCESS,
    loading: false,
    data: postDetails,
  }
}

export const createOrUpdateReactionError = errors => {
  return {
    type: action.UPDATE_LIKES_FAILURE,
    loading: false,
    errors: errors,
  }
}

export const createOrUpdateReaction = (userId, postId) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  }
  return dispatch => {
    dispatch(createOrUpdateReactionRequest())
    return fetch(config.URL_PREFIX + `/post/reaction/${postId}`, options)
      .then(response => response.json())
      .then(data => dispatch(createOrUpdateReactionSuccess(data)))
      .catch(errors => dispatch(createOrUpdateReactionError(errors)))
  }
}

// export const updateDisLikesRequest = () => {
//   return {
//     type: action.UPDATE_DIS_LIKES_REQUEST,
//     loading: true,
//   }
// }

// export const updateDisLikesSuccess = postDetails => {
//   return {
//     type: action.UPDATE_DIS_LIKES_SUCCESS,
//     loading: false,
//     data: postDetails,
//   }
// }

// export const updateDisLikesError = errors => {
//   return {
//     type: action.UPDATE_DIS_LIKES_FAILURE,
//     loading: false,
//     errors: errors,
//   }
// }

// export const updateDisLikes = (userId, postId) => {
//   const options = {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ userId }),
//   }
//   return dispatch => {
//     dispatch(updateDisLikesRequest())
//     return fetch(config.URL_PREFIX + `/post/disLikes/${postId}`, options)
//       .then(response => response.json())
//       .then(data => dispatch(updateDisLikesSuccess(data)))
//       .catch(errors => dispatch(updateDisLikesError(errors)))
//   }
// }
