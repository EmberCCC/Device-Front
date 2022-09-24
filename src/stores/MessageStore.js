/*
 * @Author: your name
 * @Date: 2022-03-31 23:08:16
 * @LastEditTime: 2022-09-25 01:03:01
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\stores\SpareStore
 */
import { observable, action, toJS, makeObservable } from 'mobx';
import { isDataExist } from '../utils/dataTools';
import * as services from '../services/message';

class Message {
    constructor(){
        makeObservable(this)
    }
    @observable waitList = []
    @observable launchList = []
    @observable handleList = []
    @observable copyList = []
    @observable list = [];

    @observable fieldInfo = []
    @observable formData = {}
    @observable formInfo = {}
    @observable info = {};
    @observable nameObj = {};

    @observable oneDataInfo = {}

    @observable detailVis = false;

    @observable model = 'wait'

    @observable loading = false

    @action.bound setValue(key,value){
        this[key] = value
    }

    @action.bound async getWaitList(params){
        try {
            let res = await services.getRequest(services.requestList.getWaitList,params);
            if(isDataExist(res)){
                this.setValue('waitList',res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getLaunchList(params){
        try {
            let res = await services.getRequest(services.requestList.getLaunchList,params);
            if(isDataExist(res)){
                this.setValue('launchList',res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getHandleList(params){
        try {
            let res = await services.getRequest(services.requestList.getHandleList,params);
            if(isDataExist(res)){
                this.setValue('handleList',res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getCopyList(params){
        try {
            let res = await services.getRequest(services.requestList.getCopyList,params);
            if(isDataExist(res)){
                this.setValue('copyList',res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

let MessageStore = new Message();
export default MessageStore;