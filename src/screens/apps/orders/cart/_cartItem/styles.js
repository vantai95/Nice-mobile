import { StyleSheet } from 'react-native';
import fonts from '../../../../../constants/fonts';
import colors from '../../../../../constants/colors';

export default StyleSheet.create({
  title: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
  iconRemove: {
    fontSize: 30,
    color: colors.themeColor,
    paddingLeft: 8
  },
  textName: {
    color: colors.darkGray
  },
  pdB: {
    paddingBottom: 5
  },
  textPrice: {
    fontFamily: fonts.primaryBold,
    color: colors.themeColor
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
  line: {
    backgroundColor: '#dddddd',
    height: 0.5,
    width: '30%',
    margin: 2
  },
});
