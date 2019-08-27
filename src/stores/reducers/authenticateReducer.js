import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  id: '',
  name: '',
  email: '',
  token: '',
  gender: null,
  phone: ''
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_SET_USER: {
      return Object.assign({}, state, {
        id: action.data.id,
        name: action.data.name,
        email: action.data.email,
        token: action.data.token,
        gender: action.data.gender,
        phone: action.data.phone
      });
    }
    case ActionTypes.AUTH_SET_TOKEN: {
      return Object.assign({}, state, {
        id: '',
        name: '',
        email: '',
        token: action.data.token,
        gender: null,
        phone: ''
      });
    }
    case ActionTypes.AUTH_CLEAR_USER: {
      return Object.assign({}, state, {
        id: '',
        name: '',
        email: '',
        token: '',
        gender: null,
        phone: ''
      });
    }
    default: {
      return state;
    }
  }
};

export default currentUser;
