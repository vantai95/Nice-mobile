import * as ActionTypes from './actionTypes';

export const startLoading = () => ({
  type: ActionTypes.APP_START_LOADING
});

export const stopLoading = () => ({
  type: ActionTypes.APP_STOP_LOADING
});

export const setNetworkConnected = () => ({
  type: ActionTypes.APP_NETWORK_CONNECTED
});

export const setNetworkDisConnected = () => ({
  type: ActionTypes.APP_NETWORK_DISCONNECTED
});

export const setLanguage = data => ({
  type: ActionTypes.APP_SET_LANGUAGE,
  data
});

export const setDeviceToken = data => ({
  type: ActionTypes.APP_SET_DEVICE_TOKEN,
  data
});
