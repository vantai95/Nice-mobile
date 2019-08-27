import { connect } from 'react-redux';
import * as Actions from '../../stores/actions';
import WelcomeScreen from '../../screens/apps/welcome';

const mapStateToProps = state => ({
  home: state.home,
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  onSetLocation: (data) => {
    dispatch(Actions.setLocation(data));
  },
  onSetLocations: (data) => {
    dispatch(Actions.setLocations(data));
  },
  onSetFilterParam: (data) => {
    dispatch(Actions.setFilterParam(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
