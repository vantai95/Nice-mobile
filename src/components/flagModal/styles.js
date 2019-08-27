import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    padding: 15
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.6)'
  },
  flagGroupView: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flagView: {
    alignItems: 'center'
  },
  flagImage: {
    width: 85,
    height: 85
  },
  viewClose: {
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    marginBottom: 20
  },
  textClose: {
    fontSize: 20,
    color: colors.white
  },
  countryText: {
    color: colors.white
  }
});
