import ApiService from './apiService';
import { API_URL } from '../constants/config';

export default class AuthService extends ApiService {
  login = data => this.postApi(`${API_URL}/login`, data, false, false)

  loginGoogle = data => this.postApi(`${API_URL}/gg-authenticate`, data, false, false)

  loginFacebook = data => this.postApi(`${API_URL}/fb-authenticate`, data, false, false)

  verifyLogin = () => this.getApi(`${API_URL}/verify-login`, false, true)

  register = data => this.postApi(`${API_URL}/register`, data, false, false)

  forgotPassword = data => this.postApi(`${API_URL}/password/create`, data, false, false)

  changePassword = data => this.postApi(`${API_URL}/change-password`, data, false, true)

  logout = () => this.postApi(`${API_URL}/logout`, {}, false, true)
}
