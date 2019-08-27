import { connect } from 'react-redux';
import * as Actions from '../../../../stores/actions';
import DetailScreen from '../../../../screens/apps/homes/detail';

const mapStateToProps = state => ({
  home: state.home
});

const mapDispatchToProps = dispatch => ({
  onInitCart: (data) => {
    dispatch(Actions.initCart(data));
  },
  onSetRestaurant: (data) => {
    dispatch(Actions.setRestaurant(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
