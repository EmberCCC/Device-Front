import { observable, action } from 'mobx';
import { isDataExist } from '../utils/dataTools';
import * as services from '../services/design';

class Design {
    @observable DesignId = '1'
    @observable PersonList = []

    @action changeDesignId(value) {
        this.DesignId = value
    }

    //添加一条新的数据
    @action.bound async addFlow(params) {
        this.isLoading = true;
        try {
            let res = await services.putRequest(services.requestList.addFlow, params);
            this.isLoading = false
            if (isDataExist(res)) {
                return res;
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async queryPerson(params){
        this.isLoading = true;
        try {
            let res = await services.putRequest(services.requestList.queryPerson, params);
            this.isLoading = false
            if (isDataExist(res)) {
                this.PersonList = res.data.data
            }
        } catch (error) {
            console.log(error);
        }
    }

}

let DesignStore = new Design();
export default DesignStore;