import React from 'react';
import {
  Body,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Right
} from 'native-base';
import I18n from '../../../../i18n/i18n';

class ContactInfoScreen extends React.PureComponent {
  render() {
    const {
      onRefactorCart,
      goBack
    } = this.props;
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => { onRefactorCart(); goBack(); }}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title>{I18n.t('header.checkout')}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

export default ContactInfoScreen;
