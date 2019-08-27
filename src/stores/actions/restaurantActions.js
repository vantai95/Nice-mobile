import * as ActionTypes from './actionTypes';

export const initCart = data => ({
  type: ActionTypes.RESTAURANT_INIT_CART,
  data
});

export const addCart = data => ({
  type: ActionTypes.RESTAURANT_ADD_CART,
  data
});

export const removeAllCart = () => ({
  type: ActionTypes.RESTAURANT_REMOVE_ALL_CART
});

export const setRestaurant = data => ({
  type: ActionTypes.RESTAURANT_SET_RESTAURANT,
  data
});

export const setDishesChangedList = data => ({
  type: ActionTypes.RESTAURANT_CART_SET_DISHES_CHANGED_LIST,
  data
});

export const removeDishesChangedList = () => ({
  type: ActionTypes.RESTAURANT_CART_REMOVE_DISHES_CHANGED_LIST
});

export const setDishesDisappear = data => ({
  type: ActionTypes.RESTAURANT_CART_SET_DISHES_DISAPPEAR,
  data
});

export const removeDishesDisapper = () => ({
  type: ActionTypes.RESTAURANT_CART_REMOVE_DISHES_DISAPPEAR
});

export const refactorCart = () => ({
  type: ActionTypes.RESTAURANT_CART_REFACTOR
});
