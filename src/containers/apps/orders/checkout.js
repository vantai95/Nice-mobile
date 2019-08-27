import { connect } from 'react-redux';
import * as Actions from '../../../stores/actions';
import CheckoutScreen from '../../../screens/apps/orders/checkout';

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  home: state.home,
  restaurant: state.restaurant,
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  onSetDishesChangedList: (data) => {
    dispatch(Actions.setDishesChangedList(data));
  },
  onSetDishesDisappear: (data) => {
    dispatch(Actions.setDishesDisappear(data));
  },
  onUpdateInfo: () => {
    dispatch(Actions.updateInfo());
  },
  onRefactorCart: () => {
    dispatch(Actions.refactorCart());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
