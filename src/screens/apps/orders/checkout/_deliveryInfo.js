import React from 'react';
import {
  Card,
  CardItem,
  Text,
  Body,
  Icon
} from 'native-base';
import {
  TextInput,
  Platform
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import I18n from '../../../../i18n/i18n';
import styles, { pickerSelectStyles } from './styles';
import enums from '../../../../constants/enums';
import { renderHolder, borderColor } from './__commonRender';
import * as Components from '../../../../components';

const platform = Platform.OS;

class DeliveryInfoScreen extends React.PureComponent {
  render() {
    const {
      residenceType,
      fullAddress,
      wards,
      ward,
      districtName,

      onValueChangeResidenceType,
      onValueChangeFullAddress,
      onValueChangeWard,
      submitting
    } = this.props;
    return (
      <Card>
        <CardItem header bordered>
          <Text style={styles.textTitle}>
            {I18n.t('checkout.section.delivery_info.title')}
          </Text>
        </CardItem>
        <CardItem>
          <Body>

            {/* ======================== RESIDENT ================== */}
            <Components.InputTitle title={I18n.t('checkout.section.delivery_info.residence')} require />
            <RNPickerSelect
              placeholder={renderHolder('residence')}
              items={enums.CHECKOUT_RESIDENCE_TYPE}
              onValueChange={(value) => { onValueChangeResidenceType(value); }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={() => <Icon active style={{ color: '#ededed' }} name="chevron-down" type="Feather" />}
              value={residenceType}
            />

            {/* ======================== FULL ADDRESS ================== */}
            <Components.InputTitle title={I18n.t('checkout.section.delivery_info.full_address')} require />
            <TextInput
              style={[platform === 'ios' ? styles.textInput : styles.textInputAndroid, {
                borderColor: borderColor(fullAddress === '', submitting)
              }]}
              value={fullAddress}
              onChangeText={text => onValueChangeFullAddress(text)}
            />

            {/* ======================== DISTRICT ================== */}
            <Components.InputTitle title={I18n.t('checkout.section.delivery_info.district')} require />
            <TextInput
              editable={false}
              style={platform === 'ios' ? styles.textInput : styles.textInputAndroid}
              value={districtName}
            />

            {/* ======================== WARD ================== */}
            <Components.InputTitle title={I18n.t('checkout.section.delivery_info.ward')} require />
            <RNPickerSelect
              placeholder={renderHolder('ward')}
              items={wards}
              onValueChange={(value) => { onValueChangeWard(value); }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={() => <Icon active style={{ color: '#ededed' }} name="chevron-down" type="Feather" />}
              value={ward}
            />
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default DeliveryInfoScreen;
