import React, { Component } from 'react';
import {
  Container,
  Header,
  Tab,
  Tabs,
  Button,
  Left,
  Right,
  Body,
  Title,
  Icon
} from 'native-base';
import LoginScreen from '../login';
import RegisterScreen from '../register';
import I18n from '../../../i18n/i18n';

class AuthenticaScreen extends Component {
  constructor(props) {
    super(props);
    this.dataParam = this.props.navigation.getParam('dataParam');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => { navigate('Profile'); }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{I18n.t('header.authenticate')}</Title>
          </Body>
          <Right />
        </Header>
        <Tabs>
          <Tab heading={I18n.t('header.login')}>
            <LoginScreen dataParam={this.dataParam} {...this.props} />
          </Tab>
          <Tab heading={I18n.t('header.register')}>
            <RegisterScreen dataParam={this.dataParam} {...this.props} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default AuthenticaScreen;
