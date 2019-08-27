import React from 'react';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Title
} from 'native-base';
import I18n from '../../../../../i18n/i18n';
import styles from './styles';

class HeaderScreen extends React.PureComponent {
  render() {
    const { goBack } = this.props;
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => { goBack(); }}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={styles.body}>
          <Title>{I18n.t('header.cart')}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

export default HeaderScreen;
