import { AsyncStorage } from 'react-native';

const getData = async () => {
  const result = await AsyncStorage.getItem('data');
  return result != null && result !== '' ? result : null;
};

const setData = async (data) => {
  await AsyncStorage.setItem('data', data, () => { });
};

const removeData = () => {
  getData()
    .then((response) => {
      if (response) {
        const data = JSON.parse(response);
        const dataSet = {
          language: data.language && data.language !== '' ? data.language : 'en',
          token: ''
        };
        setData(JSON.stringify(dataSet));
      }
    })
    .catch(() => { });
};

export default {
  getData,
  setData,
  removeData
};
