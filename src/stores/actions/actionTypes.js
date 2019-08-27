/** use for set loading is start or stop */
export const APP_START_LOADING = 'APP_START_LOADING';
export const APP_STOP_LOADING = 'APP_STOP_LOADING';

/** use for set value isConnected: check network connected or disconnected */
export const APP_NETWORK_CONNECTED = 'APP_NETWORK_CONNECTED';
export const APP_NETWORK_DISCONNECTED = 'APP_NETWORK_DISCONNECTED';

/** use for set language */
export const APP_SET_LANGUAGE = 'APP_SET_LANGUAGE';

/** set device token, use for push notification */
export const APP_SET_DEVICE_TOKEN = 'APP_SET_DEVICE_TOKEN';

/** set user data when login or logout */
export const AUTH_SET_USER = 'AUTH_SET_USER';
export const AUTH_CLEAR_USER = 'AUTH_CLEAR_USER';
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';

/** set location user selected */
export const HOME_SET_LOCATION = 'HOME_SET_LOCATION';
export const HOME_SET_LOCATIONS = 'HOME_SET_LOCATIONS';

/** set params when open app (params get from api) */
export const HOME_SET_FILTER_PARAM = 'HOME_SET_FILTER_PARAM';

/** set initial cart */
export const RESTAURANT_INIT_CART = 'RESTAURANT_INIT_CART';
export const RESTAURANT_ADD_CART = 'RESTAURANT_ADD_CART';
export const RESTAURANT_REMOVE_ALL_CART = 'RESTAURANT_REMOVE_ALL_CART';

/** save list dish changed, use for update cart when dish changed about price...
 *  after update, remove list dish */
export const RESTAURANT_CART_SET_DISHES_CHANGED_LIST = 'RESTAURANT_CART_SET_DISHES_CHANGED_LIST';
export const RESTAURANT_CART_REMOVE_DISHES_CHANGED_LIST = 'RESTAURANT_CART_REMOVE_DISHES_CHANGED_LIST';

/** save list dish changed, use for update cart when disappear changed about price...
 *  after update, remove list dish */
export const RESTAURANT_CART_SET_DISHES_DISAPPEAR = 'RESTAURANT_CART_SET_DISHES_DISAPPEAR';
export const RESTAURANT_CART_REMOVE_DISHES_DISAPPEAR = 'RESTAURANT_CART_REMOVE_DISHES_DISAPPEAR';

/** use for update cart, change free item to item in cart when checkout */
export const RESTAURANT_CART_REFACTOR = 'RESTAURANT_CART_REFACTOR';

/** set restaurant user selected */
export const RESTAURANT_SET_RESTAURANT = 'RESTAURANT_SET_RESTAURANT';

/** set extra info */
export const USER_SET_EXTRA_INFOS = 'USER_SET_EXTRA_INFOS';

/** set user have been changed, use for recall api get user info */
export const USER_UPDATE_INFO = 'USER_UPDATE_INFO';
