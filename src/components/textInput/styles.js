import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
  formItem: {
    paddingLeft: 0,
    marginTop: 10
  },
  input: {
    color: colors.textInput,
    fontSize: 15,
    fontFamily: fonts.primaryRegular
  },
  iconColor: {
    color: colors.iconTextColor
  }
});
