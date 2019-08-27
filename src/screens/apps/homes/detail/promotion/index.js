import React from 'react';

import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body
} from 'native-base';
import {
  FlatList,
  View
} from 'react-native';
import _ from 'lodash';
import styles from './styles';
import utils from '../../../../../utils/utils';
import enums from '../../../../../constants/enums';
import I18n from '../../../../../i18n/i18n';

const PROMOTION_APPLY_TO = {
  BY_MENU: 0,
  BY_CATEGORY: 1,
  BY_ITEM: 2,
  BY_BILL: 3
};

const enumDays = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun'
];

class PromotionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.data.promotions,
    };
  }

  renderContent = (item) => {
    let content = null;

    /** switch of promotion type */
    switch (item.type) {
      case enums.PROMOTION_TYPES.PERCENT: {
        /** switch of promotion apply to */

        /** Discount %{discount_value} maximum %{maximum_value} VND */
        const text = I18n.t('detail.promotion.discount_maximum', {
          discount_value: item.value,
          maximum_value: utils.currencyVnd(item.maximun_discount)
        });
        switch (item.apply_to) {
          case PROMOTION_APPLY_TO.BY_BILL: {
            content = (
              <Text note>
                {/* %{resource} for order has total amount from %{from_value} VND to %{to_value} VND. */}
                {I18n.t('detail.promotion.for_order', {
                  resource: text,
                  from_value: utils.currencyVnd(item.min_order_value),
                  to_value: utils.currencyVnd(item.max_order_value)
                })}
              </Text>
            );
            break;
          }
          case PROMOTION_APPLY_TO.BY_MENU: {
            content = (
              <Text note>
                {/* %{resource} for item value from %{from_value} VND to %{to_value} VND. */}
                {I18n.t('detail.promotion.for_item', {
                  resource: text,
                  from_value: utils.currencyVnd(item.item_value_from),
                  to_value: utils.currencyVnd(item.item_value_to)
                })}
              </Text>
            );
            break;
          }
          case PROMOTION_APPLY_TO.BY_ITEM: {
            content = (
              <Text note>
                {/* %{resource} when buying affected items. */}
                {I18n.t('detail.promotion.for_affected_item', { resource: text })}
              </Text>
            );
            break;
          }
          case PROMOTION_APPLY_TO.BY_CATEGORY: {
            content = (
              <Text note>
                {/* %{resource} for item value from %{from_value} VND to %{to_value} VND. */}
                {I18n.t('detail.promotion.for_category', {
                  resource: text,
                  from_value: utils.currencyVnd(item.item_value_from),
                  to_value: utils.currencyVnd(item.item_value_to)
                })}
              </Text>
            );
            break;
          }
          default: {
            content = <Text />;
          }
        }
        break;
      }
      case enums.PROMOTION_TYPES.VALUE: {
        /**
         * switch of promotion apply to
         */
        /** Discount %{discount_value} VND */
        const text = I18n.t('detail.promotion.discount', {
          discount_value: utils.currencyVnd(item.value)
        });
        switch (item.apply_to) {
          case PROMOTION_APPLY_TO.BY_BILL: {
            content = (
              <Text note>
                {/* %{resource} for order has total amount from %{from_value} VND to %{to_value} VND. */}
                {I18n.t('detail.promotion.for_order', {
                  resource: text,
                  from_value: utils.currencyVnd(item.min_order_value),
                  to_value: utils.currencyVnd(item.max_order_value)
                })}
              </Text>
            );
            break;
          }
          case PROMOTION_APPLY_TO.BY_MENU: {
            content = (
              <Text note>
                {/* %{resource} for item value from %{from_value} VND to %{to_value} VND. */}
                {I18n.t('detail.promotion.for_item', {
                  resource: text,
                  from_value: utils.currencyVnd(item.item_value_from),
                  to_value: utils.currencyVnd(item.item_value_to)
                })}
              </Text>
            );
            break;
          }
          case PROMOTION_APPLY_TO.BY_ITEM: {
            content = (
              <Text note>
                {/* %{resource} when buying affected items. */}
                {I18n.t('detail.promotion.for_affected_item', { resource: text })}
              </Text>
            );
            break;
          }
          case PROMOTION_APPLY_TO.BY_CATEGORY: {
            content = (
              <Text note>
                {/* %{resource} for item value from %{from_value} VND to %{to_value} VND. */}
                {I18n.t('detail.promotion.for_category', {
                  resource: text,
                  from_value: utils.currencyVnd(item.item_value_from),
                  to_value: utils.currencyVnd(item.item_value_to)
                })}
              </Text>
            );
            break;
          }
          default: {
            content = <Text />;
          }
        }
        break;
      }
      case enums.PROMOTION_TYPES.FREE_ITEM: {
        /**
         * switch of promotion apply to
         */
        /** Free items */
        const text = I18n.t('detail.promotion.free_item');
        switch (item.apply_to) {
          case PROMOTION_APPLY_TO.BY_BILL: {
            content = (
              <Text note>
                {/* %{resource} for order has total amount from %{from_value} VND to %{to_value} VND. */}
                {I18n.t('detail.promotion.for_order', {
                  resource: text,
                  from_value: utils.currencyVnd(item.min_order_value),
                  to_value: utils.currencyVnd(item.max_order_value)
                })}
              </Text>
            );
            break;
          }
          case PROMOTION_APPLY_TO.BY_MENU: {
            content = (
              <Text note>
                {/* %{resource} for item value from %{from_value} VND to %{to_value} VND. */}
                {I18n.t('detail.promotion.for_item', {
                  resource: text,
                  from_value: utils.currencyVnd(item.item_value_from),
                  to_value: utils.currencyVnd(item.item_value_to)
                })}
              </Text>
            );
            break;
          }
          case PROMOTION_APPLY_TO.BY_ITEM: {
            content = (
              <Text note>
                {/* %{resource} when buying affected items. */}
                {I18n.t('detail.promotion.for_affected_item', { resource: text })}
              </Text>
            );
            break;
          }
          case PROMOTION_APPLY_TO.BY_CATEGORY: {
            content = (
              <Text note>
                {/* %{resource} for item value from %{from_value} VND to %{to_value} VND. */}
                {I18n.t('detail.promotion.for_category', {
                  resource: text,
                  from_value: utils.currencyVnd(item.item_value_from),
                  to_value: utils.currencyVnd(item.item_value_to)
                })}
              </Text>
            );
            break;
          }
          default: {
            content = <Text />;
          }
        }
        break;
      }
      default: {
        content = <Text />;
      }
    }

    return (
      <View>
        <Text style={styles.title}>
          {I18n.t('detail.promotion.title.content')}
        </Text>
        {content}
      </View>
    );
  }

  renderAffectedProducts = (item) => {
    if (item.apply_to === PROMOTION_APPLY_TO.BY_ITEM) {
      let content = null;
      content = <Text note>{_.join(item.promotion_affects.map(products => products.dish_name), ', ')}</Text>;
      return (
        <View>
          <Text style={styles.title}>
            {I18n.t('detail.promotion.title.affected_product')}
          </Text>
          {content}
        </View>
      );
    }

    return (<View />);
  }

  renderAvailableTime = (item) => {
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
        times = <Text note style={styles.infoText}>{I18n.t('common.days.all_time')}</Text>;
      } else {
        times = item.time_setting.time_setting_details.map((itemDetail, index) => (
          <Text key={index.toString()} note style={styles.infoText}>
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
        times = <Text note style={styles.infoText}>{I18n.t('common.days.all_time')}</Text>;
      } else {
        /**
         * not all times
         */
        times = item.time_setting.time_setting_details.map((itemDetail, index) => (
          <Text key={index.toString()} note style={styles.infoText}>
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
        times = <Text numberOfLines={3} note style={styles.infoText}>{I18n.t('common.days.all_time')}</Text>;
      } else {
        /**
         * not all times
         */
        times = item.time_setting.time_setting_details.map((itemDetail, index) => (
          <Text key={index.toString()} note style={styles.infoText}>
            {`${itemDetail.from_time.substring(0, 5)} - ${itemDetail.to_time.substring(0, 5)}`}
          </Text>
        ));
      }
    }

    return (
      <View style={styles.timeItem}>
        {days}
        <View>
          {times}
        </View>
      </View>
    );
  }

  renderFreeItems = (item) => {
    if (item.type === enums.PROMOTION_TYPES.FREE_ITEM) {
      let content = null;
      content = <Text note>{_.join(Object.values(item.free_items_list).map(freeItem => freeItem.name), ', ')}</Text>;
      return (
        <View>
          <Text style={styles.title}>
            {I18n.t('detail.promotion.title.free_item')}
          </Text>
          {content}
        </View>
      );
    }

    return (<View />);
  }

  renderItem = item => (
    <Card>
      <CardItem bordered>
        <Body>
          <Text style={styles.nameText}>
            {item.name_en}
          </Text>
          <Text note>
            {utils.stripTag(item.description_en)}
          </Text>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          {this.renderContent(item)}
          {this.renderAffectedProducts(item)}
          {this.renderFreeItems(item)}
          <View>
            <Text style={styles.title}>
              {I18n.t('detail.promotion.title.available_time')}
            </Text>
            {this.renderAvailableTime(item)}
          </View>
        </Body>
      </CardItem>
    </Card>
  );

  render() {
    const { dataSource } = this.state;
    return (
      <Container style={styles.body}>
        {
          dataSource.length === 0
          && (
            <View style={styles.container}>
              <Text note>{I18n.t('detail.promotion.no_data')}</Text>
            </View>
          )
        }
        {
          dataSource.length !== 0
          && (
            <Content padder>
              <FlatList
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  if (item.status === 1) { return this.renderItem(item); }
                  return <View />;
                }}
              />
            </Content>
          )
        }
      </Container>
    );
  }
}

export default PromotionScreen;
