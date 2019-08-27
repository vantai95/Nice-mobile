import React from 'react';
import {
  Button,
  Icon,
  Text
} from 'native-base';
import {
  Grid,
  Col
} from 'react-native-easy-grid';
import PropTypes from 'prop-types';
import styles from './styles';
import I18n from '../../../i18n/i18n';

class ButtonSocials extends React.PureComponent {
  render() {
    const {
      onFacebookPress,
      onGooglePress
    } = this.props;
    return (
      <Grid>
        <Col size={1}>
          <Button full iconLeft style={styles.btnFacebook} onPress={() => onFacebookPress()}>
            <Icon active type="FontAwesome" name="facebook-square" />
            <Text style={styles.textBold}>{I18n.t('auth.login.btn_facebook')}</Text>
          </Button>
        </Col>

        <Col size={1}>
          <Button full iconLeft style={styles.btnGoogle} onPress={() => onGooglePress()}>
            <Icon active type="FontAwesome" name="google-plus-square" />
            <Text style={styles.textBold}>{I18n.t('auth.login.btn_google')}</Text>
          </Button>
        </Col>
      </Grid>
    );
  }
}

ButtonSocials.propTypes = {
  onFacebookPress: PropTypes.func.isRequired,
  onGooglePress: PropTypes.func.isRequired
};

export { ButtonSocials };
