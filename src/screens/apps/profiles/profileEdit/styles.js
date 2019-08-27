import { StyleSheet } from 'react-native';
import colors from '../../../../constants/colors';
import fonts from '../../../../constants/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white
  },
  btn: {
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: colors.themeColor
  },
  textBold: {
    fontFamily: fonts.primaryBold
  }
});
