import React from 'react';
import {
  Card,
  CardItem
} from 'native-base';
import {
  TextInput
} from 'react-native';
import I18n from '../../../../../i18n/i18n';
import styles from './styles';

class OrderNoteScreen extends React.PureComponent {
  render() {
    const { onChangeText } = this.props;
    return (
      <Card>
        <CardItem header>
          <TextInput
            style={styles.textInput}
            placeholder={I18n.t('cart.placeholder.order_note')}
            multiline
            underlineColorAndroid="#ffffff"
            onChangeText={(text) => { onChangeText(text); }}
          />
        </CardItem>
      </Card>
    );
  }
}

export default OrderNoteScreen;
