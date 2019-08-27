import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../constants/colors';
import styles from './styles';

class TabBarLabel extends React.PureComponent {
  render() {
    const { focused, tabName } = this.props;
    return (
      <Text style={[styles.text, { color: focused ? colors.tabIconSelected : colors.tabIconDefault }]}>
        {tabName}
      </Text>
    );
  }
}

TabBarLabel.propTypes = {
  tabName: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

export { TabBarLabel };
