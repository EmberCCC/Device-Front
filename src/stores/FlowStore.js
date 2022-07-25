/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-25 14:57:26
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-25 19:37:17
 * @FilePath: \bl-device-manage-test\src\stores\FlowStore.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import * as services from '../services/flow';
import { action, makeObservable, observable } from "mobx"
import { isDataExist } from 'utils/dataTools';
import { message } from 'antd';

class Flow {
    constructor() {
        makeObservable(this)
    }
    @observable loading = true;
    @observable flowProperty = {
        'nodes':[],
        'edges':[],
        "flowProperty":{
        "wx":false,
        "mail":false,
         "withdraw":false,
        "cuiBan":false,
        "see":false,
        "rule":0,
    }}
    @observable type = 1
    @action.bound setValue(key, value) {
        this[key] = value
    }
    @action.bound async getOneFlow(params) {
        try {
            let res = await services.getRequest(services.requestList.getOneFlow, params)
            if (isDataExist(res)) {
                console.log(res.data.data);
                this.setValue('flowProperty', res.data.data)
                return res.data.data
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getShowFlow(params) {
        try {
            let res = await services.getRequest(services.requestList.showOneFlow, params)
            if (isDataExist(res)) {
                console.log(JSON.parse(res.data.data));
                this.setValue('flowProperty', JSON.parse(res.data.data))
                return res.data.data
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async createFlow(params) {
        try {
            let res = await services.putRequest(services.requestList.createFlow, params)
            if (isDataExist(res)) {
                message.success('创建成功')
            }
        } catch (error) {
            console.log(error);
        }
    }

}


let FlowStore = new Flow()
export default FlowStore