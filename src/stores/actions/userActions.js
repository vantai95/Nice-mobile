import * as ActionTypes from './actionTypes';

export const setExtraInfos = data => ({
  type: ActionTypes.USER_SET_EXTRA_INFOS,
  data
});

export const updateInfo = () => ({
  type: ActionTypes.USER_UPDATE_INFO
});
