/*
 * @Author: your name
 * @Date: 2022-03-31 23:08:16
 * @LastEditTime: 2022-05-06 11:10:08
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\stores\SpareStore
 */
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