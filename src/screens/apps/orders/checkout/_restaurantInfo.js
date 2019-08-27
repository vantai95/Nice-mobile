import React from 'react';
import {
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';
import {
  TextInput,
  Platform
} from 'react-native';
import I18n from '../../../../i18n/i18n';
import styles from './styles';
import * as Components from '../../../../components';

const platform = Platform.OS;

class RestaurantInfoScreen extends React.PureComponent {
  renderItem = value => (
    <TextInput
      editable={false}
      value={value}
      style={[
        platform === 'ios'
          ? styles.textInput
          : styles.textInputAndroid
      ]}
    />
  )

  render() {
    const {
      restaurant
    } = this.props;
    return (
      <Card>
        <CardItem header bordered>
          <Text style={styles.textTitle}>
            {I18n.t('checkout.section.restaurant_info.title')}
          </Text>
        </CardItem>
        <CardItem>
          <Body>

            <Components.InputTitle title={I18n.t('checkout.section.restaurant_info.name')} />
            {this.renderItem(restaurant.name)}

            <Components.InputTitle title={I18n.t('checkout.section.restaurant_info.address')} />
            {this.renderItem(restaurant.address)}

            <Components.InputTitle title={I18n.t('checkout.section.restaurant_info.email')} />
            {this.renderItem(restaurant.email)}

            <Components.InputTitle title={I18n.t('checkout.section.restaurant_info.phone')} />
            {this.renderItem(restaurant.phone)}

          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default RestaurantInfoScreen;
