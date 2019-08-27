import React from 'react';
import {
  Container,
  Button,
  Form,
  Text,
  Content,
  Icon,
  Header,
  Title,
  Left,
  Right,
  Body
} from 'native-base';
import { Keyboard } from 'react-native';

import _ from 'lodash';

import PropTypes from 'prop-types';
import styles from './styles';
import toasts from '../../../utils/toast';
import I18n from '../../../i18n/i18n';
import AuthService from '../../../services/authService';
import AsyncStorageService from '../../../services/asyncStorageService';
import utils from '../../../utils/utils';
import * as Components from '../../../components';

class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      confirmNewPassword: '',

      wnPassword: false,
      wnNewPassword: false,
      wnConfirmNewPassword: false
    };
    this.authService = new AuthService();
  }

  saveBtnPress = () => {
    // _ hide keyboard
    Keyboard.dismiss();

    // _ check invalid text input
    if (this.checkTextInput()) {
      if (this.checkConfirmPassWord()) {
        const dataReq = {
          old_password: this.state.password,
          password: this.state.newPassword,
          password_confirmation: this.state.confirmNewPassword
        };

        this.authService.changePassword(dataReq)
          .then((responseJson) => {
            if (responseJson.success) {
              // remove token in storage
              AsyncStorageService.removeData();

              // remove info in redux
              this.props.onSetLogout();

              toasts.success(I18n.t('auth.change_password.success'));
              this.props.navigation.goBack();
            } else {
              const { message } = responseJson;

              // if old password error (not match)
              if (message.old_password) {
                this.setState({ wnPassword: true });
                toasts.warning(_.join(message.old_password, '.'));
                return;
              }

              // if password error
              if (message.password) {
                this.setState({ wnNewPassword: true });
                toasts.warning(_.join(message.password, '.'));
                return;
              }

              // if confirm password error
              if (message.password_confirmation) {
                this.setState({ wnConfirmNewPassword: true });
                toasts.warning(_.join(message.password_confirmation, '.'));
                return;
              }
              toasts.danger(message.toString());
            }
          })
          .catch((error) => {
            toasts.danger(error);
          });
      }
    }
  }

  checkConfirmPassWord = () => {
    // _ get value state
    const { newPassword, confirmNewPassword } = this.state;

    // _ if true: show toast
    if (newPassword !== confirmNewPassword) {
      this.setState({ wnConfirmNewPassword: true });
      toasts.warning(I18n.t('common.validate.password_confirm'));
      return false;
    }

    return true;
  }

  checkTextInput = () => {
    this.setState({
      wnPassword: false,
      wnNewPassword: false,
      wnConfirmNewPassword: false
    });

    // _ get value state
    const {
      password,
      newPassword,
      confirmNewPassword,
    } = this.state;

    if (!utils.isPassword(password)) {
      this.setState({ wnPassword: true });
      toasts.warning(I18n.t('common.validate.password'));
      return false;
    }
    if (!utils.isPassword(newPassword)) {
      this.setState({ wnNewPassword: true });
      toasts.warning(I18n.t('common.validate.password'));
      return false;
    }
    if (!utils.isPassword(confirmNewPassword)) {
      this.setState({ wnConfirmNewPassword: true });
      toasts.warning(I18n.t('common.validate.password'));
      return false;
    }

    return true;
  }

  render() {
    const {
      password,
      newPassword,
      confirmNewPassword,

      wnPassword,
      wnNewPassword,
      wnConfirmNewPassword
    } = this.state;
    const { goBack } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => { goBack(); }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 4 }}>
            <Title>{I18n.t('header.change_password')}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Components.TextInput
              isPassword
              error={wnPassword}
              value={password}
              placeholder={I18n.t('auth.change_password.placeholder.password')}
              onChangeText={text => this.setState({ password: text })}
              onClearText={() => this.setState({ password: '' })}
            />
            <Components.TextInput
              isPassword
              error={wnNewPassword}
              value={newPassword}
              placeholder={I18n.t('auth.change_password.placeholder.new_password')}
              onChangeText={text => this.setState({ newPassword: text })}
              onClearText={() => this.setState({ newPassword: '' })}
            />
            <Components.TextInput
              isPassword
              error={wnConfirmNewPassword}
              value={confirmNewPassword}
              placeholder={I18n.t('auth.change_password.placeholder.new_password_confirm')}
              onChangeText={text => this.setState({ confirmNewPassword: text })}
              onClearText={() => this.setState({ confirmNewPassword: '' })}
            />
            <Button full style={styles.btnSave} onPress={() => this.saveBtnPress()}>
              <Text style={styles.textBold}>{I18n.t('auth.change_password.btn_save')}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

ChangePasswordScreen.propTypes = {
  onSetLogout: PropTypes.func.isRequired
};

export default ChangePasswordScreen;
