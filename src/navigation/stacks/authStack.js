import { createStackNavigator } from 'react-navigation';

import AuthenticateContainer from '../../containers/auths/authentication';
import ForgotPasswordScreen from '../../screens/auths/forgotPassword';

const AuthStack = createStackNavigator(
  {
    Authenticate: AuthenticateContainer,
    ForgotPassword: ForgotPasswordScreen
  },
  {
    headerMode: 'none'
  }
);

export default AuthStack;
