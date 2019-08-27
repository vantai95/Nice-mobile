import { connect } from 'react-redux';
import FilterScreen from '../../../../screens/apps/homes/home/filter';

const mapStateToProps = state => ({
  home: state.home
});

export default connect(mapStateToProps, null)(FilterScreen);
