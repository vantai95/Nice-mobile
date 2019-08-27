import React from 'react';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';

class InputTitle extends React.PureComponent {
  render() {
    const { title, require } = this.props;
    return (
      <Text note style={styles.title}>
        {title}
        {require && <Text style={styles.require}>*</Text>}
      </Text>
    );
  }
}

InputTitle.defaultProps = {
  require: false
};

InputTitle.propTypes = {
  title: PropTypes.string.isRequired,
  require: PropTypes.bool
};

export { InputTitle };
