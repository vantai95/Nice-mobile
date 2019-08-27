
import { StyleSheet, Dimensions } from 'react-native';
import fonts from '../../../../../constants/fonts';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  containerWeb: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnViewV2: {
    width: deviceWidth * 0.8
  },
  btn: {
    marginTop: 10,
    borderRadius: 20,
  },
  btnText: {
    fontFamily: fonts.primaryBold
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },

  paySuccessText: {
    fontSize: 20,
    color: 'green',
    fontFamily: fonts.primaryBold
  },
  payNotSuccessText: {
    fontSize: 20,
    color: 'red',
    fontFamily: fonts.primaryBold
  },
  orderTotalText: {
    fontSize: 20,
    color: '#066ecf',
    fontFamily: fonts.primaryBold,
    marginVertical: 10,
  },
  paypalLogo: {
    width: deviceWidth * 0.5,
    height: deviceWidth * 0.5,
  },
  icon: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    margin: 10
  }
});
