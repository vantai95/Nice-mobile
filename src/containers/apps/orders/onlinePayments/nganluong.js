import { connect } from 'react-redux';
import * as Actions from '../../../../stores/actions';
import NganLuongScreen from '../../../../screens/apps/orders/onlinePayments/nganluong';

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

const mapDispatchToProps = dispatch => ({
  onRemoveCart: () => {
    dispatch(Actions.removeAllCart());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NganLuongScreen);
