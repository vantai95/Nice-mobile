import React from 'react';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Text
} from 'native-base';
import { View } from 'react-native';
import styles from './styles';
import I18n from '../../../../i18n/i18n';

class NotLoggedScreen extends React.PureComponent {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>{I18n.t('header.profile')}</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.notLoginContainer}>
          <Text style={styles.textNote}>
            {I18n.t('profile.need_login')}
          </Text>
          <View>
            <Button small vertical danger style={styles.btnRedirectLogin} onPress={() => navigate('Authenticate', { from: 'profile' })}>
              <Text>
                {I18n.t('profile.btn_login_register')}
              </Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

export default NotLoggedScreen;
