import React from 'react';
import {
  Container,
  Button,
  Item as FormItem,
  Input,
  Form,
  Text,
  Content,
  Icon,
  Card,
  CardItem
} from 'native-base';
import {
  Col,
  Row,
} from 'react-native-easy-grid';
import {
  Keyboard,
  Dimensions,
  Alert,
  Linking,
  Image,
  View
} from 'react-native';
import * as Progress from 'react-native-progress';
import {
  OTP_KEY,
  OTP_TIME_EXPIRED
} from '../../../../constants/config';
import images from '../../../../constants/images';
import toasts from '../../../../utils/toast';
import I18n from '../../../../i18n/i18n';
import styles from './styles';
import Colors from '../../../../constants/colors';
import RestaurantService from '../../../../services/restaurantService';
import * as Components from '../../../../components';

class OtpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      wnOtp: false,
      isSendOtp: true,
      valueOfProcess: 0,
      phoneNumber: '0943093015',

      sendLeft: 0,
      orderId: '',
      // otpCreatedAt: '',
      otpSuccess: true
    };
    this.restaurantService = new RestaurantService();

    /** param from checkout (checkout response) */
    this.dataParam = this.props.navigation.getParam('dataParam');
  }

  componentWillMount() {
    /** this.mouted => using for componentWillUnmount */
    this.mounted = true;

    if (this.mounted) {
      this.setState({
        isSendOtp: !(this.dataParam.otp_verify === 0),
        sendLeft: this.dataParam.send_left,
        orderId: this.dataParam.order_id,
        phoneNumber: this.dataParam.phone
      });
    }

    this.props.onRemoveCart();
  }

  componentDidMount() {
    /** check if otp vefiry true -> start process */
    if (this.state.isSendOtp) {
      this.mounted = true;
      if (this.mounted) { this.startProcessBar(); }
    } else {
      toasts.success(I18n.t('otp.status.success'));
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  startProcessBar = () => {
    // setup time process
    const time = 1 / OTP_TIME_EXPIRED;

    // start process
    this.interval = setInterval(() => {
      const { valueOfProcess } = this.state;

      this.setState({ valueOfProcess: valueOfProcess + time }, () => {
        if (this.state.valueOfProcess > 1) {
          clearInterval(this.interval);
        }
      });
    }, 1000);
  }

  sendBtnPress = () => {
    // _ hide keyboard
    Keyboard.dismiss();

    const { valueOfProcess, orderId, sendLeft } = this.state;

    /**
     * valueOfProcess > 1: Resend OTP else Confirm OTP
     */
    if (valueOfProcess > 1) {
      // check number of resend, if <= 0 -> no resend
      if (sendLeft <= 0) {
        toasts.warning('Your number of resend otp is 0!');
      } else {
        // init data
        const dataInit = { order_id: orderId };

        this.restaurantService.resendOtp(dataInit)
          .then((responseJson) => {
            if (responseJson.success) {
              /**
               * alert success
               * reset process
               * reset sendLeft
               * start process
               */
              toasts.success(responseJson.message.toString());

              this.setState({
                valueOfProcess: 0,
                sendLeft: responseJson.send_left
              }, () => { this.startProcessBar(); });
            } else {
              const { message } = responseJson;
              toasts.warning(message.toString());
            }
          })
          .catch((error) => { toasts.warning(error); });
      }
    } else if (this.checkTextInput()) {
      // _ check invalid text input
      const dataReq = {
        order_id: orderId,
        otp: this.state.otp
      };

      this.restaurantService.confirmOtp(dataReq)
        .then((responseJson) => {
          if (responseJson.success) {
            toasts.success(responseJson.message.toString());
            this.setState({ isSendOtp: false });
          } else {
            toasts.danger(responseJson.message.toString());
          }
        })
        .catch((error) => { toasts.danger(error); });
    }
  }

  notSendOtp = () => {
    Alert.alert(
      I18n.t('common.exit.title'),
      I18n.t('common.exit.content'),
      [
        {
          text: I18n.t('common.exit.cancel'),
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: I18n.t('common.exit.ok'),
          onPress: () => {
            this.setState({ isSendOtp: false, otpSuccess: false });
          }
        },
      ],
      { cancelable: false },
    );
  }

  checkTextInput = () => {
    this.setState({ wnOtp: false });
    // _ get value state
    const { otp } = this.state;

    // _ if false: show toast
    if (otp.length !== 6) {
      this.setState({ wnOtp: true });
      toasts.warning(I18n.t('common.validate.otp'));
      return false;
    }

    return true;
  }

  callPhone = () => {
    const { phoneNumber } = this.state;
    Linking.openURL(`tel:${phoneNumber}`);
  }

  continueShopPress = () => {
    clearInterval(this.interval);
    this.mounted = true;
    if (this.mounted) { this.props.navigation.navigate('Home'); }
  }

  render() {
    const {
      otp, wnOtp, valueOfProcess, isSendOtp, phoneNumber, otpSuccess
    } = this.state;
    return (
      <Container style={styles.container}>
        <Components.HeaderNoLeftNoRight title="otp" />

        {
          isSendOtp
          && (
            <Content padder>

              {/* FORM INPUT OTP */}
              <Form>
                <FormItem rounded style={[styles.formItem]} last error={wnOtp}>

                  <Text style={styles.titleNM}>
                    {OTP_KEY}
                  </Text>

                  <Input
                    keyboardType="numeric"
                    placeholderTextColor="gray"
                    maxLength={6}
                    style={[styles.textInput]}
                    returnKeyType="done"
                    autoCapitalize="none"
                    value={otp}
                    onChangeText={text => this.setState({ otp: text })}
                  />

                  {
                    otp !== ''
                    && (
                      <Icon
                        active
                        name="x"
                        style={styles.icon}
                        type="Feather"
                        onPress={() => this.setState({ otp: '' })}
                      />
                    )
                  }

                </FormItem>
              </Form>

              {/* NOTE OTP EXPIRED */}
              {
                valueOfProcess > 1
                && (
                  <Row style={styles.processBarRow}>
                    <Text style={styles.expiredText}>{I18n.t('otp.otp_expired')}</Text>
                  </Row>
                )
              }

              {/* PROCESS BAR */}
              <Row style={styles.processBarRow}>
                <Progress.Bar
                  color={Colors.themeColor}
                  progress={valueOfProcess}
                  width={Dimensions.get('window').width - 20}
                />
              </Row>

              {/* GROUP BUTTONS */}
              <Row>

                <Col size={1}>
                  <Button full style={[styles.btnAccept]} onPress={() => this.sendBtnPress()}>
                    <Text style={[styles.btnText]}>
                      {valueOfProcess > 1 ? I18n.t('otp.btn_resend') : I18n.t('otp.btn_send')}
                    </Text>
                  </Button>
                </Col>

                <Col size={0.1} />

                <Col size={1}>
                  <Button full light style={[styles.btnClose]} onPress={() => this.notSendOtp()}>
                    <Text style={[styles.btnText]}>{I18n.t('otp.btn_close')}</Text>
                  </Button>
                </Col>

              </Row>

            </Content>
          )
        }

        {/* SCREEN FOR RESULT CONFIRM OTP */}
        {
          !isSendOtp
          && (
            <Content padder>

              {/* CONFIRM OTP SUCCESS */}
              {
                otpSuccess
                && (
                  <View style={{ width: '100%', alignItems: 'center' }}>
                    <Image
                      source={images.ICON_CHECK}
                      style={styles.image}
                    />
                  </View>
                )
              }

              {/* CONFIRM OTP FAILD */}
              {
                !otpSuccess
                && (
                  <Card>
                    <CardItem header>
                      <Text>{I18n.t('otp.contact_phone')}</Text>
                    </CardItem>
                    <CardItem
                      bordered
                      button
                      style={{ backgroundColor: '#CEE3F6' }}
                      onPress={() => this.callPhone()}
                    >
                      <Text>{phoneNumber}</Text>
                    </CardItem>
                  </Card>
                )
              }

              <Button full style={[styles.btnAccept]} onPress={() => { this.continueShopPress(); }}>
                <Text style={[styles.btnText]}>{I18n.t('otp.btn_continue')}</Text>
              </Button>

            </Content>
          )
        }

      </Container>
    );
  }
}

export default OtpScreen;
