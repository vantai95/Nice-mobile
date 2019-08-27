import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';

class SpinnerScreen extends React.PureComponent {
  render() {
    const { loading } = this.props.app;
    return (<Spinner visible={loading} />);
  }
}

SpinnerScreen.propTypes = {
  app: PropTypes.shape({
    loading: PropTypes.bool.isRequired
  }).isRequired
};

export { SpinnerScreen };
