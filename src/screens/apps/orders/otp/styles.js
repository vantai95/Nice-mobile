import { StyleSheet } from 'react-native';
import fonts from '../../../../constants/fonts';
import colors from '../../../../constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fafafa'
  },
  btnAccept: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: colors.themeColor
  },
  btnClose: {
    marginTop: 20,
    borderRadius: 20
  },
  btnText: {
    fontFamily: fonts.primaryBold
  },
  formItem: {
    paddingLeft: 0,
    borderRadius: 4,
    borderColor: '#ededed',
    fontSize: 16,
  },
  icon: {
    color: colors.gray
  },
  textInput: {
    color: colors.textInput,
    fontSize: 15,
    fontFamily: fonts.primaryRegular
  },
  titleNM: {
    color: colors.textInput,
    paddingTop: 3,
    paddingLeft: 3
  },
  processBarRow: {
    paddingTop: 10
  },
  expiredText: {
    color: 'red'
  },
  image: {
    width: 100,
    height: 100
  },
});
