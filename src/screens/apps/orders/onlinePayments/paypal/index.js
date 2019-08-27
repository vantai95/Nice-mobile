import React from 'react';
import {
  Container,
  Text,
  Button,
  Header,
  Left,
  Right,
  Title,
  Body,
  Icon
} from 'native-base';
import {
  View,
  ActivityIndicator,
  Alert,
  WebView,
  Image
} from 'react-native';
import images from '../../../../../constants/images';
import toasts from '../../../../../utils/toast';
import I18n from '../../../../../i18n/i18n';
import PaypalService from '../../../../../services/paypalService';
import RestaurantService from '../../../../../services/restaurantService';
import styles from './styles';

const statuss = {
  CREATED: 'created',
  APPROVED: 'approved',
  COMPLETED: 'completed',
  REJECTED: 'rejected'
};

class Paypal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * save user info of paypal
       */
      oauth2: {
        access_token: '',
        app_id: '',
        expires_in: '',
        nonce: '',
        scope: '',
        token_type: ''
      },

      /**
       * paymentId: id of payment when user review payment in paypal
       */
      paymentId: '',

      /**
       * approvalUrl: using for redirect to paypal (web)
       */
      approvalUrl: '',

      /**
       * executeUrl: using for call api execute payment
       */
      executeUrl: '',

      /**
       * orderTotal: to be convert from VND to USD
       */
      orderTotal: 0.00,

      /**
       * orderId: id of order when user checkout (pass from checkout screen)
       */
      orderId: null,

      /**
       * isShowWebPayment: using for show or hide web paypal
       */
      isShowWebPayment: false,
      cookie: '',

      /**
       * function (_onNavigationStateChange) returns more than 1 time, acceptPayment: using for limit.
       */
      acceptPayment: false, // using for call only one

      /**
       * paymentStatus: save payment status
       */
      paymentStatus: ''
    };

    this.paypalService = new PaypalService();
    this.restaurantService = new RestaurantService();

    /**
     * param from checkout (checkout response)
     */
    this.dataParam = this.props.navigation.getParam('dataParam');
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  componentWillMount() {
    /**
     * remove current cart
     */
    this.props.onRemoveCart();

    /**
     * get exchangeRate from restaurant (in redux)
     */
    const exchangeRate = this.props.restaurant.restaurant.exchange_rate;

    if (this.dataParam) {
      const orderId = this.dataParam.order_id;
      const orderTotal = this.dataParam.order_total;

      /**
       * change VND to USD
       */
      const orderTotalUSD = orderTotal / exchangeRate;

      this.setState({
        orderId,
        orderTotal: orderTotalUSD.toFixed(2)
      });
    }
  }

  /**
   * Using check account paypal (Merchant account)
   */
  onCheckAuthentication = () => {
    /**
     * check paypal authentication
     */
    this.paypalService.checkAuthentication()
      .then((responseJson) => {
        /**
         * if have not field success => call api success
         */
        if (!responseJson.success) {
          /**
           * if call api response have not field message => account valid.
           */
          if (!responseJson.message) {
            /**
             * init data response
             */
            const oauth2 = {
              access_token: responseJson.access_token,
              app_id: responseJson.app_id,
              expires_in: responseJson.expires_in,
              nonce: responseJson.nonce,
              scope: responseJson.scope,
              token_type: responseJson.token_type
            };

            this.setState({ oauth2 });

            /**
             * call api payment
             */
            this.reviewPayment(oauth2);
          } else {
            toasts.warning(responseJson.message);
          }
        } else {
          toasts.warning('Error! Call api failed.');
        }
      });
  }

  /**
   * using for check URL web
   */
  onNavigationStateChange(webViewState) {
    if (webViewState.canGoBack) {
      /**
       * get url
       */
      const { url } = webViewState;
      const regex = /[?&]([^=#]+)=([^&#]*)/g;
      const params = {};
      let match;

      /**
       * filter params
       */
      // eslint-disable-next-line no-cond-assign
      while (match = regex.exec(url)) {
        // eslint-disable-next-line prefer-destructuring
        params[match[1]] = match[2];
      }

      /**
       * check have return
       */
      const searchResult = url.search('return');

      /**
       * if params has: PayerID, paymentId, token => accept payment
       */
      if (params.PayerID
        && params.paymentId
        && params.token
        && !this.state.acceptPayment
        && this.state.isShowWebPayment
        && searchResult > -1) {
        /**
         * set state and call api execute payment
         */
        this.setState({
          // payerId: params.PayerID,
          // token: params.token,
          acceptPayment: true,
          isShowWebPayment: false
        }, () => {
          this.executePayment(params.PayerID);
        });
      }
    }
  }

  /**
   * for payer review payment on paypal
   */
  reviewPayment = (oauth2) => {
    /**
     * call api review payment
     */
    this.paypalService.reviewPayment(oauth2.access_token, this.state.orderTotal)
      .then((responseJson) => {
        /**
         * if have field id (paymentId) => create success
         */
        if (responseJson.id && responseJson.state === statuss.CREATED) {
          const paymentId = responseJson.id;
          const approvalUrl = responseJson.links[1].href;
          const executeUrl = responseJson.links[2].href;

          /**
           * set state value and call api update order
           */
          this.setState({
            paymentId,
            approvalUrl,
            executeUrl,
            isShowWebPayment: true,
            paymentStatus: statuss.CREATED
          }, () => {
            this.callApiUpdateOrder(statuss.CREATED);
          });
        } else {
          toasts.warning(I18n.t('online_payment.status.create_failed'));
        }
      });
  }

  executePayment = (payerId) => {
    /**
     * setup params
     */
    const { oauth2, executeUrl } = this.state;
    // eslint-disable-next-line camelcase
    const { access_token } = oauth2;

    this.paypalService.executePayment(access_token, executeUrl, payerId)
      .then((responseJson) => {
        /**
         * check if transactions status is "completed"
         */
        if (responseJson.state
          && responseJson.state === statuss.APPROVED
          && responseJson.transactions[0]
          && responseJson.transactions[0].related_resources[0]
          && responseJson.transactions[0].related_resources[0].sale.state
        ) {
          const status = responseJson.transactions[0].related_resources[0].sale.state;

          /**
           * if status === completed => show notify and call api update order
           */
          if (status === statuss.COMPLETED) {
            this.setState({ paymentStatus: statuss.COMPLETED });
            toasts.success(I18n.t('online_payment.status.completed'));
            this.callApiUpdateOrder(statuss.COMPLETED);
          } else {
            toasts.warning(I18n.t('online_payment.status.rejected'));
            this.callApiUpdateOrder(statuss.REJECTED);
          }
        } else {
          this.setState({ isShowWebPayment: false });
          toasts.warning(I18n.t('online_payment.status.not_completed'));
        }
      });
  }

  callApiUpdateOrder = (type) => {
    const { orderId, paymentId, orderTotal } = this.state;
    const { restaurant } = this.props.restaurant;
    let status = null;

    switch (type) {
      case statuss.CREATED: {
        status = 0;
        break;
      }
      case statuss.COMPLETED: {
        status = 1;
        break;
      }
      case statuss.REJECTED: {
        status = 2;
        break;
      }
      default: {
        status = 0;
        break;
      }
    }

    const initData = {
      order_id: orderId,
      restaurant_id: restaurant.id,
      payment_mode: 'paypal',
      transaction_id: paymentId,
      amount: orderTotal,
      status
    };

    this.restaurantService.savePaymentInfo(initData)
      .then((responseJson) => {
        if (!responseJson.success) {
          this.setState({ isShowWebPayment: false });
          toasts.danger(responseJson.message.toString());
        }
      })
      .catch(() => { });
  }

  activityIndicatorLoadingView = () => (
    <ActivityIndicator
      size="large"
      style={styles.activityIndicator}
    />
  )

  onCancelPayment = () => {
    Alert.alert(
      'Alert!',
      'You want to cancel online payment ?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            this.setState({ paymentStatus: statuss.REJECTED });
          }
        },
      ],
      { cancelable: false },
    );
  }

  /**
   * using for show button payment
   * isShowWebPayment is false and payment status == "", payment not yet initialized
   */
  isShowBtnPayment = () => {
    const { isShowWebPayment, paymentStatus } = this.state;

    if (!isShowWebPayment
      && paymentStatus !== statuss.COMPLETED
      && paymentStatus !== statuss.REJECTED) {
      return true;
    }
    return false;
  }

  /**
   * using for show web payment
   * isShowWebPayment is true and payment status == ""
   */
  isShowWebPayment = () => {
    const { isShowWebPayment, paymentStatus } = this.state;
    if (isShowWebPayment
      && paymentStatus !== statuss.COMPLETED
      && paymentStatus !== statuss.REJECTED) {
      return true;
    }
    return false;
  }

  /**
   * using for show notify when payment is completed or rejected
   * if paymentStatus is COMPLETED or REJECTED
   */
  isShowNotify = () => {
    const { paymentStatus } = this.state;
    if (paymentStatus === statuss.COMPLETED
      || paymentStatus === statuss.REJECTED) {
      return true;
    }
    return false;
  }

  render() {
    const {
      approvalUrl, cookie, paymentStatus, orderTotal
    } = this.state;
    const { navigate, goBack } = this.props.navigation;
    return (
      <Container>

        <Header>
          <Left>
            {
              !this.isShowNotify()
              && (
                <Button
                  transparent
                  onPress={() => {
                    // eslint-disable-next-line no-unused-expressions
                    this.isShowWebPayment() ? this.setState({ isShowWebPayment: false }) : goBack();
                  }}
                >
                  <Icon name="arrow-back" />
                </Button>
              )
            }
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{I18n.t('header.online_payment')}</Title>
          </Body>
          <Right />
        </Header>

        {
          this.isShowBtnPayment()
          && (
            <View style={styles.container}>
              <View style={styles.logoView}>
                <Image
                  source={images.PAYPAL_LOGO}
                  style={styles.paypalLogo}
                />
              </View>
              <View style={styles.btnView}>
                <Text style={styles.orderTotalText}>
                  {I18n.t('online_payment.order_total', { resource: I18n.t('common.currency_usd', { resource: orderTotal }) })}
                </Text>
                <View style={styles.btnViewV2}>
                  <Button full onPress={() => { this.onCheckAuthentication(); }} style={styles.btn}>
                    <Text style={styles.btnText}>{I18n.t('online_payment.btn_payment')}</Text>
                  </Button>
                  <Button full light onPress={() => { this.onCancelPayment(); }} style={styles.btn}>
                    <Text style={styles.btnText}>{I18n.t('online_payment.btn_cancel')}</Text>
                  </Button>
                </View>
              </View>
            </View>
          )
        }

        {
          this.isShowWebPayment()
          && (
            <View style={styles.containerWeb}>
              <WebView
                source={{ uri: approvalUrl }}
                onNavigationStateChange={this.onNavigationStateChange}
                javaScriptEnabled
                domStorageEnabled
                injectedJavaScript={cookie}
                renderLoading={this.activityIndicatorLoadingView}
                startInLoadingState
              />
            </View>
          )
        }

        {
          this.isShowNotify()
          && (
            <View style={styles.container}>
              <View style={styles.logoView}>
                <Image
                  source={paymentStatus === statuss.COMPLETED ? images.ICON_CHECK : images.ICON_FAILED}
                  style={styles.icon}
                />
                <Text style={paymentStatus === statuss.COMPLETED ? styles.paySuccessText : styles.payNotSuccessText}>
                  {paymentStatus === statuss.COMPLETED ? I18n.t('online_payment.status.completed') : I18n.t('online_payment.status.not_completed')}
                </Text>
              </View>
              <View style={styles.btnView}>
                <View style={styles.btnViewV2}>
                  <Button full danger onPress={() => { navigate('Home'); }} style={styles.btn}>
                    <Text style={styles.btnText}>{I18n.t('online_payment.btn_continue')}</Text>
                  </Button>
                </View>
              </View>
            </View>
          )
        }

      </Container>
    );
  }
}

export default Paypal;
