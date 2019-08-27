import { Dimensions, StyleSheet } from 'react-native';

import fonts from '../../../../../constants/fonts';
import colors from '../../../../../constants/colors';

const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  /** banner */
  imageBackground: {
    height: deviceHeight * 0.25,
    width: null,
    justifyContent: 'flex-end'
  },
  backgroundContainer: {
    height: deviceHeight * 0.25,
    backgroundColor: 'rgba(130,130,130, 0.5)',
    justifyContent: 'flex-end'
  },

  //* *Info */
  infoCartTitleName: {
    fontFamily: fonts.primaryBold,
    color: colors.themeColor,
    textAlign: 'center'
  },
  infoCartTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
  infoCartItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCartItemCheck: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  infoCheckView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%'
  },
  infoText: {
    fontFamily: fonts.primaryRegular,
  },
  infoIconCheck: {
    fontSize: 15,
    color: colors.themeColor
  },
  infoIconUnCheck: {
    fontSize: 15,
    color: colors.gray
  },
  infoDeliverySetting: {
    flexDirection: 'row'
  },
  infoW40: {
    width: '40%'
  },
  infoW30: {
    width: '30%'
  },
});
