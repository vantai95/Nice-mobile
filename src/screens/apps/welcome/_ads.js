import React from 'react';
import { View, Image } from 'react-native';
import { Text, Icon } from 'native-base';
import styles from './styles';
import images from '../../../constants/images';
import I18n from '../../../i18n/i18n';

class AdsScreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.groupAds}>
        <View style={styles.ads}>
          <Image style={styles.iconLocation} source={images.HOME_LOCATION} />
          <Text style={styles.textAds}>{I18n.t('welcome.ads.location')}</Text>
        </View>
        <Icon active style={styles.icon} name="arrow-right" type="Feather" />
        <View style={styles.ads}>
          <Image style={styles.iconOrder} source={images.HOME_ORDER} />
          <Text style={styles.textAds}>{I18n.t('welcome.ads.order')}</Text>
        </View>
        <Icon active style={styles.icon} name="arrow-right" type="Feather" />
        <View style={styles.ads}>
          <Image style={styles.iconDelivery} source={images.HOME_DELIVERY} />
          <Text style={styles.textAds}>{I18n.t('welcome.ads.delivery')}</Text>
        </View>
      </View>
    );
  }
}

export default AdsScreen;
