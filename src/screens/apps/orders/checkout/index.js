import React from 'react';

import {
  Container,
  Content,
  Button,
  Text
} from 'native-base';
import { Keyboard } from 'react-native';
import I18n from '../../../../i18n/i18n';
import styles from './styles';
import toasts from '../../../../utils/toast';
import utils from '../../../../utils/utils';
import RestaurantService from '../../../../services/restaurantService';

import HeaderScreen from './_header';
import ContactInfoScreen from './_contactInfo';
import RestaurantInfoScreen from './_restaurantInfo';
import PaypalNoteScreen from './_paypalNote';
import DeliveryInfoScreen from './_deliveryInfo';
import NoteInfoScreen from './_noteInfo';

const paymentAmounts = [
  {
    value: 1,
    label: I18n.t('enums.checkout.payment_amount.exact_total_bill')
  },
  {
    value: 2,
    label: I18n.t('enums.checkout.payment_amount.order')
  }
];

class CheckoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 0,
      fullname: '',
      email: '',
      phone: '',
      password: '',
      residenceType: 'house',
      fullAddress: '',
      districtName: '',
      ward: this.props.home.location.ward,
      paymentAmount: '',
      deliveryTime: 'asap',
      direction: '',
      hour: 1,
      minute: 1,

      paymentAmountSelected: 1,

      wards: [],
      districtId: null,
      service: '',
      payment: '',

      submitting: false
    };

    this.restaurantService = new RestaurantService();
    this.dataParam = this.props.navigation.getParam('dataParam');
  }

  componentDidMount() {
    if (this.dataParam) {
      this.setState({
        service: this.dataParam.service,
        payment: this.dataParam.payment
      });
    }
    /**
     * get data from redux
     */
    const { currentUser } = this.props;
    const { location } = this.props.home;

    /**
     * get current user
     */
    if (currentUser) {
      this.setState({
        fullname: currentUser.name,
        email: currentUser.email,
        title: currentUser.gender || 0,
        phone: currentUser.phone
      });
    }
    /**
     * get current district
     */
    if (location) {
      this.setState({
        districtName: location.districtName,
        districtId: location.district,
        wards: location.wards.map(ward => ({
          value: ward.id,
          label: ward.name
        })),
        ward: !location.ward && location.wards[0] ? location.wards[0].id : null
      });
    }

    /**
     * set time init
     */
    const today = new Date();
    this.setState({
      hour: today.getHours() + 1,
      minute: today.getMinutes()
    });
  }

  onBtnCheckoutPress = () => {
    Keyboard.dismiss();

    this.setState({ submitting: true });

    if (this.checkRequire()) {
      const { cart } = this.props.restaurant;

      const {
        hour,
        minute,
        paymentAmount,
        deliveryTime,
        title,
        fullAddress,
        password,
        fullname,
        email,
        phone,
        residenceType,
        districtId,
        ward,
        direction,
        paymentAmountSelected
      } = this.state;

      /**
       * format time (ex: 1:1 => 01:01)
       */
      const specificTimeHour = hour < 10 ? `0${hour.toString()}` : hour.toString();
      const specificTimeMinute = minute < 10 ? `0${minute.toString()}` : minute.toString();

      // payment_amount
      const info = {
        register: this.props.currentUser.token === '' ? 1 : 0,
        payment_amount: paymentAmountSelected === 1 ? cart.order_total : paymentAmount,
        delivery_time: deliveryTime,
        title,
        full_name: fullname,
        email,
        phone,
        password: {
          password,
          confirm_password: password
        },
        address: {
          full_address: fullAddress
        },
        specific_time: `${specificTimeHour} : ${specificTimeMinute}`,
        residencetype: residenceType,
        district: districtId,
        ward,
        direction,
        device_token: this.props.app.deviceToken
      };

      const initData = {
        info,
        cart
      };

      this.restaurantService.checkout(initData)
        .then((responseJson) => {
          if (responseJson.success) {
            const dataParam = {
              order_id: responseJson.order_id,
              send_left: responseJson.send_left,
              otp_verify: responseJson.otp_verify,
              otp_created_at: responseJson.otp_created_at,
              phone: this.props.restaurant.restaurant.phone
            };
            this.props.onUpdateInfo();

            if (cart.payment === 'cod_payment') {
              this.props.navigation.navigate('Otp', { dataParam });
            } else if (cart.payment === 'online_payment') {
              this.props.navigation.navigate('OnlinePayment', {
                dataParam: {
                  order_total: cart.order_total,
                  order_id: dataParam.order_id,
                  full_name: fullname,
                  email,
                  phone,
                  address: fullAddress
                }
              });
            }
          } else {
            if (responseJson.message) {
              toasts.warning(responseJson.message.toString());
            } else {
              toasts.danger(responseJson.toString());
            }

            /**
             * if price dish change, dispatch data changed to redux
             */
            if (responseJson.dishes_changed) {
              this.props.onSetDishesChangedList({
                dishesChangedList: Object.values(responseJson.dishes_changed_list)
              });
            }

            if (responseJson.dishes_disappear) {
              this.props.onSetDishesDisappear({
                dishesDisappearList: Object.values(responseJson.dishes_disappear_list)
              });
            }
          }
        })
        .catch((error) => { toasts.danger(error); });
    }
  }

  /**
   * Check time, if specific time < current time + 30s
   */
  checkSpecificTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();

    const { hour, minute } = this.state;

    const totalTimeCurrent = (hours * 60) + minutes;
    const totalTimeSelect = (hour * 60) + minute;

    if (totalTimeSelect - 30 < totalTimeCurrent) {
      return true;
      // not valid
    }

    return false;
    // Delivery time must be at least 30 minute
  }

  checkRequire = () => {
    const {
      fullname,
      email,
      phone,
      fullAddress,
      password,
      deliveryTime,
      service,
      payment,
      paymentAmount,
      paymentAmountSelected
    } = this.state;

    const { cart } = this.props.restaurant;

    if (fullname === '') {
      toasts.warning(I18n.t('common.validate.full_name'));
      return false;
    }

    if (!utils.isEmail(email)) {
      toasts.warning(I18n.t('common.validate.email'));
      return false;
    }

    if (!utils.isPhone(phone)) {
      toasts.warning(I18n.t('common.validate.phone'));
      return false;
    }

    if (!utils.isPassword(password) && this.props.currentUser.token === '') {
      toasts.warning(I18n.t('common.validate.password'));
      return false;
    }

    if (fullAddress === '' && service !== 'pickup') {
      toasts.warning(I18n.t('common.validate.full_address'));
      return false;
    }

    if (payment !== 'online_payment') {
      if (paymentAmountSelected === 2) {
        if (paymentAmount.length === 0 || !utils.isNumber(paymentAmount)) {
          toasts.warning(I18n.t('common.validate.payment_amount_invalid'));
          return false;
        }
        if (parseInt(paymentAmount, 10) < cart.order_total) {
          toasts.warning(I18n.t('common.validate.payment_amount_need_large'));
          return false;
        }
      }
    }
    if (deliveryTime !== 'asap' && service !== 'pickup') {
      if (this.checkSpecificTime()) {
        toasts.warning(I18n.t('common.validate.delivery_time'));
        return false;
      }
    }

    return true;
  }

  render() {
    const { goBack } = this.props.navigation;
    const {
      title,
      fullname,
      email,
      phone,
      password,
      residenceType,
      fullAddress,
      districtName,
      ward,
      wards,
      paymentAmount,
      deliveryTime,
      direction,
      hour,
      minute,
      service,
      payment,
      paymentAmountSelected,

      submitting
    } = this.state;
    const { restaurant } = this.props.restaurant;

    return (
      <Container style={styles.body}>
        <HeaderScreen
          onRefactorCart={this.props.onRefactorCart}
          goBack={goBack}
        />

        {/* PICKUP */}
        {
          service === 'pickup'
          && (
            <Content padder enableResetScrollToCoords={false}>

              {/* CONTACT INFO */}
              <ContactInfoScreen
                title={title}
                fullname={fullname}
                email={email}
                phone={phone}
                password={password}

                onValueChangeTitle={(value) => { if (value !== null) this.setState({ title: value }); }}
                onValueChangeFullname={text => this.setState({ fullname: text })}
                onValueChangeEmail={text => this.setState({ email: text })}
                onValueChangePhone={text => this.setState({ phone: text })}
                onValueChangePassword={text => this.setState({ password: text })}

                userToken={this.props.currentUser.token}
              />

              <RestaurantInfoScreen restaurant={restaurant} />

              {
                payment === 'online_payment'
                && (<PaypalNoteScreen />)
              }

              <Button block style={styles.btnOrder} onPress={() => this.onBtnCheckoutPress()}>
                <Text style={styles.btnText}>{I18n.t('checkout.btn_checkout')}</Text>
              </Button>
            </Content>
          )
        }

        {/* DELIVERY */}
        {
          service === 'delivery'
          && (
            <Content padder enableResetScrollToCoords={false}>

              {/* CONTACT INFO */}
              <ContactInfoScreen
                title={title}
                fullname={fullname}
                email={email}
                phone={phone}
                password={password}
                submitting={submitting}

                onValueChangeTitle={(value) => { if (value !== null) this.setState({ title: value }); }}
                onValueChangeFullname={text => this.setState({ fullname: text })}
                onValueChangeEmail={text => this.setState({ email: text })}
                onValueChangePhone={text => this.setState({ phone: text })}
                onValueChangePassword={text => this.setState({ password: text })}

                userToken={this.props.currentUser.token}
              />

              {/* DELIVERY INFO */}
              <DeliveryInfoScreen
                residenceType={residenceType}
                fullAddress={fullAddress}
                wards={wards}
                ward={ward}
                districtName={districtName}
                submitting={submitting}

                onValueChangeResidenceType={(value) => { if (value !== null) this.setState({ residenceType: value }); }}
                onValueChangeFullAddress={text => this.setState({ fullAddress: text })}
                onValueChangeWard={(value) => { if (value !== null) this.setState({ ward: value }); }}
              />

              {/* NOTE INFO */}
              <NoteInfoScreen
                direction={direction}
                payment={payment}
                paymentAmount={paymentAmount}
                paymentAmounts={paymentAmounts}
                paymentAmountSelected={paymentAmountSelected}
                deliveryTime={deliveryTime}
                hour={hour}
                minute={minute}
                state={this.state}
                restaurant={restaurant}

                onValueChangeDirection={text => this.setState({ direction: text })}
                onValueChangePaymentAmountSelected={(value) => { if (value !== null) this.setState({ paymentAmountSelected: value }); }}
                onValueChangePaymentAmount={text => this.setState({ paymentAmount: text })}
                onValueChangeDeliveryTime={(value) => { if (value !== null) this.setState({ deliveryTime: value }); }}
                onValueChangeHour={(value) => { if (value !== null) this.setState({ hour: value }); }}
                onValueChangeMinute={(value) => { if (value !== null) this.setState({ minute: value }); }}
              />

              {
                payment === 'online_payment'
                && (<PaypalNoteScreen />)
              }

              <Button block style={styles.btnOrder} onPress={() => this.onBtnCheckoutPress()}>
                <Text style={styles.btnText}>{I18n.t('checkout.btn_checkout')}</Text>
              </Button>
            </Content>
          )
        }
      </Container>
    );
  }
}

export default CheckoutScreen;
