/* eslint-disable global-require */
// THEME
import variables from '../theme/variables/version_01';

export const THEME = variables;

// API
export const API_URL = 'http://192.168.1.207:8000/api';
export const API_HEADER_KEY = 'CLI-HEADER';
export const API_HEADER_VALUE = 'NiceMeal@imt2019';

// OTP
export const OTP_KEY = 'NM-';
export const OTP_TIME_EXPIRED = 60;

// TOAST
export const TOAST_DURATION = 6000;

// GOOGLE LOGIN
export const ANDROID_CLIENT_ID = '255968256043-cv84rkr8306gutneik223jokldoaqkc1.apps.googleusercontent.com';
export const IOS_CLIENT_ID = '255968256043-4n3bnk6m65hgqf96cjqvs31uj9mk0ujc.apps.googleusercontent.com';

// FACEBOOK LOGIN
export const FACEBOOK_APP_ID = '396880247545381';

// PAYPAL PAYMENT
export const PAYPAL = {
  URL: 'https://api.sandbox.paypal.com',
  KEY: 'grant_type',
  VALUE: 'client_credentials',
  CLIENT_ID: 'AfdWv3Aibw40kZXaRukB6BDD6QE5NJc2s04OX2grwOWdR-fUpoGsezI4pfJytMxBGau0fZNVosk5K16R',
  SECRET: 'EFSxdTf4aUOqveYges6rmFItcCeQhczgXhG3Uj6IuZ7GoUE_saEZO1HHUZTZZKus6nOvW-FwK_L-ic9T',
  INTENT: 'sale',
  PAYMENT_METHOD: 'paypal',
  CURRENCY: 'USD',
  RETURN_URL: 'http://localhost:8000/return',
  CANCEL_URL: 'http://localhost:8000/cancel'
};

// NGANLUONG PAYMENT
export const NGANLUONG = {
  MAIN_URL: 'https://alepay-sandbox.nganluong.vn',
  REQUEST_ORDER_URL: '/checkout/v1/request-order',
  TOKEN: 'V6LiRbc9wnaweJzYs9hFfZWOKoCbND',
  CHECKSUM_KEY: 'Sw7YWJcElyiXYabKNlRY24Y8PSJgys',
  ENCRYPT_KEY: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfWK3V1TFYvWsnasum+99T0lBalRzE4ddShqHkOYvpELGK/kSdqFZ+7nLRPGnmbPCUUSLVE1CaacxTa7rbYMheh+zgh3U1oJkQvW9pbzxfo15jzgjurWdru3CfGcJ94spvE+8aZ8zJT+PXOFnznztG8uHgoaptHD5+tsdxPuAzXQIDAQAB',
  CURRENCY: 'VND',
  RETURN_URL: 'http://localhost:8000/return',
  CANCEL_URL: 'http://localhost:8000/cancel'
};
