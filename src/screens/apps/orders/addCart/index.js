import React from 'react';
import {
  Icon,
  CardItem,
  Text,
  Button,
  Card,
  Content
} from 'native-base';
import {
  View,
  Platform
} from 'react-native';
import Modal from 'react-native-modalbox';
import _ from 'lodash';
import I18n from '../../../../i18n/i18n';
import styles from './styles';
import enums from '../../../../constants/enums';
import toast from '../../../../utils/toast';
import RestaurantService from '../../../../services/restaurantService';

import CartItemScreen from './_cartItem';
import CustomizationScreen from './_customization';

class AddCartScreen extends React.Component {
  constructor(props) {
    super(props);

    const { setupData } = this.props;

    this.state = {
      setupData,
      quantity: 1,
      options: [],
      selected: null,
      submitting: false,
    };

    this.restaurantService = new RestaurantService();
  }

  /**
   * if have changed about props value -> update state value
   * (using for reset form add to cart)
   */
  componentDidUpdate(prevProps) {
    const { setupData } = this.props;

    if (prevProps.setupData !== setupData) {
      this.setState({
        setupData,
        quantity: 1,
        options: [],
        submitting: false
      });
    }
  }

  /** call api add to cart */
  onAddToCart = () => {
    if (this.checkRequire()) {
      const { setOpenModal, restaurant } = this.props;

      /** hide model when add to cart success */
      setOpenModal(false);

      this.setState({ submitting: true });

      // init data
      const { setupData, quantity, options } = this.state;

      const item = {
        id: setupData.id,
        name: setupData.name,
        price: setupData.price,
        category_id: setupData.category_id,
        quantity,
        free_item: 0,
        options,
        promotion_id: -1
      };

      // get current cart
      const { cart } = restaurant;

      const initData = {
        item,
        cart
      };

      // call api
      this.restaurantService.addToCart(initData)
        .then((responseJson) => {
          if (responseJson.success) {
            /** save cart to redux */
            this.props.onAddCart({ cart: responseJson.data });
          } else {
            const { message } = responseJson;
            toast.danger(message.toString());
            this.setState({ submitting: false });
          }
        })
        .catch((error) => {
          toast.danger(error);
          this.setState({ submitting: false });
        });
    }
  }

  /** add quantity for dish */
  addQuantity = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
  }

  /** minus quantity for dish */
  minusQuantity = () => {
    const { quantity } = this.state;
    if (quantity > 1) { this.setState({ quantity: quantity - 1 }); }
  }

  /**
   * add option of customization.
   * have 2 case: customization single, customization multiple
   */
  addOption = (customization) => {
    const { options, selected } = this.state;
    const optionId = selected;

    // if selectionType === single
    if (customization.selection_type === enums.CART_OPTIONS.SINGLE) {
      // remove option is selected in array options
      const optionsTemp = options;
      _.remove(optionsTemp, o => o.custom_id === customization.id
        && o.selection_type === enums.CART_OPTIONS.SINGLE
        && o.option_id !== optionId && optionId);

      if (optionId && optionId !== -1) {
        // get option
        const findOption = customization.options.find(element => element.id === optionId);

        optionsTemp.push({
          option_id: optionId,
          option_name: findOption.name,
          custom_id: customization.id,
          custom_name: customization.name,
          quantity: 1,
          price: findOption.price,
          selection_type: enums.CART_OPTIONS.SINGLE,
          quantity_changeable: customization.quantity_changeable
        });
      }

      this.setState({
        options: optionsTemp,
        selected: null
      });
    } else if (customization.selection_type === enums.CART_OPTIONS.MULTIPLE) {
      if (!optionId || optionId === -1) { return; }

      // find option: if have -> break, if don't have ->push
      const findOptionSelected = options.find(element => element.option_id === optionId
        && element.custom_id === customization.id
        && element.selection_type === enums.CART_OPTIONS.MULTIPLE);

      if (!findOptionSelected) {
        // get option
        const findOption = customization.options.find(element => element.id === optionId);

        this.setState({
          options: [...options, {
            option_id: optionId,
            option_name: findOption.name,
            custom_id: customization.id,
            custom_name: customization.name,
            quantity: 1,
            price: findOption.price,
            selection_type: enums.CART_OPTIONS.MULTIPLE,
            quantity_changeable: customization.quantity_changeable
          }],
          selected: null
        });
      }
    }
  }

  checkMaxQuantity = (customId) => {
    const { setupData, options } = this.state;

    const found = setupData.customizations.find(customization => customization.id === customId);
    const maxQuantity = found.max_quantity;
    let currentQuantity = 0;
    options.forEach((element) => {
      if (element.custom_id === customId) {
        currentQuantity += element.quantity;
      }
    });

    if (maxQuantity === currentQuantity) {
      return false;
    }

    return true;
  }

  /** using if customization have select multiple */
  addQuantityOption = (item) => {
    const { options } = this.state;
    const optionsTemp = options;

    if (this.checkMaxQuantity(item.custom_id)) {
      optionsTemp.forEach((element) => {
        if (element.custom_id === item.custom_id
          && element.option_id === item.option_id
          && element.selection_type === enums.CART_OPTIONS.MULTIPLE) {
          element.quantity += 1;
        }
      });

      this.setState({ options: optionsTemp });
    }
  }

  /** using if customization have select multiple */
  minusQuantityOption = (item) => {
    const { options } = this.state;
    const optionsTemp = options;

    optionsTemp.forEach((element) => {
      if (element.custom_id === item.custom_id
        && element.option_id === item.option_id
        && element.selection_type === enums.CART_OPTIONS.MULTIPLE) {
        if (element.quantity > 1) { element.quantity -= 1; }
      }
    });

    this.setState({ options: optionsTemp });
  }

  /** using if customization have select multiple */
  removeOption = (item) => {
    const { options } = this.state;
    const optionsTemp = options;
    _.remove(optionsTemp, o => o.custom_id === item.custom_id
      && o.option_id === item.option_id
      && o.selection_type === enums.CART_OPTIONS.MULTIPLE);
    this.setState({ options: optionsTemp });
  }

  /** using to change quantity for have customization and can change */
  addQuantityOptionV2 = (item) => {
    const { options } = this.state;
    const optionsTemp = options;

    if (this.checkMaxQuantity(item.id)) {
      optionsTemp.forEach((element) => {
        if (element.custom_id === item.id
          && element.quantity_changeable === enums.CART_CHANGE_QUANTITY.CAN_CHANGE
          && element.selection_type === enums.CART_OPTIONS.SINGLE) {
          element.quantity += 1;
        }
      });

      this.setState({ options: optionsTemp });
    }
  }

  /** using to change quantity for have customization and can change */
  minusQuantityOptionV2 = (item) => {
    const { options } = this.state;
    const optionsTemp = options;

    optionsTemp.forEach((element) => {
      if (element.custom_id === item.id
        && element.quantity_changeable === enums.CART_CHANGE_QUANTITY.CAN_CHANGE
        && element.selection_type === enums.CART_OPTIONS.SINGLE) {
        if (element.quantity > 1) { element.quantity -= 1; }
      }
    });

    this.setState({ options: optionsTemp });
  }

  /** using to change quantity for have customization and can change */
  getQuantity = (item) => {
    const { options } = this.state;

    const found = options.find(element => element.custom_id === item.id
      && element.quantity_changeable === enums.CART_CHANGE_QUANTITY.CAN_CHANGE
      && element.selection_type === enums.CART_OPTIONS.SINGLE);

    if (found) { return found.quantity; }
    return 0;
  }

  /** check if option require */
  checkRequire = () => {
    const { options, setupData } = this.state;

    const dataFullNumber = setupData.customizations.map(item => (item.required === 1 ? item.id : undefined));
    let flag = true;

    dataFullNumber.forEach((item) => {
      if (item !== undefined) {
        const found = options.find(element => element.custom_id === item);
        if (!found) {
          toast.warning(I18n.t('common.validate.option'));
          flag = false;
        }
      }
    });

    return flag;
  }

  render() {
    const {
      setupData, quantity, options, selected, submitting
    } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        backdropPressToClose={false}
        backdrop={false}
        coverScreen
        swipeToClose={false}
        animationDuration={300}
        onClosed={() => this.props.setOpenModal(false)}
        onOpened={() => this.props.setOpenModal(true)}
        style={styles.container}
      >
        <Card style={styles.card}>

          <CardItem header bordered>
            <View style={styles.header}>
              <Icon
                type="FontAwesome"
                style={styles.iconClose}
                name="remove"
                onPress={() => { this.props.setOpenModal(false); }}
              />
            </View>
          </CardItem>

          <Content>
            <CartItemScreen
              setupData={setupData}
              quantity={quantity}
              minusQuantity={() => this.minusQuantity()}
              addQuantity={() => this.addQuantity()}
            />
            {
              setupData && setupData.customizations.length !== 0
              && (
                <CustomizationScreen
                  setupData={setupData}
                  selected={selected}
                  options={options}
                  state={this.state}
                  onClose={(item) => { this.addOption(item); }}
                  onValueChange={(value, item) => {
                    this.setState({ selected: value }, () => {
                      if (Platform.OS === 'android') { this.addOption(item); }
                    });
                  }}
                  getQuantity={item => this.getQuantity(item)}
                  minusQuantityOptionV2={(item) => { this.minusQuantityOptionV2(item); }}
                  addQuantityOptionV2={(item) => { this.addQuantityOptionV2(item); }}
                  minusQuantityOption={(item) => { this.minusQuantityOption(item); }}
                  addQuantityOption={(item) => { this.addQuantityOption(item); }}
                  removeOption={(item) => { this.removeOption(item); }}
                />
              )
            }
          </Content>

          <CardItem footer bordered>
            <View style={styles.footer}>
              <View>
                <Button disabled={submitting} style={styles.btnAdd} small onPress={() => this.onAddToCart()}>
                  <Text>
                    {I18n.t('cart.btn_add')}
                  </Text>
                </Button>
              </View>
            </View>
          </CardItem>

        </Card>
      </Modal>
    );
  }
}

export default AddCartScreen;
