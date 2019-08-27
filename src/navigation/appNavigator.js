import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';

/** auth loading */
import AuthLoadingContainer from '../containers/authLoading';

/** welcome */
import WelcomeContainer from '../containers/apps/welcome';

/** import stack */
import AuthStack from './stacks/authStack';
import HomeStack from './stacks/homeStack';
import ProfileStack from './stacks/profileStack';

/** create bottom tab */
const AppTab = createBottomTabNavigator({
  HomeStack,
  ProfileStack
});

/**
 * Type: AppContainer
 * Content: Root navigation
 ********************************************** */
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingContainer,
    Welcome: WelcomeContainer,
    Auth: AuthStack,
    AppTab
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
