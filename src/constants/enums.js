import I18n from '../i18n/i18n';

const CHECKOUT_TITLE = [
  { value: 0, label: I18n.t('enums.checkout.title.ms') },
  { value: 1, label: I18n.t('enums.checkout.title.mr') }
];

const CHECKOUT_RESIDENCE_TYPE = [
  { value: 'house', label: I18n.t('enums.checkout.residence_type.house') },
  { value: 'building', label: I18n.t('enums.checkout.residence_type.building') },
  { value: 'compound', label: I18n.t('enums.checkout.residence_type.compound') },
  { value: 'hotel', label: I18n.t('enums.checkout.residence_type.hotel') },
];

const CHECKOUT_PAYMENT_AMOUNT = [
  { value: 1, label: '100.000 VND' },
  { value: 2, label: '200.000 VND' },
  { value: 5, label: '500.000 VND' },
  { value: 10, label: '1.000.000 VND' }
];

const CHECKOUT_DELIVERY_TIME = [
  { value: 'asap', label: I18n.t('enums.checkout.delivery_time.possible') },
  { value: 'other', label: I18n.t('enums.checkout.delivery_time.other') },
];

const STATUSES_FILTER = [
  { value: '0', label: I18n.t('enums.filter.status.polular') },
  { value: '1', label: I18n.t('enums.filter.status.new') },
  { value: '2', label: I18n.t('enums.filter.status.promotion') },
  { value: '3', label: I18n.t('enums.filter.status.high_quality') },
  { value: '4', label: I18n.t('enums.filter.status.no_status') }
];

const SERVICES_FILTER = [
  { value: 'delivery', label: I18n.t('enums.filter.service.delivery') },
  { value: 'pickup', label: I18n.t('enums.filter.service.pickup') }
];

const PAYMENTS_FILTER = [
  { value: 'cod_payment', label: I18n.t('enums.filter.payment_method.cod') },
  { value: 'online_payment', label: I18n.t('enums.filter.payment_method.online') }
];

const SORT_FILTER = [
  { value: 0, label: I18n.t('enums.filter.sort.no_sort') },
  { value: 1, label: I18n.t('enums.filter.sort.ranking') },
  { value: 2, label: I18n.t('enums.filter.sort.min_order') },
  { value: 3, label: I18n.t('enums.filter.sort.delivery_fee') },
  { value: 4, label: I18n.t('enums.filter.sort.name') }
];

/**
 * Value of Sorting
 */
const SORT = {
  NO_SORT: 0,
  RANKING: 1,
  MIN_ORDER_AMOUNT: 2,
  DELIVERY_FEE: 3,
  NAME: 4
};

/**
 * Status of restaurant
 */
const RESTAURANT_STATUSES = {
  CLOSED: 0,
  OPEN: 1
};

/**
 * Cart
 */
const CART = {
  SERVICE_DELIVERY: 1,
  SERVICE_PICKUP: 2,
  PAYMENT_COD: 1,
  PAYMENT_ONLINE: 2
};

/**
 * Option op customization
 */
const CART_OPTIONS = {
  SINGLE: 1,
  MULTIPLE: 2
};

/**
 * Can change quantity for dish customization
 */
const CART_CHANGE_QUANTITY = {
  NO_CHANGE: 0,
  CAN_CHANGE: 1
};

/**
 * Status of restaurant
 */
const STATUSES = {
  POLULAR: 'polular',
  NEW: 'new',
  PROMOTION: 'promotion',
  HIGH_QUALITY: 'high quality',
  NO_STATUS: 'no status'
};

/**
 * Status of Order
 */
const ORDER_STATUSES = [
  { value: 0, label: I18n.t('order_history.status.new') },
  { value: 1, label: I18n.t('order_history.status.received') },
  { value: 2, label: I18n.t('order_history.status.admin_accepted') },
  { value: 3, label: I18n.t('order_history.status.accepted') },
  { value: 4, label: I18n.t('order_history.status.rejected') },
  { value: 5, label: I18n.t('order_history.status.going') },
  { value: 6, label: I18n.t('order_history.status.delivered') },
  { value: 7, label: I18n.t('order_history.status.finished') },
  { value: 8, label: I18n.t('order_history.status.canceled') },
];

/**
 * Promotion Type
 */
const PROMOTION_TYPES = {
  PERCENT: 0,
  VALUE: 1,
  FREE_ITEM: 2
};

export default {
  STATUSES_FILTER,
  SERVICES_FILTER,
  PAYMENTS_FILTER,
  SORT_FILTER,
  SORT,
  RESTAURANT_STATUSES,
  STATUSES,

  CHECKOUT_TITLE,
  CHECKOUT_DELIVERY_TIME,
  CHECKOUT_PAYMENT_AMOUNT,
  CHECKOUT_RESIDENCE_TYPE,

  CART,
  CART_OPTIONS,
  CART_CHANGE_QUANTITY,
  ORDER_STATUSES,
  PROMOTION_TYPES
};
