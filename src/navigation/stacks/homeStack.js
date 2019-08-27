
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as Components from '../../components';
import I18n from '../../i18n/i18n';

import HomeContainer from '../../containers/apps/homes/home';
import FilterContainer from '../../containers/apps/homes/home/filter';
import DetailContainer from '../../containers/apps/homes/detail';
import CartContainer from '../../containers/apps/orders/cart';
import CheckoutContainer from '../../containers/apps/orders/checkout';
import OtpContainer from '../../containers/apps/orders/otp';
import OnlinePaymentScreen from '../../screens/apps/orders/onlinePayments';
import PaypalContainer from '../../containers/apps/orders/onlinePayments/paypal';
import NganLuongContainer from '../../containers/apps/orders/onlinePayments/nganluong';

const HomeStack = createStackNavigator(
  {
    Home: HomeContainer,
    Filter: FilterContainer,
    Detail: DetailContainer,
    Cart: CartContainer,
    Checkout: CheckoutContainer,
    Otp: {
      screen: OtpContainer,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    OnlinePayment: {
      screen: OnlinePaymentScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Paypal: {
      screen: PaypalContainer,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    NganLuong: {
      screen: NganLuongContainer,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: 'none'
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  const { routeName } = navigation.state.routes[navigation.state.index];

  if (routeName === 'Detail'
    || routeName === 'Cart'
    || routeName === 'Checkout'
    || routeName === 'Otp'
    || routeName === 'Paypal'
    || routeName === 'NganLuong'
    || routeName === 'OnlinePayment') {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: ({ focused }) => (
      <Components.TabBarLabel
        focused={focused}
        tabName={I18n.t('tab.home')}
      />
    ),
    tabBarIcon: ({ focused }) => (
      <Components.TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
      />
    ),
    tabBarVisible
  };
};

export default HomeStack;
