import { connect } from 'react-redux';
import * as Actions from '../stores/actions';
import AuthLoadingScreen from '../screens/authLoading';

const mapDispatchToProps = dispatch => ({
  onSetLogout: () => {
    dispatch(Actions.clearUser());
  },
  onSetFilterParam: (data) => {
    dispatch(Actions.setFilterParam(data));
  },
  onSetDisconnected: () => {
    dispatch(Actions.setNetworkDisConnected());
  },
  onSetConnected: () => {
    dispatch(Actions.setNetworkConnected());
  },
  onSetLanguage: (data) => {
    dispatch(Actions.setLanguage(data));
  },
  onSetToken: (data) => {
    dispatch(Actions.setToken(data));
  },
  onSetUser: (data) => {
    dispatch(Actions.setUser(data));
  },
  onSetDeviceToken: (data) => {
    dispatch(Actions.setDeviceToken(data));
  }
});

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);
