import { connect } from 'react-redux';
import AlternativeInfoScreen from '../../../screens/apps/profiles/alternativeInfo';

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(AlternativeInfoScreen);
