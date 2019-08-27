import { createStore, combineReducers } from 'redux';

// import reducer
import currentUser from './authenticateReducer';
import app from './appReducer';
import home from './homeReducer';
import restaurant from './restaurantReducer';
import user from './userReducer';

// create store
export const store = createStore(
  combineReducers({
    currentUser,
    app,
    home,
    restaurant,
    user
  })
);
