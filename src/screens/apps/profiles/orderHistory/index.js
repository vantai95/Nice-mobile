import React from 'react';
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Title,
  Card,
  CardItem,
  Text
} from 'native-base';
import {
  FlatList
} from 'react-native';
import I18n from '../../../../i18n/i18n';
import styles from './styles';
import utils from '../../../../utils/utils';
import UserService from '../../../../services/userService';
import toast from '../../../../utils/toast';

import OrderHistoryItemScreen from './_item';

class OrderHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };

    this.userService = new UserService();
  }

  componentDidMount() {
    this.getOrderHistory();
  }

  getOrderHistory = () => {
    this.userService.getOrderHistory()
      .then((responseJson) => {
        if (responseJson.success) {
          this.setState({ dataSource: responseJson.order });
        } else {
          const { message } = responseJson;
          toast.danger(message.toString());
        }
      })
      .catch((error) => { toast.danger(error); });
  }

  getTotal = () => {
    const { dataSource } = this.state;
    let total = 0;
    dataSource.forEach((item) => {
      total += item.total_amount;
    });

    return total;
  }

  render() {
    const { goBack } = this.props.navigation;
    const { dataSource } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => { goBack(); }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{I18n.t('header.order_history')}</Title>
          </Body>
          <Right />
        </Header>
        <Content scrollEnabled padder>
          <Card>
            <CardItem bordered header>
              <Text style={styles.itemHeaderTitle}>
                {I18n.t('order_history.total_amount')}
                <Text style={[styles.itemHeaderTitle, { color: 'red' }]}>
                  {I18n.t('common.currency', { resource: utils.currencyVnd(this.getTotal()) })}
                </Text>
              </Text>
            </CardItem>
            <FlatList
              data={dataSource}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <OrderHistoryItemScreen item={item} />
              )}
            />
          </Card>
        </Content>
      </Container>
    );
  }
}

export default OrderHistoryScreen;
