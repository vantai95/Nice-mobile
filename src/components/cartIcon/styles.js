import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: colors.white,
    marginRight: 5
  },
  text: {
    color: colors.themeColor,
    fontSize: 12,
    textAlign: 'center'
  },
  iconBadge: {
    width: 22,
    height: 22,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.themeColor
  }
});
