import React from 'react';
import {
  Card,
  CardItem,
  Button,
  Text
} from 'native-base';
import {
  View,
  TextInput
} from 'react-native';
import {
  Row,
  Col
} from 'react-native-easy-grid';
import I18n from '../../../../../i18n/i18n';

import styles from './styles';

class VoucherScreen extends React.PureComponent {
  checkVoucher = (cart) => {
    let flag = true;
    if (cart.voucher) {
      if (cart.sub_total < cart.voucher.min_order_value || cart.sub_total > cart.voucher.max_order_value) {
        flag = false;
      } else {
        flag = true;
      }
    } else {
      flag = false;
    }
    return flag;
  }

  render() {
    const {
      isSendVoucher, onChangeText, checkVoucherPress, cart
    } = this.props;
    return (
      <Row>
        <Col>
          <Row>
            <Col size={3}>
              <Card>
                <CardItem header>
                  <TextInput
                    style={{ width: '100%' }}
                    placeholder={I18n.t('cart.placeholder.voucher')}
                    underlineColorAndroid="#ffffff"
                    onChangeText={(text) => { onChangeText(text); }}
                  />
                </CardItem>
              </Card>
            </Col>
            <Col size={1} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
              <View>
                <Button rounded style={styles.btnCheckVoucher} onPress={() => checkVoucherPress()}>
                  <Text style={styles.btnText}>{I18n.t('cart.btn_check_voucher')}</Text>
                </Button>
              </View>
            </Col>
          </Row>
          {
            isSendVoucher
            && (
              <Text note style={{ color: this.checkVoucher(cart) ? 'green' : 'red' }}>
                {
                  this.checkVoucher(cart)
                    ? ` Your promotion: ${cart.voucher.name}`
                    : ' Promotion code invalid!'
                }
              </Text>
            )
          }
        </Col>
      </Row>
    );
  }
}

export default VoucherScreen;
