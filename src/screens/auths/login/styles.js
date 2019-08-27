import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  groupInput: {
    flex: 2,
    padding: 15,
    paddingTop: 0
  },
  groupButton: {
    flex: 3,
    padding: 15,
    alignItems: 'center'
  },
  btnLogin: {
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: colors.themeColor
  },
  noteText: {
    color: colors.gray,
    margin: 20,
    textAlign: 'center',
    fontFamily: fonts.primaryRegular
  },
  textBold: {
    fontFamily: fonts.primaryBold
  },
  textInput: {
    color: colors.textInput,
    fontSize: 15,
    fontFamily: fonts.primaryRegular
  },
  rowRight: {
    justifyContent: 'flex-end'
  },
  mt15: {
    marginTop: 15
  }
});
