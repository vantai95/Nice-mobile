import * as ActionTypes from './actionTypes';

export const setLocation = data => ({
  type: ActionTypes.HOME_SET_LOCATION,
  data
});

export const setLocations = data => ({
  type: ActionTypes.HOME_SET_LOCATIONS,
  data
});

export const setFilterParam = data => ({
  type: ActionTypes.HOME_SET_FILTER_PARAM,
  data
});
