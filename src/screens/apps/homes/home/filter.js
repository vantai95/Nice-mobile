import React from 'react';
import {
  Content,
  Icon,
  CardItem,
  Text,
  CheckBox,
  Button,
  Tab,
  Tabs,
  Header,
  Body,
  Left,
  Right,
  Title,
  Container
} from 'native-base';
import {
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import I18n from '../../../../i18n/i18n';
import styles from './styles';
import HomeLogic from './logic';

import enums from '../../../../constants/enums';

class FilterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      listCuisines: [],
      listCategories: [],
      listStatus: [],
      listServices: [],
      listPaymentMethods: [],

      isShowCuisines: true,
      isShowCategoris: true,
      isShowStatus: true,
      isShowServices: true,
      isShowPaymentMethods: true,

      extraValue: false, // using for refresh flatlist

      sorts: enums.SORT_FILTER
    };

    this.homeLogic = new HomeLogic();
  }

  componentWillMount() {
    this.homeLogic = this.props.navigation.getParam('homeLogic');
  }

  componentDidMount() {
    this.mapDataFilterParam();
  }

  mapDataFilterParam = () => {
    const filterParam = this.props.home.filterParam || null;
    if (filterParam) {
      this.setState({
        listCuisines: _.chunk(filterParam.cuisines, 2),
        listCategories: filterParam.categories,
        listStatus: _.chunk(filterParam.status, 2),
        listServices: _.chunk(filterParam.services, 2),
        listPaymentMethods: filterParam.payment_methods
      }, () => {
        const { extraValue } = this.state;
        this.setState({ extraValue: !extraValue });
      });
    }
  }

  /** using for set checked of ... filter */
  onSetChecked = (type, data) => {
    this.homeLogic.setChecked(type, data);
    const { extraValue } = this.state;
    this.setState({ extraValue: !extraValue });
  }

  /** using for set checked of SORT filter */
  onSetRadioBtnChecked = (data) => {
    this.homeLogic.setRadioBtnCheck(data);
    const { extraValue } = this.state;
    this.setState({ extraValue: !extraValue });
  }

  /** using for check checked of ... filter */
  isChecked = (type, data) => this.homeLogic.isChecked(type, data)

  /** using for check checked of SORT filter */
  isRadioBtnChecked = data => this.homeLogic.isRadioBtnCheck(data)

  renderSorting = () => (
    <View>
      <FlatList
        data={this.state.sorts}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CardItem style={styles.mdCartItem1Col}>
            <TouchableOpacity onPress={() => { this.onSetRadioBtnChecked(item.value); }} style={styles.mdSoftItem}>
              <CheckBox disabled checked={this.isRadioBtnChecked(item.value)} style={styles.mdRadioButton} />
              <Text style={styles.mdCheckboxContent}>{item.label}</Text>
            </TouchableOpacity>
          </CardItem>
        )}
      />
    </View>
  )

  /** render title of ... filter */
  renderTextTitleFilter = (type) => {
    switch (type) {
      case 'CUISINE': {
        return I18n.t('home.filter.cuisine');
      }
      case 'CATEGORY': {
        return I18n.t('home.filter.category');
      }
      case 'STATUS': {
        return I18n.t('home.filter.status');
      }
      case 'SERVICE': {
        return I18n.t('home.filter.service');
      }
      case 'PAYMENT': {
        return I18n.t('home.filter.payment');
      }
      default: {
        return '';
      }
    }
  }

  hideFilterByType = (type) => {
    switch (type) {
      case 'CUISINE': {
        const { isShowCuisines } = this.state;
        this.setState({ isShowCuisines: !isShowCuisines });
        break;
      }
      case 'CATEGORY': {
        const { isShowCategoris } = this.state;
        this.setState({ isShowCategoris: !isShowCategoris });
        break;
      }
      case 'STATUS': {
        const { isShowStatus } = this.state;
        this.setState({ isShowStatus: !isShowStatus });
        break;
      }
      case 'SERVICE': {
        const { isShowServices } = this.state;
        this.setState({ isShowServices: !isShowServices });
        break;
      }
      case 'PAYMENT': {
        const { isShowPaymentMethods } = this.state;
        this.setState({ isShowPaymentMethods: !isShowPaymentMethods });
        break;
      }
      default: {
        break;
      }
    }
  }

  renderTitleFilter = type => (
    <CardItem header>
      <View style={styles.mdCartItemTitleHeader}>
        <Text style={styles.mdTitle}>{this.renderTextTitleFilter(type)}</Text>
      </View>
      <View style={styles.mdCartItemShowView}>
        <Icon
          type="FontAwesome"
          style={styles.mdIconShowOrHide}
          name={this.state.isShowCuisines ? 'minus-square' : 'plus-square'}
          onPress={() => { this.hideFilterByType(type); }}
        />
      </View>
    </CardItem>
  )

  renderCheckbox = (type, id, name) => {
    const styless = type === 'CATEGORY' || type === 'PAYMENT' ? styles.mdParamItem : styles.mdParamItemCol;
    return (
      <TouchableOpacity onPress={() => this.onSetChecked(type, id)} style={styless}>
        <CheckBox
          disabled
          checked={this.isChecked(type, id)}
          style={styles.mdCheckbox}
        />
        <Text style={styles.mdCheckboxContent}>{name}</Text>
      </TouchableOpacity>
    );
  }

  renderFilter = () => {
    const {
      isShowCuisines,
      listCuisines,
      isShowCategoris,
      listCategories,
      isShowServices,
      listServices,
      isShowPaymentMethods,
      listPaymentMethods,
      isShowStatus,
      listStatus
    } = this.state;
    return (
      <Content>

        {/* CUISINE */}
        {
          this.renderTitleFilter('CUISINE')
        }
        {
          isShowCuisines
          && (
            <CardItem style={styles.mdCartItem2Col}>
              <FlatList
                data={listCuisines}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.mdParamItem}>
                    {
                      this.renderCheckbox('CUISINE', item[0].id, item[0].name)
                    }
                    {
                      item[1] && this.renderCheckbox('CUISINE', item[1].id, item[1].name)
                    }
                  </View>
                )}
              />
            </CardItem>
          )
        }

        {/* CATEGORY */}
        {
          this.renderTitleFilter('CATEGORY')
        }
        {
          isShowCategoris
          && (
            <CardItem style={styles.mdCartItem1Col}>
              <FlatList
                data={listCategories}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => this.renderCheckbox('CATEGORY', item.id, item.name)}
              />
            </CardItem>
          )
        }

        {/* STATUS */}
        {
          this.renderTitleFilter('STATUS')
        }
        {
          isShowStatus
          && (
            <CardItem style={styles.mdCartItem2Col}>
              <FlatList
                data={listStatus}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.mdParamItem}>
                    {
                      this.renderCheckbox('STATUS', item[0].id, item[0].name)
                    }
                    {
                      item[1] && this.renderCheckbox('STATUS', item[1].id, item[1].name)
                    }
                  </View>
                )}
              />
            </CardItem>
          )
        }

        {/* SERVICE */}
        {
          this.renderTitleFilter('SERVICE')
        }
        {
          isShowServices
          && (
            <CardItem style={styles.mdCartItem2Col}>
              <FlatList
                data={listServices}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.mdParamItem}>
                    {
                      this.renderCheckbox('SERVICE', item[0].id, item[0].name)
                    }
                    {
                      item[1] && this.renderCheckbox('SERVICE', item[1].id, item[1].name)
                    }
                  </View>
                )}
              />
            </CardItem>
          )
        }

        {/* PAYMENT */}
        {
          this.renderTitleFilter('PAYMENT')
        }
        {
          isShowPaymentMethods
          && (
            <CardItem style={styles.mdCartItem1Col}>
              <FlatList
                data={listPaymentMethods}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => this.renderCheckbox('PAYMENT', item.id, item.name)}
              />
            </CardItem>
          )
        }
      </Content>
    );
  }

  render() {
    const { goBack, state } = this.props.navigation;
    return (
      <Container style={styles.mdContainer}>

        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{this.props.home.location.districtName}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                state.params.onGoBack();
                goBack();
              }}
            >
              <Icon name="search" />
            </Button>
          </Right>
        </Header>

        <Tabs>
          <Tab heading={I18n.t('home.filter.tab.filter')}>
            {this.renderFilter()}
          </Tab>
          <Tab heading={I18n.t('home.filter.tab.sort')}>
            <CardItem header>
              <Text style={styles.mdTitle}>{I18n.t('home.filter.sort')}</Text>
            </CardItem>
            {this.renderSorting()}
          </Tab>
        </Tabs>

      </Container>
    );
  }
}

export default FilterScreen;
