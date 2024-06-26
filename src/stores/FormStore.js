import { isDataExist } from 'utils/dataTools';
import * as services from '../services/form';
import { observable, action, makeObservable, toJS } from 'mobx';
import { message, Modal } from 'antd';
import { getLinkCondition, restore } from 'layouts/FormEdit/changeTool';
import {putUrlRequest} from "../services/flow";
import linkquery_condition from "../layouts/FormEdit/self_item/linkquery_condition";
import {putRequest} from "../services/form";

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
    @observable formEditSchema = {
        "type": "object",
        "properties": {},
        "labelWidth": 120,
        "displayType": "row"
    }//编辑表单时使用的schema接受表单onSchemaChange
    @observable formEditSchemaExtend = {}//编辑表单时使用，用于影响表单
    @observable tabLastChoose = 0 //上一次Tab标签的表单

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
    @observable canvasLoading=false
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
        console.log('handleBlur',schema,id)
        console.log(toJS(this.linkFieldObj),toJS(this.linkqueryDataObj),toJS(this.linkqueryFieldObj))
        if (this.linkFieldObj.hasOwnProperty(id)) {
            this.linkFieldObj[id].map((item) => {
                arr.push({ ...this.linkDataObj[item], 'nowValue': this.formData })
            })
        }

        //如果是联动查询的字段，需要发送请求
        if (this.linkqueryDataObj.hasOwnProperty(id)) {
            this.linkqueryDataObj[id].map(item => {
                arrLink.push({ ...this.linkqueryFieldObj[item], 'nowValue': this.formData })
            })
        }
        //如果是联动查询的字段，没有设置数据源，需要发送请求
        let linkqueryFieldObj=toJS(this.linkqueryFieldObj)
        if(JSON.stringify(linkqueryFieldObj)!=='{}'){
            for (const linkqueryFieldObjKey in linkqueryFieldObj) {
                console.log(linkqueryFieldObjKey)
                let linkqueryFieldObjValue=linkqueryFieldObj[linkqueryFieldObjKey]
                if(linkqueryFieldObjValue.conditions.length===0){
                    arrLink.push({ ...linkqueryFieldObjValue, 'nowValue': this.formData })
                }
            }
        }
        let res1 = {}
        let res2 = {}
        if (arr.length > 0) {
            res1 = await this.getData(arr)
        }
        if (arrLink.length > 0 ) {
            res2 = await this.getSearchData(arrLink)
        }
        console.log('handlerRes',res1, res2)

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
            console.log('getFormField', res)
            if (isDataExist(res)) {
                this.setValue('formField', res.data.data);
                let obj = getLinkCondition(res.data.data)
                this.setValue('schema', restore(res.data.data, 'submit'));
                console.log('requestSchema',restore(res.data.data, 'submit'))
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
        this.setValue('linkData', [])
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
        console.log("数据联动",toJS(params[0].nowValue))
        console.log("数据联动",toJS(params[0].conditions))
        console.log("数据联动",toJS(params[0]))
        try {
            let res = await services.putRequest(services.requestList.getData, params);

            if (isDataExist(res)) {
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

            console.log('参数',params)
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

    /**
     * 快速排序
     * */
    @action.bound quickSort=(a,b)=>{

    }

    /**
     * 更改表单结果，第一个参数为转变之后的参数，第二个参数为之前的参数
     *
     * @param {Number } TabKey 当前要切换的表单的key值
     * @param {Number | undefined} lastChoose 上一个表单的key值
     * @param {Boolean} isDelete 是否删除该表单
     */
    @action.bound changeFormEditSchema(TabKey, lastChoose, isDelete = false,isBegin=false) {
        let isTab = false//用于判断之前是否在Tab之内
        let items = {}
        let formEdit = Object.assign({}, toJS(this.formEditSchema))
        let formEditSchema = formEdit.properties
        console.log('schema', formEdit)
        for (let key in formEditSchema) {
            console.log(key)
            if (isTab) {
                items[key] = Object.assign({}, formEditSchema[key])
                delete formEditSchema[key]
            }
            if (key === 'Tabs') isTab = true
        }
        let schemaList = toJS(this.schemaList)
        console.log('changeFormEdit', schemaList)
        let subFormItem = schemaList.find((item) => item.key === TabKey)
        let lastsubFormItem = schemaList.find((item) => item.key === lastChoose)
        if (isDelete) {
            schemaList.splice(schemaList.findIndex((item) => item.key === lastChoose), 1)
        } else {
            if(!isBegin){
                lastsubFormItem.fields = items
            }

        }
        formEdit.properties = { ...formEditSchema, ...subFormItem.fields }
        this.setValue('schemaList', schemaList)
        this.setValue('formEditSchema', formEdit)
        this.setValue('formEditSchemaExtend', formEdit)
    }

    @action.bound deleteAllTab(){
        let formEdit= Object.assign({},toJS(this.formEditSchema))
        let formEditSchema=formEdit.properties
        let isTab=false
        for (let key in formEditSchema) {
            console.log(key)
            if(isTab){
                delete formEditSchema[key]
            }
            if(key==='Tabs') isTab=true
        }
        delete formEditSchema.Tabs
        this.setValue('formEditSchema',formEdit)
        this.setValue('formEditSchemaExtend',formEdit)
        this.setValue('checked', !this.checked)
    }

    @action.bound copyForm(){
        this.setValue('formEditSchemaExtend',this.formEditSchema)
    }
    /**
     * 用户注册初始化表单
     *
     * */
    @action.bound async initMenu(params){
        try{
            return await services.putUrlRequest(services.requestList.initMenu,params)
        }catch (error){
            console.log(error)
        }
    }
    /**
     * 用户初始化表单内容
     *
     * */
    @action.bound async initTemplate(params){
        try {
            return await services.putUrlRequest(services.requestList.initTemplate,params)
        }catch (error){
            console.log(error)
        }
    }

    /**
     * 快速查询数据
     */
    @action.bound async fastQuery(params) {
        try {
            return await services.putRequest(services.requestList.initTemplate,params)
        }catch (error){
            console.log(error)
        }
    }


}

let FormStore = new Form();
export default FormStore;
