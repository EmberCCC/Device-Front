/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-05 09:38:03
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-08 18:09:36
 * @FilePath: \bl-device-manage-test\src\stores\FormStore.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { isDataExist } from 'utils/dataTools';
import * as services from '../services/form';
import { observable, action, makeObservable } from 'mobx';
import { message, Modal } from 'antd';

class Form {
    constructor(){
        makeObservable(this)
    }
    @observable formField = {};
    @observable formCopyVis = false;

    @action.bound setValue(key, value) {
        this[key] = value;
    }
    @action.bound async getFormField(params) {
        try {
            let res = await services.getRequest(services.requestList.getFieldInfo,params);
            if(isDataExist(res)){
                this.setValue('formField',res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async saveForm(params){
        try {
            let res = await services.putRequest(services.requestList.saveForm,params);
            if(isDataExist(res)){
                return res.data
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async changeData(params){
        try {
            let res = await services.putRequest(services.requestList.changeData,params);
            if(isDataExist(res)){
                message.success('修改成功');
            }
        } catch (error) {
            message.error('修改失败')
            console.log(error);
        }
    }

    @action.bound async changeDataCheck(params){
        try {
            let res = await services.putRequest(services.requestList.changeDataCheck,params);
            if(isDataExist(res)){
                message.success('修改成功');
            }
        } catch (error) {
            message.error('修改失败')
            console.log(error);
        }
    }
    @action.bound async submitData(params){
        try {
            let res = await services.putRequest(services.requestList.submitData,params);
            if(isDataExist(res)){
                Modal.success({
                    content:'数据添加成功'
                })
            }else{
                Modal.error({
                    content:res.data.msg
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async submitDataCheck(params){
        try {
            let res = await services.putRequest(services.requestList.submitDataCheck,params);
            if(isDataExist(res)){
                Modal.success({
                    content:'数据添加成功'
                })
            }else{
                Modal.error({
                    content:res.data.msg
                })
            }
        } catch (error) {
            
        }
    }
}

let FormStore = new Form();
export default FormStore;