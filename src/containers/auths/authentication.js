import { connect } from 'react-redux';
import * as Actions from '../../stores/actions';
import AuthenticateScreen from '../../screens/auths/authenticate';

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (data) => {
    dispatch(Actions.setUser(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateScreen);
