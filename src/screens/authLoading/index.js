/* eslint-disable global-require */
import React from 'react';
import {
  AppLoading,
  Asset,
  Font,
  Icon
} from 'expo';
import {
  NetInfo
} from 'react-native';
import images from '../../constants/images';
import toasts from '../../utils/toast';
import I18n from '../../i18n/i18n';
import HomeService from '../../services/homeService';
import AuthService from '../../services/authService';
import AsyncStorageService from '../../services/asyncStorageService';
import enums from '../../constants/enums';
import notification from '../../utils/notification';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.homeService = new HomeService();
    this.authService = new AuthService();
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    if (!isConnected) {
      toasts.warning(I18n.t('app.network_disconnected'));
      this.props.onSetDisconnected();
    } else {
      this.props.onSetConnected();
    }
  }

  getDataFromStorage = () => {
    AsyncStorageService.getData()
      .then((response) => {
        if (response) {
          const data = JSON.parse(response);

          /** if language not null and not empty, set language to redux */
          if (data.language && data.language !== '') {
            const dataSet = {
              language: data.language
            };
            this.props.onSetLanguage(dataSet);
          }

          /** if token not null and not empty, set token to redux and call api verify login */
          if (data.token && data.token !== '') {
            const dataSet = {
              token: data.token
            };
            this.props.onSetToken(dataSet);
            this.onVerifyLogin(data.token);
          }
        }
      })
      .then(() => {
        /** after set language, call api get filter param by language */
        this.getFilterParam();
      })
      .catch((error) => { toasts.danger(error); });
  }

  onVerifyLogin = (token) => {
    this.authService.verifyLogin()
      .then((responseJson) => {
        if (responseJson.success) {
          const dataRes = {
            token,
            name: responseJson.data.name,
            email: responseJson.data.email,
            id: responseJson.data.id,
            gender: responseJson.data.gender,
            phone: responseJson.data.phone
          };
          // save data to redux
          this.props.onSetUser(dataRes);
        } else {
          AsyncStorageService.removeData();
          this.props.onSetLogout();
        }
      })
      .catch(() => { });
  }

  getFilterParam = () => {
    this.homeService.getFilterParam()
      .then((responseJson) => {
        if (responseJson.success) {
          const filterParam = responseJson.data;

          /** include value 0 to list: cuisines, categories */
          const allPro = {
            id: 0,
            name: I18n.t('enums.filter.all')
          };
          filterParam.cuisines.unshift(allPro);
          filterParam.categories.unshift(allPro);

          /** map data, from (value, label) to (id, name) */
          filterParam.status = enums.STATUSES_FILTER.map(status => ({
            id: status.value,
            name: status.label
          }));
          filterParam.services = enums.SERVICES_FILTER.map(status => ({
            id: status.value,
            name: status.label
          }));
          filterParam.payment_methods = enums.PAYMENTS_FILTER.map(status => ({
            id: status.value,
            name: status.label
          }));

          /** dispatch list param to redux */
          this.props.onSetFilterParam({ filterParam });
        } else {
          toasts.danger(responseJson.message.toString());
        }
      })
      .catch((error) => {
        toasts.danger(error);
      });
  }

  getDeviceToken = () => {
    notification.getDeviceToken()
      .then((responseJson) => {
        this.props.onSetDeviceToken({
          deviceToken: responseJson
        });
      });
  }

  loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([...Object.values(images)]),
    Font.loadAsync({
      ...Icon.Ionicons.font,
      'space-mono': require('../../../assets/fonts/SpaceMono-Regular.ttf'),
      Roboto: require('../../../assets/fonts/Roboto-Thin.ttf'),
      'Lato-Bold': require('../../../assets/fonts/Lato-Bold.ttf'),
      'Lato-BoldItalic': require('../../../assets/fonts/Lato-BoldItalic.ttf'),
      'Lato-Italic': require('../../../assets/fonts/Lato-Italic.ttf'),
      'Lato-Light': require('../../../assets/fonts/Lato-Light.ttf'),
      'Lato-Medium': require('../../../assets/fonts/Lato-Medium.ttf'),
      'Lato-Regular': require('../../../assets/fonts/Lato-Regular.ttf'),
      'Lato-SemiBold': require('../../../assets/fonts/Lato-Semibold.ttf'),
      'Lato-Thin': require('../../../assets/fonts/Lato-Thin.ttf'),
    })
  ]);

  handleLoadingError = (error) => {
    toasts.danger(error);
  };

  handleFinishLoading = () => {
    this.getDataFromStorage();
    this.getDeviceToken();
    toasts.success(I18n.t('app.welcome'));
    this.props.navigation.navigate('Welcome');
  };

  render() {
    return (
      <AppLoading
        startAsync={this.loadResourcesAsync}
        onError={this.handleLoadingError}
        onFinish={this.handleFinishLoading}
      />
    );
  }
}

export default AuthLoadingScreen;
