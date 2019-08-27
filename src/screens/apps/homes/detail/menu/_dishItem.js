import React from 'react';
import {
  Text,
  CardItem,
  Button,
  Right,
  Icon
} from 'native-base';
import {
  Image,
  View
} from 'react-native';
import styles from './styles';
import utils from '../../../../../utils/utils';
import I18n from '../../../../../i18n/i18n';
import images from '../../../../../constants/images';

class DishItem extends React.PureComponent {
  render() {
    const {
      item, categoryId, addToCart
    } = this.props;
    return (
      <CardItem>
        <Image
          source={images.DISH_LOGO}
          style={styles.itemImage}
        />
        <View style={styles.itemContent}>

          {/* dish name */}
          <Text style={styles.textName}>
            {item.name}
          </Text>

          {/* dish description */}
          {
            item.description !== null
            && <Text note>{utils.stripTag(item.description)}</Text>
          }

          {/* dish price */}
          <Text style={styles.textPrice}>
            {I18n.t('common.currency', { resource: utils.currencyVnd(item.price) })}
          </Text>

        </View>

        <Right style={styles.itemRight}>
          <Button
            transparent
            style={styles.btnAdd}
            onPress={() => addToCart(item, categoryId)}
          >
            <Icon type="FontAwesome" name="plus-square" style={styles.iconAdd} />
          </Button>
        </Right>

      </CardItem>
    );
  }
}

export default DishItem;
