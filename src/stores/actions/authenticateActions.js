import * as ActionTypes from './actionTypes';

export const setUser = data => ({
  type: ActionTypes.AUTH_SET_USER,
  data
});

export const setToken = data => ({
  type: ActionTypes.AUTH_SET_TOKEN,
  data
});

export const clearUser = () => ({
  type: ActionTypes.AUTH_CLEAR_USER
});
