import _ from 'lodash';
import ApiService from './apiService';
import { API_URL } from '../constants/config';

export default class RestaurantService extends ApiService {
  getRestaurantInfo = (restaurantId, districtId, wardId) => {
    const params = {
      restaurant_id: restaurantId,
      district_id: districtId
    };

    if (wardId) {
      params.ward_id = wardId;
    }

    return this.getApi(`${API_URL}/get-restaurant-info`, params, false);
  }

  searchRestaurant = (districtId, wardId, resultFilter, segIdx) => {
    let params = {};
    const cuisines = resultFilter.listCuisinesSelected[0] === 0;
    const categorys = resultFilter.listCategoriesSelected[0] === 0;

    params = {
      segIdx,
      district_id: districtId || '',
      ward_id: wardId || '',
      cuisine: cuisines ? 'all' : _.join(resultFilter.listCuisinesSelected, ','),
      category: categorys ? 'all' : _.join(resultFilter.listCategoriesSelected, ','),
      status: _.join(resultFilter.listStatusSelected, ','),
      services: _.join(resultFilter.listServiceSelected, ','),
      payment_methods: _.join(resultFilter.listPaymentSelected, ',')
    };

    return this.getApi(`${API_URL}/search-restaurants`, params, false);
  }

  addToCart = data => this.postApi(`${API_URL}/add-to-cart`, data, false, false)

  subtractFromCart = data => this.postApi(`${API_URL}/subtract-from-cart`, data, false, false)

  updateCart = data => this.postApi(`${API_URL}/update-cart`, data, false, false)

  checkout = data => this.postApi(`${API_URL}/checkout`, data, false, true)

  checkVoucher = data => this.postApi(`${API_URL}/check-voucher`, data, false, false)

  confirmOtp = data => this.postApi(`${API_URL}/confirm-otp`, data, false, true)

  resendOtp = data => this.postApi(`${API_URL}/resend-otp`, data, false, true)

  savePaymentInfo = data => this.postApi(`${API_URL}/save-payment-info`, data, false, true)
}
