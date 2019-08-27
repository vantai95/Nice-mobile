import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1
  },

  //* *group logo */ 262.5 284
  groupLogo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 1050 * 0.27,
    height: 231 * 0.27,
    marginBottom: 20
  },
  languageView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  languageImage: {
    width: 40,
    height: 40
  },
  content: {
    color: colors.textContent,
    fontSize: 15,
    fontFamily: fonts.primaryRegular
  },

  /** group select picker */
  groupSelectPicker: {
    flex: 2,
    padding: 20,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGoView: {
    width: '100%',
    alignItems: 'flex-end'
  },
  btnGo: {
    backgroundColor: colors.themeColor,
  },
  btnGoText: {
    fontFamily: fonts.primaryBold
  },

  //* *group ads */
  groupAds: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: deviceHeight * 0.05
  },
  ads: {
    alignItems: 'center'
  },
  groupBottom: {
    flex: 1
  },
  icon: {
    marginLeft: deviceWidth * 0.01,
    marginRight: deviceWidth * 0.01,
    marginBottom: 20,
    color: colors.gray,
    fontSize: 20
  },
  iconLocation: {
    width: 78 * 0.7,
    height: 63 * 0.7
  },
  iconOrder: {
    width: 75 * 0.7,
    height: 65 * 0.7
  },
  iconDelivery: {
    width: 97 * 0.7,
    height: 61 * 0.7
  },
  textAds: {
    color: colors.gray,
    fontSize: 11,
    fontFamily: fonts.primaryRegular
  }
});

//* *input select picker */
export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: deviceWidth - 40,
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
    width: deviceWidth - 40,
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
