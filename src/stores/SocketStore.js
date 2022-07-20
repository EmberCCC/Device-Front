/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-19 23:01:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-20 14:45:19
 * @FilePath: \bl-device-manage-test\src\stores\SocketStore.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from 'antd';
import { observable, action, toJS, makeObservable } from 'mobx';
import { isDataExist } from 'utils/dataTools';
import * as services from '../services/socket';


class Socket {

    constructor() {
        makeObservable(this)
    }
    @observable SocketId = '1'
    @observable SelectKey = '全部成员';
    @observable allUsers = [];
    @observable selectRowKeys = [];
    @observable selectRow = [];
    @observable visible = false;
    @observable oneUserInfo = {}
    @observable loading = false;
    @observable departments = [];
    @observable items = [];
    @observable itemName = {};
    @observable itemRoles = []
    @observable rolesName = {};
    @observable roleList = [];
    @observable roles = []


    @action.bound setValue(key, value) {
        this[key] = value;
    }
    @action.bound async getAllUsers(params) {
        this.setValue('loading', true)
        try {
            let res = await services.getRequest(services.requestList.getAllUsers, params);
            this.setValue('loading', false)
            if (isDataExist(res)) {
                console.log(res.data);
                this.setValue('allUsers', res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getOneUser(params) {
        this.setValue('loading', true)
        try {
            let res = await services.getRequest(services.requestList.getOneUser, params);
            this.setValue('loading', false)
            if (isDataExist(res)) {
                console.log(res.data.data);
                this.setValue('oneUserInfo', res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    handleClick = ({ key, domEvent }) => {
        this.getOneDepartment({ 'departmentId': key })
        this.setValue('SelectKey', key);
        this.setValue('selectRow', [])
        this.setValue('selectRowKeys', [])
    }
    getChidren = (arr) => {
        let iArr = []
        arr.map((item) => {
            let iObj = { 'label': item['name'], 'key': item['id'], 'onTitleClick': ({ key, domEvent }) => this.handleClick({ key, domEvent }) }
            if (item.hasOwnProperty('nodes')) {
                iObj['children'] = this.getChidren(item['nodes'], iObj['children'])
            }
            iArr.push(iObj)
        })
        return iArr
    }

    exchange = (obj) => {
        let iObj = { 'label': obj['name'], 'key': obj['id'], 'onTitleClick': ({ key, domEvent }) => this.handleClick({ key, domEvent }) }
        if (obj.hasOwnProperty('nodes')) {
            iObj['children'] = this.getChidren(obj['nodes'], iObj['children'])
        }
        return iObj;
    }
    getNameObj = (nameObj, obj) => {
        nameObj[obj['id']] = obj['name'];
        if (obj.hasOwnProperty('nodes')) {
            obj['nodes'].map((item, index) => {
                this.getNameObj(nameObj, item);
            })
        }
        return nameObj;
    }
    @action.bound async getAllDepartment(params) {
        try {
            let res = await services.getRequest(services.requestList.getAllDepartment, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                this.setValue('departments', res.data.data)
                let iArr = [
                    {
                        "key": "g1",
                        "icon": null,
                        "children": [
                            {
                                "key": "全部成员",
                                "label": "全部成员"
                            },
                            {
                                "key": "离职成员",
                                "label": "离职成员"
                            }
                        ],
                        "label": "成员",
                        "type": "group"
                    }
                ]
                let arr = []
                let nameObj = { '全部成员': '全部成员', "离职成员": '离职成员' }
                console.log(this.getNameObj(nameObj, res.data.data));
                arr.push(this.exchange(res.data.data))
                iArr.push({ 'children': arr, 'type': 'group', 'label': '部门' })
                this.setValue('items', iArr)
                this.setValue('itemName', this.getNameObj(nameObj, res.data.data))
                console.log(iArr);
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getOneDepartment(params) {
        this.setValue('loading', true);
        try {
            let res = await services.getRequest(services.requestList.getOneDepartmentUser, params)
            if (isDataExist(res)) {
                console.log(res.data.data);
                this.setValue('allUsers', res.data.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.setValue('loading', false)
        }
    }
    @action.bound async changeDeName(params) {
        try {
            let res = await services.putRequest(services.requestList.changeDeName, params);
            if (isDataExist(res)) {
                message.success('修改成功');
                return true;
            } else {
                message.error('修改失败')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async addDe(params) {
        try {
            let res = await services.putRequest(services.requestList.addDe, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                message.success(res.data.msg)
                return true
            } else {
                message.error(res.data.msg)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getAllRoles(params) {
        try {
            let res = await services.getRequest(services.requestList.getAllRole, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                let iArr = []
                let nameObj = {}
                res.data.data.map((item, index) => {
                    let iObj = { 'key': -item['groupId'], 'label': item['name'], children: [] }
                    if (item.hasOwnProperty('roles') && JSON.stringify(item['roles']) != '{}') {
                        for (const key in item['roles']) {
                            if (Object.hasOwnProperty.call(item['roles'], key)) {
                                const element = item['roles'][key];
                                nameObj[key] = element
                                iObj['children'].push({ 'key': key, 'label': element })
                            }
                        }
                    }
                    iArr.push(iObj);
                })
                console.log(iArr);
                this.setValue('itemRoles', iArr)
                this.setValue('rolesName', nameObj)
                console.log(nameObj);
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getOneRoleUser(params) {
        try {
            let res = await services.getRequest(services.requestList.getOneRoleUsers, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                this.setValue('roleList', res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async changeRoleName(params) {
        try {
            let res = await services.putRequest(services.requestList.changeRoleName, params);
            if (isDataExist(res)) {
                message.success('修改成功')
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

let SocketStore = new Socket()
export default SocketStore