import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import styles from './styles';
import images from '../../../constants/images';
import I18n from '../../../i18n/i18n';

class LogoScreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.groupLogo}>
        <Image source={images.LOGO_URL} style={styles.logo} />
        <Text style={styles.content}>
          {I18n.t('welcome.logo_content')}
        </Text>
      </View>
    );
  }
}

export default LogoScreen;
