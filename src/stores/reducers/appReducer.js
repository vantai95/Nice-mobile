import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  isConnected: true,
  language: 'en',
  deviceToken: ''
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.APP_START_LOADING: {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case ActionTypes.APP_STOP_LOADING: {
      return Object.assign({}, state, {
        loading: false
      });
    }
    case ActionTypes.APP_NETWORK_CONNECTED: {
      return Object.assign({}, state, {
        isConnected: true
      });
    }
    case ActionTypes.APP_NETWORK_DISCONNECTED: {
      return Object.assign({}, state, {
        isConnected: false
      });
    }
    case ActionTypes.APP_SET_LANGUAGE: {
      return Object.assign({}, state, {
        language: action.data.language
      });
    }
    case ActionTypes.APP_SET_DEVICE_TOKEN: {
      return Object.assign({}, state, {
        deviceToken: action.data.deviceToken
      });
    }
    default: {
      return state;
    }
  }
};

export default app;
