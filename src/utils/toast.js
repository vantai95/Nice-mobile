import { Toast } from 'native-base';
import { TOAST_DURATION } from '../constants/config';
import I18n from '../i18n/i18n';

const position = 'bottom';

const success = (content) => {
  Toast.show({
    text: content,
    buttonText: I18n.t('toast.success'),
    type: 'success',
    duration: TOAST_DURATION,
    position
  });
};

const warning = (content) => {
  Toast.show({
    text: content,
    buttonText: I18n.t('toast.warning'),
    type: 'warning',
    duration: TOAST_DURATION,
    position
  });
};

const danger = (content) => {
  Toast.show({
    text: content,
    buttonText: I18n.t('toast.danger'),
    type: 'danger',
    duration: TOAST_DURATION,
    position
  });
};

const normal = (content) => {
  Toast.show({
    text: content,
    buttonText: I18n.t('toast.default'),
    duration: TOAST_DURATION,
    position
  });
};

export default {
  success,
  warning,
  danger,
  normal
};
