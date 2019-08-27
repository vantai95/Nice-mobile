import { StyleSheet } from 'react-native';
import fonts from '../../../../../constants/fonts';
import colors from '../../../../../constants/colors';

export default StyleSheet.create({
  infoIconCheck: {
    marginTop: 2,
    fontSize: 15,
    color: '#00BB00',
    width: 20
  },
  infoIconUnCheck: {
    marginTop: 2,
    fontSize: 15,
    color: colors.gray,
    width: 20
  },
  bgTwoColor: {
    backgroundColor: '#fafafa'
  },
  textTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
});
