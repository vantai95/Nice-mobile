import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as Components from '../../components';
import I18n from '../../i18n/i18n';

import ProfileContainer from '../../containers/apps/profiles/profile';
import ProfileEditScreen from '../../screens/apps/profiles/profileEdit';
import ChangePasswordContainer from '../../containers/auths/changePassword';
import AlternativeInfoContainer from '../../containers/apps/profiles/alternativeInfo';
import AlternativeInfoFormScreen from '../../screens/apps/profiles/alternativeInfoForm';
import OrderHistoryContainer from '../../containers/apps/profiles/orderHistory';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileContainer,
    ProfileEdit: {
      screen: ProfileEditScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ChangePassword: {
      screen: ChangePasswordContainer,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AlternativeInfo: {
      screen: AlternativeInfoContainer,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AlternativeInfoForm: {
      screen: AlternativeInfoFormScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    OrderHistory: {
      screen: OrderHistoryContainer,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: 'none'
  }
);

ProfileStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Components.TabBarLabel
      focused={focused}
      tabName={I18n.t('tab.profile')}
    />
  ),
  tabBarIcon: ({ focused }) => (
    <Components.TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
};

export default ProfileStack;
