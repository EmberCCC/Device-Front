/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-05 09:38:03
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-10 20:39:43
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
    @observable formField = {};
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

    @observable linkDataObj = {}
    @observable linkFieldObj = {}
    @observable formData = {}
    @observable flag = false

    @action.bound async handleBlur(schema) {
        let id = schema.hasOwnProperty('fieldId') ? schema.fieldId : schema.$id.substr(2)
        if (this.linkFieldObj.hasOwnProperty(id)) {
            let arr = []
            this.linkFieldObj[id].map((item) => {
                arr.push({ ...this.linkDataObj[item], 'nowValue': this.formData })
            })
            this.getData(arr)
        }
    }

    @action.bound setValue(key, value) {
        this[key] = value;
    }

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

    @action.bound async getFormField(params) {
        this.setValue('loading', true);
        this.setValue('formField', {});
        this.setValue('schema', {});
        try {
            let res = await services.getRequest(services.requestList.getFieldInfo, params);
            if (isDataExist(res)) {
                this.setValue('formField', res.data.data);
                getLinkCondition(res.data.data)
                this.setValue('schema', restore(res.data.data, 'submit'));
                this.setValue('linkDataObj', getLinkCondition(res.data.data)['LObj']);
                this.setValue('linkFieldObj', getLinkCondition(res.data.data)['Fobj']);
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
            }
        } catch (error) {

        }
    }

    @action.bound async getLinkData(params) {
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
                this.setValue('formData', { ...this.formData, ...obj })
                this.setValue('flag', !this.flag)
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
                    let iObj = {}
                    item['values'].map(one => {
                        iObj[one['fieldId']] = one['fieldValue']
                    })
                    obj[item['fieldId']] = iObj
                })
                this.setValue('formData', { ...this.formData, ...obj })
                this.setValue('flag', !this.flag)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

let FormStore = new Form();
export default FormStore;