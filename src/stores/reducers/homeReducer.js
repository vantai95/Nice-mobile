import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  location: {
    city: null,
    cityName: '',

    district: null,
    districtName: '',

    ward: null,
    wardName: '',

    wards: []
  },
  locations: [],
  filterParam: null
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.HOME_SET_LOCATION: {
      /** find city */
      let city = null;
      city = state.locations.find(item => item.id === action.data.city);

      /** find district */
      let district = null;
      if (city) {
        district = city.districts.find(item => item.id === action.data.district);
      }

      /** find ward */
      let ward = null;
      if (district) {
        ward = district.wards.find(item => item.id === action.data.ward);
      }

      return Object.assign({}, state, {
        location: {
          city: action.data.city,
          cityName: city ? city.name : 'No name..',

          district: action.data.district,
          districtName: district ? district.name : 'No name..',

          ward: action.data.ward,
          wardName: ward ? ward.name : 'No name..',

          wards: district.wards
        }
      });
    }
    case ActionTypes.HOME_SET_LOCATIONS: {
      return Object.assign({}, state, {
        locations: action.data.locations
      });
    }
    case ActionTypes.HOME_SET_FILTER_PARAM: {
      return Object.assign({}, state, {
        filterParam: action.data.filterParam
      });
    }
    default: {
      return state;
    }
  }
};

export default home;
