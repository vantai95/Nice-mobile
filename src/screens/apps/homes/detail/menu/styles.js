import { Platform, StyleSheet } from 'react-native';
import fonts from '../../../../../constants/fonts';
import colors from '../../../../../constants/colors';

export default StyleSheet.create({
  body: {
    backgroundColor: '#fafafa'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconAdd: {
    fontSize: 30,
    color: colors.themeColor
  },
  btnAdd: {
    marginLeft: 20
  },
  textTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.themeColor
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
  textName: {
    color: colors.darkGray
  },
  iconSearch: {
    marginLeft: 10,
    padding: 0,
    height: 40,
    borderRadius: 20
  },
  searchInput: {
    width: '80%',
    paddingLeft: 10
  },

  categoryView: {
    height: 50,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3
  },
  category: {
    height: 30,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    backgroundColor: colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryTextSelected: {
    color: colors.yellowText_v1,
  },
  categoryText: {
    color: '#4a4a4a'
  },
  itemContainer: {
    backgroundColor: colors.white,
    paddingLeft: 30,
    paddingVertical: 30,
  },
  itemImage: {
    height: 80,
    width: 80,
    overflow: 'hidden'
  },
  itemTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: Platform.OS === 'ios' ? 16 : 14,
    color: '#5F5F5F',
  },

  itemDecription: {
    fontFamily: fonts.primaryRegular,
    fontSize: Platform.OS === 'ios' ? 12 : 10,
    color: '#a4a4a4',
    paddingVertical: 10
  },
  itemContent: {
    flex: 3,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },

  itemDetail: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'flex-start',
  }
});
