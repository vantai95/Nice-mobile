import React from 'react';
import {
  CardItem,
  Text
} from 'native-base';
import {
  Col,
  Row
} from 'react-native-easy-grid';
import PropTypes from 'prop-types';
import I18n from '../../../../i18n/i18n';
import styles from './styles';
import colors from '../../../../constants/colors';
import utils from '../../../../utils/utils';
import enums from '../../../../constants/enums';

class OrderHistoryItemScreen extends React.PureComponent {
  checkStatus = (status) => {
    const statusFound = enums.ORDER_STATUSES.find(element => element.value === status);
    return statusFound ? statusFound.label : '';
  }

  render() {
    const { item } = this.props;
    return (
      <CardItem bordered button onPress={() => { }}>
        <Col>
          {/* date */}
          <Row>
            <Col style={styles.colCenter}>
              <Text note style={styles.itemTitle}>{I18n.t('order_history.date')}</Text>
            </Col>
            <Col style={styles.colCenter}>
              <Text style={[styles.itemContent]}>
                {item.created_at}
              </Text>
            </Col>
          </Row>

          {/* order code */}
          <Row>
            <Col style={styles.colCenter}>
              <Text note style={styles.itemTitle}>{I18n.t('order_history.code')}</Text>
            </Col>
            <Col style={styles.colCenter}>
              <Text style={[styles.itemContent, { color: colors.red }]}>
                {item.order_number}
              </Text>
            </Col>
          </Row>

          {/* order status */}
          <Row>
            <Col style={styles.colCenter}>
              <Text note style={styles.itemTitle}>{I18n.t('order_history.order_status')}</Text>
            </Col>
            <Col style={styles.colCenter}>
              <Text style={[styles.itemContent, { color: colors.blue }]}>
                {this.checkStatus(item.status)}
              </Text>
            </Col>
          </Row>

          {/* total price */}
          <Row>
            <Col style={styles.colCenter}>
              <Text note style={styles.itemTitle}>{I18n.t('order_history.price')}</Text>
            </Col>
            <Col style={styles.colCenter}>
              <Text style={[styles.itemContent]}>
                {I18n.t('common.currency', { resource: utils.currencyVnd(item.total_amount) })}
              </Text>
            </Col>
          </Row>

          {/* restaurant name */}
          <Row>
            <Col style={styles.colCenter}>
              <Text note style={styles.itemTitle}>{I18n.t('order_history.restaurant_name')}</Text>
            </Col>
            <Col style={styles.colCenter}>
              <Text style={[styles.itemContent]}>
                {item.restaurant_name}
              </Text>
            </Col>
          </Row>
        </Col>
      </CardItem>
    );
  }
}

OrderHistoryItemScreen.propTypes = {
  item: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    order_number: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    total_amount: PropTypes.number.isRequired,
    restaurant_name: PropTypes.string.isRequired
  }).isRequired
};

export default OrderHistoryItemScreen;
