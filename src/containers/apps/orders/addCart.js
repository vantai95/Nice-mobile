import { connect } from 'react-redux';
import * as Actions from '../../../stores/actions';
import AddCartScreen from '../../../screens/apps/orders/addCart';

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

const mapDispatchToProps = dispatch => ({
  onAddCart: (data) => {
    dispatch(Actions.addCart(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCartScreen);
