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
  Text,
  Fab,
  Subtitle
} from 'native-base';
import {
  FlatList,
  View,
  Alert,
  StatusBar
} from 'react-native';
import _ from 'lodash';
import I18n from '../../../../i18n/i18n';
import HomeLogic from './logic';
import RestaurantService from '../../../../services/restaurantService';

import styles from './styles';
import toast from '../../../../utils/toast';
import enums from '../../../../constants/enums';

import RestaurantItemScreen from './_item';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowGoToTop: false,
      restaurants: [],
      isFetching: false,
      segIdx: 0,
      isOutOfData: false
    };

    this.homeLogic = new HomeLogic();
    this.restaurantService = new RestaurantService();
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  componentDidMount() {
    const { filterParam } = this.props.home;
    if (filterParam) {
      this.homeLogic.setupChecked(filterParam);
      this.searchRestaurant();
    }
  }

  searchRestaurant = () => {
    const { home } = this.props;
    const { segIdx } = this.state;
    // constructor params
    const districtId = home.location.district;
    const wardId = home.location.ward;
    const resultFilter = this.homeLogic.resultFilter();

    this.restaurantService.searchRestaurant(districtId, wardId, resultFilter, segIdx)
      .then((responseJson) => {
        if (responseJson.success) {
          const { restaurants } = this.state;
          this.setState({
            restaurants: restaurants.concat(responseJson.data),
            isOutOfData: responseJson.data.length === 0
          });
        } else {
          const { message } = responseJson;
          toast.danger(message.toString());
        }
      })
      .catch((error) => { toast.danger(error); });

    this.setState({ isFetching: false });
  }

  filterBySort = (restaurants) => {
    switch (this.homeLogic.sortValue) {
      case enums.SORT.NO_SORT: {
        return restaurants;
      }
      case enums.SORT.RANKING: {
        return _.sortBy(restaurants, [o => o.review.star], ['desc']);
      }
      case enums.SORT.MIN_ORDER_AMOUNT: {
        return _.sortBy(restaurants, [o => o.restaurant_delivery_setting[0].min_order_amount]);
      }
      case enums.SORT.DELIVERY_FEE: {
        return _.sortBy(restaurants, [o => o.restaurant_delivery_setting[0].delivery_cost]);
      }
      case enums.SORT.NAME: {
        return _.sortBy(restaurants, [o => o.name]);
      }
      default: {
        return restaurants;
      }
    }
  }

  goToDetail = (restaurantId, restaurantName, workingStatus, wardId) => {
    this.props.navigation.navigate('Detail', {
      restaurantId,
      restaurantName,
      working_status: workingStatus,
      wardId
    });
  }

  /** use for hide or show btn "goto top" */
  handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const { isShowGoToTop } = this.state;
    // for show or hide button scroll to top
    if (offsetY > 200 && !isShowGoToTop) {
      this.setState({ isShowGoToTop: true });
    } else if (offsetY <= 200 && isShowGoToTop) {
      this.setState({ isShowGoToTop: false });
    }
  }

  onGoToLocation = () => {
    Alert.alert(
      I18n.t('home.go_to_location.title'),
      I18n.t('home.go_to_location.content'),
      [
        {
          text: I18n.t('home.go_to_location.cancel'),
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: I18n.t('home.go_to_location.ok'),
          onPress: () => {
            this.props.navigation.navigate('Welcome');
          }
        },
      ],
      { cancelable: false },
    );
  }

  onRefresh = () => {
    this.homeLogic.resetFilter();
    this.homeLogic.setupChecked(this.props.home.filterParam);
    this.setState({ segIdx: 0, restaurants: [], isOutOfData: false }, () => {
      this.searchRestaurant();
    });
  }

  onSeeMore = () => {
    const { segIdx } = this.state;
    this.setState({ segIdx: segIdx + 1 }, () => {
      this.searchRestaurant();
    });
  }

  filterRestaurant = () => {
    this.setState({ segIdx: 0, restaurants: [], isOutOfData: false }, () => {
      this.searchRestaurant();
    });
  }

  renderFooter = () => {
    const { restaurants, isOutOfData } = this.state;

    if (restaurants.length >= 6 && !isOutOfData) {
      return (
        <Button style={{ margin: 5 }} block danger onPress={() => this.onSeeMore()}>
          <Text>{I18n.t('home.btn_seemore')}</Text>
        </Button>
      );
    }
    return (<View />);
  };

  render() {
    const { navigate } = this.props.navigation;
    const { isShowGoToTop, restaurants, isFetching } = this.state;
    const { districtName } = this.props.home.location;
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.onGoToLocation()} transparent>
              <Icon type="Entypo" active name="location-pin" />
            </Button>
          </Left>
          <Body style={{ flex: 4 }}>
            <Title>{districtName}</Title>
            <Subtitle>
              {I18n.t('home.sub_title', { resource: restaurants.length })}
            </Subtitle>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => navigate('Filter', {
                homeLogic: this.homeLogic,
                onGoBack: () => this.filterRestaurant()
              })}
            >
              <Icon type="AntDesign" name="filter" />
            </Button>
          </Right>
        </Header>
        {
          restaurants.length === 0
          && (
            <View style={styles.container}>
              <Text note>
                {I18n.t('home.no_data')}
              </Text>
              <View>
                <Button small vertical danger style={styles.btnRefresh} onPress={() => this.onRefresh()}>
                  <Text>
                    {I18n.t('home.btn_refresh')}
                  </Text>
                </Button>
              </View>
            </View>
          )
        }
        <FlatList
          // eslint-disable-next-line no-return-assign
          ref={ref => this.flatList = ref}
          onScroll={this.handleScroll}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatListContainer}
          data={this.filterBySort(restaurants)}
          onRefresh={() => this.setState({
            isFetching: true
          }, () => {
            this.onRefresh();
          })}
          refreshing={isFetching}
          renderItem={({ item }) => (
            <RestaurantItemScreen
              item={item}
              navigation={this.props.navigation}
            />
          )}
          ListFooterComponent={this.renderFooter}
        />
        {
          isShowGoToTop
          && (
            <Fab
              direction="up"
              containerStyle={{}}
              style={styles.fab}
              position="bottomRight"
              onPress={() => { this.flatList.scrollToOffset({ offset: 0, animated: true }); }}
            >
              <Icon name="share" />
            </Fab>
          )
        }
      </Container>
    );
  }
}

export default HomeScreen;
