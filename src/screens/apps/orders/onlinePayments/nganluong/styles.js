
import { StyleSheet, Dimensions } from 'react-native';
import fonts from '../../../../../constants/fonts';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerWeb: {
    flex: 1
  },
  logoView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: deviceWidth * 0.75,
    height: deviceWidth * 0.375,
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
  orderTotalText: {
    fontSize: 20,
    color: '#066ecf',
    fontFamily: fonts.primaryBold,
    marginVertical: 10,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    margin: 10
  }
});
