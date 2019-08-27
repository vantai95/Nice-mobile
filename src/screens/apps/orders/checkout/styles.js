import { StyleSheet, Dimensions } from 'react-native';
import fonts from '../../../../constants/fonts';
import colors from '../../../../constants/colors';

const deviceWidth = Dimensions.get('window').width;

export default {
  body: {
    backgroundColor: '#fafafa'
  },
  textTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
  textName: {
    color: colors.darkGray
  },
  btnOrder: {
    backgroundColor: colors.themeColor,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20
  },
  btnText: {
    fontFamily: fonts.primaryBold,
  },

  //* *common */
  textInput: {
    width: '100%',
    marginBottom: 5,
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 4,
    color: colors.textInput,
    paddingRight: 30, // to ensure the text is never behind the icon,
  },

  textInputAndroid: {
    fontFamily: fonts.primaryRegular,
    width: '100%',
    // fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 4,
    color: colors.textInput,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
};

//* *input select picker */
export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: deviceWidth - 54.5,
    marginBottom: 5,
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 4,
    color: colors.textInput,
    paddingRight: 30, // to ensure the text is never behind the icon,
  },
  inputAndroid: {
    fontFamily: fonts.primaryRegular,
    width: deviceWidth - 54.5, // -20 content padder, -20 item, -6 marginHorizontal
    // fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 4,
    color: colors.textInput,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
});

//* *input select picker */
export const pickerSelectSmallStyles = StyleSheet.create({
  inputIOS: {
    marginBottom: 5,
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 4,
    color: colors.textInput,
    paddingRight: 30, // to ensure the text is never behind the icon,
  },
  inputAndroid: {
    fontFamily: fonts.primaryRegular,
    // fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 4,
    color: colors.textInput,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
});
