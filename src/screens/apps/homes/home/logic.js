import _ from 'lodash';

export default class HomeLogic {
  constructor() {
    this.listCuisinesSelected = [0];
    this.listCategoriesSelected = [0];
    this.listStatusSelected = [];
    this.listServiceSelected = [];
    this.listPaymentSelected = [];
    this.sortValue = 0;
  }

  resultFilter = () => ({
    listCuisinesSelected: this.listCuisinesSelected,
    listCategoriesSelected: this.listCategoriesSelected,
    listStatusSelected: this.listStatusSelected,
    listServiceSelected: this.listServiceSelected,
    listPaymentSelected: this.listPaymentSelected,
    sortValue: this.sortValue
  })

  resetFilter = () => {
    this.listCuisinesSelected = [0];
    this.listCategoriesSelected = [0];
    // this.setupChecked();
  }

  setupChecked = (dataSource) => {
    const listStatusSelected = [];
    const listServiceSelected = [];
    const listPaymentSelected = [];

    dataSource.status.forEach((item) => {
      listStatusSelected.push(item.id);
    });

    dataSource.payment_methods.forEach((item) => {
      listPaymentSelected.push(item.id);
    });

    dataSource.services.forEach((item) => {
      listServiceSelected.push(item.id);
    });

    this.listStatusSelected = listStatusSelected;
    this.listServiceSelected = listServiceSelected;
    this.listPaymentSelected = listPaymentSelected;
  }

  isRadioBtnCheck = value => value === this.sortValue

  setRadioBtnCheck = (value) => {
    this.sortValue = value;
  }

  isChecked = (type, data) => {
    switch (type) {
      case 'CUISINE': {
        const isExist = _.find(this.listCuisinesSelected, o => o === data);
        return isExist !== undefined;
      }
      case 'CATEGORY': {
        const isExist = _.find(this.listCategoriesSelected, o => o === data);
        return isExist !== undefined;
      }
      case 'STATUS': {
        const isExist = _.find(this.listStatusSelected, o => o === data);
        return isExist !== undefined;
      }
      case 'SERVICE': {
        const isExist = _.find(this.listServiceSelected, o => o === data);
        return isExist !== undefined;
      }
      case 'PAYMENT': {
        const isExist = _.find(this.listPaymentSelected, o => o === data);
        return isExist !== undefined;
      }
      default: {
        return false;
      }
    }
  };

  setChecked = (type, data) => {
    switch (type) {
      case 'CUISINE': {
        const datas = this.listCuisinesSelected;

        if (data === 0) {
          this.listCuisinesSelected = [0];
        } else {
          // find exist
          const isExist = _.find(datas, o => o === data);

          // if exist -> remove, else push
          if (isExist !== undefined) {
            if (datas.length > 1) {
              _.remove(datas, n => n === data);
            }
          } else {
            datas.push(data);
          }

          _.remove(datas, n => n === 0);

          this.listCuisinesSelected = datas;
        }
        break;
      }
      case 'CATEGORY': {
        const datas = this.listCategoriesSelected;

        if (data === 0) {
          this.listCategoriesSelected = [0];
        } else {
          // find exist
          const isExist = _.find(datas, o => o === data);

          // if exist -> remove, else push
          if (isExist !== undefined) {
            if (datas.length > 1) {
              _.remove(datas, n => n === data);
            }
          } else {
            datas.push(data);
          }

          _.remove(datas, n => n === 0);

          this.listCategoriesSelected = datas;
        }
        break;
      }
      case 'STATUS': {
        const datas = this.listStatusSelected;

        // find exist
        const isExist = _.find(datas, o => o === data);

        // if exist -> remove, else push
        if (isExist !== undefined) {
          if (datas.length > 1) {
            _.remove(datas, n => n === data);
          }
        } else {
          datas.push(data);
        }

        this.listStatusSelected = datas;
        break;
      }
      case 'SERVICE': {
        const datas = this.listServiceSelected;

        // find exist
        const isExist = _.find(datas, o => o === data);

        // if exist -> remove, else push
        if (isExist !== undefined) {
          if (datas.length > 1) {
            _.remove(datas, n => n === data);
          }
        } else {
          datas.push(data);
        }

        this.listServicesSelected = datas;
        break;
      }
      case 'PAYMENT': {
        const datas = this.listPaymentSelected;

        // find exist
        const isExist = _.find(datas, o => o === data);

        // if exist -> remove, else push
        if (isExist !== undefined) {
          if (datas.length > 1) {
            _.remove(datas, n => n === data);
          }
        } else {
          datas.push(data);
        }

        this.listPaymentSelected = datas;
        break;
      }
      default: {
        break;
      }
    }
  }
}
