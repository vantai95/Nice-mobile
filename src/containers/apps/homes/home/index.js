import { connect } from 'react-redux';
import * as Actions from '../../../../stores/actions';
import HomeScreen from '../../../../screens/apps/homes/home';

const mapStateToProps = state => ({
  home: state.home
});

const mapDispatchToProps = dispatch => ({
  onSetLocation: (data) => {
    dispatch(Actions.setLocation(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
