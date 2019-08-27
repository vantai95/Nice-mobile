import { connect } from 'react-redux';
import * as Actions from '../../../../stores/actions';
import PaypalScreen from '../../../../screens/apps/orders/onlinePayments/paypal';

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

const mapDispatchToProps = dispatch => ({
  onRemoveCart: () => {
    dispatch(Actions.removeAllCart());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaypalScreen);
