import React from 'react';
import {
  Icon,
  Text
} from 'native-base';
import {
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import I18n from '../../../../i18n/i18n';

import colors from '../../../../constants/colors';
import styles from './styles';
import enums from '../../../../constants/enums';
import utils from '../../../../utils/utils';

class RestaurantItemScreen extends React.PureComponent {
  goToDetail = (restaurantId, restaurantName, workingStatus, wardId) => {
    this.props.navigation.navigate('Detail', {
      restaurantId, restaurantName, working_status: workingStatus, wardId
    });
  }

  renderStatus = (status, promotionCount) => {
    if (promotionCount > 0) {
      return I18n.t('enums.filter.status.promotion');
    }
    switch (status) {
      case enums.STATUSES.POLULAR: {
        return I18n.t('enums.filter.status.polular');
      }
      case enums.STATUSES.NEW: {
        return I18n.t('enums.filter.status.new');
      }
      case enums.STATUSES.PROMOTION: {
        return I18n.t('enums.filter.status.promotion');
      }
      case enums.STATUSES.HIGH_QUALITY: {
        return I18n.t('enums.filter.status.high_quality');
      }
      default: {
        return '';
      }
    }
  }

  renderStatusColor = (status, promotionCount) => {
    if (promotionCount > 0) {
      return '#4263d7';
    }

    switch (status) {
      case enums.STATUSES.POLULAR: {
        return '#79be38';
      }
      case enums.STATUSES.NEW: {
        return 'red';
      }
      case enums.STATUSES.PROMOTION: {
        return '#4263d7';
      }
      case enums.STATUSES.HIGH_QUALITY: {
        return '#f9aa44';
      }
      default: {
        return 'red';
      }
    }
  }

  renderStar = value => (
    <Icon
      style={styles.itemStar}
      name={value ? 'ios-star' : 'ios-star-outline'}
      color="red"
    />
  )

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => this.goToDetail(item.id, item.name, item.is_open_now, item.restaurant_delivery_setting[0].ward_id)}>
        <View style={styles.itemSubContainer}>
          <View>
            <ImageBackground source={{ uri: item.image_url }} style={styles.itemImage}>

              {/* status of restaurant */}
              {
                item.status !== enums.STATUSES.NO_STATUS
                && (
                  <View style={[styles.itemTypeView, { backgroundColor: this.renderStatusColor(item.status, item.promotion_count) }]}>
                    <Text style={styles.itemTypeText}>
                      {
                        this.renderStatus(item.status, item.promotion_count)
                      }
                    </Text>
                  </View>
                )
              }
              {
                (item.status === enums.STATUSES.NO_STATUS && item.promotion_count !== 0)
                && (
                  <View style={[styles.itemTypeView, { backgroundColor: this.renderStatusColor(item.status, item.promotion_count) }]}>
                    <Text style={styles.itemTypeText}>
                      {
                        this.renderStatus(item.status, item.promotion_count)
                      }
                    </Text>
                  </View>
                )
              }
            </ImageBackground>
            <View style={styles.itemGroupReviews}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {this.renderStar(item.review.star >= 1)}
                {this.renderStar(item.review.star >= 2)}
                {this.renderStar(item.review.star >= 3)}
                {this.renderStar(item.review.star >= 4)}
                {this.renderStar(item.review.star >= 5)}
              </View>
              <Text style={styles.itemReviewsText}>
                {I18n.t('home.review', { resource: item.review.count_review })}
              </Text>
            </View>
          </View>

          <View style={styles.itemContent}>

            <View>
              <Text style={styles.itemTitle}>
                {item.name}
              </Text>
              <Text style={styles.itemSubtitle} numberOfLines={1}>
                {item.title_brief}
              </Text>
            </View>

            <View style={styles.itemRowCenterView}>
              <View style={styles.itemIconView}>
                <Icon style={styles.itemIconFA} type="FontAwesome" active name="map-marker" />
              </View>
              <Text style={styles.itemSubtitle} numberOfLines={1}>
                {item.address}
              </Text>
            </View>

            <View style={styles.itemRowCenterView}>
              <View style={styles.itemIconView}>
                <Icon style={styles.itemIconFA} type="FontAwesome" active name="motorcycle" />
              </View>
              <Text style={styles.itemSubtitle} numberOfLines={1}>
                {I18n.t('common.currency', { resource: utils.currencyVnd(item.restaurant_delivery_setting[0].delivery_cost) })}
              </Text>
            </View>

            <View style={styles.itemRowCenterView}>
              <View style={styles.itemRowCol1}>
                <View style={styles.itemIconView}>
                  <Icon
                    active
                    style={[styles.itemIconFA, {
                      color: item.delivery === 1 ? colors.themeColor : colors.gray
                    }]}
                    type="FontAwesome"
                    name={item.delivery === 1 ? 'check-square-o' : 'square-o'}
                  />
                </View>
                <Text style={styles.itemSubtitle} numberOfLines={1}>{I18n.t('home.delivery')}</Text>
              </View>
              <View style={styles.itemRowCol2}>
                <View style={styles.itemIconView}>
                  <Icon
                    active
                    style={[styles.itemIconFA, {
                      color: item.pickup === 1 ? colors.themeColor : colors.gray
                    }]}
                    type="FontAwesome"
                    name={item.pickup === 1 ? 'check-square-o' : 'square-o'}
                  />
                </View>
                <Text style={styles.itemSubtitle} numberOfLines={1}>{I18n.t('home.pickup')}</Text>
              </View>
            </View>

            <View style={styles.itemRowCenterView}>
              <View style={styles.itemRowCol1}>
                <View style={styles.itemIconView}>
                  <Icon
                    active
                    style={[styles.itemIconFA, {
                      color: item.cod_payment === 1 ? colors.themeColor : colors.gray
                    }]}
                    type="FontAwesome"
                    name={item.cod_payment === 1 ? 'check-square-o' : 'square-o'}
                  />
                </View>
                <Text style={styles.itemSubtitle} numberOfLines={1}>{I18n.t('home.cod')}</Text>
              </View>
              <View style={styles.itemRowCol2}>
                <View style={styles.itemIconView}>
                  <Icon
                    active
                    style={[styles.itemIconFA, {
                      color: item.online_payment === 1 ? colors.themeColor : colors.gray
                    }]}
                    type="FontAwesome"
                    name={item.online_payment === 1 ? 'check-square-o' : 'square-o'}
                  />
                </View>
                <Text style={styles.itemSubtitle} numberOfLines={1}>{I18n.t('home.online')}</Text>
              </View>
            </View>

            <View style={styles.itemMetaContainer}>
              <View style={styles.itemRowCol1}>
                <View style={[styles.badge, item.is_open_now && { backgroundColor: colors.green }]}>
                  <Text style={styles.itemTextBadge} styleName="bright">
                    {
                      item.is_open_now
                        ? I18n.t('enums.restaurant_status.open') : I18n.t('enums.restaurant_status.close')
                    }
                  </Text>
                </View>
              </View>
              <View style={styles.itemRowCol2}>
                <View style={styles.itemRowCenterView}>
                  <View style={styles.itemIconView}>
                    <Icon style={styles.itemIconFA} type="FontAwesome" active name="shopping-cart" />
                  </View>
                  <Text style={styles.itemPrice} numberOfLines={1}>
                    {I18n.t('home.min_order', { resource: utils.currencyVnd(item.restaurant_delivery_setting[0].min_order_amount) })}
                  </Text>
                </View>
              </View>
            </View>

          </View>
        </View>
        <View style={styles.itemHr} />
      </TouchableOpacity>
    );
  }
}

export default RestaurantItemScreen;
