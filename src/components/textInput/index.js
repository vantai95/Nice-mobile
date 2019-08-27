/**
 * using in login, register, forgot password
 */
import React from 'react';
import {
  Item as FormItem,
  Input,
  Icon
} from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';
import colors from '../../constants/colors';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPassword: true
    };
  }

  render() {
    const {
      error,
      placeholder,
      value,
      onChangeText,
      onClearText,
      hasIcon,
      iconName,
      isPassword,
      isNumber,
      maxLength
    } = this.props;
    const {
      isShowPassword
    } = this.state;
    return (
      <FormItem last style={styles.formItem} error={error}>
        {
          hasIcon
          && (
            <Icon
              active
              name={iconName}
              type="FontAwesome"
              style={[styles.iconColor]}
            />
          )
        }
        <Input
          returnKeyType="done"
          keyboardType={isNumber ? 'number-pad' : 'default'}
          placeholder={placeholder || ''}
          placeholderTextColor={colors.placeholderColor}
          style={[styles.input]}
          autoCapitalize="none"
          value={value}
          maxLength={maxLength}
          onChangeText={text => onChangeText(text)}
          secureTextEntry={isPassword && isShowPassword}
        />
        {
          (isPassword && value !== '')
          && (
            <Icon
              active
              name={isShowPassword ? 'eye' : 'eye-off'}
              type="Feather"
              style={[styles.iconColor]}
              onPress={() => this.setState({ isShowPassword: !isShowPassword })}
            />
          )
        }
        {
          value !== ''
          && (
            <Icon
              active
              name="x"
              type="Feather"
              style={[styles.iconColor]}
              onPress={() => onClearText()}
            />
          )
        }
      </FormItem>
    );
  }
}

TextInput.defaultProps = {
  error: false,
  placeholder: '',
  onClearText: () => { },
  hasIcon: false,
  iconName: 'user',
  isPassword: false,
  isNumber: false,
  maxLength: 256
};

TextInput.propTypes = {
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClearText: PropTypes.func,
  hasIcon: PropTypes.bool,
  iconName: PropTypes.string,
  isPassword: PropTypes.bool,
  isNumber: PropTypes.bool,
  maxLength: PropTypes.number
};

export { TextInput };
