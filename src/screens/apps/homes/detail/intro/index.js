import React from 'react';
import {
  Icon,
  Text,
  Container,
  Content,
  CardItem,
  H2,
} from 'native-base';
import {
  Col, Row
} from 'react-native-easy-grid';
import {
  ImageBackground,
  View
} from 'react-native';
import _ from 'lodash';
import images from '../../../../../constants/images';
import I18n from '../../../../../i18n/i18n';
import styles from './styles';
import Colors from '../../../../../constants/colors';
import Fonts from '../../../../../constants/fonts';
import utils from '../../../../../utils/utils';

const enumDays = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun'
];

class InfoScreen extends React.Component {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      dataSource: data
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (prevProps.data !== data) {
      this.setState({ dataSource: data });
    }
  }

  renderAvailableLocations = restaurantDeliverySetting => restaurantDeliverySetting.map((item, index) => (
    <CardItem key={index.toString()} style={styles.infoDeliverySetting}>
      <View style={styles.infoW40}>
        <Text numberOfLines={2} note>{item.district_name}</Text>
      </View>
      <View style={styles.infoW30}>
        <Text note>
          {I18n.t('common.currency', { resource: utils.currencyVnd(item.min_order_amount) })}
        </Text>
      </View>
      <View style={styles.infoW30}>
        <Text note>
          {I18n.t('common.currency', { resource: utils.currencyVnd(item.delivery_cost) })}
        </Text>
      </View>
    </CardItem>
  ))

  renderWorkingTime = workingTimes => workingTimes.map((item, index) => {
    let days = null;
    let times = null;
    /**
     * ngay dac biet
     * *******************************************
     */
    if (item.time_setting.has_special_date === 1) {
      days = <Text note style={styles.infoText}>{item.time_setting.special_date}</Text>;

      /**
       * check if all times
       */
      if (item.time_setting.all_times === 1) {
        times = <Text key={index.toString()} note style={styles.infoText}>{I18n.t('common.days.all_time')}</Text>;
      } else {
        times = item.time_setting.time_setting_details.map((itemDetail, indexDetail) => (
          <Text key={indexDetail.toString()} note style={styles.infoText}>
            {`${itemDetail.from_time.substring(0, 5)} - ${itemDetail.to_time.substring(0, 5)}`}
          </Text>
        ));
      }
    } else if (item.time_setting.all_days === 1) {
      /**
       * all days
       * *******************************************
       */
      days = <Text note style={styles.infoText}>{I18n.t('common.days.all_day')}</Text>;

      /**
       * check if all times
       */
      if (item.time_setting.all_times === 1) {
        times = <Text key={index.toString()} note style={styles.infoText}>{I18n.t('common.days.all_time')}</Text>;
      } else {
        /**
         * not all times
         */
        times = item.time_setting.time_setting_details.map((itemDetail, indexDetail) => (
          <Text key={indexDetail.toString()} note style={styles.infoText}>
            {`${itemDetail.from_time.substring(0, 5)} - ${itemDetail.to_time.substring(0, 5)}`}
          </Text>
        ));
      }
    } else if (item.time_setting.all_days === 0) {
      /**
       * all days
       * *******************************************
       */
      const tempDays = [];

      enumDays.forEach((day) => {
        if (item.time_setting[day] === 1) {
          tempDays.push((tempDays.length === 3 ? '\n' : '') + I18n.t(`common.days.${day}`));
        }
      });

      days = (
        <Text note style={styles.infoText}>
          {_.join(tempDays, ', ')}
        </Text>
      );

      /**
         * check if all times
         */
      if (item.time_setting.all_times === 1) {
        times = <Text numberOfLines={3} key={index.toString()} note style={styles.infoText}>{I18n.t('common.days.all_time')}</Text>;
      } else {
        /**
           * not all times
           */
        times = item.time_setting.time_setting_details.map((itemDetail, indexDetail) => (
          <Text key={indexDetail.toString()} note style={styles.infoText}>
            {`${itemDetail.from_time.substring(0, 5)} - ${itemDetail.to_time.substring(0, 5)}`}
          </Text>
        ));
      }
    }

    return (
      <CardItem key={index.toString()}>
        <View style={styles.infoCartItem}>
          {days}
          <View>
            {times}
          </View>
        </View>
      </CardItem>
    );
  })

  render() {
    const { dataSource } = this.state;
    const restaurantWorkTimes = dataSource.restaurant ? dataSource.restaurant.restaurant_work_times : [];
    const restaurant = dataSource.restaurant ? dataSource.restaurant : null;

    if (!dataSource.restaurant) {
      return (<View />);
    }

    return (
      <Container>
        <Content>

          {/* Banner */}
          <ImageBackground source={images.BACKGROUND_INTRO} style={styles.imageBackground}>
            <View style={styles.backgroundContainer} />
          </ImageBackground>

          {/* Info restaurant */}
          <CardItem header style={{ flexDirection: 'column' }}>
            <H2 numberOfLines={2} style={styles.infoCartTitleName}>{restaurant.name}</H2>
            <Text note>{restaurant.title_brief}</Text>
          </CardItem>

          <CardItem>
            <Text
              note
              style={[
                styles.bannerText,
                {
                  color: dataSource.working_status ? Colors.isOpen : Colors.isClosed,
                  fontFamily: Fonts.primaryBold
                }
              ]}
            >
              {
                dataSource.working_status
                  ? I18n.t('enums.restaurant_status.open')
                  : I18n.t('enums.restaurant_status.close')
              }
            </Text>
          </CardItem>

          <CardItem>
            <Row>
              <Col size={1}>
                <Text note style={styles.infoText}>
                  {I18n.t('detail.intro.delivery_cost', { resource: utils.currencyVnd(restaurant.deliveryCost) })}
                </Text>
              </Col>
              <Col size={1} style={{ alignItems: 'flex-end' }}>
                <Text note style={styles.infoText}>
                  {I18n.t('detail.intro.price_min', { resource: utils.currencyVnd(restaurant.minOrderAmount) })}
                </Text>
              </Col>
            </Row>
          </CardItem>
          <CardItem header>
            <Text numberOfLines={2} style={styles.infoCartTitle}>{I18n.t('detail.intro.restaurant_address')}</Text>
          </CardItem>
          <CardItem>
            <Text note style={styles.infoText}>{restaurant.address}</Text>
          </CardItem>

          {/* Working time */}
          <CardItem header>
            <Text style={styles.infoCartTitle}>{I18n.t('detail.intro.working_time')}</Text>
          </CardItem>
          {
            this.renderWorkingTime(restaurantWorkTimes)
          }

          {/* Payment method */}
          <CardItem header>
            <Text style={styles.infoCartTitle}>{I18n.t('detail.intro.payment_method')}</Text>
          </CardItem>
          <CardItem style={styles.infoCartItemCheck}>
            <View style={styles.infoCheckView}>
              <Icon
                active
                type="FontAwesome"
                style={restaurant.cod_payment === 1 ? styles.infoIconCheck : styles.infoIconUnCheck}
                name={restaurant.cod_payment === 1 ? 'check-square-o' : 'square-o'}
              />
              <Text note style={styles.infoText}>{I18n.t('detail.intro.cod')}</Text>
            </View>
            <View style={styles.infoCheckView}>
              <Icon
                active
                type="FontAwesome"
                style={restaurant.online_payment === 1 ? styles.infoIconCheck : styles.infoIconUnCheck}
                name={restaurant.online_payment === 1 ? 'check-square-o' : 'square-o'}
              />
              <Text note style={styles.infoText}>{I18n.t('detail.intro.online')}</Text>
            </View>
          </CardItem>
          <CardItem header>
            <Text style={styles.infoCartTitle}>{I18n.t('detail.intro.available_service')}</Text>
          </CardItem>
          <CardItem style={styles.infoCartItemCheck}>
            <View style={styles.infoCheckView}>
              <Icon
                active
                type="FontAwesome"
                style={restaurant.delivery === 1 ? styles.infoIconCheck : styles.infoIconUnCheck}
                name={restaurant.delivery === 1 ? 'check-square-o' : 'square-o'}
              />
              <Text note style={styles.infoText}>{I18n.t('detail.intro.delivery')}</Text>
            </View>
            <View style={styles.infoCheckView}>
              <Icon
                active
                type="FontAwesome"
                style={restaurant.pickup === 1 ? styles.infoIconCheck : styles.infoIconUnCheck}
                name={restaurant.pickup === 1 ? 'check-square-o' : 'square-o'}
              />
              <Text note style={styles.infoText}>{I18n.t('detail.intro.pickup')}</Text>
            </View>
          </CardItem>

          {/* Delivery cost header */}
          <CardItem header>
            <Text style={styles.infoCartTitle}>{I18n.t('detail.intro.delivery_content')}</Text>
          </CardItem>
          <CardItem style={styles.infoDeliverySetting}>
            <View style={styles.infoW40}>
              <Text style={styles.infoCartTitle}>{I18n.t('detail.intro.location')}</Text>
            </View>
            <View style={styles.infoW30}>
              <Text style={styles.infoCartTitle}>{I18n.t('detail.intro.minimum')}</Text>
            </View>
            <View style={styles.infoW30}>
              <Text style={styles.infoCartTitle}>{I18n.t('detail.intro.delivery_fee')}</Text>
            </View>
          </CardItem>

          {/* Delivery cost body */}
          {
            this.renderAvailableLocations(restaurant.restaurant_delivery_setting)
          }
        </Content>
      </Container>
    );
  }
}

export default InfoScreen;
