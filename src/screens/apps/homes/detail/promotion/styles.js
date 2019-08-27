import { StyleSheet } from 'react-native';
import fonts from '../../../../../constants/fonts';
import colors from '../../../../../constants/colors';

export default StyleSheet.create({
  body: {
    backgroundColor: '#fafafa'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameText: {
    fontFamily: fonts.primaryBold,
    color: colors.themeColor
  },
  title: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
  desctiption: {
    fontFamily: fonts.primaryRegular
  },
  timeItem: {
    width: '100%',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoText: {
    fontFamily: fonts.primaryRegular,
  }
});
