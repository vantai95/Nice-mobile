import React from 'react';
import {
  Header,
  Left,
  Right,
  Body,
  Title
} from 'native-base';
import PropTypes from 'prop-types';
import I18n from '../../i18n/i18n';

class HeaderNoLeftNoRight extends React.PureComponent {
  render() {
    const { title } = this.props;
    return (
      <Header>
        <Left />
        <Body style={{ flex: 3 }}>
          <Title>{I18n.t(`header.${title}`)}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

HeaderNoLeftNoRight.propTypes = {
  title: PropTypes.string.isRequired
};

export { HeaderNoLeftNoRight };
