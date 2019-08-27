import React from 'react';
import {
  Container,
  Button,
  Form,
  Text,
  Content,
  Icon,
  Title,
  Left,
  Right,
  Body,
  Header
} from 'native-base';
import { Keyboard } from 'react-native';

import _ from 'lodash';
import UserService from '../../../../services/userService';

import styles from './styles';
import toasts from '../../../../utils/toast';
import utils from '../../../../utils/utils';
import I18n from '../../../../i18n/i18n';
import * as Components from '../../../../components';

class EditUserScreen extends React.Component {
  constructor(props) {
    super(props);

    const { getParam } = this.props.navigation;

    this.state = {
      id: null,
      email: '',
      phoneNumber: '',
      address: '',
      type: getParam('type'),

      wnEmail: false,
      wnPhoneNumber: false,
      wnAddress: false,
    };

    this.userService = new UserService();
  }

  componentWillMount() {
    const { getParam } = this.props.navigation;

    if (getParam('info')) {
      const {
        id, email, phone, address
      } = getParam('info');

      this.setState({
        id, email: email || '', phoneNumber: phone || '', address: address || ''
      });
    }
  }

  saveBtnPress = () => {
    // _ hide keyboard
    Keyboard.dismiss();

    // _ check invalid text input
    if (this.checkTextInput()) {
      const { type } = this.state;

      if (type === 'add') {
        this.onAddInfo();
      } else if (type === 'update') {
        this.onUpdateInfo();
      }
    }
  }

  onAddInfo = () => {
    const { email, phoneNumber, address } = this.state;

    const dataReq = { email, phone: phoneNumber, address };

    this.userService.addInfo(dataReq)
      .then((responseJson) => {
        if (responseJson.success) {
          toasts.success(I18n.t('common.create.success'));
          this.onGoBack(true);
        } else {
          const { message } = responseJson;
          this.responseWn(message);
        }
      })
      .catch((error) => { toasts.danger(error); });
  }

  onUpdateInfo = () => {
    const {
      id, email, phoneNumber, address
    } = this.state;

    const dataReq = { email, phone: phoneNumber, address };

    this.userService.updateInfo(id, dataReq)
      .then((responseJson) => {
        if (responseJson.success) {
          toasts.success(I18n.t('common.edit.success'));
          this.onGoBack(true);
        } else {
          const { message } = responseJson;
          this.responseWn(message);
        }
      })
      .catch((error) => { toasts.danger(error); });
  }

  responseWn = (message) => {
    if (message.email) {
      toasts.warning(_.join(message.email, '.'));
      this.setState({ wnEmail: true });
      return;
    }
    if (message.phone) {
      this.setState({ wnPhoneNumber: true });
      toasts.warning(_.join(message.phone, '.'));
      return;
    }
    if (message.address) {
      this.setState({ wnAddress: true });
      toasts.warning(_.join(message.address, '.'));
      return;
    }

    toasts.danger(message.toString());
  }

  checkTextInput = () => {
    this.setState({
      wnEmail: false,
      wnPhoneNumber: false,
      wnAddress: false
    });

    // _ get value state
    const {
      email,
      phoneNumber,
      address,
    } = this.state;

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

    if (address === '') {
      this.setState({ wnAddress: true });
      toasts.warning(I18n.t('common.validate.empty'));
      return false;
    }

    return true;
  }

  onGoBack = (value) => {
    const { state, goBack } = this.props.navigation;
    state.params.onGoBack(value);
    goBack();
  }

  getTitle = () => {
    const { type } = this.state;
    return type === 'add'
      ? I18n.t('header.alternative_info_create')
      : I18n.t('header.alternative_info_edit');
  }

  render() {
    const {
      email,
      phoneNumber,
      address,

      wnEmail,
      wnPhoneNumber,
      wnAddress
    } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => { this.onGoBack(false); }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{this.getTitle()}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form style={{ marginTop: -10 }}>
            <Components.TextInput
              error={wnEmail}
              value={email}
              placeholder={I18n.t('profile.placeholder.email')}
              onChangeText={text => this.setState({ email: text })}
              onClearText={() => this.setState({ email: '' })}
            />
            <Components.TextInput
              error={wnPhoneNumber}
              value={phoneNumber}
              maxLength={11}
              isNumber
              placeholder={I18n.t('profile.placeholder.phone')}
              onChangeText={text => this.setState({ phoneNumber: text })}
              onClearText={() => this.setState({ phoneNumber: '' })}
            />
            <Components.TextInput
              error={wnAddress}
              value={address}
              placeholder={I18n.t('profile.placeholder.address')}
              onChangeText={text => this.setState({ address: text })}
              onClearText={() => this.setState({ address: '' })}
            />
            <Button full style={styles.btn} onPress={() => this.saveBtnPress()}>
              <Text style={styles.textBold}>{I18n.t('profile.btn_save')}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default EditUserScreen;
