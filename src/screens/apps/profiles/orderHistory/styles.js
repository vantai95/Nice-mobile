import { StyleSheet } from 'react-native';
import fonts from '../../../../constants/fonts';
import colors from '../../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  itemHeaderTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
  itemTitle: {
    fontFamily: fonts.primaryRegular
  },
  itemContent: {
    fontFamily: fonts.primaryLight
  },
  colCenter: {
    justifyContent: 'center'
  }
});
