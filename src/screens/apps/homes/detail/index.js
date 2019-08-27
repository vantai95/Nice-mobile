import React from 'react';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Tabs,
  Tab
} from 'native-base';

// screen
import CartIconContainer from '../../../../containers/components/cartIcon';

import InfoScreen from './intro';
import MenuScreen from './menu';
import PromotionScreen from './promotion';

// service
import RestaurantService from '../../../../services/restaurantService';

// other
import I18n from '../../../../i18n/i18n';
import toast from '../../../../utils/toast';

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

    const { getParam } = this.props.navigation;

    this.state = {
      dataSource_: null
    };

    this.restaurantId = getParam('restaurantId');
    this.restaurantName = getParam('restaurantName');
    this.workingStatus = getParam('working_status');
    this.wardId = getParam('wardId');
    this.restaurantService = new RestaurantService();
  }

  componentDidMount() {
    if (this.restaurantId) {
      this.getRestaurantDetail();
    }
  }

  getRestaurantDetail = () => {
    this.restaurantService.getRestaurantInfo(
      this.restaurantId,
      this.props.home.location.district,
      this.wardId
    )
      .then((responseJson) => {
        if (responseJson.success) {
          this.setState({ dataSource_: responseJson });

          // init cart
          this.props.onInitCart({ cart: responseJson.cart });

          // init testaurant
          const restaurant = {
            id: responseJson.restaurant.id,
            delivery: responseJson.restaurant.delivery,
            pickup: responseJson.restaurant.pickup,
            cod_payment: responseJson.restaurant.cod_payment,
            online_payment: responseJson.restaurant.online_payment,
            minOrderAmount: responseJson.restaurant.minOrderAmount,
            deliveryCost: responseJson.restaurant.deliveryCost,
            phone: responseJson.restaurant.phone,
            email: responseJson.restaurant.email,
            address: responseJson.restaurant.address,
            name: responseJson.restaurant.name,
            take_red_bill: responseJson.restaurant.take_red_bill,
            exchange_rate: responseJson.exchange_rate
          };

          this.props.onSetRestaurant({ restaurant });
        } else {
          toast.warning(responseJson.message.toString());
        }
      })
      .catch((error) => { toast.danger(error); });
  }

  dataOfInfo = () => {
    const { dataSource_ } = this.state;
    return {
      restaurant: dataSource_ ? dataSource_.restaurant : null,
      working_status: this.workingStatus
    };
  }

  dataOfMenu = () => {
    const { dataSource_ } = this.state;
    let categories = [];
    let dishCustomizations = [];
    let customizations = [];

    if (dataSource_) {
      categories = Array.isArray(dataSource_.categories)
        ? dataSource_.categories
        : Object.values(dataSource_.categories);

      dishCustomizations = dataSource_.dish_customizations;
      // eslint-disable-next-line prefer-destructuring
      customizations = dataSource_.customizations;
    }

    return {
      categories,
      dish_customizations: dishCustomizations,
      customizations
    };
  }

  dataOfPromotion = () => {
    const { dataSource_ } = this.state;
    return {
      promotions: dataSource_ ? dataSource_.restaurant.promotions : []
    };
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <Container>

        <Header hasTabs>
          <Left>
            <Button onPress={() => goBack()} transparent>
              <Icon active name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{this.restaurantName}</Title>
          </Body>
          <Right>
            <CartIconContainer navigation={this.props.navigation} />
          </Right>
        </Header>

        {/* <Tabs renderTabBar={() => <ScrollableTab />}> */}
        <Tabs locked>
          <Tab heading={I18n.t('detail.tab.menu')}>
            <MenuScreen data={this.dataOfMenu()} />
          </Tab>
          <Tab heading={I18n.t('detail.tab.info')}>
            <InfoScreen data={this.dataOfInfo()} />
          </Tab>
          <Tab heading={I18n.t('detail.tab.promotion')}>
            <PromotionScreen data={this.dataOfPromotion()} />
          </Tab>
          {/* <Tab heading={I18n.t("review")}>

          </Tab> */}
        </Tabs>

      </Container>
    );
  }
}

export default DetailScreen;
