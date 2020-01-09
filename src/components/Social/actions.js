// import {Map, fromJS} from 'immutable';
// import * as action from '../constants/actionTypes';
// import config from '../config';

// export const createUserRequest = () => {
//   return {
//     type: CREATE_USER_REQUEST,
//     loading: true
//   }
// }

// export const createUserSuccess = user => {
//   return {
//     type: CREATE_USER_SUCCESS,
//     loading: false,
//     user
//   }
// }

// export const createUserError = errors => {
//   return {
//     type: CREATE_USER_FAILURE,
//     loading: false,
//     errors: errors
//   }
// }



// export const createUser = data => {
// 	const options = {
// 	  method: "POST",
// 	  headers: { "Content-Type": "application/json" },
// 	  body: JSON.stringify(data)
// 	};
// 	return async dispatch => {
// 	    dispatch(createUserRequest());
// 		return await fetch(config.URL_PREFIX + '/user/create', options)
// 		  .then(response => response.json())
// 		  .then(data => dispatch(createUserSuccess(res.data)))
// 	      .catch(errors => {
// 	        dispatch(createUserError(errors))
// 	      })
// 	}
// }