import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  cart: {
    items: [],
    sub_total: 0,
    payment: '',
    promotion: 0,
    voucher: null,
    order_note: '',
    restaurant: 'oh-my-meal',
    restaurant_id: 0,
    service: '',
    delivery_fee: 0,
    order_total: 0,
    total_item: 0,
    tax: 0,
    tax_bill: 0,
    checkbill: 0,
    tax_type: -1,
    promotions: []
  },
  restaurant: {
    id: 0,
    delivery: null,
    pickup: null,
    cod_payment: null,
    online_payment: null,
    minOrderAmount: 0,
    deliveryCost: 0,
    phone: '',
    email: '',
    address: '',
    name: '',
    take_red_bill: 0,
    exchange_rate: 0
  },
  dishesChangedList: [],
  dishesDisappearList: []
};

const restaurant = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RESTAURANT_INIT_CART: {
      /** if select different restaurant -> reset cart */

      /** get current restaurant id */
      const currentRestaurantId = state.cart.restaurant_id;

      /** get new restaurant id */
      const newRestaurantId = action.data.cart.restaurant_id;

      if (currentRestaurantId !== newRestaurantId) {
        return Object.assign({}, state, {
          cart: action.data.cart
        });
      }
      return state;
    }
    case ActionTypes.RESTAURANT_ADD_CART: {
      return Object.assign({}, state, {
        cart: action.data.cart
      });
    }
    case ActionTypes.RESTAURANT_SET_RESTAURANT: {
      /** if have only service or payment method -> auto select one */
      const currentCart = state.cart;
      const currentRestaurant = state.restaurant;
      const {
        delivery, pickup, codPayment, onlinePayment
      } = action.data.restaurant;

      if (currentRestaurant.delivery !== delivery
        || currentRestaurant.pickup !== pickup
        || currentRestaurant.cod_payment !== codPayment
        || currentRestaurant.online_payment !== onlinePayment) {
        currentCart.payment = '';
        currentCart.service = '';
      }

      return Object.assign({}, state, {
        restaurant: action.data.restaurant,
        cart: currentCart
      });
    }
    case ActionTypes.RESTAURANT_REMOVE_ALL_CART: {
      return Object.assign({}, state, {
        cart: initialState.cart
      });
    }
    case ActionTypes.RESTAURANT_CART_SET_DISHES_CHANGED_LIST: {
      return Object.assign({}, state, {
        dishesChangedList: action.data.dishesChangedList
      });
    }
    case ActionTypes.RESTAURANT_CART_REMOVE_DISHES_CHANGED_LIST: {
      return Object.assign({}, state, {
        dishesChangedList: []
      });
    }
    case ActionTypes.RESTAURANT_CART_SET_DISHES_DISAPPEAR: {
      return Object.assign({}, state, {
        dishesDisappearList: action.data.dishesDisappearList
      });
    }
    case ActionTypes.RESTAURANT_CART_REMOVE_DISHES_DISAPPEAR: {
      return Object.assign({}, state, {
        dishesDisappearList: []
      });
    }
    case ActionTypes.RESTAURANT_CART_REFACTOR: {
      const currentCart = state.cart;

      const newItems = currentCart.items.filter(item => item.free_item === 0);
      currentCart.items = newItems;
      return Object.assign({}, state, {
        cart: currentCart
      });
    }
    default: {
      return state;
    }
  }
};

export default restaurant;
