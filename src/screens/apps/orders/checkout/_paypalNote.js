import React from 'react';
import {
  Card,
  CardItem,
  Text,
} from 'native-base';
import I18n from '../../../../i18n/i18n';
import utils from '../../../../utils/utils';

class PaypalNoteScreen extends React.PureComponent {
  render() {
    const {
      restaurant
    } = this.props;
    return (
      <Card>
        <CardItem header>
          <Text note>
            {I18n.t('checkout.paypal_note', { resource: utils.currencyVnd(restaurant.exchange_rate) })}
          </Text>
        </CardItem>
      </Card>
    );
  }
}

export default PaypalNoteScreen;
