const isEmail = (str) => {
  // eslint-disable-next-line no-useless-escape
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(str);
};

// 2019/03/19 -> 19/03/2019
const reformatDateString = (s) => {
  const res = s.substring(0, 10);
  const b = res.split(/\D/);
  return b.reverse().join('-');
};

// 1234 -> 1,230
const currencyVnd = (s) => {
  if (!s) { return 0; }

  let sTemp = s;
  sTemp = sTemp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  sTemp = sTemp.split('.');

  let sTempString = sTemp[0];
  sTempString = sTempString.substring(0, sTempString.length - 1);
  sTempString += sTempString.length === 0 ? '0' : '0';
  // s = s + "00";
  return sTempString;
};

// 1234 -> 1,234
const currencyVndV2 = (s) => {
  let sTemp = s;
  if (!sTemp) { return 0; }

  const n = parseFloat(sTemp);
  sTemp = Math.round(n);
  sTemp = sTemp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  sTemp = sTemp.split('.');

  const sTempString = sTemp[0];
  // s = s + "00";
  return sTempString;
};

// [1,2,...,24]
const renderHour = () => {
  const data = [];
  for (let i = 1; i <= 24; i++) {
    data.push({
      value: i,
      label: i < 10 ? `0${i.toString()}` : i.toString()
    });
  }
  return data;
};

// [1,2,...,60]
const renderMinute = () => {
  const data = [];
  for (let i = 1; i <= 60; i++) {
    data.push({
      value: i,
      label: i < 10 ? `0${i.toString()}` : i.toString()
    });
  }
  return data;
};

// count in string. Ex: "112,234" -> 2
const countNumberItem = (s) => {
  if (s !== null && s !== undefined) {
    let tempS = s.replace(/\s/g, '');
    tempS = s.split(',');
    return tempS.length;
  }
  return 0;
};

// have capitalize, number, special, length >= 8
const isPassword = (s) => {
  let flag = false;

  const haveCapitalize = /[A-Z]/g;
  const haveNumber = /[0-9]/g;
  const haveSpecial = /[!@#$%^&*(),.?":{}|<>]/g;

  if (haveCapitalize.test(s) && haveNumber.test(s) && haveSpecial.test(s) && s.length >= 8) {
    flag = true;
  }
  return flag;
};

// is phone number
const isPhone = (s) => {
  let flag = false;
  const isNumber = /[0-9]/g;
  if (s.match(isNumber)) {
    if ((s.match(isNumber)).length === s.length && s.length >= 10) {
      flag = true;
    }
  }
  return flag;
};

// is number
const isNumber = (s) => {
  let flag = false;
  const isNumberReg = /[0-9]/g;
  if (s.match(isNumberReg)) {
    if ((s.match(isNumberReg)).length === s.length) {
      flag = true;
    }
  }
  return flag;
};

// remove tag html
const stripTag = (s) => {
  let sTemp = s;
  sTemp = sTemp.replace(/&nbsp;/gi, '');
  return sTemp.replace(/(<([^>]+)>)/ig, '');
};

export default {
  isEmail,
  reformatDateString,
  currencyVnd,
  renderHour,
  renderMinute,
  countNumberItem,
  isPassword,
  isPhone,
  currencyVndV2,
  isNumber,
  stripTag
};
