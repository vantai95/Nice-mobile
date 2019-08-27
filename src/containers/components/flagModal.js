import { connect } from 'react-redux';
import * as Actions from '../../stores/actions';
import * as Components from '../../components';

const mapStateToProps = state => ({
  app: state.app,
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  onSetLanguage: (data) => {
    dispatch(Actions.setLanguage(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Components.FlagModalScreen);
