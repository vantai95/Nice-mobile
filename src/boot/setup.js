import React from 'react';
import { StatusBar, Alert } from 'react-native';
import { Notifications } from 'expo';

/** native base */
import { StyleProvider, Root } from 'native-base';

/** redux */
import { Provider } from 'react-redux';
import { store } from '../stores/reducers';

/** navigation */
import AppNavigator from '../navigation/appNavigator';

/** spinner loading */
import SpinnerContainer from '../containers/components/spinner';

/** theme */
import getTheme from '../theme/components';
import { THEME } from '../constants/config';

export default class Setup extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-console
    console.disableYellowBox = true;
  }

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  handleNotification = (notification) => {
    const { title, body } = notification.data;
    Alert.alert(title, body, [{ text: 'OK', onPress: () => { } }], { cancelable: false });
  }

  render() {
    return (
      <StyleProvider style={getTheme(THEME)}>
        <Root>
          <Provider store={store}>
            <StatusBar barStyle="light-content" />
            <SpinnerContainer />
            <AppNavigator />
          </Provider>
        </Root>
      </StyleProvider>
    );
  }
}
