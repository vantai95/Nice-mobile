import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

export default StyleSheet.create({
  formCheckboxItem: {
    paddingLeft: 0,
    marginTop: 25,
    paddingBottom: 15
  },
  checkboxTitle: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 15,
    color: colors.textInput,
    fontFamily: fonts.primaryRegular
  },
  checkbox: {
    borderRadius: 12
  }
});
