import * as Actions from '../stores/actions';

const start = (store) => {
  store.dispatch(Actions.startLoading());
};

const stop = (store) => {
  store.dispatch(Actions.stopLoading());
};

export default {
  start,
  stop
};
