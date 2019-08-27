import { connect } from 'react-redux';
import * as Actions from '../../stores/actions';
import ChangePasswordScreen from '../../screens/auths/changePassword';

const mapDispatchToProps = dispatch => ({
  onSetLogout: () => {
    dispatch(Actions.clearUser());
  }
});

export default connect(null, mapDispatchToProps)(ChangePasswordScreen);
