import { connect } from 'react-redux';
import * as Components from '../../components';

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps)(Components.SpinnerScreen);
