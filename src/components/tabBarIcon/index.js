import React from 'react';
import { Icon } from 'expo';
import PropTypes from 'prop-types';
import colors from '../../constants/colors';
import styles from './styles';

class TabBarIcon extends React.PureComponent {
  render() {
    const { focused, name } = this.props;
    return (
      <Icon.Ionicons
        name={name}
        size={26}
        style={styles.icon}
        color={focused ? colors.tabIconSelected : colors.tabIconDefault}
      />
    );
  }
}

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

export { TabBarIcon };
