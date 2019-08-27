import { Buffer } from 'buffer';
import { PAYPAL } from '../constants/config';
import { store } from '../stores/reducers';
import SpinnerService from './spinnerService';

export default class PaypalService {
  checkAuthentication = () => {
    /**
     * Url authentication
     */
    const url = `${PAYPAL.URL}/v1/oauth2/token`;

    /**
     * init header key, header value
     */
    const dataDetail = {
      [PAYPAL.KEY]: PAYPAL.VALUE
    };

    /**
     * convert object -> &key=value
     */
    let formBody = [];
    Object.keys(dataDetail).forEach((key) => {
      formBody.push(`${key}=${dataDetail[key]}`);
    });
    formBody = formBody.join('&');

    /**
     * encrypt CLIENT_ID and SECRET => base64
     */
    const encryptedCredentials = Buffer.from(`${PAYPAL.CLIENT_ID}:${PAYPAL.SECRET}`).toString('base64');

    /**
     * config method, header
     */
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encryptedCredentials}`
      },
      body: formBody
    };

    /**
     * call api
     */
    return this.runApi(url, config);
  }

  reviewPayment = (accessToken, total) => {
    /**
     * Url review payment (create order)
     */
    const url = `${PAYPAL.URL}/v1/payments/payment`;

    /**
     * Data init
     */
    const dataDetail = {
      intent: PAYPAL.INTENT,
      payer: {
        payment_method: PAYPAL.PAYMENT_METHOD
      },
      transactions: [
        {
          amount: {
            total,
            currency: PAYPAL.CURRENCY,
            details: {
              subtotal: total
            }
          },
          description: 'Payment of purchase invoices.',
          item_list: null
        }
      ],
      note_to_payer: 'Contact us for any questions on your order.',
      redirect_urls: {
        return_url: PAYPAL.RETURN_URL,
        cancel_url: PAYPAL.CANCEL_URL
      }
    };

    /**
     * config method, header
     */
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(dataDetail)
    };

    /**
     * call api
     */
    return this.runApi(url, config);
  }

  executePayment = (accessToken, url, payerId) => {
    /**
     * init data
     */
    const dataDetail = JSON.stringify({ payer_id: payerId });

    /**
     * config method, header
     */
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: dataDetail
    };

    /**
     * call api
     */
    return this.runApi(url, config);
  }

  runApi = (url, config) => {
    SpinnerService.start(store);

    return new Promise((resolve) => {
      fetch(url, config)
        .then(response => response.json())
        .then((responseJson) => {
          SpinnerService.stop(store);
          return resolve(responseJson);
        })
        .catch(() => {
          SpinnerService.stop(store);
          resolve({ success: false });
        });
    });
  }
}
