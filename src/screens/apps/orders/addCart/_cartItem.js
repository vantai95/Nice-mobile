import React from 'react';
import {
  CardItem,
  Text,
  Body,
  Right,
} from 'native-base';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Row
} from 'react-native-easy-grid';
import I18n from '../../../../i18n/i18n';
import styles from './styles';
import utils from '../../../../utils/utils';

class CartItemScreen extends React.PureComponent {
  render() {
    const {
      setupData, quantity, minusQuantity, addQuantity
    } = this.props;
    return (
      <CardItem>

        <Body style={styles.itemBody}>
          <Text style={styles.textName}>
            {setupData ? setupData.name : ''}
          </Text>
          <Text style={styles.textPrice}>
            {setupData ? I18n.t('common.currency', { resource: utils.currencyVnd(setupData.price) }) : ''}
          </Text>
        </Body>

        <Right style={styles.itemRight}>

          <Row style={[{ alignItems: 'center', justifyContent: 'flex-end' }, styles.pdB]}>

            <TouchableOpacity style={[styles.ciMinusAdd]} onPress={() => minusQuantity()}>
              <Text style={styles.textName}>-</Text>
            </TouchableOpacity>

            <View style={[styles.ciQuantity]}>
              <Text note style={styles.textName}>{quantity}</Text>
            </View>

            <TouchableOpacity style={[styles.ciMinusAdd]} onPress={() => addQuantity()}>
              <Text style={styles.textName}>+</Text>
            </TouchableOpacity>

          </Row>
        </Right>

      </CardItem>
    );
  }
}

export default CartItemScreen;
