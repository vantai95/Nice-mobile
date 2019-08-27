import React from 'react';
import {
  Button,
  Form,
  Text,
  Container
} from 'native-base';
import {
  Grid,
  Col,
  Row
} from 'react-native-easy-grid';
import {
  Keyboard,
  View,
  Text as TextRN,
} from 'react-native';
import {
  Google,
  Facebook
} from 'expo';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  FACEBOOK_APP_ID
} from '../../../constants/config';

import styles from './styles';
import toasts from '../../../utils/toast';
import utils from '../../../utils/utils';
import I18n from '../../../i18n/i18n';
import AuthService from '../../../services/authService';
import AsyncStorageService from '../../../services/asyncStorageService';
import * as Components from '../../../components';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',

      wnEmail: false,
      wnPassword: false
    };
    this.authService = new AuthService();
  }

  loginByEmailPress = () => {
    // _ hide keyboard
    Keyboard.dismiss();

    // _ check invalid text input
    if (this.checkTextInput()) {
      const { email, password } = this.state;
      const { deviceToken } = this.props.app;

      const dataReq = {
        email,
        password,
        device_token: deviceToken
      };

      this.authService.login(dataReq)
        .then((responseJson) => {
          if (responseJson.success) {
            this.handleLogin(responseJson.data);
          } else {
            const { message } = responseJson;

            // if email error
            if (message.email) {
              this.setState({ wnEmail: true });
              toasts.warning(_.join(message.email, '.'));
              return;
            }

            // if password error
            if (message.password) {
              this.setState({ wnPassword: true });
              toasts.warning(_.join(message.password, '.'));
              return;
            }

            toasts.danger(message.toString());
          }
        })
        .catch((error) => { toasts.danger(error); });
    }
  }

  loginByGooglePress = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        behavior: 'web',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const { deviceToken } = this.props.app;
        const { user, accessToken } = result;

        const dataReq = {
          email: user.email,
          uid: user.id,
          gg_token: accessToken,
          device_token: deviceToken
        };

        this.authService.loginGoogle(dataReq)
          .then((responseJson) => {
            if (responseJson.success) {
              this.handleLogin(responseJson.data);
            } else {
              const { message } = responseJson;
              toasts.danger(message.toString());
            }
          })
          .catch((error) => { toasts.danger(error); });
      } else {
        toasts.danger(I18n.t('auth.login.failed'));
      }
    } catch (e) {
      toasts.danger(e);
    }
  }

  loginByFacebookPress = async () => {
    try {
      const result = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile', 'email']
      });

      if (result.type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${result.token}`);
        if (response.status === 200) {
          const responseJsonFB = await response.json();

          const { deviceToken } = this.props.app;

          const dataReq = {
            uid: responseJsonFB.id,
            email: '',
            fb_token: result.token,
            device_token: deviceToken
          };

          this.authService.loginFacebook(dataReq)
            .then((responseJson) => {
              if (responseJson.success) {
                this.handleLogin(responseJson.data);
              } else {
                const { message } = responseJson;
                toasts.danger(message.toString());
              }
            })
            .catch((error) => { toasts.danger(error); });
        } else {
          toasts.danger(I18n.t('auth.login.failed'));
        }
      } else {
        toasts.danger(I18n.t('auth.login.failed'));
      }
    } catch (e) {
      toasts.danger(e);
    }
  }

  handleLogin = (responseJson) => {
    const dataRes = {
      token: responseJson.token,
      name: responseJson.name,
      email: responseJson.email,
      gender: responseJson.gender,
      phone: responseJson.phone,
      id: responseJson.id
    };

    const { onSetUser, app, navigation } = this.props;

    // save data to redux
    onSetUser(dataRes);

    // save token to storage
    const data = {
      language: app.language,
      token: responseJson.token
    };
    // this.setStorageToken(responseJson.token);
    AsyncStorageService.setData(JSON.stringify(data));

    // alert notify
    toasts.success(I18n.t('auth.login.success'));

    // navigation to Profile
    navigation.navigate('Profile');
  }

  checkTextInput = () => {
    this.setState({ wnEmail: false, wnPassword: false });

    // _ get value state
    const { email, password } = this.state;

    if (!utils.isEmail(email)) {
      this.setState({ wnEmail: true });
      toasts.warning(I18n.t('common.validate.email_invalid'));
      return false;
    }

    // _ if one of all is true: show toast
    if (!utils.isPassword(password)) {
      this.setState({ wnPassword: true });
      toasts.warning(I18n.t('common.validate.password'));
      return false;
    }

    return true;
  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      email,
      password,
      wnEmail,
      wnPassword
    } = this.state;
    return (
      <Container style={styles.container}>
        <View style={styles.groupInput}>
          <Form>
            <Components.TextInput
              hasIcon
              iconName="user"
              error={wnEmail}
              value={email}
              placeholder={I18n.t('auth.login.placeholder.email')}
              onChangeText={text => this.setState({ email: text })}
              onClearText={() => this.setState({ email: '' })}
            />
            <Components.TextInput
              hasIcon
              iconName="user"
              isPassword
              error={wnPassword}
              value={password}
              placeholder={I18n.t('auth.login.placeholder.password')}
              onChangeText={text => this.setState({ password: text })}
              onClearText={() => this.setState({ password: '' })}
            />
          </Form>
          <Grid style={styles.mt15}>
            <Col size={1}>
              <Row size={1} />
            </Col>
            <Col size={2}>
              <Row size={1} style={styles.rowRight}>
                <Button transparent small dark onPress={() => { navigate('ForgotPassword'); }}>
                  <TextRN style={styles.textInput}>{I18n.t('auth.login.forgot_password')}</TextRN>
                </Button>
              </Row>
            </Col>
          </Grid>
        </View>
        <View style={styles.groupButton}>
          <Button full primary style={styles.btnLogin} onPress={() => this.loginByEmailPress()}>
            <Text style={styles.textBold}>{I18n.t('auth.login.btn_login')}</Text>
          </Button>
          <Text style={styles.noteText}>{I18n.t('auth.login.order_account')}</Text>
          <Components.ButtonSocials
            onFacebookPress={() => { this.loginByFacebookPress(); }}
            onGooglePress={() => { this.loginByGooglePress(); }}
          />
        </View>
      </Container>
    );
  }
}

LoginScreen.propTypes = {
  app: PropTypes.shape({
    deviceToken: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }).isRequired,
  onSetUser: PropTypes.func.isRequired
};

export default LoginScreen;
