import React from 'react';
import PropTypes from 'prop-types';
import {
  Item as FormItem,
  DatePicker
} from 'native-base';
import styles from './styles';

class DateInput extends React.PureComponent {
  render() {
    const {
      error,
      onDateChange,
      placeHolderText,
      defaultDate
    } = this.props;
    return (
      <FormItem last style={styles.formDateItem} error={error}>
        <DatePicker
          defaultDate={defaultDate}
          minimumDate={new Date(1900, 1, 1)}
          maximumDate={new Date()}
          // locale={"en"}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType="fade"
          androidMode="default"
          placeHolderText={placeHolderText}
          textStyle={styles.textInput}
          placeHolderTextStyle={styles.placeholderDate}
          onDateChange={newDate => onDateChange(newDate)}
          disabled={false}
        />
      </FormItem>
    );
  }
}

DateInput.defaultProps = {
  placeHolderText: '',
  defaultDate: new Date()
};

DateInput.propTypes = {
  error: PropTypes.bool.isRequired,
  onDateChange: PropTypes.func.isRequired,
  placeHolderText: PropTypes.string,
  defaultDate: PropTypes.instanceOf(Date)
};

export { DateInput };
