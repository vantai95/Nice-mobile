import { Platform, Dimensions, StyleSheet } from 'react-native';
import fonts from '../../../../constants/fonts';
import colors from '../../../../constants/colors';

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fab: {
    backgroundColor: colors.themeColor
  },
  btnRefresh: {
    borderRadius: 20,
    width: deviceWidth / 2,
    margin: 10
  },

  //* * modal filter */
  mdContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  mdCartItemTitleHeader: {
    flex: 1
  },
  mdCartItemShowView: {
    flex: 1,
    alignItems: 'flex-end'
  },
  mdCartItem2Col: {
    flexDirection: 'column'
  },
  mdCartItem1Col: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  mdParamItem: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20
  },
  mdSoftItem: {
    width: '100%',
    flexDirection: 'row',
  },
  mdParamItemCol: {
    width: '50%',
    flexDirection: 'row'
  },
  mdCheckbox: {
    marginRight: 20
  },
  mdRadioButton: {
    marginRight: 20,
    borderRadius: 10
  },
  mdViewClose: {
    justifyContent: 'flex-end'
  },
  mdTextClose: {
    fontSize: Platform.OS === 'ios' ? 20 : 18
  },
  mdTextCheckbox: {
    fontFamily: fonts.primaryRegular
  },
  mdIconShowOrHide: {
    color: colors.themeColor
  },
  mdTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.textTitle
  },
  mdCheckboxContent: {
    color: colors.textContent
  },

  /** flatlist, item */
  flatListContainer: {
    backgroundColor: colors.white,
    // paddingHorizontal: 10,
  },
  itemTypeView: {
    width: 100,
    height: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    top: 12,
    left: -25,
    transform: [
      { rotate: '-45deg' }
    ],
  },
  itemTypeText: {
    fontSize: 10,
    fontFamily: fonts.primaryBold,
    color: '#ffffff'
  },
  itemRowCenterView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemIconView: {
    width: 30,
    alignItems: 'center'
  },
  itemIconEvil: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    color: colors.gray
  },
  itemIconFA: {
    fontSize: Platform.OS === 'ios' ? 15 : 13,
    color: colors.gray
  },
  itemTextBadge: {
    fontSize: Platform.OS === 'ios' ? 10 : 8,
    color: colors.white
  },
  itemContainer: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    paddingRight: 10
  },
  itemSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  itemImage: {
    height: 120,
    width: 120,
    overflow: 'hidden'
  },
  itemContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: Platform.OS === 'ios' ? 14 : 12,
    color: '#617ae1',
  },
  itemTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: Platform.OS === 'ios' ? 16 : 14,
    color: '#5F5F5F',
  },
  itemSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: Platform.OS === 'ios' ? 12 : 10,
    color: '#a4a4a4',
  },
  itemMetaContainer: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    alignItems: 'center',
  },
  itemPrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: Platform.OS === 'ios' ? 12 : 10,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemGroupReviews: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemStar: {
    fontSize: 12,
    color: 'red'
  },
  itemReviewsText: {
    fontSize: Platform.OS === 'ios' ? 12 : 10
  },
  itemRowCol1: {
    width: '40%',
    flexDirection: 'row'
  },
  itemRowCol2: {
    width: '60%',
    flexDirection: 'row'
  }
});
