import { Dimensions, StyleSheet } from 'react-native';
import fonts from '../../../../constants/fonts';
import colors from '../../../../constants/colors';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  notLoginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnRedirectLogin: {
    borderRadius: 20,
    width: deviceWidth / 2,
    margin: 10
  },
  textNote: {
    color: 'gray',
    textAlign: 'center'
  },

  /** INFO */
  titleBackground: {
    backgroundColor: '#F8F8F8'
  },
  thumbnailView: {
    height: deviceHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnailViewC: {
    height: deviceHeight * 0.3,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.2)'
  },
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  titleSection: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    fontFamily: fonts.primaryBold,
    color: colors.themeColor
  },
  infoSection: {
    paddingTop: 20,
    paddingBottom: 20
  },
  infoText: {
    fontFamily: fonts.primaryLight
  },
  line: {
    height: 0.5,
    backgroundColor: '#dddddd'
  },

  /** Logout */
  btnLogout: {
    margin: 15,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: colors.themeColor
  },

  textBold: {
    fontFamily: fonts.primaryBold
  }
});
