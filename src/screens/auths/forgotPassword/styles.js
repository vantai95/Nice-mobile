import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  btnSend: {
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: colors.themeColor
  },
  btnText: {
    fontFamily: fonts.primaryBold
  }
});
