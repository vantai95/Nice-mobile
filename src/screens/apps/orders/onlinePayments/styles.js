import { StyleSheet, Dimensions } from 'react-native';
import fonts from '../../../../constants/fonts';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1
  },
  containerV2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)'
  },
  btnViewV2: {
    width: deviceWidth * 0.8
  },
  btn: {
    marginTop: 10,
    borderRadius: 20
  },
  btnText: {
    fontFamily: fonts.primaryBold
  },
});
