import React from 'react';
import {
  Card,
  CardItem,
  Text,
  Button,
  Icon
} from 'native-base';
import {
  FlatList,
  View,
  TouchableOpacity
} from 'react-native';
import {
  Row,
  Col
} from 'react-native-easy-grid';
import I18n from '../../../../../i18n/i18n';
import utils from '../../../../../utils/utils';
import styles from './styles';

class CartItemScreen extends React.PureComponent {
  renderItem = (item, index) => {
    const {
      confirmDeleteCartItem,
      updateQuantity
    } = this.props;
    return (
      <CardItem style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }}>
        <Col>
          <Row>
            <Col size={1} style={{ justifyContent: 'center' }}>
              <Icon
                type="FontAwesome"
                name="remove"
                style={styles.iconRemove}
                onPress={() => {
                  confirmDeleteCartItem(item);
                }}
              />
            </Col>
            <Col size={6} style={{ justifyContent: 'center' }}>
              <Row>
                <Col size={1.5}>
                  <Text numberOfLines={1} style={[styles.textName, styles.pdB]}>{item.name}</Text>
                  <Text note style={styles.textPrice}>
                    {I18n.t('common.currency', { resource: utils.currencyVnd(item.price) })}
                  </Text>
                </Col>
                <Col size={1}>
                  <Row style={[{ alignItems: 'center', justifyContent: 'flex-end' }]}>
                    <TouchableOpacity style={[styles.ciMinusAdd]} onPress={() => updateQuantity(item, 'minus')}>
                      <Text style={styles.textName}>-</Text>
                    </TouchableOpacity>

                    <View style={[styles.ciQuantity]}>
                      <Text note style={styles.textName}>{item.quantity}</Text>
                    </View>

                    <TouchableOpacity style={[styles.ciMinusAdd]} onPress={() => updateQuantity(item, 'add')}>
                      <Text style={styles.textName}>+</Text>
                    </TouchableOpacity>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          {
            item.options.length !== 0
            && (
              <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={styles.line} />
                <Text note>{I18n.t('cart.title.customization')}</Text>
                <View style={styles.line} />
              </Row>
            )
          }
          {
            item.options.length !== 0
            && this.renderCustomization(item.options)
          }
        </Col>
      </CardItem>
    );
  }

  renderCustomization = items => items.map((item, index) => (
    <Col key={index.toString()}>
      <Text numberOfLines={1} note style={styles.textName}>
        {`🔻 ${item.custom_name}`}
      </Text>
      <Text note style={[styles.textName, { fontSize: 10 }]}>
        {I18n.t('cart.option', {
          option_name: item.option_name,
          quantity: item.quantity,
          price: item.price
        })}
      </Text>
    </Col>
  ))

  render() {
    const {
      dishesChangedList, dishesDisappearList, items, applySync, state
    } = this.props;
    return (
      <Card>
        {
          dishesChangedList.length === 0
          && (
            <CardItem header>
              <Text style={styles.title}>
                {I18n.t('cart.title.cart_item')}
              </Text>
            </CardItem>
          )
        }
        {
          (dishesChangedList.length !== 0 || dishesDisappearList.length !== 0)
          && (
            <CardItem header style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.title}>{I18n.t('cart.title.cart_item')}</Text>
              <Button small primary onPress={() => applySync()}>
                <Text>{I18n.t('cart.btn_apply_sync')}</Text>
              </Button>
            </CardItem>
          )
        }
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          extraData={state}
          style={{ width: '100%' }}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            if (item.free_item === 0) { return this.renderItem(item, index); }
            return <View />;
          }}
        />
      </Card>
    );
  }
}

export default CartItemScreen;
