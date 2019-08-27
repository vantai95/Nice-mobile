import { connect } from 'react-redux';
import * as Components from '../../components';

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

export default connect(mapStateToProps, null)(Components.CartIcon);
