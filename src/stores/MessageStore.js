/*
 * @Author: your name
 * @Date: 2022-03-31 23:08:16
 * @LastEditTime: 2022-05-06 04:42:19
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\stores\SpareStore
 */
import { observable, action, toJS } from 'mobx';
import { isDataExist } from '../utils/dataTools';
import * as services from '../services/message';

class Message {
    @observable data = []
    @observable modalVisible = false
    @observable todoCount = 0
    @observable createCount = 0
    @observable handleCount = 0
    @observable copyCount = 0
    @observable todoList = []
    @observable createList = []
    @observable handleList = []
    @observable copyList = []
    @observable itemInfo = {}
    @observable itemLog = {}
    @observable itemField = []
    @observable field = []
    @observable lookData = []
    @observable isLoading = false
    @observable subFlag = false;


    @action.bound setItemInfo(obj) {
        this['itemInfo'] = obj
    }

    @action.bound changeSubFlag(value) {
        this['subFlag'] = value;
    }
    @action.bound setData(count) {
        switch (count) {
            case 'todo':
                this.data = this.todoList
                break;
            case 'create':
                this.data = this.createList
                break;
            case 'handle':
                this.data = this.handleList
                break;
            case 'copy':
                this.data = this.copyList
                break;
            default:
                break;
        }
    }

    @action changeModal() {
        this.modalVisible = !this.modalVisible;
    }

    @action.bound addList(value, list) {
        // console.log(this[value]);
        if (list.nodeId == 0) {
            this['createList'].push(list)
            this['createCount'] = this['createList'].length
            return
        } else {
            this[value].push(list);
        }
        switch (value) {
            case 'todoList':
                this['todoCount'] = this['todoList'].length
                break;
            case 'createList':
                this['createCount'] = this['createList'].length
                break;
            case 'handleList':
                this['handleCount'] = this['handleList'].length
                break;
            case 'copyList':
                this['copyCount'] = this['copyList'].length
                break;
            default:
                break;
        }
    }

    @action.bound delList(value, flowLogId) {
        console.log(flowLogId);
        let newArr = []
        this[value].map((item) => {
            if (item.flowLogId != flowLogId) {
                newArr.push(item)
            }
        })
        this[value] = newArr;
        switch (value) {
            case 'todoList':
                this['todoCount'] = this['todoList'].length
                break;
            case 'createList':
                this['createCount'] = this['createList'].length
                break;
            case 'handleList':
                this['handleCount'] = this['handleList'].length
                break;
            case 'copyList':
                this['copyCount'] = this['copyList'].length
                break;
            default:
                break;
        }
    }

    @action.bound changeList(value, flowLogId,state) {
        let newArr = []
        this[value].map((item) => {
            if (item.flowLogId != flowLogId) {
                newArr.push(item)
            }else{
                item.state = state
                newArr.push(item);
            }
        })
        this[value] = newArr;
        switch (value) {
            case 'todoList':
                this['todoCount'] = this['todoList'].length
                break;
            case 'createList':
                this['createCount'] = this['createList'].length
                break;
            case 'handleList':
                this['handleCount'] = this['handleList'].length
                break;
            case 'copyList':
                this['copyCount'] = this['copyList'].length
                break;
            default:
                break;
        }
    }

    @action.bound clearList() {
        this['todoCount'] = 0;
        this['todoList'] = [];
        this['createCount'] = 0;
        this['createList'] = [];
        this['handleCount'] = 0;
        this['handleList'] = [];
        this['copyCount'] = 0;
        this['copyList'] = [];
    }

    @action.bound async getLog(params) {
        this.isLoading = true;
        try {
            let res = await services.putRequest(services.requestList.getLog, params);
            this.isLoading = false
            if (isDataExist(res)) {
                this.itemLog = res.data.data
                console.log(toJS(this.itemLog.message));
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async getOne(params) {
        this.isLoading = true;
        try {
            let res = await services.putRequest(services.requestList.getOne, params);
            this.isLoading = false
            if (isDataExist(res)) {
                this.itemField = res.data.data
                this.lookData = this.itemField.data
                console.log(this.lookData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async getField(params) {
        this.isLoading = true;
        try {
            let res = await services.getRequest(services.requestList.getField, params);
            this.isLoading = false
            if (isDataExist(res)) {
                this.field = res.data.data
                console.log(toJS(this.field));
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async agreeFlow(params) {
        this.isLoading = true;
        try {
            let param = params.messageDto
            console.log(params);
            let res = await services.putRequest(services.requestList.agreeFlow + params.message, param);
            this.isLoading = false
            if (isDataExist(res)) {
                this.delList('todoList', params.messageDto.flowLogId);
                params.messageDto.state = 1;
                this.addList('handleList', params.messageDto);
                return res;
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async refuseFlow(params) {
        this.isLoading = true;
        try {
            let param = params.messageDto
            let res = await services.putRequest(services.requestList.refuseFlow + params.message, param);
            this.isLoading = false
            if (isDataExist(res)) {
                this.delList('todoList', params.messageDto.flowLogId);
                params.messageDto.state = 2;
                this.addList('handleList', params.messageDto);
                return res;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

let MessageStore = new Message();
export default MessageStore;