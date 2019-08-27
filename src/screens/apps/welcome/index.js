import React from 'react';
import {
  Container,
  Button,
  Icon,
  Text
} from 'native-base';
import {
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import images from '../../../constants/images';
import FlagModalContainer from '../../../containers/components/flagModal';
import I18n from '../../../i18n/i18n';
import styles, { pickerSelectStyles } from './styles';
import colors from '../../../constants/colors';
import toasts from '../../../utils/toast';

import HomeService from '../../../services/homeService';
import enums from '../../../constants/enums';

import LogoScreen from './_logo';
import AdsScreen from './_ads';

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);

    const { city, district, ward } = this.props.home.location;

    this.state = {
      city,
      citys: [],

      district,
      districts: [],

      ward,
      wards: [],

      isOpen: false
    };
    this.homeService = new HomeService();
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  componentDidMount() {
    /** get locations */
    this.getLocations();
  }

  componentDidUpdate(prevProps) {
    /** if locations change -> remap city, district, ward */
    if (prevProps.home !== this.props.home) {
      this.mapCityData();
    }

    /** if language have been changed, call api get location, filter params */
    if (prevProps.app.language !== this.props.app.language) {
      this.getLocations();
      this.getFilterParam();
    }
  }

  resetData = () => {
    this.setState({
      city: null,
      citys: [],

      district: null,
      districts: [],

      ward: null,
      wards: []
    });
  }

  mapCityData = () => {
    const citys = this.props.home.locations.map(location => ({
      value: location.id,
      label: location.name ? location.name : 'No name..'
    }));

    this.setState({
      citys,
      // city: null
    }, () => {
      this.mapDistrictData();
    });
  }

  /** map district from city selected */
  mapDistrictData = () => {
    const { city } = this.state;

    // locations: from redux
    const { locations } = this.props.home;

    if (!city) {
      this.setState({ districts: [] });
    } else {
      const found = locations.find(location => location.id === city);

      const districts = found.districts.map(district => ({
        value: district.id,
        label: district.name ? district.name : 'No name..'
      }));

      this.setState({ districts }, () => {
        this.mapWardData();
      });
    }
  }

  /** map ward from district selected */
  mapWardData = () => {
    const { district, city } = this.state;
    // locations: from redux
    const { locations } = this.props.home;

    if (!district) {
      this.setState({ wards: [] });
    } else {
      const foundCity = locations.find(location => location.id === city);

      const foundDistrict = foundCity.districts.find(location => location.id === district);

      const wards = foundDistrict.wards.map(ward => ({
        value: ward.id,
        label: ward.name ? ward.name : 'No name..'
      }));

      this.setState({ wards });
    }
  }

  btnGoPress = () => {
    if (!this.isNullLocation()) {
      const { city, district, ward } = this.state;
      const { onSetLocation } = this.props;

      // save location to redux
      onSetLocation({ city, district, ward });
      this.props.navigation.navigate('Home');
    }
  }

  isNullLocation = () => {
    const { city, district } = this.state;
    if (!city || !district) {
      toasts.warning(I18n.t('welcome.location_null'));
      return true;
    }
    return false;
  }

  setFlag = () => {
    switch (this.props.app.language) {
      case 'vi': {
        return images.FLAG_VI;
      }
      case 'en': {
        return images.FLAG_EN;
      }
      case 'ja': {
        return images.FLAG_JA;
      }
      default: {
        return images.FLAG_EN;
      }
    }
  }

  setOpenModal = (value) => {
    this.setState({ isOpen: value });
  }

  /** when language changed => recall api get locations */
  getLocations = () => {
    this.homeService.getLocations()
      .then((responseJson) => {
        if (responseJson.success) {
          const dataRes = {
            locations: responseJson.data
          };
          this.props.onSetLocations(dataRes);
        } else {
          toasts.danger(responseJson.message.toString());
          this.resetData();
        }
      })
      .catch((error) => { toasts.danger(error); });
  }

  /** when language changed => recall api get filter params */
  getFilterParam = () => {
    this.homeService.getFilterParam()
      .then((responseJson) => {
        if (responseJson.success) {
          const filterParam = responseJson.data;
          const allPro = {
            id: 0,
            name: I18n.t('enums.filter.all')
          };
          filterParam.cuisines.unshift(allPro);
          filterParam.categories.unshift(allPro);
          filterParam.status = enums.STATUSES_FILTER.map(status => ({
            id: status.value,
            name: status.label
          }));
          filterParam.services = enums.SERVICES_FILTER.map(status => ({
            id: status.value,
            name: status.label
          }));
          filterParam.payment_methods = enums.PAYMENTS_FILTER.map(status => ({
            id: status.value,
            name: status.label
          }));
          this.props.onSetFilterParam({ filterParam });
        } else {
          toasts.danger(responseJson.message.toString());
        }
      })
      .catch((error) => { toasts.danger(error); });
  }

  renderPlaceholder = label => ({
    label,
    value: null,
    color: colors.placeHolder
  })

  render() {
    const {
      city, citys, district, districts, ward, wards, isOpen
    } = this.state;
    return (
      <Container style={styles.container}>

        {/* Modal change language */}
        <FlagModalContainer
          isOpen={isOpen}
          setOpenModal={this.setOpenModal}
          getLocations={this.getLocations}
        />

        {/* Button change language */}
        <View style={styles.languageView}>
          <TouchableOpacity onPress={() => { this.setOpenModal(true); }}>
            <Image
              source={this.setFlag()}
              style={styles.languageImage}
            />
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <LogoScreen />

        {/* Group select location */}
        <View style={styles.groupSelectPicker}>

          <RNPickerSelect
            placeholder={this.renderPlaceholder(I18n.t('welcome.placeholder.city'))}
            items={citys}
            onValueChange={(value) => { this.setState({ city: value }, () => this.mapDistrictData()); }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Icon active style={{ color: '#ededed' }} name="chevron-down" type="Feather" />}
            value={city}
          />

          <RNPickerSelect
            placeholder={this.renderPlaceholder(I18n.t('welcome.placeholder.district'))}
            items={districts}
            onValueChange={(value) => { this.setState({ district: value }, () => this.mapWardData()); }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Icon active style={{ color: '#ededed' }} name="chevron-down" type="Feather" />}
            value={district}
          />

          <RNPickerSelect
            placeholder={this.renderPlaceholder(I18n.t('welcome.placeholder.ward'))}
            items={wards}
            onValueChange={(value) => { this.setState({ ward: value }); }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => <Icon active style={{ color: '#ededed' }} name="chevron-down" type="Feather" />}
            value={ward}
          />

          <View style={styles.btnGoView}>
            <View>
              <Button style={styles.btnGo} onPress={() => this.btnGoPress()}>
                <Text style={styles.btnGoText}>
                  {I18n.t('welcome.btn_go')}
                </Text>
              </Button>
            </View>
          </View>

        </View>

        {/* Ads */}
        <AdsScreen />

        <View style={styles.groupBottom} />

      </Container>
    );
  }
}

export default WelcomeScreen;
