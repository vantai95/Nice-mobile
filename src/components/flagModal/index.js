import React from 'react';
import {
  Card,
  Text,
  CardItem
} from 'native-base';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import images from '../../constants/images';
import AsyncStorageService from '../../services/asyncStorageService';

/** setup language */
import { setLocale } from '../../i18n/i18n';

import styles from './styles';

class FlagModalScreen extends React.Component {
  onSetLanguage = (language) => {
    const { onSetLanguage, currentUser, setOpenModal } = this.props;

    /** set language into redux */
    onSetLanguage({ language });

    /** reset language, token in Async Storage */
    AsyncStorageService.setData(JSON.stringify({
      language,
      token: currentUser.token
    }));

    /** reset language in I18n */
    setLocale(language);

    /** close modal */
    setOpenModal(false);
  }

  render() {
    const { isOpen, setOpenModal } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        backdropPressToClose={false}
        swipeToClose={false}
        onClosed={() => setOpenModal(false)}
        onOpened={() => setOpenModal(true)}
        style={styles.container}
      >
        <Card style={styles.card}>
          <CardItem header style={styles.viewClose}>
            <TouchableOpacity onPress={() => setOpenModal(false)}>
              <Text style={styles.textClose}>X</Text>
            </TouchableOpacity>
          </CardItem>
          <View style={styles.flagGroupView}>
            <TouchableOpacity style={styles.flagView} onPress={() => this.onSetLanguage('en')}>
              <Image source={images.FLAG_EN_O} style={styles.flagImage} />
              <Text style={styles.countryText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flagView} onPress={() => this.onSetLanguage('ja')}>
              <Image source={images.FLAG_JA_O} style={styles.flagImage} />
              <Text style={styles.countryText}>Japan</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </Modal>
    );
  }
}

FlagModalScreen.defaultProps = {
  currentUser: {
    token: ''
  }
};

FlagModalScreen.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSetLanguage: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    token: PropTypes.string
  })
};

export { FlagModalScreen };
