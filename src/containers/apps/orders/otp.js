import { connect } from 'react-redux';
import * as Actions from '../../../stores/actions';
import OtpScreen from '../../../screens/apps/orders/otp';

const mapDispatchToProps = dispatch => ({
  onRemoveCart: () => {
    dispatch(Actions.removeAllCart());
  }
});

export default connect(null, mapDispatchToProps)(OtpScreen);
