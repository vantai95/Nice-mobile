import React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon
} from 'native-base';
import {
  Alert,
  FlatList
} from 'react-native';
import styles from './styles';
import toasts from '../../../../utils/toast';
import I18n from '../../../../i18n/i18n';
import UserService from '../../../../services/userService';
import AlternativeInfoItemScreen from './_item';

class AlternativeInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    const { extraInfos } = this.props.user;

    this.state = {
      extraInfos
    };

    this.userService = new UserService();
  }

  componentDidUpdate(prevProps) {
    const { extraInfos } = this.props.user;
    if (prevProps.user.extraInfos !== extraInfos) {
      this.setState({ extraInfos });
    }
  }

  onGoBack = (value) => {
    const { state } = this.props.navigation;
    state.params.onGoBack(value);
  }

  btnDeletePress = (id) => {
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
            this.onDeleteInfo(id);
          }
        },
      ],
      { cancelable: false },
    );
  }

  onDeleteInfo = (id) => {
    this.userService.deleteInfo(id)
      .then((responseJson) => {
        if (responseJson.success) {
          toasts.success(I18n.t('common.delete.success'));
          this.onGoBack(true);
        } else {
          const { message } = responseJson;
          toasts.danger(message.toString());
        }
      })
      .catch((error) => { toasts.danger(error); });
  }

  render() {
    const { extraInfos } = this.state;
    const { goBack, navigate } = this.props.navigation;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => { goBack(); }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{I18n.t('header.alternative_info')}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                navigate('AlternativeInfoForm', {
                  type: 'add',
                  onGoBack: value => this.onGoBack(value)
                });
              }}
            >
              <Icon type="Feather" name="plus" />
            </Button>
          </Right>
        </Header>

        <Content>
          <FlatList
            data={extraInfos}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <AlternativeInfoItemScreen
                item={item}
                index={index}
                editPress={() => {
                  navigate('AlternativeInfoForm', {
                    type: 'update',
                    info: item,
                    onGoBack: value => this.onGoBack(value)
                  });
                }}
                btnDeletePress={() => this.btnDeletePress(item.id)}
              />
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default AlternativeInfoScreen;
