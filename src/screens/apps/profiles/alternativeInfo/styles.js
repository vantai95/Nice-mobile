import fonts from '../../../../constants/fonts';
import colors from '../../../../constants/colors';

export default {
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  groupButton: {
    flexDirection: 'row'
  },
  btnEdit: {
    marginRight: 20
  },
  /** INFO */
  titleBackground: {
    backgroundColor: '#F8F8F8'
  },
  titleSection: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
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
};
