import React from 'react';
import PropTypes from 'prop-types';
import {
  Item as FormItem,
  Text,
  CheckBox
} from 'native-base';
import styles from './styles';
import I18n from '../../i18n/i18n';

class GenderInput extends React.PureComponent {
  render() {
    const { gender, onPress } = this.props;
    return (
      <FormItem last style={styles.formCheckboxItem}>
        <CheckBox style={styles.checkbox} onPress={() => onPress()} checked={gender} />
        <Text style={styles.checkboxTitle}>{I18n.t('auth.register.male')}</Text>
        <CheckBox style={styles.checkbox} onPress={() => onPress()} checked={!gender} />
        <Text style={styles.checkboxTitle}>{I18n.t('auth.register.female')}</Text>
      </FormItem>
    );
  }
}

GenderInput.propTypes = {
  gender: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

export { GenderInput };
