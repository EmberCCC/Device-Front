/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-05 09:38:03
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-09-22 22:11:35
 * @FilePath: \bl-device-manage-test\src\stores\FormStore.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { isDataExist } from 'utils/dataTools';
import * as services from '../services/form';
import { observable, action, makeObservable, toJS } from 'mobx';
import { message, Modal } from 'antd';
import { getLinkCondition, restore } from 'layouts/FormEdit/changeTool';

class Form {
    constructor() {
        makeObservable(this)
    }
    @observable schema = {
        "type": "object",
        "properties": {},
        "labelWidth": 120,
        "displayType": "row"
    };
    @observable loading = false
    @observable formField = {};//表单字段
    @observable formCopyVis = false;
    @observable rootSchema = {}
    @observable subFormList = [];
    @observable subFormName = [];
    @observable schemaList = [];
    @observable checked = false;
    @observable initSchema = {};
    @observable formAuthInfo = []

    @observable formAuthManage = []

    @observable selectFormId = 1;
    @observable testObj = {}

    @observable arr1 = {
        'department': [],
        'role': [],
        'user': []
    }
    @observable arr2 = {
        'department': [],
        'role': [],
        'user': []
    }
    @observable arr3 = {
        'department': [],
        'role': [],
        'user': []
    }
    @observable arr4 = {
        'department': [],
        'role': [],
        'user': []
    }

    @observable formStru = []

    @observable linkData = []

    @observable fieldName = {}

    @observable linkDataObj = {}//当前表单中有绑定数据联动功能的表单
    @observable linkFieldObj = {}//
    @observable linkqueryFieldObj = {}
    @observable linkqueryDataObj = {}
    @observable formData = {}

    @observable fieldNameObj = {}
    @observable flag = false
    /**
     * 取消焦点事件，发送请求
     * @param {*} schema 
     */
    @action.bound async handleBlur(schema) {
        let id = schema.hasOwnProperty('fieldId') ? schema.fieldId : schema.$id.substr(2)
        let arr = []
        let arrLink = []
        if (this.linkFieldObj.hasOwnProperty(id)) {
            this.linkFieldObj[id].map((item) => {
                arr.push({ ...this.linkDataObj[item], 'nowValue': this.formData })
            })
        }
        if (this.linkqueryDataObj.hasOwnProperty(id)) {
            this.linkqueryDataObj[id].map(item => {
                arrLink.push({ ...this.linkqueryFieldObj[item], 'nowValue': this.formData })
            })
        }
        let res1 = {}
        let res2 = {}
        if (arr.length > 0) {
            res1 = await this.getData(arr)
        }
        if (arrLink.length > 0) {
            res2 = await this.getSearchData(arrLink)
        }
        this.setValue('formData', { ...this.formData, ...res1, ...res2 })
        this.setValue('flag', !this.flag)
    }

    @action.bound setValue(key, value) {
        this[key] = value;
    }
    /**
     * 获取流程信息
     * @param {*} params 
     */
    @action.bound async getFormAuthInfo(params) {
        this.setValue('loading', true);
        try {
            let res = await services.getRequest(services.requestList.getAuthInfo, params);
            if (isDataExist(res)) {
                this.setValue('formAuthInfo', res.data.data);
                console.log(res.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.setValue('loading', false)
        }
    }
    /**
     * 获取表单字段
     * @param {*} params 
     * @param {*} type 
     */
    @action.bound async getFormField(params, type) {
        this.setValue('loading', true);
        this.setValue('formField', {});
        this.setValue('schema', {});
        try {
            let res = await services.getRequest(services.requestList.getFieldInfo, params);
            if (isDataExist(res)) {
                this.setValue('formField', res.data.data);
                let obj = getLinkCondition(res.data.data)
                this.setValue('schema', restore(res.data.data, 'submit'));
                this.setValue('linkDataObj', obj['LObj']);
                this.setValue('linkFieldObj', obj['Fobj']);
                this.setValue('linkqueryFieldObj', obj['DObj']);
                this.setValue('linkqueryDataObj', obj['DDObj']);
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.setValue('loading', false);
        }
    }

    @action.bound async saveForm(params) {
        try {
            let res = await services.putRequest(services.requestList.saveForm, params);
            if (isDataExist(res)) {
                return res.data
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async changeData(params) {
        try {
            let res = await services.putRequest(services.requestList.changeData, params);
            if (isDataExist(res)) {
                message.success('修改成功');
            }
        } catch (error) {
            message.error('修改失败')
            console.log(error);
        }
    }

    @action.bound async changeDataCheck(params, result) {
        try {
            let res = await services.putRequest(services.requestList.changeDataCheck, params);
            if (isDataExist(res)) {
                message.success('修改成功');
                if (result) {
                    result(true);
                }
                return res
            }
        } catch (error) {
            message.error('修改失败')
            console.log(error);
        }
    }
    @action.bound async submitData(params) {
        try {
            let res = await services.putRequest(services.requestList.submitData, params);
            if (isDataExist(res)) {
                Modal.success({
                    content: '数据添加成功'
                })
            } else {
                Modal.error({
                    content: res.data.msg
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async submitDataCheck(params) {
        try {
            let res = await services.putRequest(services.requestList.submitDataCheck, params);
            if (isDataExist(res)) {
                Modal.success({
                    content: '数据添加成功'
                })
                return res
            } else {
                Modal.error({
                    content: res.data.msg
                })
                return res
            }
        } catch (error) {

        }
    }

    @action.bound async getFormAuth(params) {
        try {
            let res = await services.getRequest(services.requestList.getAuthForm, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                this.setValue('formAuthManage', res.data.data)
                res.data.data.map((item, index) => {
                    let operation = item['operation']
                    let arr = {
                        'department': [],
                        'role': [],
                        'user': []
                    }
                    Object.keys(item['department']).map((one) => {
                        arr['department'].push(one)
                    })
                    Object.keys(item['role']).map((one) => {
                        arr['role'].push(one)
                    })
                    Object.keys(item['user']).map((one) => {
                        arr['user'].push(one)
                    })
                    operation == 1 ? this.setValue('arr1', arr) : operation == 2 ? this.setValue('arr2', arr) : operation == 3 ? this.setValue('arr3', arr) : this.setValue('arr4', arr)
                })

            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async updateFormInfo(params, type) {
        try {
            let res
            if (type == 1) {
                res = await services.putRequest(services.requestList.updateSubmit, params);
            } else if (type == 2) {
                res = await services.putRequest(services.requestList.updateSubmitSelf, params);
            } else if (type == 3) {
                res = await services.putRequest(services.requestList.updateManage, params);
            } else if (type == 4) {
                res = await services.putRequest(services.requestList.updateWatch, params);
            }
            if (isDataExist(res)) {
                message.success('更新成功')
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async getFormSimple(params) {
        try {
            let res = await services.getRequest(services.requestList.getSimpleStru, params);
            if (isDataExist(res)) {
                this.setValue('formStru', res.data.data)
                let obj = {}
                res.data.data.map(item => {
                    item['fieldSimpleVos'].map(one => {
                        obj[one['fieldId']] = one['fieldName']
                    })
                })
                this.setValue('fieldNameObj', obj)
            }
        } catch (error) {

        }
    }

    @action.bound async getLinkData(params) {
        this.setValue('linkData',[])
        try {
            let res = await services.putRequest(services.requestList.getLinkData, params);
            if (isDataExist(res)) {
                this.setValue('linkData', res.data.data)
                let obj = {}
                res.data.data.map((item) => {
                    item['fieldSimpleVos'].map((one) => {
                        obj[one['fieldId']] = one['fieldName']
                    })
                })
                this.setValue('fieldName', obj)
            }
        } catch (error) {

        }
    }

    @action.bound async changeMenuName(params) {
        try {
            let res = await services.putUrlRequest(services.requestList.changeMenuName, params);
            if (isDataExist(res)) {
                message.success('修改成功')
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async getData(params) {
        try {
            let res = await services.putRequest(services.requestList.getData, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                let obj = {}
                res.data.data.map(item => obj[item['fieldId']] = item['fieldValue'])
                console.log({ ...this.formData, ...obj });
                return obj;
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getSearchData(params) {
        try {
            let res = await services.putRequest(services.requestList.getSearchData, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                let obj = {}
                res.data.data.map(item => {
                    let iObj = []
                    item['values'].map((one, index) => {
                        iObj.push(one['id'])
                    })
                    obj[item['fieldId']] = iObj
                })
                console.log(obj);
                return obj;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

let FormStore = new Form();
export default FormStore;