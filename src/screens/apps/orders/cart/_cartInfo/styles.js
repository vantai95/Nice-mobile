import { StyleSheet } from 'react-native';
import fonts from '../../../../../constants/fonts';
import colors from '../../../../../constants/colors';

export default StyleSheet.create({
  title: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
  bgTwoColor: {
    backgroundColor: '#fafafa'
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textName: {
    color: colors.darkGray
  },
  textTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
  textPrice: {
    fontFamily: fonts.primaryBold,
    color: colors.themeColor
  },
  note: {
    color: colors.red,
    fontStyle: 'italic'
  }
});
