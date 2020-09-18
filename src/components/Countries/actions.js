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

export const createOrUpdateCountryReactionRequest = () => {
  return {
    type: action.CREATE_OR_UPDATE_COUNTRY_REACTION_REQUEST,
    loading: true,
  }
}

export const createOrUpdateCountryReactionSuccess = res => {
  return {
    type: action.CREATE_OR_UPDATE_COUNTRY_REACTION_SUCCESS,
    loading: false,
    data: res,
  }
}

export const createOrUpdateCountryReactionError = errors => {
  return {
    type: action.CREATE_OR_UPDATE_COUNTRY_REACTION_ERROR,
    loading: false,
    errors: errors,
  }
}

export const createOrUpdateCountryReaction = data => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return dispatch => {
    dispatch(createOrUpdateCountryReactionRequest())
    return fetch(config.URL_PREFIX + `/general/country/reaction`, options)
      .then(response => response.json())
      .then(data => dispatch(createOrUpdateCountryReactionSuccess(data)))
      .catch(errors => dispatch(createOrUpdateCountryReactionError(errors)))
  }
}
