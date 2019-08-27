import React from 'react';
import {
  Container,
  Text,
  Button,
  Header,
  Left,
  Right,
  Title,
  Body,
  Icon
} from 'native-base';
import {
  View,
  ActivityIndicator,
  Alert,
  Image,
  WebView
} from 'react-native';
import { Buffer } from 'buffer';
import { NGANLUONG } from '../../../../../constants/config';
import images from '../../../../../constants/images';
import toasts from '../../../../../utils/toast';
import I18n from '../../../../../i18n/i18n';
import utils from '../../../../../utils/utils';
import NganLuongService from '../../../../../services/nganluongService';
import RestaurantService from '../../../../../services/restaurantService';
import styles from './styles';

import md5 from '../../../../../utils/md5';


const statuss = {
  CREATED: 'created',
  COMPLETED: 'completed',
  REJECTED: 'rejected'
};

const getCodeError = (codeError) => {
  const messageError = {
    '000': 'Thành công',
    101: 'Checksum không hợp lệ',
    102: 'Mã hóa không hợp lệ',
    103: 'IP không được phép truy cập',
    104: 'Dữ liệu không hợp lệ',
    105: 'Token key không hợp lệ',
    106: 'Token thanh toán Alepay không tồn tại hoặc đã bị hủy',
    107: 'Giao dịch đang được xử lý',
    108: 'Dữ liệu không tìm thấy',
    109: 'Mã đơn hàng không tìm thấy',
    110: 'Phải có email hoặc số điện thoại người mua',
    111: 'Giao dịch thất bại',
    120: 'Giá trị đơn hàng phải lớn hơn 0',
    121: 'Loại tiền tệ không hợp lệ',
    122: 'Mô tả đơn hàng không tìm thấy',
    123: 'Tổng số sản phẩm phải lớn hơn không',
    124: 'Định dạng URL không chính xác (http://, https://)',
    125: 'Tên người mua không đúng định dạng',
    126: 'Email người mua không đúng định dạng',
    127: 'SĐT người mua không đúng định dạng',
    128: 'Địa chỉ người mua không hợp lệ',
    129: 'City người mua không hợp lệ',
    130: 'quốc gia người mua không hợp lệ',
    131: 'hạn thanh toán phải lớn hơn 0',
    132: 'Email không hợp lệ',
    133: 'Thông tin thẻ không hợp lệ',
    134: 'Thẻ hết hạn mức thanh toán',
    135: 'Giao dịch bị từ chối bởi ngân hàng phát hành thẻ',
    136: 'Mã giao dịch không tồn tại',
    137: 'Giao dịch không hợp lệ',
    138: 'Tài khoản Merchant không tồn tại',
    139: 'Tài khoản Merchant không hoạt động',
    140: 'Tài khoản Merchant không hợp lệ',
    142: 'Ngân hàng không hỗ trợ trả góp',
    143: 'Thẻ không được phát hành bởi ngân hàng đã chọn',
    144: 'Kỳ thanh toán không hợp lệ',
    145: 'Số tiền giao dịch trả góp không hợp lệ',
    146: 'Thẻ của bạn không thuộc ngân hang hỗ trợ trả góp',
    147: 'Số điện thoại không hợp lệ',
    148: 'Thông tin trả góp không hợp lệ',
    149: 'Loại thẻ không hợp lệ',
    150: 'Thẻ bị review',
    151: 'Ngân hàng không hỗ trợ thanh toán',
    152: 'Số thẻ không phù hợp với loại thẻ đã chọn',
    153: 'Giao dịch không tồn tại',
    154: 'Số tiền vượt quá hạn mức cho phép',
    155: 'Đợi người mua xác nhận trả góp',
    156: 'Số tiền thanh toán không hợp lệ',
    157: 'email không khớp với profile đã tồn tại',
    158: 'số điện thoại không khớp với profile đã tồn tại',
    159: 'Id không được để trống',
    160: 'First name không được để trống',
    161: 'Last name không được để trống',
    162: 'Email không được để trống ',
    163: 'city không được để trống ',
    164: 'country không được để trống ',
    165: 'country không được để trống ',
    166: 'state không được để trống ',
    167: 'street không được để trống ',
    168: 'postalcode không được để trống ',
    169: 'url callback không đươc để trống ',
    170: 'otp nhập sai quá 3 lần ',
    171: 'Thẻ của khách hàng đã được liên kết trên Merchant ',
    172: 'thẻ tạm thời bị cấm liên kết do vượt quá số lần xác thực số tiền ',
    173: 'trạng thái liên kết thẻ không đúng ',
    174: 'không tìm thấy phiên liên kết thẻ ',
    175: 'số tiền thanh toán của thẻ 2D chưa xác thực vượt quá hạn mức ',
    176: 'thẻ 2D đang chờ xác thực ',
    177: 'khách hàng ấn nút hủy giao dịch ',
    178: 'thanh toán subscription thành công ',
    179: 'thanh toán subscription thất bại ',
    180: 'đăng ký subscription thành công ',
    181: 'đăng ký subscription thất bại ',
    182: 'Mã Alepay token không hợp lệ ',
    183: 'Mã plan không được trống',
    184: 'URL callback không được trống ',
    185: 'Subscription Plan không tồn tại ',
    186: 'Subscription plan không kích hoạt',
    187: 'Subscription plan hết hạn ',
    188: 'Subscription Record đã tồn tại ',
    189: 'Subscription Record không tồn tại ',
    190: 'Trạng thái Subscription Record không hợp lệ',
    191: 'Xác thực OTP quá số lần cho phép',
    192: 'Sai OTP xác thực ',
    193: 'Đăng ký subscription cho khách hàng thành công',
    194: 'Khách hàng cần confirm subscription ',
    195: 'Trạng thái Alepay token không hợp lệ ',
    196: 'Gửi OTP không thành công',
    197: 'Ngày kết thúc hoặc số lần thanh toán tối đa không hợp lệ ',
    198: 'Alepay token không được để trống ',
    199: 'Alepay token chưa được active ',
    200: 'Subscription Plan không hợp lệ ',
    201: 'thời gian bắt đầu không hợp lệ',
    202: 'IP request của merchant chưa được cấu hình hoặc không được cho phép ',
    203: 'không tìm thấy file subscription ',
    204: 'Alepay token chưa được xác thực ',
    205: 'tên chủ thẻ không hợp lệ',
    206: 'Merchant không được phép sử dụng dịch vụ này ',
    207: 'Ngân hàng nội địa không hợp lệ ',
    208: 'Mã token xác thực không hợp lệ ',
    209: 'Số tiền xác thực không hợp lệ ',
    210: 'Quá số lần xác thực số tiền ',
    211: 'Tên người mua phải bao gồm cả họ và tên ',
    212: 'Merchant không được phép liên kết thẻ',
    213: 'Khách hàng không lựa chọn liên kết thẻ ',
    214: 'Giao dịch chưa được thực hiện ',
    215: 'Không duyệt thẻ bị review ',
    216: 'Thẻ không được hỗ trợ thanh toán ',
    217: 'Profile khách hàng không tồn tại trên hệ thống ',
    226: 'Mã chương trình khuyến mãi không hợp lệ',
    227: 'Chờ merchant confirm (Chỉ dành riêng cho robin) ',
    228: 'Ngân hàng không hỗ trợ trả góp trong ngày sao kê',
    229: 'Thẻ đã hết hạn sử dụng, vui lòng liên hệ ngân hàng phát hành thẻ để biết thêm chi tiết ',
    230: 'Thẻ không được phép liên kết ',
    231: 'Trạng thái giao dịch không đúng ',
    232: 'Lỗi kết nối tới ngân hàng ',
    999: 'Lỗi không xác định. Vui lòng liên hệ với Quản trị viên Alepay '
  };

  return messageError[codeError];
};

class NganLuongScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: 0,
      buyerFullname: '',
      buyerEmail: '',
      buyerMobile: '',
      buyerAddress: '',
      orderId: '',

      /**
       * data response when sendOrder
       */
      checkoutUrl: '',
      tokenCode: '',

      /**
       * isShowWebPayment: using for show or hide web paypal
       */
      isShowWebPayment: false,

      paymentStatus: ''
    };

    this.dataParam = this.props.navigation.getParam('dataParam');

    this.nganLuongService = new NganLuongService();
    this.restaurantService = new RestaurantService();
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  componentWillMount() {
    /**
     * remove current cart
     */
    this.props.onRemoveCart();

    /**
     * handle data from 'onlinePayment' screen
     */
    if (this.dataParam) {
      const {
        buyerFullname,
        buyerEmail,
        buyerMobile,
        buyerAddress,
        totalAmount,
        orderId
      } = this.dataParam;

      this.setState({
        buyerFullname,
        buyerEmail,
        buyerMobile,
        buyerAddress: buyerAddress !== '' ? buyerAddress : 'No address..',
        totalAmount,
        orderId
      });
    }
  }

  /**
   * using for check URL web
   */
  onNavigationStateChange(webViewState) {
    /**
      * get url
      */
    const { url } = webViewState;
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params = {};
    let match;

    /**
     * filter params
     */
    // eslint-disable-next-line no-cond-assign
    while (match = regex.exec(url)) {
      // eslint-disable-next-line prefer-destructuring
      params[match[1]] = match[2];
    }

    /**
     * check have return, cancel
     */
    const searchReturn = url.search('return');
    const searchCancel = url.search('cancel');

    if (searchCancel > -1) {
      this.setState({
        isShowWebPayment: false,
        paymentStatus: ''
      });
    } else if (searchReturn > -1) {
      this.setState({ isShowWebPayment: false });

      /**
       * "url": "http://localhost:8000/return?
       * data=TWV5N1YvdHJRbXNMY0xUSmtnY0JIdEZGKzBIa0xmM2FkU2tXQWIrVkxJaTVVL2ZBelk1UFJDdGkrMlhYeGdiQnV2Y3RGajZWOGhiZi9oSWRWTTB5ZDRYSnpESmUyTDRmQ3laYnBoMUxYU1h1c0ZGdjFmYmlvS1NxTDZ3Vi9xSWZPdFEvdnR0UTZjMkZqUVpOZFdCM3dmT3BWQnFuak1valM4SW9QOEFBRmVNPQ==
       * &checksum=53a5a6acd59509ec1607c3884ecfa487",
       */
      if (params.data) {
        /**
         * call api decryptData
         */
        this.nganLuongService.decryptData({ data: params.data })
          .then((responseJson) => {
            if (responseJson.success) {
              const data = JSON.parse(responseJson.data);
              /**
               * {
               *    errorCode: "",
               *    data: "ALE001DTG",
               *    cancel: false (false: ThanhCong, true: ThatBai)
               * }
               */
              if (!data.cancel && data.errorCode === '000') {
                /**
                 * if ThanhCong:
                 * - hide web payment
                 * - change payment status => Complete
                 * - call api update order
                 */
                this.setState({
                  // isShowWebPayment: false,
                  paymentStatus: statuss.COMPLETED
                }, () => {
                  this.callApiUpdateOrder(statuss.COMPLETED);
                });
              } else {
                /**
                 * if ThatBai:
                 * - hide web payment
                 * - change payment status => Rejected
                 * - call api update order
                 */
                this.setState({
                  isShowWebPayment: false,
                  paymentStatus: statuss.REJECTED
                }, () => {
                  this.callApiUpdateOrder(statuss.REJECTED);
                });
              }
            } else {
              toasts.warning(responseJson.message);
            }
          });
      }
    }
  }

  /**
   * Step 1: Encrypt Data
   */
  onEncryptData = () => {
    const orderDescription = `Payment Online with order: ${this.state.orderId} of NiceMeal.com. ${utils.currencyVnd(this.state.totalAmount)}`;

    /**
     * init data
     */
    const dataInit = {
      orderCode: this.state.orderId,
      amount: this.state.totalAmount,
      currency: NGANLUONG.CURRENCY,
      orderDescription,
      totalItem: 1,
      checkoutType: 3,
      month: 3,
      returnUrl: NGANLUONG.RETURN_URL,
      cancelUrl: NGANLUONG.CANCEL_URL,
      buyerName: this.state.buyerFullname,
      buyerEmail: this.state.buyerEmail,
      buyerPhone: this.state.buyerMobile,
      buyerAddress: this.state.buyerAddress,
      buyerCity: 'Ho Chi Minh',
      buyerCountry: 'Viet Nam',
      paymentHours: 1,
      allowDomestic: true
    };

    /**
     * encrypt "init data" (call api to server)
     */
    this.nganLuongService.encryptData({ data: dataInit })
      .then((responseJson) => {
        if (responseJson.success) {
          /**
           * if encrypt success => call api "sendOrder" to "Alepay"
           */
          this.sendOrder(responseJson.data);
        } else {
          toasts.warning(responseJson.message);
        }
      });
  }

  /**
   * Step 2: Send order to Alepay
   */
  sendOrder = (dataEncrypted) => {
    const data = dataEncrypted;
    const checksumKey = NGANLUONG.CHECKSUM_KEY;
    const token = NGANLUONG.TOKEN;
    const checksum = md5.crypt(data + checksumKey);

    const dataReq = {
      data,
      checksum,
      token
    };

    /**
     * Call api to Alepay
     */
    this.nganLuongService.sendOrder(dataReq)
      .then((responseJson) => {
        if (responseJson.errorCode === '000') {
          /**
           * if success => decrypt responseData (call api to server)
           */
          this.onDecryptData(responseJson.data);
        } else {
          toasts.warning(getCodeError(responseJson.errorCode));
        }
      });
  }

  /**
   * Step 3: Decrypt from fn
   */
  onDecryptData = (data) => {
    const dataBase64 = Buffer.from(data).toString('base64');

    this.nganLuongService.decryptData({ data: dataBase64 })
      .then((responseJson) => {
        if (responseJson.success) {
          const dataRes = JSON.parse(responseJson.data);

          /**
           * set data into state
           */
          this.setState({
            checkoutUrl: dataRes.checkoutUrl,
            tokenCode: dataRes.token,
            isShowWebPayment: true,
            paymentStatus: statuss.CREATED
          }, () => {
            /**
             * call api update order => status == created
             */
            this.callApiUpdateOrder(statuss.CREATED);
          });
        } else {
          toasts.warning(responseJson.message);
        }
      });
  }

  callApiUpdateOrder = (type) => {
    const { orderId, tokenCode, totalAmount } = this.state;
    const { restaurant } = this.props.restaurant;
    let status = null;

    switch (type) {
      case statuss.CREATED: {
        status = 0;
        break;
      }
      case statuss.COMPLETED: {
        status = 1;
        break;
      }
      case statuss.REJECTED: {
        status = 2;
        break;
      }
      default: {
        status = 0;
        break;
      }
    }

    const initData = {
      order_id: orderId,
      restaurant_id: restaurant.id,
      payment_mode: 'nganluong',
      transaction_id: tokenCode,
      amount: totalAmount,
      status
    };

    this.restaurantService.savePaymentInfo(initData)
      .then((responseJson) => {
        if (!responseJson.success) {
          toasts.danger(responseJson.message.toString());
        }
      })
      .catch(() => { });
  }

  activityIndicatorLoadingView = () => (
    <ActivityIndicator
      size="large"
      style={styles.activityIndicator}
    />
  )

  onCancelPayment = () => {
    Alert.alert(
      'Alert!',
      'You want to cancel online payment ?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            this.setState({ paymentStatus: statuss.REJECTED });
          }
        },
      ],
      { cancelable: false },
    );
  }

  isShowBtnPayment = () => {
    const { isShowWebPayment, paymentStatus } = this.state;

    if (!isShowWebPayment
      && paymentStatus === '') {
      return true;
    }
    return false;
  }

  isShowWebPayment = () => {
    const { isShowWebPayment, paymentStatus } = this.state;
    if (isShowWebPayment
      && paymentStatus === statuss.CREATED) {
      return true;
    }
    return false;
  }

  isShowNotify = () => {
    const { paymentStatus } = this.state;
    if (paymentStatus === statuss.COMPLETED
      || paymentStatus === statuss.REJECTED) {
      return true;
    }
    return false;
  }

  render() {
    const { checkoutUrl, totalAmount, paymentStatus } = this.state;
    const { navigate, goBack } = this.props.navigation;
    return (
      <Container>

        <Header>
          <Left>
            {
              this.isShowBtnPayment()
              && (
                <Button transparent onPress={() => { goBack(); }}>
                  <Icon name="arrow-back" />
                </Button>
              )
            }
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{I18n.t('header.online_payment')}</Title>
          </Body>
          <Right />
        </Header>

        {
          this.isShowBtnPayment()
          && (
            <View style={styles.container}>
              <View style={styles.logoView}>
                <Image
                  source={images.NGANLUONG_LOGO}
                  style={styles.logo}
                />
              </View>
              <View style={styles.btnView}>
                <Text style={styles.orderTotalText}>
                  {I18n.t('online_payment.order_total', { resource: I18n.t('common.currency', { resource: totalAmount }) })}
                </Text>
                <View style={styles.btnViewV2}>
                  <Button full warning onPress={() => { this.onEncryptData(); }} style={styles.btn}>
                    <Text style={styles.btnText}>{I18n.t('online_payment.btn_payment')}</Text>
                  </Button>
                  <Button full dark onPress={() => { this.onCancelPayment(); }} style={styles.btn}>
                    <Text style={styles.btnText}>{I18n.t('online_payment.btn_cancel')}</Text>
                  </Button>
                </View>
              </View>
            </View>
          )
        }

        {
          this.isShowWebPayment()
          && (
            <View style={styles.containerWeb}>
              <WebView
                source={{ uri: checkoutUrl }}
                onNavigationStateChange={this.onNavigationStateChange}
                javaScriptEnabled
                domStorageEnabled
                // injectedJavaScript={cookie}
                renderLoading={this.activityIndicatorLoadingView}
                startInLoadingState
              />
            </View>
          )
        }

        {
          this.isShowNotify()
          && (
            <View style={styles.container}>
              <View style={styles.logoView}>
                <Image
                  source={paymentStatus === statuss.COMPLETED ? images.ICON_CHECK : images.ICON_FAILED}
                  style={styles.icon}
                />
                <Text style={paymentStatus === statuss.COMPLETED ? styles.paySuccessText : styles.payNotSuccessText}>
                  {paymentStatus === statuss.COMPLETED ? I18n.t('online_payment.status.completed') : I18n.t('online_payment.status.not_completed')}
                </Text>
              </View>
              <View style={styles.btnView}>
                <View style={styles.btnViewV2}>
                  <Button full danger onPress={() => { navigate('Home'); }} style={styles.btn}>
                    <Text style={styles.btnText}>{I18n.t('online_payment.btn_continue')}</Text>
                  </Button>
                </View>
              </View>
            </View>
          )
        }

      </Container>
    );
  }
}

export default NganLuongScreen;
