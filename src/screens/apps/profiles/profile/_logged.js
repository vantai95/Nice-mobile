import React from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Thumbnail
} from 'native-base';
import {
  View,
  Alert,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import images from '../../../../constants/images';
import styles from './styles';
import toasts from '../../../../utils/toast';
import utils from '../../../../utils/utils';
import I18n from '../../../../i18n/i18n';
import UserService from '../../../../services/userService';
import AsyncStorageService from '../../../../services/asyncStorageService';
import AuthService from '../../../../services/authService';

class LoggedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainInfo: {
        address: null,
        birth_day: null,
        email: null,
        full_name: null,
        phone: null
      },
      numOfExtraInfos: 0
    };

    this.userService = new UserService();
    this.authService = new AuthService();
  }

  componentDidMount() {
    this.getMyInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.haveChanged !== this.props.user.haveChanged) {
      this.getMyInfo();
    }
  }

  getMyInfo = () => {
    this.userService.getMyInfo()
      .then((responseJson) => {
        if (responseJson.success) {
          this.setState({
            mainInfo: responseJson.main_info,
            numOfExtraInfos: responseJson.extra_info.length
          });

          this.props.onSetExtraInfos({ extraInfos: responseJson.extra_info });
        } else {
          const { message } = responseJson;
          toasts.warning(message.toString());
        }
      })
      .catch((error) => { toasts.danger(error); });
  }

  btnLogoutPress = () => {
    Alert.alert(
      I18n.t('profile.logout_alert.title'),
      I18n.t('profile.logout_alert.content'),
      [
        {
          text: I18n.t('profile.logout_alert.cancel'),
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: I18n.t('profile.logout_alert.ok'),
          onPress: () => {
            this.logoutHandle();
          }
        },
      ],
      { cancelable: false },
    );
  }

  logoutHandle = () => {
    /**
     * call api logout
     */
    this.authService.logout()
      .then(() => { });
    /**
     * remove data in redux
     */
    this.props.onSetLogout();
    /**
     * remove token in Storage
     */
    AsyncStorageService.removeData();
    /**
     * show alert
     */
    toasts.success(I18n.t('profile.logout_success'));
  }

  onGoBack = (value) => {
    if (value) {
      this.getMyInfo();
    }
  }

  renderRowInfo = (title, info) => (
    <View style={[styles.titleSection, styles.infoSection]}>
      <Text note>{title}</Text>
      <Text style={styles.infoText}>{info || ''}</Text>
    </View>
  )

  renderBtnOption = (routerName, title) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        style={[
          styles.titleSection,
          styles.titleBackgroun
        ]}
        onPress={() => {
          navigate(routerName, {
            onGoBack: value => this.onGoBack(value)
          });
        }}
      >
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.titleText}>{'>'}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { mainInfo, numOfExtraInfos } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>

        <Content>
          <ImageBackground source={images.BACKGROUND_IMAGE_URL} style={styles.thumbnailView}>
            <View style={styles.thumbnailViewC}>
              <Thumbnail style={styles.thumbnail} source={images.PROFILE} />
            </View>
          </ImageBackground>

          {/* **************************************** */}

          <View style={[styles.titleSection, styles.titleBackground]}>
            <Text style={styles.titleText}>
              {I18n.t('profile.title.info')}
            </Text>
            <TouchableOpacity onPress={() => { navigate('ProfileEdit', { mainInfo, onGoBack: value => this.onGoBack(value) }); }}>
              <Text style={styles.titleText}>
                {I18n.t('profile.btn_edit')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* **************************************** */}

          <View style={styles.line} />

          {/* full name */}
          {this.renderRowInfo(I18n.t('profile.title.full_name'), mainInfo.full_name)}

          <View style={styles.line} />

          {/* email */}
          {this.renderRowInfo(I18n.t('profile.title.email'), mainInfo.email)}

          <View style={styles.line} />

          {/* birth day */}
          {this.renderRowInfo(
            I18n.t('profile.title.date_of_birth'),
            mainInfo.birth_day
              ? utils.reformatDateString(mainInfo.birth_day)
              : ''
          )}

          <View style={styles.line} />

          {/* phone number */}
          {this.renderRowInfo(I18n.t('profile.title.phone'), mainInfo.phone)}

          <View style={styles.line} />

          {/* address */}
          {this.renderRowInfo(I18n.t('profile.title.address'), mainInfo.address)}

          <View style={styles.line} />

          {/* **************************************** */}

          {/* go to Alternative Info */}
          {this.renderBtnOption('AlternativeInfo', `${I18n.t('profile.btn_alternative_info')} (${numOfExtraInfos})`)}

          <View style={styles.line} />

          {/* go to Order History */}
          {this.renderBtnOption('OrderHistory', I18n.t('profile.btn_order_history'))}

          <View style={styles.line} />

          {/* go to Change Password */}
          {this.renderBtnOption('ChangePassword', I18n.t('profile.btn_change_password'))}

          {/* **************************************** */}

          <Button block primary style={styles.btnLogout} onPress={() => this.btnLogoutPress()}>
            <Text style={styles.textBold}>
              {I18n.t('profile.btn_logout')}
            </Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default LoggedScreen;
