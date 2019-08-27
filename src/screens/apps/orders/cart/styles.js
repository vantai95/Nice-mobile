import { StyleSheet } from 'react-native';
import fonts from '../../../../constants/fonts';
import colors from '../../../../constants/colors';

export default StyleSheet.create({
  body: {
    backgroundColor: '#fafafa'
  },
  btnOrder: {
    backgroundColor: colors.themeColor,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20
  },
  btnText: {
    fontFamily: fonts.primaryBold,
  }
});
