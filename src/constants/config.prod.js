/* eslint-disable global-require */
// THEME
import variables from '../theme/variables/version_01';

export const THEME = variables;

// API
export const API_URL = 'http://nice-meal.herokuapp.com/api';
export const API_HEADER_KEY = 'CLI-HEADER';
export const API_HEADER_VALUE = 'NiceMeal@imt2019';

// OTP
export const OTP_KEY = 'NM-';
export const OTP_TIME_EXPIRED = 60;

// TOAST
export const TOAST_DURATION = 5000;

// GOOGLE LOGIN
export const ANDROID_CLIENT_ID = '255968256043-cv84rkr8306gutneik223jokldoaqkc1.apps.googleusercontent.com';
export const IOS_CLIENT_ID = '255968256043-4n3bnk6m65hgqf96cjqvs31uj9mk0ujc.apps.googleusercontent.com';

// FACEBOOK LOGIN
export const FACEBOOK_APP_ID = '217433132498337';

// PAYPAL PAYMENT
export const PAYPAL = {
  URL: 'https://api.paypal.com',
  KEY: 'grant_type',
  VALUE: 'client_credentials',
  CLIENT_ID: 'AV_wHbb7Zl7L9TUb41tVZXwkAhz0qraXLPHIYdQsct-aqma4iiTzt14SdbduPYRqFyo8MFL1iojW3EWk',
  SECRET: 'EJzz6TwRMEdvhMJu2BU5zp3go3quMT4BtLc2JGsr9pSARPzv1464_f841fQUThZrmEOK43OOko3kApOR',
  INTENT: 'sale',
  PAYMENT_METHOD: 'paypal',
  CURRENCY: 'USD',
  RETURN_URL: 'http://localhost:8000/return',
  CANCEL_URL: 'http://localhost:8000/cancel',
};

// NGANLUONG PAYMENT
export const NGANLUONG = {
  MAIN_URL: 'https://alepay.vn',
  REQUEST_ORDER_URL: '/checkout/v1/request-order',
  TOKEN: 'vIbOVNt6pvdCKuHpbIgQQOFZIq8lVC',
  CHECKSUM_KEY: 'c50yBKzvsTB0EtGd8IKPNS5lKF5MhD',
  ENCRYPT_KEY: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+U25YAH54bhj5l44h9sSNAu0hDmgJrwFV+sWg19NQJC3VhBnutAve1fOIlc4BJixa3PxUlgEUNGwuLtdlEfu9SxlmT1FYdUwz3K8kJwSSPcJsw1CjTRX33DvyVONt/ZHX994xzgRVLD7pPMWNE7RntQf/oRFBrzLMHfYV1qBSBQIDAQAB',
  CURRENCY: 'VND',
  RETURN_URL: 'http://localhost:8000/return',
  CANCEL_URL: 'http://localhost:8000/cancel'
};
