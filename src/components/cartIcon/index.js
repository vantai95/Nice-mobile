import React from 'react';
import {
  Button,
  Icon,
  Text
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import PropTypes from 'prop-types';
import styles from './styles';
import toast from '../../utils/toast';
import I18n from '../../i18n/i18n';

class CartIcon extends React.Component {
  constructor(props) {
    super(props);
    const { restaurant } = this.props;
    this.state = {
      number: restaurant.cart.total_item
    };
  }

  componentDidUpdate(prevProps) {
    const { restaurant } = this.props;
    /**
     * if total item in cart have been changed, update state
     */
    if (prevProps.restaurant !== restaurant) {
      this.setState({ number: restaurant.cart.total_item });
    }
  }

  goToCart = () => {
    const { number } = this.state;
    const { navigation } = this.props;

    if (number !== 0) {
      navigation.navigate('Cart');
    } else {
      toast.warning(I18n.t('cart.no_item'));
    }
  }

  render() {
    const { number } = this.state;
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.goToCart()}>
        <IconBadge
          MainElement={(
            <Button transparent onPress={() => this.goToCart()}>
              <Icon style={styles.icon} name="cart" />
            </Button>
          )}
          BadgeElement={<Text style={styles.text}>{number}</Text>}
          IconBadgeStyle={styles.iconBadge}
          Hidden={number === 0}
        />
      </TouchableOpacity>
    );
  }
}

/**
 * restaurant: get from redux
 */
CartIcon.propTypes = {
  restaurant: PropTypes.shape({
    cart: PropTypes.shape({
      total_item: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export { CartIcon };
