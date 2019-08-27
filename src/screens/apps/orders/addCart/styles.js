import { StyleSheet, Dimensions } from 'react-native';
import fonts from '../../../../constants/fonts';
import colors from '../../../../constants/colors';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  textName: {
    color: colors.darkGray
  },
  customizationName: {
    fontFamily: fonts.primaryBold,
    color: colors.themeColor
  },

  btnAdd: {
    backgroundColor: colors.themeColor
  },

  //* *Cart item */
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

  //* *modal add */
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: deviceWidth - 20,
    height: deviceHeight * 0.7
  },
  header: {
    flex: 1,
    alignItems: 'flex-end'
  },
  footer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  iconClose: {
    color: colors.gray
  },
  itemBody: {
    justifyContent: 'center'
  },
  itemRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textPrice: {
    fontFamily: fonts.primaryBold,
    color: colors.themeColor
  },

  //* *common */
  pdB: {
    paddingBottom: 5
  }
});

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
