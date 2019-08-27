import React from 'react';
import {
  Card,
  CardItem,
  Text
} from 'native-base';
import {
  View
} from 'react-native';
import I18n from '../../../../../i18n/i18n';
import utils from '../../../../../utils/utils';
import styles from './styles';

class CartInfoScreen extends React.PureComponent {
  render() {
    const { cart, minOrderAmount } = this.props;
    return (
      <Card>

        <CardItem header>
          <Text style={styles.title}>
            {I18n.t('cart.title.information')}
          </Text>
        </CardItem>

        <CardItem style={styles.bgTwoColor}>
          <View style={[styles.infoRow]}>
            <Text note style={styles.textName}>{I18n.t('cart.info.sub_total')}</Text>
            <Text note style={styles.textName}>
              {I18n.t('common.currency', { resource: utils.currencyVndV2(cart.sub_total) })}
            </Text>
          </View>
        </CardItem>

        <CardItem>
          <View style={[styles.infoRow]}>
            <Text note style={styles.textName}>{I18n.t('cart.info.promotion')}</Text>
            <Text note style={styles.textName}>
              {I18n.t('common.currency', { resource: utils.currencyVndV2(cart.promotion) })}
            </Text>
          </View>
        </CardItem>

        <CardItem style={styles.bgTwoColor}>
          <View style={[styles.infoRow]}>
            <Text note style={styles.textName}>{I18n.t('cart.info.delivery_fee')}</Text>
            <Text note style={styles.textName}>
              {I18n.t('common.currency', { resource: utils.currencyVndV2(cart.delivery_fee) })}
            </Text>
          </View>
        </CardItem>

        <CardItem>
          <View style={[styles.infoRow]}>
            <Text note style={styles.textName}>
              {I18n.t('cart.info.tax', { resource: cart.tax })}
            </Text>
            <Text note style={styles.textName}>
              {I18n.t('common.currency', { resource: utils.currencyVndV2(cart.tax_bill) })}
            </Text>
          </View>
        </CardItem>

        <CardItem style={styles.bgTwoColor}>
          <View style={[styles.infoRow]}>
            <Text note style={styles.textTitle}>{I18n.t('cart.info.order_total')}</Text>
            <Text note style={styles.textPrice}>
              {I18n.t('common.currency', { resource: utils.currencyVnd(cart.order_total) })}
            </Text>
          </View>
        </CardItem>

        {
          cart.sub_total < minOrderAmount
          && (
            <CardItem>
              <Text note style={[styles.textName, styles.note]}>
                {I18n.t('cart.info.reach_minimum_order')}
              </Text>
            </CardItem>
          )
        }

      </Card>
    );
  }
}

export default CartInfoScreen;
