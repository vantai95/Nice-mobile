import ApiService from './apiService';
import { NGANLUONG, API_URL } from '../constants/config';

export default class NganLuongService extends ApiService {
  encryptData = data => this.postApi(`${API_URL}/encrypt-data`, data, false, false)

  decryptData = data => this.postApi(`${API_URL}/decrypt-data`, data, false, false)

  sendOrder = data => this.postApi(NGANLUONG.MAIN_URL + NGANLUONG.REQUEST_ORDER_URL, data, false, false)
}
