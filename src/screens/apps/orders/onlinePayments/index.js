import React from 'react';
import {
  Container,
  Text,
  Button
} from 'native-base';
import {
  View,
  ImageBackground
} from 'react-native';
import images from '../../../../constants/images';
import I18n from '../../../../i18n/i18n';
import styles from './styles';
import * as Components from '../../../../components';

class OnlinePaymentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.dataParam = this.props.navigation.getParam('dataParam');
  }

  goPayment = (type) => {
    const { navigate } = this.props.navigation;

    switch (type) {
      case 'pp': {
        navigate('Paypal', {
          dataParam: {
            order_total: this.dataParam.order_total,
            order_id: this.dataParam.order_id,
          }
        });
        break;
      }
      case 'nl': {
        navigate('NganLuong', {
          dataParam: {
            buyerFullname: this.dataParam.full_name,
            buyerEmail: this.dataParam.email,
            buyerMobile: this.dataParam.phone,
            buyerAddress: this.dataParam.address,
            totalAmount: this.dataParam.order_total,
            orderId: this.dataParam.order_id
          }
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    return (
      <Container>
        <Components.HeaderNoLeftNoRight title="online_payment" />

        <ImageBackground source={images.PAYMENT_BACKGROUND} style={styles.container}>
          <View style={styles.containerV2}>
            <View style={styles.btnViewV2}>

              <Button full onPress={() => { this.goPayment('pp'); }} style={styles.btn}>
                <Text style={styles.btnText}>{I18n.t('online_payment.btn_go_paypal')}</Text>
              </Button>

              <Button full warning onPress={() => { this.goPayment('nl'); }} style={styles.btn}>
                <Text style={styles.btnText}>{I18n.t('online_payment.btn_go_nganluong')}</Text>
              </Button>

            </View>
          </View>
        </ImageBackground>

      </Container>
    );
  }
}

export default OnlinePaymentScreen;
