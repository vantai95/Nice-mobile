import React from 'react';
import {
  Card,
  CardItem,
  Text,
  Body,
  Icon
} from 'native-base';
import {
  TextInput,
  Platform,
  View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import I18n from '../../../../i18n/i18n';
import utils from '../../../../utils/utils';
import styles, { pickerSelectStyles, pickerSelectSmallStyles } from './styles';
import enums from '../../../../constants/enums';
import { renderHolder } from './__commonRender';
import * as Components from '../../../../components';

const platform = Platform.OS;

class DeliveryInfoScreen extends React.PureComponent {
  checkSpecificTime = () => {
    const { state } = this.props;

    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();

    const { hour, minute } = state;

    const totalTimeCurrent = (hours * 60) + minutes;
    const totalTimeSelect = (hour * 60) + minute;

    if (totalTimeSelect - 30 < totalTimeCurrent) {
      return true;
      // not valid
    }

    return false;
    // Delivery time must be at least 30 minute
  }

  checkPayment = () => {
    const { paymentAmount, submitting } = this.props.state;
    if (!submitting) { return true; }
    const { cart } = this.props.restaurant;

    if (paymentAmount.length === 0 || !utils.isNumber(paymentAmount)) {
      return false;
    }
    if (parseInt(paymentAmount, 10) < cart.order_total) {
      return false;
    }
    return true;
  }

  render() {
    const {
      direction,
      payment,
      paymentAmount,
      paymentAmounts,
      paymentAmountSelected,
      deliveryTime,
      hour,
      minute,

      onValueChangeDirection,
      onValueChangePaymentAmountSelected,
      onValueChangePaymentAmount,
      onValueChangeDeliveryTime,
      onValueChangeHour,
      onValueChangeMinute
    } = this.props;
    return (
      <Card>
        <CardItem header bordered>
          <Text style={styles.textTitle}>
            {I18n.t('checkout.section.note_info.title')}
          </Text>
        </CardItem>
        <CardItem>
          <Body>

            {/* ======================== DIRECTION ================== */}
            <Components.InputTitle title={I18n.t('checkout.section.note_info.direction')} />
            <TextInput
              style={[
                platform === 'ios'
                  ? styles.textInput
                  : styles.textInputAndroid, {
                  borderColor: direction === '' ? 'green' : '#ededed'
                }
              ]}
              value={direction}
              onChangeText={text => onValueChangeDirection(text)}
            />

            {/* ======================== PAYMENT AMOUNT ================== */}
            {
              payment !== 'online_payment'
              && (<Components.InputTitle title={I18n.t('checkout.section.note_info.payment_amount')} require />)
            }
            {
              payment !== 'online_payment'
              && (
                <RNPickerSelect
                  placeholder={renderHolder('paymentAmount')}
                  items={paymentAmounts}
                  onValueChange={(value) => { onValueChangePaymentAmountSelected(value); }}
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => <Icon active style={{ color: '#ededed' }} name="chevron-down" type="Feather" />}
                  value={paymentAmountSelected}
                />
              )
            }

            {/* ======================== PAY WITH ================== */}
            {
              paymentAmountSelected === 2
              && (<Components.InputTitle title={I18n.t('checkout.section.note_info.pay_with')} require />)
            }
            {
              paymentAmountSelected === 2
              && (
                <TextInput
                  style={[
                    platform === 'ios'
                      ? styles.textInput
                      : styles.textInputAndroid, {
                      borderColor: this.checkPayment() ? 'green' : 'red'
                    }
                  ]}
                  value={paymentAmount}
                  keyboardType="number-pad"
                  onChangeText={text => onValueChangePaymentAmount(text)}
                />
              )
            }

            {/* ======================== DELIVERY TIME ================== */}
            <Components.InputTitle title={I18n.t('checkout.section.note_info.delivery_time')} require />
            <RNPickerSelect
              placeholder={renderHolder('deliveryTime')}
              items={enums.CHECKOUT_DELIVERY_TIME}
              onValueChange={(value) => { onValueChangeDeliveryTime(value); }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={() => <Icon active style={{ color: '#ededed' }} name="chevron-down" type="Feather" />}
              value={deliveryTime}
            />
            {
              deliveryTime !== 'asap'
              && (
                <View style={{ width: '100%' }}>
                  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: '30%' }}>
                      <RNPickerSelect
                        placeholder={renderHolder('selectHour')}
                        items={utils.renderHour()}
                        onValueChange={(value) => { onValueChangeHour(value); }}
                        style={pickerSelectSmallStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => <Icon active style={{ color: '#ededed' }} name="chevron-down" type="Feather" />}
                        value={hour}
                      />
                    </View>
                    <Text style={{ marginBottom: 5 }}> : </Text>
                    <View style={{ width: '30%' }}>
                      <RNPickerSelect
                        placeholder={renderHolder('selectMinute')}
                        items={utils.renderMinute()}
                        onValueChange={(value) => { onValueChangeMinute(value); }}
                        style={pickerSelectSmallStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => <Icon active style={{ color: '#ededed' }} name="chevron-down" type="Feather" />}
                        value={minute}
                      />
                    </View>
                  </View>
                  {
                    this.checkSpecificTime()
                    && (
                      <Text note style={[styles.textName, { color: 'red' }]}>
                        {I18n.t('common.validate.delivery_time')}
                      </Text>
                    )
                  }
                </View>
              )
            }
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default DeliveryInfoScreen;
