import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  extraInfos: [],
  haveChanged: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.USER_SET_EXTRA_INFOS: {
      return Object.assign({}, state, {
        extraInfos: action.data.extraInfos
      });
    }
    case ActionTypes.USER_UPDATE_INFO: {
      return Object.assign({}, state, {
        haveChanged: !state.haveChanged
      });
    }
    default: {
      return state;
    }
  }
};

export default user;
