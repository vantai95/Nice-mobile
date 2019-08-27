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
      fullname: '',
      phoneNumber: '',
      dateOfBirth: null,
      address: '',
      mainInfo: getParam('mainInfo'),

      wnFullname: false,
      wnPhoneNumber: false,
      wnDateOfBirth: false,
    };

    this.userService = new UserService();
  }

  componentWillMount() {
    const { mainInfo } = this.state;
    if (mainInfo) {
      this.setState({
        fullname: mainInfo.full_name || '',
        phoneNumber: mainInfo.phone || '',
        dateOfBirth: mainInfo.birth_day || '01-01-2000',
        address: mainInfo.address || ''
      });
    }
  }

  saveBtnPress = () => {
    // _ hide keyboard
    Keyboard.dismiss();

    // _ check invalid text input
    if (this.checkTextInput()) {
      const {
        dateOfBirth,
        fullname,
        phoneNumber,
        address
      } = this.state;

      const date = new Date(dateOfBirth);

      const dataReq = {
        full_name: fullname,
        phone: phoneNumber,
        birth_day: `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`,
        address
      };

      this.userService.updateMainInfo(dataReq)
        .then((responseJson) => {
          if (responseJson.success) {
            toasts.success(I18n.t('common.edit.success'));
            this.onGoBack(true);
          } else {
            const { message } = responseJson;

            if (message.full_name) {
              toasts.warning(_.join(message.full_name, '.'));
              this.setState({ wnFullname: true });
              return;
            }
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

  checkTextInput = () => {
    this.setState({
      wnFullname: false,
      wnPhoneNumber: false,
      wnDateOfBirth: false
    });

    // _ get value state
    const {
      fullname,
      phoneNumber,
      dateOfBirth,
    } = this.state;

    if (fullname === '') {
      this.setState({ wnFullname: true });
      toasts.warning(I18n.t('common.validate.empty'));
      return false;
    }

    if (!utils.isPhone(phoneNumber)) {
      this.setState({ wnPhoneNumber: true });
      toasts.warning(I18n.t('common.validate.phone'));
      return false;
    }

    if (!dateOfBirth) {
      this.setState({ wnDateOfBirth: true });
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

  render() {
    const {
      fullname,
      phoneNumber,
      address,
      dateOfBirth,

      wnFullname,
      wnPhoneNumber,
      wnDateOfBirth
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
            <Title>{I18n.t('header.profile_edit')}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form style={{ marginTop: -10 }}>
            <Components.TextInput
              error={wnFullname}
              value={fullname}
              placeholder={I18n.t('profile.placeholder.full_name')}
              onChangeText={text => this.setState({ fullname: text })}
              onClearText={() => this.setState({ fullname: '' })}
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
            <Components.DateInput
              error={wnDateOfBirth}
              defaultDate={new Date(dateOfBirth)}
              onDateChange={(newDate) => { this.setState({ dateOfBirth: newDate }); }}
              placeHolderText={utils.reformatDateString(dateOfBirth.toString())}
            />
            <Components.TextInput
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
