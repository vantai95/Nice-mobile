import { StyleSheet } from 'react-native';
import fonts from '../../../../../constants/fonts';
import colors from '../../../../../constants/colors';

export default StyleSheet.create({
  title: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
  pdB: {
    paddingBottom: 5
  },
  textTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
  textName: {
    color: colors.darkGray
  },
  ciMinusAdd: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: 35,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ciQuantity: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
