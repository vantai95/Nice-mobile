import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
  formDateItem: {
    paddingLeft: 0,
    marginTop: 17,
    paddingBottom: 5
  },
  placeholderDate: {
    color: colors.gray,
    fontSize: 15,
    fontFamily: fonts.primaryRegular
  },
  textInput: {
    color: colors.textInput,
    fontSize: 15,
    fontFamily: fonts.primaryRegular
  }
});
