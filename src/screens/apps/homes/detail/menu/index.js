import React from 'react';
import {
  Card,
  CardItem,
  Text,
  Icon,
  Button,
  Container
} from 'native-base';
import {
  FlatList,
  TextInput,
  View
} from 'react-native';
import _ from 'lodash';
import AddCartContainer from '../../../../../containers/apps/orders/addCart';
import styles from './styles';
import I18n from '../../../../../i18n/i18n';

import CategoryItem from './_categoryItem';
import DishItem from './_dishItem';

export default class MenuScreen extends React.Component {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      dataSource: data,
      keyword: '',
      isOpen: false,
      setupData: null,
      currentIndex: 0,
      flag: true,
      isShowSearch: false
    };
  }

  /** update dataSource when data changed */
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.setState({ dataSource: data });
    }
  }

  /** filter by dish name */
  filterData = (item) => {
    const { keyword } = this.state;
    return keyword === '' ? item.dishes
      : item.dishes.filter(dish => _.toLower(dish.name).indexOf(_.toLower(keyword)) > -1);
  }

  setOpenModal = (value) => {
    this.setState({ isOpen: value });
  }

  addToCart = (item, categoryId) => {
    const setupData = this.setupData(item, categoryId);
    this.setState({ setupData }, () => {
      this.setOpenModal(true);
    });
  }

  setupData = (item, categoryId) => {
    // setup
    const { dataSource } = this.state;
    const dishId = item.id;
    // eslint-disable-next-line camelcase
    const { dish_customizations } = dataSource;
    const { customizations } = dataSource;

    const customizationsFind = [];

    // find "customization_id" by "dish_id" and "category_id"
    const resultCustomizations = dish_customizations.filter(element => element.dish_id === dishId && element.category_id === categoryId);
    /**
     * if "resultCustomizations" === null -> dish have not customization
     *    else
     * find custom
     */
    if (resultCustomizations && resultCustomizations.length !== 0) {
      /**
       * find "customizations" with "resultCustomizations"
       */
      resultCustomizations.forEach((element) => {
        customizationsFind.push(customizations[element.customization_id]);
      });
    }

    return {
      id: item.id,
      name: item.name,
      price: item.price,
      category_id: categoryId,
      quantity: 1,
      customizations: customizationsFind.map(element => ({
        id: element.id,
        name: element.name,
        description: element.description,
        price: element.price,
        required: element.required,
        selection_type: element.selection_type,
        quantity_changeable: element.quantity_changeable,
        max_quantity: element.max_quantity,
        options: Object.keys(element.options).map(key => element.options[key])
      }))
    };
  }

  scrollToIndex = () => {
    this.flatListCategoryRef.scrollToIndex({ animated: true, index: this.state.currentIndex });
  }

  onViewableItemsChanged = ({ viewableItems }) => {
    if (this.state.flag && !this.state.isShowSearch) {
      this.setState({ currentIndex: viewableItems[0] ? viewableItems[0].index : 0 }, () => {
        this.flatListCategoryRefV1.scrollToIndex({ animated: true, index: this.state.currentIndex });
      });
    }
  }

  onTouchStart = () => {
    this.setState({ flag: true });
  }

  checkNoData = () => {
    const { dataSource } = this.state;
    let flag = false;
    dataSource.categories.forEach((item) => {
      if (item.dishes.length !== 0) {
        flag = true;
      }
    });

    return flag;
  }

  render() {
    const {
      dataSource, isOpen, setupData, currentIndex, isShowSearch
    } = this.state;
    return (
      <Container style={styles.body}>
        {
          this.checkNoData()
          && (
            <View style={styles.categoryView}>

              {/* Button open box search */}
              <View>
                <Button
                  danger
                  style={styles.iconSearch}
                  onPress={() => { this.setState({ isShowSearch: !isShowSearch, keyword: '' }); }}
                >
                  <Icon fontSize={10} name="search" />
                </Button>
              </View>

              {/* If not show search -> show category */}
              {
                !isShowSearch
                && (
                  <FlatList
                    bounces={false}
                    horizontal
                    ref={(ref) => { this.flatListCategoryRefV1 = ref; }}
                    data={dataSource.categories}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                      if (item.dishes.length !== 0) {
                        return (
                          <CategoryItem
                            item={item}
                            index={index}
                            currentIndex={currentIndex}
                            onPress={() => this.setState({ currentIndex: index, flag: false }, () => this.scrollToIndex())}
                          />
                        );
                      }
                      return (<View />);
                    }}
                  />
                )
              }

              {/* If show search -> hide category */}
              {
                isShowSearch
                && (
                  <TextInput
                    style={styles.searchInput}
                    placeholder={I18n.t('detail.menu.placeholder.search')}
                    underlineColorAndroid="#ffffff"
                    onChangeText={text => this.setState({ keyword: text })}
                  />
                )
              }
            </View>
          )
        }

        {/* If don't have data */}
        {
          !this.checkNoData()
          && (
            <View style={styles.container}>
              <Text note>
                {I18n.t('detail.menu.no_data')}
              </Text>
            </View>
          )
        }
        <View style={{ padding: 10, paddingTop: 0, paddingBottom: 50 }}>
          <AddCartContainer
            isOpen={isOpen}
            setOpenModal={this.setOpenModal}
            setupData={setupData}
          />
          <FlatList
            bounces={false}
            data={dataSource.categories}
            onViewableItemsChanged={this.onViewableItemsChanged}
            onTouchStart={this.onTouchStart}
            ref={(ref) => { this.flatListCategoryRef = ref; }}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
            scrollEnabled
            renderItem={({ item }) => {
              if (item.dishes.length !== 0 && this.filterData(item).length !== 0) {
                const categoryId = item.id;
                return (
                  <Card>
                    <CardItem header bordered>
                      <Text style={styles.textTitle}>
                        {`🍔 ${item.title}`}
                      </Text>
                    </CardItem>
                    <FlatList
                      data={this.filterData(item)}
                      keyExtractor={(item, index) => index.toString()}
                      extraData={this.state}
                      scrollEnabled={false}
                      renderItem={({ item }) => (
                        <DishItem
                          item={item}
                          categoryId={categoryId}
                          addToCart={this.addToCart}
                        />
                      )}
                    />
                  </Card>
                );
              }
              return (<View />);
            }}
          />
        </View>
      </Container>
    );
  }
}
