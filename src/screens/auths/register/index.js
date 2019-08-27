import React from 'react';
import {
  Container,
  Button,
  Form,
  Text,
  Content,
} from 'native-base';
import { Keyboard } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import AuthService from '../../../services/authService';
import * as Components from '../../../components';

import styles from './styles';
import toasts from '../../../utils/toast';
import utils from '../../../utils/utils';
import I18n from '../../../i18n/i18n';
import AsyncStorageService from '../../../services/asyncStorageService';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      phoneNumber: '',
      gender: true,
      dateOfBirth: null,
      password: '',
      confirmPassword: '',

      wnFullname: false,
      wnEmail: false,
      wnPhoneNumber: false,
      wnDateOfBirth: false,
      wnPassword: false,
      wnConfirmPassword: false
    };

    this.authService = new AuthService();
  }

  registerBtnPress = () => {
    // _ hide keyboard
    Keyboard.dismiss();

    // _ check invalid text input
    if (this.checkTextInput()) {
      if (this.checkConfirmPassWord()) {
        const {
          dateOfBirth,
          email,
          password,
          confirmPassword,
          fullname,
          phoneNumber,
          gender
        } = this.state;

        const { deviceToken } = this.props.app;

        const date = new Date(dateOfBirth);

        const dataReq = {
          email,
          password,
          password_confirmation: confirmPassword,
          full_name: fullname,
          phone: phoneNumber,
          gender: gender ? 'male' : 'female',
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          device_token: deviceToken
        };

        this.authService.register(dataReq)
          .then((responseJson) => {
            if (responseJson.success) {
              const dataRes = {
                token: responseJson.data.token,
                name: responseJson.data.name,
                email: responseJson.data.email,
                id: responseJson.data.id,
                gender: responseJson.data.gender,
                phone: responseJson.data.phone
              };

              this.props.onSetUser(dataRes);

              // save token to storage
              const data = {
                language: this.props.app.language,
                token: responseJson.data.token
              };

              AsyncStorageService.setData(JSON.stringify(data));

              toasts.success(I18n.t('auth.register.success'));

              this.props.navigation.navigate('Profile');
            } else {
              const { message } = responseJson;

              // if email error
              if (message.email) {
                this.setState({ wnEmail: true });
                toasts.warning(_.join(message.email, '.'));
                return;
              }

              // if phone error
              if (message.phone) {
                this.setState({ wnPhoneNumber: true });
                toasts.warning(_.join(message.phone, '.'));
                return;
              }

              toasts.danger(message.toString());
            }
          })
          .catch((error) => { toasts.danger(error); });
      }
    }
  }

  checkConfirmPassWord = () => {
    this.setState({ wnConfirmPassword: false });
    // _ get value state
    const { password, confirmPassword } = this.state;

    // _ if true: show toast
    if (password !== confirmPassword) {
      this.setState({ wnConfirmPassword: true });
      toasts.warning(I18n.t('common.validate.password_confirm'));
      return false;
    }

    return true;
  }

  checkTextInput = () => {
    this.setState({
      wnFullname: false,
      wnEmail: false,
      wnPhoneNumber: false,
      wnPassword: false,
      wnDateOfBirth: false
    });

    // _ get value state
    const {
      fullname,
      email,
      phoneNumber,
      password,
      dateOfBirth,
    } = this.state;

    if (fullname === '') {
      this.setState({ wnFullname: true });
      toasts.warning(I18n.t('common.validate.empty'));
      return false;
    }

    if (!utils.isEmail(email)) {
      this.setState({ wnEmail: true });
      toasts.warning(I18n.t('common.validate.email'));
      return false;
    }

    if (!utils.isPhone(phoneNumber)) {
      this.setState({ wnPhoneNumber: true });
      toasts.warning(I18n.t('common.validate.phone'));
      return false;
    }

    if (!utils.isPassword(password)) {
      this.setState({ wnPassword: true });
      toasts.warning(I18n.t('common.validate.password'));
      return false;
    }

    if (!dateOfBirth) {
      this.setState({ wnDateOfBirth: true });
      toasts.warning(I18n.t('common.validate.empty'));
      return false;
    }

    return true;
  }

  render() {
    const {
      fullname,
      email,
      phoneNumber,
      gender,
      password,
      confirmPassword,

      wnFullname,
      wnEmail,
      wnPhoneNumber,
      wnPassword,
      wnConfirmPassword,
      wnDateOfBirth
    } = this.state;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Form style={{ marginTop: -10 }}>
            <Components.TextInput
              error={wnFullname}
              value={fullname}
              placeholder={I18n.t('auth.register.placeholder.full_name')}
              onChangeText={text => this.setState({ fullname: text })}
              onClearText={() => this.setState({ fullname: '' })}
            />
            <Components.TextInput
              error={wnEmail}
              value={email}
              placeholder={I18n.t('auth.register.placeholder.email')}
              onChangeText={text => this.setState({ email: text })}
              onClearText={() => this.setState({ email: '' })}
            />
            <Components.TextInput
              error={wnPhoneNumber}
              value={phoneNumber}
              maxLength={11}
              isNumber
              placeholder={I18n.t('auth.register.placeholder.phone')}
              onChangeText={text => this.setState({ phoneNumber: text })}
              onClearText={() => this.setState({ phoneNumber: '' })}
            />
            <Components.TextInput
              isPassword
              error={wnPassword}
              value={password}
              placeholder={I18n.t('auth.register.placeholder.password')}
              onChangeText={text => this.setState({ password: text })}
              onClearText={() => this.setState({ password: '' })}
            />
            <Components.TextInput
              isPassword
              error={wnConfirmPassword}
              value={confirmPassword}
              placeholder={I18n.t('auth.register.placeholder.password_confirm')}
              onChangeText={text => this.setState({ confirmPassword: text })}
              onClearText={() => this.setState({ confirmPassword: '' })}
            />
            <Components.GenderInput
              gender={gender}
              onPress={() => this.setState({ gender: !gender })}
            />
            <Components.DateInput
              error={wnDateOfBirth}
              onDateChange={newDate => this.setState({ dateOfBirth: newDate })}
              placeHolderText={I18n.t('auth.register.placeholder.date_of_birth')}
            />
            <Button full style={styles.btnRegister} onPress={() => this.registerBtnPress()}>
              <Text style={styles.textBold}>{I18n.t('auth.register.btn_register')}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

RegisterScreen.propTypes = {
  app: PropTypes.shape({
    deviceToken: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }).isRequired,
  onSetUser: PropTypes.func.isRequired
};

export default RegisterScreen;
