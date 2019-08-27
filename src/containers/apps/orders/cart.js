import { connect } from 'react-redux';
import * as Actions from '../../../stores/actions';
import CartScreen from '../../../screens/apps/orders/cart';

const mapStateToProps = state => ({
  restaurant: state.restaurant,
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  onAddCart: (data) => {
    dispatch(Actions.addCart(data));
  },
  onRemoveDishesChangedList: () => {
    dispatch(Actions.removeDishesChangedList());
  },
  onRemoveDishesDisapper: () => {
    dispatch(Actions.removeDishesDisapper());
  },
  onRemoveCart: () => {
    dispatch(Actions.removeAllCart());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
