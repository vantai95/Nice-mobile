import React from 'react';
import {
  Container,
  Button,
  Form,
  Text,
  Content,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title
} from 'native-base';
import { Keyboard } from 'react-native';
import _ from 'lodash';
import toasts from '../../../utils/toast';
import utils from '../../../utils/utils';
import I18n from '../../../i18n/i18n';
import styles from './styles';
import AuthService from '../../../services/authService';
import * as Components from '../../../components';

class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      wnEmail: false
    };
    this.authService = new AuthService();
  }

  sendBtnPress = () => {
    // _ hide keyboard
    Keyboard.dismiss();

    // _ check invalid text input
    if (this.checkTextInput()) {
      const { email } = this.state;

      const dataReq = { email };

      this.authService.forgotPassword(dataReq)
        .then((responseJson) => {
          if (responseJson.success) {
            // _ show toast
            toasts.success(I18n.t('auth.forgot_password.success'));

            // _ reset state
            this.setState({ email: '', wnEmail: false });
          } else {
            const { message } = responseJson;

            // if email error
            if (message.email) {
              this.setState({ wnEmail: true });
              toasts.warning(_.join(message.email, '.'));
              return;
            }
            // _ show toast
            toasts.danger(message.toString());
          }
        })
        .catch((error) => { toasts.danger(error); });
    }
  }

  checkTextInput = () => {
    this.setState({ wnEmail: false });
    // _ get value state
    const { email } = this.state;

    // _ if false: show toast
    if (!utils.isEmail(email)) {
      this.setState({ wnEmail: true });
      toasts.warning(I18n.t('common.validate.email'));
      return false;
    }

    return true;
  }

  render() {
    const { goBack } = this.props.navigation;
    const { email, wnEmail } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => { goBack(); }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 4 }}>
            <Title>{I18n.t('header.forgot_password')}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Components.TextInput
              error={wnEmail}
              value={email}
              placeholder={I18n.t('auth.forgot_password.placeholder.email')}
              onChangeText={text => this.setState({ email: text })}
              onClearText={() => this.setState({ email: '' })}
            />
            <Button full style={[styles.btnSend]} onPress={() => this.sendBtnPress()}>
              <Text style={[styles.btnText]}>{I18n.t('auth.forgot_password.btn_send')}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default ForgotPasswordScreen;
