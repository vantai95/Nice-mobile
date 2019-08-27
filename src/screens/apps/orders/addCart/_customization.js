import React from 'react';
import {
  Icon,
  CardItem,
  Text,
  Body,
  Right
} from 'native-base';
import {
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {
  Row
} from 'react-native-easy-grid';
import RNPickerSelect from 'react-native-picker-select';
import I18n from '../../../../i18n/i18n';
import colors from '../../../../constants/colors';
import styles, { pickerSelectStyles } from './styles';
import utils from '../../../../utils/utils';
import enums from '../../../../constants/enums';

class CustomizationScreen extends React.PureComponent {
  renderCustomization = (item) => {
    const {
      selected,
      options,
      state,
      onClose,
      onValueChange,
      getQuantity,
      minusQuantityOptionV2,
      addQuantityOptionV2
    } = this.props;
    return (
      <View style={{ width: '100%' }}>

        <Text note style={styles.customizationName}>
          {item.name}
          {
            item.required === 1
            && <Text note style={{ color: colors.red }}>*</Text>
          }
        </Text>

        {/* SELECT CUSTOMIZATION */}
        <RNPickerSelect
          placeholder={{
            label: item.name,
            value: -1,
            color: colors.placeHolder,
          }}
          items={item.options.map(element => ({
            value: element.id,
            label: `${element.name} + ${I18n.t('common.currency', { resource: utils.currencyVnd(element.price) })}`
          }))}
          onClose={() => { onClose(item); }}
          onValueChange={(value) => { onValueChange(value, item); }}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <Icon
              active
              style={{ color: '#ededed' }}
              name="chevron-down"
              type="Feather"
            />
          )}
          value={item.selection_type === enums.CART_OPTIONS.MULTIPLE ? selected : undefined}
        />

        {/* IF OPTION IS SINGLE */}
        {
          (item.selection_type === enums.CART_OPTIONS.SINGLE
            && item.quantity_changeable === enums.CART_CHANGE_QUANTITY.CAN_CHANGE
            && getQuantity(item) !== 0)
          && (
            <CardItem>

              <Body style={styles.itemBody}>
                <Text note style={styles.textName} />
              </Body>

              {/* CHANGE QUANTITY CUSTOMIZATION */}
              <Right style={styles.itemRight}>
                <Row style={[{ alignItems: 'center', justifyContent: 'flex-end' }]}>

                  <TouchableOpacity style={[styles.ciMinusAdd]} onPress={() => { minusQuantityOptionV2(item); }}>
                    <Text style={styles.textName}>-</Text>
                  </TouchableOpacity>

                  <View style={[styles.ciQuantity]}>
                    <Text note style={styles.textName}>{getQuantity(item)}</Text>
                  </View>

                  <TouchableOpacity style={[styles.ciMinusAdd]} onPress={() => { addQuantityOptionV2(item); }}>
                    <Text style={styles.textName}>+</Text>
                  </TouchableOpacity>

                </Row>
              </Right>

            </CardItem>
          )
        }

        {/* IF OPTION IS MULTIPLE */}
        {
          item.selection_type === enums.CART_OPTIONS.MULTIPLE
          && (
            <View style={{ width: '100%' }}>
              <FlatList
                data={options.filter(element => element.selection_type === enums.CART_OPTIONS.MULTIPLE
                  && element.custom_id === item.id)}
                keyExtractor={(item, index) => index.toString()}
                extraData={state}
                style={{ width: '100%' }}
                scrollEnabled={false}
                renderItem={({ item }) => this.renderOption(item)}
              />
            </View>
          )
        }
      </View>
    );
  }

  renderOption = (item) => {
    const {
      minusQuantityOption,
      addQuantityOption,
      removeOption
    } = this.props;
    return (
      <CardItem>

        <Body style={[styles.itemBody, { paddingRight: 2 }]}>
          <Text note numberOfLines={2} style={styles.textName}>
            {`🔸 ${item.option_name}`}
          </Text>
        </Body>

        {/* CHANGE QUANTITY OR REMOVE OPTION OF CUSTOMIZATION */}
        <Right style={styles.itemRight}>
          <Row style={[{ alignItems: 'center', justifyContent: 'flex-end' }]}>

            <TouchableOpacity style={[styles.ciMinusAdd]} onPress={() => { minusQuantityOption(item); }}>
              <Text style={styles.textName}>-</Text>
            </TouchableOpacity>

            <View style={[styles.ciQuantity]}>
              <Text note style={styles.textName}>{item.quantity}</Text>
            </View>

            <TouchableOpacity style={[styles.ciMinusAdd]} onPress={() => { addQuantityOption(item); }}>
              <Text style={styles.textName}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.ciMinusAdd, { marginLeft: 10 }]} onPress={() => { removeOption(item); }}>
              <Text style={[styles.textName, { color: colors.red }]}>X</Text>
            </TouchableOpacity>

          </Row>
        </Right>
      </CardItem>
    );
  }

  render() {
    const {
      setupData,
      state,
    } = this.props;
    return (
      <CardItem>
        <Body>
          <FlatList
            data={setupData.customizations}
            keyExtractor={(item, index) => index.toString()}
            extraData={state}
            style={{ width: '100%' }}
            scrollEnabled={false}
            renderItem={({ item }) => this.renderCustomization(item)}
          />
        </Body>
      </CardItem>
    );
  }
}

export default CustomizationScreen;
