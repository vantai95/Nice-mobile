import React from 'react';
import {
  Card,
  CardItem,
  Text,
  Icon
} from 'native-base';
import {
  Row,
  Col
} from 'react-native-easy-grid';
import {
  TouchableOpacity
} from 'react-native';
import I18n from '../../../../../i18n/i18n';
import utils from '../../../../../utils/utils';
import styles from './styles';

class PaymentServiceScreen extends React.PureComponent {
  render() {
    const {
      restaurant,
      cart,
      updateService,
      updatePayment,
      takeRedInvoice
    } = this.props;
    return (
      <Card>

        {/* SERVICE */}
        <CardItem>
          <Row>
            <Col size={2}>
              <Text note>{I18n.t('cart.service')}</Text>
            </Col>
            {
              restaurant.delivery === 1
              && (
                <Col size={restaurant.pickup === 1 ? 1.5 : 3}>
                  <TouchableOpacity onPress={() => updateService('delivery')}>
                    <Row>
                      <Icon
                        active
                        type="FontAwesome"
                        style={
                          cart.service === 'delivery'
                            ? styles.infoIconCheck : styles.infoIconUnCheck
                        }
                        name={
                          cart.service === 'delivery'
                            ? 'check-circle-o' : 'circle-o'
                        }
                      />
                      <Text note>{I18n.t('cart.delivery')}</Text>
                    </Row>
                  </TouchableOpacity>
                </Col>
              )
            }
            {
              restaurant.pickup === 1
              && (
                <Col size={restaurant.delivery === 1 ? 1.5 : 3}>
                  <TouchableOpacity onPress={() => updateService('pickup')}>
                    <Row>
                      <Icon
                        active
                        type="FontAwesome"
                        style={
                          cart.service === 'pickup'
                            ? styles.infoIconCheck : styles.infoIconUnCheck
                        }
                        name={
                          cart.service === 'pickup'
                            ? 'check-circle-o' : 'circle-o'
                        }
                      />
                      <Text note>{I18n.t('cart.pickup')}</Text>
                    </Row>
                  </TouchableOpacity>
                </Col>
              )
            }
          </Row>
        </CardItem>

        {/* PAYMENT METHOD */}
        <CardItem style={styles.bgTwoColor}>
          <Row>
            <Col size={2}>
              <Text note>{I18n.t('cart.payment')}</Text>
            </Col>
            {
              restaurant.cod_payment === 1
              && (
                <Col size={restaurant.online_payment === 1 ? 1.5 : 3}>
                  <TouchableOpacity onPress={() => updatePayment('cod_payment')}>
                    <Row>
                      <Icon
                        active
                        type="FontAwesome"
                        style={
                          cart.payment === 'cod_payment'
                            ? styles.infoIconCheck : styles.infoIconUnCheck
                        }
                        name={
                          cart.payment === 'cod_payment'
                            ? 'check-circle-o' : 'circle-o'
                        }
                      />
                      <Text note>{I18n.t('cart.cod')}</Text>
                    </Row>
                  </TouchableOpacity>
                </Col>
              )
            }
            {
              restaurant.online_payment === 1
              && (
                <Col size={restaurant.cod_payment === 1 ? 1.5 : 3}>
                  {
                    // false &&
                    <TouchableOpacity onPress={() => updatePayment('online_payment')}>
                      <Row>
                        <Icon
                          active
                          type="FontAwesome"
                          style={
                            cart.payment === 'online_payment'
                              ? styles.infoIconCheck : styles.infoIconUnCheck
                          }
                          name={
                            cart.payment === 'online_payment'
                              ? 'check-circle-o' : 'circle-o'
                          }
                        />
                        <Text note>{I18n.t('cart.online')}</Text>
                      </Row>
                    </TouchableOpacity>
                  }
                </Col>
              )
            }
          </Row>
        </CardItem>

        {/* TAKE RED INVOICE */}
        {
          restaurant.take_red_bill === 1
          && (
            <CardItem>
              <Row>
                <Col size={2}>
                  <Text note>{I18n.t('cart.take_red_invoice')}</Text>
                </Col>
                <Col size={3}>
                  <TouchableOpacity onPress={() => takeRedInvoice()}>
                    <Row>
                      <Icon
                        active
                        type="FontAwesome"
                        style={cart.checkbill === 1 ? styles.infoIconCheck : styles.infoIconUnCheck}
                        name={
                          cart.checkbill === 1 ? 'check-square-o' : 'square-o'
                        }
                      />
                    </Row>
                  </TouchableOpacity>
                </Col>
              </Row>
            </CardItem>
          )
        }

        {/* MIN ORDER AMOUNT */}
        <CardItem style={styles.bgTwoColor}>
          <Row>
            <Col size={2}>
              <Text note style={styles.textTitle}>{I18n.t('cart.min_order')}</Text>
            </Col>
            <Col size={3}>
              <Text note style={styles.textTitle}>
                {I18n.t('common.currency', { resource: utils.currencyVnd(restaurant.minOrderAmount) })}
              </Text>
            </Col>
          </Row>
        </CardItem>
      </Card>
    );
  }
}

export default PaymentServiceScreen;
