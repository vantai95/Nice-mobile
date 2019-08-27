import React from 'react';
import {
  Container,
  Content,
  Text,
  Button
} from 'native-base';
import {
  Keyboard,
  Alert
} from 'react-native';
import styles from './styles';
import I18n from '../../../../i18n/i18n';
import RestaurantService from '../../../../services/restaurantService';
import toast from '../../../../utils/toast';
import Colors from '../../../../constants/colors';

import HeaderScreen from './_header';

import PaymentServiceScreen from './_paymentService';
import CartItemScreen from './_cartItem';
import PromotionScreen from './_promotion';
import OrderNoteScreen from './_orderNote';
import VoucherScreen from './_voucher';
import CartInfoScreen from './_cartInfo';

class CartScreen extends React.Component {
  constructor(props) {
    super(props);

    const { cart, restaurant } = this.props.restaurant;

    this.state = {
      cart,
      restaurant,
      orderNote: '',
      voucher: '',
      promotions: [],
      dishesChangedList: [],
      dishesDisappearList: [],
      isSendVoucher: false
    };

    this.restaurantService = new RestaurantService();
  }

  componentDidMount() {
    this.mapDataPromotionsV2(this.state.cart.promotions);
    this.setupPaymentService();
  }

  componentDidUpdate(prevProps) {
    /** Check if price changed */
    if (prevProps.restaurant.dishesChangedList !== this.props.restaurant.dishesChangedList) {
      this.setState({ dishesChangedList: this.props.restaurant.dishesChangedList });
    }

    /** Check if food */
    if (prevProps.restaurant.dishesDisappearList !== this.props.restaurant.dishesDisappearList) {
      this.setState({ dishesDisappearList: this.props.restaurant.dishesDisappearList });
    }

    const tempPrevProps = prevProps.restaurant.cart;
    const tempProps = this.props.restaurant.cart;

    /** reset cart when cart props changed */
    if (tempPrevProps !== tempProps) {
      this.setState({ cart: tempProps });

      this.mapDataPromotionsV2(tempProps.promotions);
    }

    /**
     * reset promotions when promotions changed
     */
    // if (tempPrevProps.promotions.toString() !== tempProps.promotions.toString()) {
    //   this.mapDataPromotionsV2(tempProps.promotions);
    // }
  }

  /** setup payment, service. Auto check */
  setupPaymentService = () => {
    const { restaurant, cart } = this.state;

    if (!(restaurant.cod_payment === restaurant.online_payment)) {
      if (!cart.payment || cart.payment === '') {
        if (restaurant.cod_payment === 1) {
          this.updatePayment('cod_payment');
        } else {
          this.updatePayment('online_payment');
        }
      }
    }

    if (!(restaurant.delivery === restaurant.pickup)) {
      if (!cart.service || cart.service === '') {
        if (restaurant.delivery === 1) {
          this.updateService('delivery');
        } else {
          this.updateService('pickup');
        }
      }
    }
  }

  /** loop in cart items, change price */
  applySync = () => {
    const { dishesChangedList, dishesDisappearList, cart } = this.state;
    const tempCart = cart;
    const tempItems = tempCart.items;

    dishesDisappearList.forEach((element) => {
      tempItems.forEach((item, index) => {
        if (item.id === element.id) {
          tempItems.splice(index, 1);
        }
      });
    });

    dishesChangedList.forEach((element) => {
      tempItems.forEach((item) => {
        if (item.id === element.id) {
          item.price = element.price;
        }
      });
    });

    this.callApiUpdateCart(tempCart);
  }

  checkVoucherPress = () => {
    // _ hide keyboard
    Keyboard.dismiss();

    const { voucher, cart } = this.state;
    if (voucher === '') {
      toast.warning(I18n.t('cart.validate.voucher'));
      return;
    }
    const dataInit = {
      voucher_code: voucher,
      cart
    };

    this.restaurantService.checkVoucher(dataInit)
      .then((responseJson) => {
        if (responseJson.success) {
          this.props.onAddCart({ cart: responseJson.cart });
        } else {
          toast.warning(responseJson.message.toString());
        }
      })
      .catch((error) => { toast.danger(error); });
    this.setState({ isSendVoucher: true });
  }

  goToCheckout = () => {
    const { cart, restaurant } = this.state;

    /** Check require */
    if (!cart.service || cart.service === '') {
      toast.warning(I18n.t('cart.validate.service'));
      return;
    }

    if (!cart.payment || cart.payment === '') {
      toast.warning(I18n.t('cart.validate.payment_method'));
      return;
    }

    if (cart.sub_total < restaurant.minOrderAmount) {
      toast.warning(I18n.t('cart.validate.reach_minimum_order'));
      return;
    }

    if (!this.checkHaveFreeItem()) {
      Alert.alert(
        I18n.t('cart.free_item_alert.title'),
        I18n.t('cart.free_item_alert.content'),
        [
          {
            text: I18n.t('cart.free_item_alert.cancel'),
            onPress: () => { },
            style: 'cancel',
          },
          {
            text: I18n.t('cart.free_item_alert.ok'),
            onPress: () => {
              this.acceptGoToCheckout();
            }
          },
        ],
        { cancelable: false },
      );
    } else {
      this.acceptGoToCheckout();
    }
  }

  checkHaveFreeItem = () => {
    /** Array promotion */
    const { promotions } = this.state;

    if (promotions.length === 0) {
      return true;
    }

    let totalQuantity = 0;

    promotions.forEach((promotion) => {
      promotion.dishes.forEach((dish) => {
        totalQuantity += dish.quantity;
      });
    });

    if (totalQuantity === 0) {
      return false;
    }

    return true;
  }

  acceptGoToCheckout = () => {
    const { cart, orderNote, promotions } = this.state;

    const cartTemp = cart;

    /** set order node */
    cartTemp.order_note = orderNote;

    /** push free item to list cart */
    promotions.forEach((promotion) => {
      promotion.dishes.forEach((dish) => {
        if (dish.quantity !== 0) {
          cartTemp.items.push({
            category_id: 0,
            free_item: 1,
            id: dish.id,
            name: dish.name,
            options: [],
            price: 0,
            promotion_id: promotion.id,
            quantity: dish.quantity
          });
        }
      });
    });

    /** set to redux */
    this.props.onAddCart({ cart: cartTemp });

    const dataParam = {
      service: cart.service,
      payment: cart.payment
    };

    this.props.navigation.navigate('Checkout', { dataParam });
  }

  /**
   * if change value -> call api to update cart
   * if check -> cart.checkbill = 1
   */
  takeRedInvoice = () => {
    const { cart } = this.state;
    const cartTemp = cart;
    cartTemp.checkbill = cart.checkbill === 1 ? 0 : 1;
    this.callApiUpdateCart(cartTemp);
  }

  /**
   * if select == pickup -> set delivery_fee = 0, call api to update cart
   * if select == delivery -> set delivery_fee = deliveryCost (get from restaurant info)
   */
  updateService = (value) => {
    const { cart, restaurant } = this.state;
    const cartTemp = cart;
    cartTemp.service = value;
    cartTemp.delivery_fee = value === 'pickup' ? 0 : restaurant.deliveryCost;
    this.callApiUpdateCart(cartTemp);
  }

  /** using for update check payment, no call api */
  updatePayment = (value) => {
    const { cart } = this.state;
    const cartTemp = cart;
    cartTemp.payment = value;
    this.props.onAddCart({ cart: cartTemp });
  }

  /**
   * using for update quantity, set quantity locale -> call api update cart
   * (type) params: have 2 case:
   * "add": update quantity + 1
   * "minus": update quantity -1
   */
  updateQuantity = (item, type) => {
    const { cart } = this.state;
    const cartTemp = cart;

    /** (flag): check if quantity <= 1 -> no call api */
    let flag = true;

    cartTemp.items.forEach((element) => {
      if (element === item) {
        if (type === 'add') {
          element.quantity += 1;
        } else if (element.quantity > 1) {
          element.quantity -= 1;
        } else {
          flag = false;
        }
      }
    });

    if (flag) { this.callApiUpdateCart(cartTemp); }
  }

  /** using for delete item in cart */
  confirmDeleteCartItem = (item) => {
    Alert.alert(
      I18n.t('common.delete.title'),
      I18n.t('common.delete.content'),
      [
        {
          text: I18n.t('common.delete.cancel'),
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: I18n.t('common.delete.ok'),
          onPress: () => {
            this.deleteCartItem(item);
          }
        },
      ],
      { cancelable: false },
    );
  }

  deleteCartItem = (item) => {
    const { cart } = this.state;
    const index = cart.items.findIndex(element => item === element);

    const initData = {
      index,
      cart
    };

    this.restaurantService.subtractFromCart(initData)
      .then((responseJson) => {
        if (responseJson.success) {
          if (responseJson.data.items.length === 0) {
            this.props.onRemoveCart();
            this.props.navigation.goBack();
          }
          this.props.onAddCart({ cart: responseJson.data });
        } else {
          toast.danger(responseJson.message.toString());
        }
      })
      .catch((error) => {
        toast.danger(error);
      });
  }

  /** Api For Update Cart */
  callApiUpdateCart = (cartTemp) => {
    const initData = {
      cart: cartTemp
    };
    this.restaurantService.updateCart(initData)
      .then((responseJson) => {
        this.props.onAddCart({ cart: responseJson.data });
        this.props.onRemoveDishesChangedList();
        this.props.onRemoveDishesDisapper();
      })
      .catch((error) => {
        toast.danger(error);
      });
  }

  /** using when data response type "object key" */
  mapDataPromotions = (promotions) => {
    const tempPromotions = promotions.filter(item => item.free_item !== null);

    this.setState({
      promotions: tempPromotions.map((promotion) => {
        if (promotion.free_item && promotion.free_item !== '') {
          return {
            id: promotion.id,
            type: promotion.type,
            value: promotion.value,
            apply_to: promotion.apply_to,
            name_en: promotion.name_en,
            free_item: promotion.free_item,
            quantity: promotion.free_item_quantity,
            min_order_value: promotion.min_order_value,
            max_order_value: promotion.max_order_value,
            dishes: Object.values(promotion.dishes).map(dish => ({
              id: dish.id,
              name: dish.name,
              quantity: 0
            }))
          };
        }
      })
    });
  }

  mapDataPromotionsV2 = (promotions) => {
    if (promotions) {
      const tempPromotions = promotions.filter(item => item.free_item !== null && item.free_item !== '' && item.dishes);

      this.setState({
        promotions: tempPromotions.map((promotion) => {
          if (promotion.free_item && promotion.free_item !== '') {
            return {
              id: promotion.id,
              type: promotion.type,
              value: promotion.value,
              apply_to: promotion.apply_to,
              name_en: promotion.name_en,
              free_item: promotion.free_item,
              quantity: promotion.free_item_quantity,
              min_order_value: promotion.min_order_value,
              max_order_value: promotion.max_order_value,
              dishes: promotion.dishes.map(dish => ({
                id: dish.id,
                name: dish.name,
                quantity: 0
              }))
            };
          }
        })
      });
    } else {
      this.setState({ promotions: [] });
    }
  }

  updateQuantityFreeItem = (promotionId, freeItemId, type) => {
    /** Array promotion */
    const { promotions } = this.state;
    const tempPromotions = promotions;

    /** Object promotion */
    const tempPromotion = promotions.find(promotion => promotion.id === promotionId);

    /** Array dish */
    const tempDishes = tempPromotion.dishes;

    let totalQuantity = 0;
    tempDishes.forEach((dish) => {
      totalQuantity += dish.quantity;
    });

    /** check if max quantity -> return */
    if (totalQuantity === tempPromotion.quantity && type === 'add') return;

    tempDishes.forEach((dish) => {
      if (dish.id === freeItemId) {
        if (type === 'add') {
          dish.quantity += 1;
        } else if (type === 'minus') {
          if (dish.quantity > 0) {
            dish.quantity -= 1;
          }
        }
      }
    });

    tempPromotions.forEach((promotion) => {
      if (promotion.id === promotionId) {
        promotion.dishes = tempDishes;
      }
    });

    this.setState({ promotions: tempPromotions });
  }

  render() {
    const { goBack } = this.props.navigation;
    const {
      cart,
      restaurant,
      promotions,
      dishesChangedList,
      dishesDisappearList,
      isSendVoucher
    } = this.state;
    return (
      <Container style={styles.body}>

        {/* Header */}
        <HeaderScreen goBack={() => { goBack(); }} />

        <Content padder enableResetScrollToCoords={false}>

          {/* Payment Service */}
          <PaymentServiceScreen
            restaurant={restaurant}
            cart={cart}
            updateService={(value) => { this.updateService(value); }}
            updatePayment={(value) => { this.updatePayment(value); }}
            takeRedInvoice={() => { this.takeRedInvoice(); }}
          />

          {/* Cart Items */}
          <CartItemScreen
            dishesChangedList={dishesChangedList}
            dishesDisappearList={dishesDisappearList}
            items={cart.items}
            applySync={() => this.applySync()}
            state={this.state}
            confirmDeleteCartItem={(item) => { this.confirmDeleteCartItem(item); }}
            updateQuantity={(item, type) => { this.updateQuantity(item, type); }}
          />

          {/* Promotions */}
          {
            promotions.length !== 0
            && (
              <PromotionScreen
                promotions={promotions}
                state={this.state}
                updateQuantityFreeItem={this.updateQuantityFreeItem}
              />
            )
          }

          {/* Order Note */}
          <OrderNoteScreen
            onChangeText={(text) => { this.setState({ orderNote: text }); }}
          />

          {/* Voucher Screen */}
          <VoucherScreen
            isSendVoucher={isSendVoucher}
            onChangeText={(text) => { this.setState({ voucher: text }); }}
            checkVoucherPress={() => this.checkVoucherPress()}
            cart={cart}
          />

          {/* Cart Info */}
          <CartInfoScreen
            cart={cart}
            minOrderAmount={restaurant.minOrderAmount}
          />

          {/* Button Checkout */}
          <Button
            block
            disabled={cart.items.length === 0}
            style={[styles.btnOrder, {
              backgroundColor: cart.items.length === 0
                ? Colors.lightGray
                : Colors.themeColor
            }]}
            onPress={() => this.goToCheckout()}
          >
            <Text style={styles.btnText}>{I18n.t('cart.btn_order_now')}</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default CartScreen;
