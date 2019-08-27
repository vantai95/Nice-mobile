import I18n from '../../../../i18n/i18n';
import colors from '../../../../constants/colors';

export const renderHolder = (type) => {
  let label = '';

  switch (type) {
    case 'title': {
      label = I18n.t('checkout.placeholder.title');
      break;
    }
    case 'residence': {
      label = I18n.t('checkout.placeholder.residence');
      break;
    }
    case 'ward': {
      label = I18n.t('checkout.placeholder.ward');
      break;
    }
    case 'paymentAmount': {
      label = I18n.t('checkout.placeholder.payment_amount');
      break;
    }
    case 'deliveryTime': {
      label = I18n.t('checkout.placeholder.delivery_time');
      break;
    }
    case 'selectHour': {
      label = I18n.t('checkout.placeholder.select_hour');
      break;
    }
    case 'selectMinute': {
      label = I18n.t('checkout.placeholder.select_minute');
      break;
    }
    default: {
      break;
    }
  }

  const holder = {
    label,
    value: null,
    color: colors.placeHolder,
  };

  return holder;
};

export const borderColor = (value, submitting) => {
  if (value) {
    if (submitting) {
      return 'red';
    }
    return 'green';
  }
  return '#ededed';
};
