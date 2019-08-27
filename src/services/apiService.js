import {
  API_HEADER_KEY,
  API_HEADER_VALUE
} from '../constants/config';
import SpinnerService from './spinnerService';
import { store } from '../stores/reducers';
import toasts from '../utils/toast';
import I18n from '../i18n/i18n';

export default class ApiService {
  getApi = (url, params, hasToken) => this.runApi('GET', url, null, params, hasToken)

  deleteApi = (url, params, hasToken) => this.runApi('DELETE', url, null, params, hasToken)

  putApi = (url, data, params, hasToken) => this.runApi('PUT', url, data, params, hasToken)

  postApi = (url, data, params, hasToken) => this.runApi('POST', url, data, params, hasToken)

  runApi = (method, url, data, params, hasToken) => {
    // check network
    const { app } = store.getState();
    const { isConnected } = app;
    if (!isConnected) {
      return new Promise((resolve) => {
        resolve({ success: false, message: I18n.t('app.network_disconnected') });
      });
    }

    // start spinner
    SpinnerService.start(store);

    // config header
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      LANGUAGE: app.language,
      [API_HEADER_KEY]: API_HEADER_VALUE
    };

    // check if have token
    if (hasToken) {
      const { currentUser } = store.getState();
      headers.Authorization = `Bearer ${currentUser.token}`;
    }

    // check if have params
    let urlTemp = url;
    if (params) {
      let formParam = [];

      Object.keys(params).forEach((key) => {
        formParam.push(`${key}=${params[key]}`);
      });

      formParam = formParam.join('&');
      urlTemp += `?${formParam}`;
    }

    // setup method, header
    let config = {};
    switch (method) {
      case 'GET': {
        config = {
          method,
          headers
        };
        break;
      }
      case 'DELETE': {
        config = {
          method,
          headers
        };
        break;
      }
      case 'POST': {
        config = {
          method,
          headers,
          body: JSON.stringify(data)
        };
        break;
      }
      case 'PUT': {
        config = {
          method,
          headers,
          body: JSON.stringify(data)
        };
        break;
      }
      default: {
        config = {
          method,
          headers
        };
        break;
      }
    }

    return new Promise((resolve) => {
      fetch(urlTemp, config)
        .then(response => response.json())
        .then((responseJson) => {
          /** start spinner */
          SpinnerService.stop(store);

          if (responseJson.error) {
            toasts.danger(responseJson.error);
            return resolve({ success: false, message: responseJson.error });
          }

          return resolve(responseJson);
        })
        .catch((error) => {
          /** stop spinner */
          SpinnerService.stop(store);

          resolve({ success: false, message: error });
        });
    });
  }
}
