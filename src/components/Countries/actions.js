import * as action from './types'

import config from '../../config'

export const getRegionsRequest = () => {
  return {
    type: action.GET_REGIONS_REQUEST,
    loading: true,
  }
}

export const getRegionsSuccess = res => {
  return {
    type: action.GET_REGIONS_SUCCESS,
    loading: false,
    data: res,
  }
}

export const getRegionsError = errors => {
  return {
    type: action.GET_REGIONS_ERROR,
    loading: false,
    errors: errors,
  }
}

export const getRegions = () => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  return dispatch => {
    dispatch(getRegionsRequest())
    return fetch(config.URL_PREFIX + `/general/regions`, options)
      .then(response => response.json())
      .then(data => dispatch(getRegionsSuccess(data)))
      .catch(errors => dispatch(getRegionsError(errors)))
  }
}
