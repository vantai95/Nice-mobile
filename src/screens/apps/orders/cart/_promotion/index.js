import React from 'react';
import {
  Card,
  CardItem,
  Text
} from 'native-base';
import {
  Col,
  Row
} from 'react-native-easy-grid';
import {
  FlatList,
  View,
  TouchableOpacity
} from 'react-native';
import I18n from '../../../../../i18n/i18n';
import utils from '../../../../../utils/utils';
import styles from './styles';

class PromotionScreen extends React.PureComponent {
  renderPromotions = (item, index) => {
    const { updateQuantityFreeItem } = this.props;
    return (
      <CardItem bordered style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }}>
        <Col>
          {
            item.apply_to === 3
            && (
              <Text note style={styles.pdB}>
                {I18n.t('cart.promotion.apply_to_bill', {
                  from_value: utils.currencyVnd(item.min_order_value),
                  to_value: utils.currencyVnd(item.max_order_value),
                  quantity: item.quantity
                })}
              </Text>
            )
          }
          {
            item.apply_to !== 3
            && (
              <Text note style={styles.pdB}>
                {I18n.t('cart.promotion.apply_to_order', {
                  item_name: item.name_en,
                  quantity: item.quantity
                })}
              </Text>
            )
          }

          {
            this.renderFreeItem(item.id, item.dishes, updateQuantityFreeItem)
          }
        </Col>
      </CardItem>
    );
  }


  renderFreeItem = (promotionId, items, fnUpdate) => items.map((item, index) => (
    <Row style={styles.pdB} key={index.toString()}>
      <Col size={1.5} style={{ justifyContent: 'center' }}>
        <Text numberOfLines={1} style={[styles.textName]}>
          {`🔸 ${item.name}`}
        </Text>
      </Col>
      <Col size={1}>
        <Row style={[{ alignItems: 'center', justifyContent: 'flex-end' }]}>
          <TouchableOpacity
            style={[styles.ciMinusAdd]}
            onPress={() => {
              fnUpdate(promotionId, item.id, 'minus');
            }}
          >
            <Text style={styles.textName}>-</Text>
          </TouchableOpacity>

          <View style={[styles.ciQuantity]}>
            <Text note style={styles.textName}>{item.quantity}</Text>
          </View>

          <TouchableOpacity
            style={[styles.ciMinusAdd]}
            onPress={() => {
              fnUpdate(promotionId, item.id, 'add');
            }}
          >
            <Text style={styles.textName}>+</Text>
          </TouchableOpacity>
        </Row>
      </Col>
    </Row>
  ))

  render() {
    const { promotions, state } = this.props;
    return (
      <Card>
        <CardItem header bordered>
          <Text style={styles.title}>
            {I18n.t('cart.title.free_item')}
          </Text>
        </CardItem>
        <FlatList
          data={promotions}
          keyExtractor={(item, index) => index.toString()}
          extraData={state}
          style={{ width: '100%' }}
          scrollEnabled={false}
          renderItem={({ item, index }) => this.renderPromotions(item, index)}
        />
      </Card>
    );
  }
}

export default PromotionScreen;
