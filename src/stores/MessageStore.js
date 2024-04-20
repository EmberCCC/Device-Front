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