import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import I18n from '../../../../i18n/i18n';
import styles from './styles';

class AlternativeInfoItemScreen extends React.PureComponent {
  renderRowInfo = (title, info) => (
    <View style={[styles.titleSection, styles.infoSection]}>
      <Text note>{title}</Text>
      <Text style={styles.infoText}>{info || ''}</Text>
    </View>
  )

  render() {
    const {
      item,
      index,
      editPress,
      btnDeletePress
    } = this.props;
    return (
      <View>
        <View style={[styles.titleSection, styles.titleBackground]}>

          <Text style={styles.titleText}>
            {I18n.t('profile.alternative_info')}
            {index + 1}
          </Text>

          <View style={styles.groupButton}>
            <TouchableOpacity style={styles.btnEdit} onPress={() => editPress()}>
              <Text style={styles.titleText}>
                {I18n.t('profile.btn_edit')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { btnDeletePress(); }}>
              <Text style={styles.titleText}>
                {I18n.t('profile.btn_delete')}
              </Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.line} />
        {/* email */}
        {this.renderRowInfo(I18n.t('profile.title.email'), item.email)}

        <View style={styles.line} />

        {/* phone number */}
        {this.renderRowInfo(I18n.t('profile.title.phone'), item.phone)}

        <View style={styles.line} />

        {/* address */}
        {this.renderRowInfo(I18n.t('profile.title.address'), item.address)}

        <View style={styles.line} />
      </View>
    );
  }
}

AlternativeInfoItemScreen.propTypes = {
  item: PropTypes.shape({
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  editPress: PropTypes.func.isRequired,
  btnDeletePress: PropTypes.func.isRequired
};

export default AlternativeInfoItemScreen;
