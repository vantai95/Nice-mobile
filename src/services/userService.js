import ApiService from './apiService';
import { API_URL } from '../constants/config';

export default class UserService extends ApiService {
  getMyInfo = () => this.getApi(`${API_URL}/my-contact-info`, false, true)

  updateMainInfo = data => this.postApi(`${API_URL}/update-main-contact-info`, data, false, true)

  addInfo = data => this.postApi(`${API_URL}/create-my-contact-info`, data, false, true)

  updateInfo = (id, data) => this.postApi(`${API_URL}/update-my-contact-info/${id}`, data, false, true)

  deleteInfo = id => this.postApi(`${API_URL}/delete-my-contact-info/${id}`, null, false, true)

  getOrderHistory = () => this.getApi(`${API_URL}/my-order-histories`, false, true)
}
