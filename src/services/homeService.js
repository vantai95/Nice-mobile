import ApiService from './apiService';
import { API_URL } from '../constants/config';

export default class HomeService extends ApiService {
  getLocations = () => this.getApi(`${API_URL}/provinces-and-districts`, false, false)

  getFilterParam = () => this.getApi(`${API_URL}/get-filter-list`, false, false)
}
