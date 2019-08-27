import { connect } from 'react-redux';
import * as Actions from '../../../stores/actions';
import ProfileScreen from '../../../screens/apps/profiles/profile';

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  onSetLogout: () => {
    dispatch(Actions.clearUser());
  },
  onSetExtraInfos: (data) => {
    dispatch(Actions.setExtraInfos(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
