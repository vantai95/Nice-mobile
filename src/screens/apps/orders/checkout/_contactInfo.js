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
import utils from '../../../../utils/utils';
import { renderHolder, borderColor } from './__commonRender';
import * as Components from '../../../../components';

const platform = Platform.OS;

class ContactInfoScreen extends React.PureComponent {
  render() {
    const {
      title,
      fullname,
      email,
      phone,
      password,

      onValueChangeTitle,
      onValueChangeFullname,
      onValueChangeEmail,
      onValueChangePhone,
      onValueChangePassword,

      userToken,
      submitting
    } = this.props;
    return (
      <Card>
        <CardItem header bordered>
          <Text style={styles.textTitle}>
            {I18n.t('checkout.section.contact_info.title')}
          </Text>
        </CardItem>
        <CardItem>
          <Body>

            {/* ======================== GENDER ================== */}
            <Components.InputTitle title={I18n.t('checkout.section.contact_info.gender')} require />
            <RNPickerSelect
              placeholder={renderHolder('title')}
              items={enums.CHECKOUT_TITLE}
              onValueChange={(value) => { onValueChangeTitle(value); }}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={() => <Icon activestyle={{ color: '#ededed' }} name="chevron-down" type="Feather" />}
              value={title}
            />

            {/* ======================== FULLNAME ================== */}
            <Components.InputTitle title={I18n.t('checkout.section.contact_info.full_name')} require />
            <TextInput
              value={fullname}
              style={[platform === 'ios' ? styles.textInput : styles.textInputAndroid, {
                borderColor: borderColor(fullname === '', submitting)
              }]}
              onChangeText={text => onValueChangeFullname(text)}
            />

            {/* ======================== EMAIL ================== */}
            <Components.InputTitle title={I18n.t('checkout.section.contact_info.email')} require />
            <TextInput
              style={[platform === 'ios' ? styles.textInput : styles.textInputAndroid, {
                borderColor: borderColor(!utils.isEmail(email), submitting)
              }]}
              value={email}
              onChangeText={text => onValueChangeEmail(text)}
            />

            {/* ======================== PHONE ================== */}
            <Components.InputTitle title={I18n.t('checkout.section.contact_info.phone_number')} require />
            <TextInput
              style={[platform === 'ios' ? styles.textInput : styles.textInputAndroid, {
                borderColor: borderColor(phone.length < 10, submitting)
              }]}
              keyboardType="numeric"
              value={phone}
              maxLength={12}
              onChangeText={text => onValueChangePhone(text)}
            />

            {/* ======================== PASSWORD ================== */}
            {
              userToken === ''
              && (<Components.InputTitle title={I18n.t('checkout.section.contact_info.password')} require />)
            }
            {
              userToken === ''
              && (
                <TextInput
                  secureTextEntry
                  value={password}
                  style={[platform === 'ios' ? styles.textInput : styles.textInputAndroid, {
                    borderColor: borderColor(password.length < 8, submitting)
                  }]}
                  onChangeText={text => onValueChangePassword(text)}
                />
              )
            }
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default ContactInfoScreen;
