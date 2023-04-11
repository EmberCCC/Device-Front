/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-05 10:16:45
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-20 01:11:47
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\changeTool.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {nanoid} from "nanoid";
import Tab from "./self_item/Tab";

export function exChange(item, firstFormId, name) {
    console.log('exChangeItem', item);
    let params = {};
    let pro = {};
    let subForms = [];
    params.formId = firstFormId;
    params.formName = sessionStorage.getItem('formName') && sessionStorage.getItem('formName') != '{}' ? JSON.parse(sessionStorage.getItem('formName'))['formName'] : '机房'
    for (const key in item) {
        if (key != 'properties') {
            pro[key] = item[key];
        } else {
            let field = [];
            let obj = {};
            obj['name'] = name;
            for (const keyP in item[key]) {
                let iObj = {};
                iObj['name'] = keyP
                iObj['detailJson'] = item[key][keyP]
                if (iObj['detailJson'].hasOwnProperty('order')) {
                    delete iObj.detailJson.order
                }
                if (iObj['detailJson'].hasOwnProperty('fieldId')) {
                    iObj['fieldId'] = iObj['detailJson']['fieldId'];
                } else {
                    iObj['fieldId'] = keyP
                }
                if (!iObj['detailJson'].hasOwnProperty('typeId')) {
                    iObj['detailJson']['typeId'] = keyP.split('_')[0];
                }
                iObj['typeId'] = iObj['detailJson']['typeId']
                iObj['name'] = iObj['detailJson']['title']
                field.push(iObj);
            }
            obj['fields'] = field
            subForms.push(obj)
        }
    }
    console.log('finalparams', params);
    params['properties'] = pro
    params['subForms'] = subForms
    return params;
}

export function newExChange(item, firstFormId, schemaList = []) {
    let params = {};
    let pro = {};
    let subForms = [];
    let haveTab = []
    params.formId = firstFormId
    params.formName = sessionStorage.getItem('formName') && sessionStorage.getItem('formName') != '{}' ? JSON.parse(sessionStorage.getItem('formName'))['formName'] : '机房'
    for (const key in item) {
        if (key != 'properties') {
            pro[key] = item[key];
        } else {
            let field = [];
            let obj = {};
            obj['name'] = 'root';
            for (const keyP in item[key]) {
                if (keyP == 'Tabs') {
                    break
                }
                let iObj = {};
                iObj['name'] = keyP

                iObj['detailJson'] = item[key][keyP]
                if (iObj['detailJson'].hasOwnProperty('order')) {
                    delete iObj.detailJson.order
                }
                if (iObj['detailJson'].hasOwnProperty('fieldId')) {
                    iObj['fieldId'] = iObj['detailJson']['fieldId'];
                } else {
                    iObj['fieldId'] = keyP
                }
                if (!iObj['detailJson'].hasOwnProperty('typeId')) {
                    iObj['detailJson']['typeId'] = keyP.split('_')[0];
                }
                iObj['typeId'] = iObj['detailJson']['typeId']
                iObj['name'] = iObj['detailJson']['title']
                field.push(iObj);
            }
            obj['fields'] = field
            subForms.push(obj)
            console.log('schemaList', schemaList)
            if (schemaList.length > 0) {
                for (const keys in schemaList) {
                    let field = [];
                    let obj = {};
                    obj['name'] = schemaList[keys]['label'];
                    for (const keyP in schemaList[keys]['fields']) {
                        let iObj = {};
                        iObj['name'] = keyP
                        iObj['detailJson'] = schemaList[keys]['fields'][keyP]
                        if (iObj['detailJson'].hasOwnProperty('order')) {
                            delete iObj.detailJson.order
                        }
                        if (iObj['detailJson'].hasOwnProperty('fieldId')) {
                            iObj['fieldId'] = iObj['detailJson']['fieldId'];
                        } else {
                            iObj['fieldId'] = keyP
                        }
                        if (!iObj['detailJson'].hasOwnProperty('typeId')) {
                            iObj['detailJson']['typeId'] = keyP.split('_')[0];
                        }
                        iObj['typeId'] = iObj['detailJson']['typeId']
                        iObj['name'] = iObj['detailJson']['title']
                        field.push(iObj);
                    }
                    obj['fields'] = field
                    subForms.push(obj)
                }
            }
        }

    }
    console.log('finalparams', params);
    params['properties'] = pro
    params['subForms'] = subForms
    return params;
}


/**
 *
 * @param {*} fields
 * @param {*} fieldIds
 * @param {*} type
 * @param {*} flag
 * @param {*} authInfo
 * @returns
 */
function getOneForm(fields, fieldIds, type, flag, authInfo) {
    let result = {}
    fieldIds.forEach(item => {
        fields.forEach((field, index) => {
            if (field != null) {
                if (field['id'] == item) {
                    const detailJson = JSON.parse(field['detailJson']);
                    const id = field['id']
                    const name = type == 'submit' ? field['id'] : "".concat(detailJson['typeId'], "_").concat(nanoid(19))
                    if (type == 'submit') {
                        if (detailJson.hasOwnProperty('title_vis') && detailJson['title_vis'] == false) {
                            detailJson['title'] = ""
                        }
                        detailJson['order'] = index
                    }
                    if (flag && type == 'submit') {
                        if (authInfo.hasOwnProperty(id)) {
                            if (authInfo[id].indexOf('look') > -1) {
                                if (authInfo[id].indexOf('edit') > -1) {
                                    detailJson['disabled'] = false
                                } else {
                                    detailJson['disabled'] = true;
                                }
                                result[name] = detailJson;
                                result[name]['fieldId'] = field['id'];
                            }
                        }
                    } else {
                        result[name] = detailJson;
                        result[name]['fieldId'] = field['id'];
                    }

                }
            }

        });
    });
    return result
}

/**
 * 将表单结构转换为scheme结构
 * @param {*} obj
 * @param {*} type
 * @returns
 */
export function restore(obj, type) {
    console.log(obj);
    if (JSON.stringify(obj) != "{}") {
        let formArr = {}
        let fieldInfo;
        let properties;
        let authField = {}
        //是否是流程表单
        if (obj.hasOwnProperty('fieldsAuth')) {
            authField = JSON.parse(obj['fieldsAuth'])
        }
        if (obj.hasOwnProperty('form') && obj['form'].hasOwnProperty('formFields')) {
            fieldInfo = JSON.parse(obj['form']['formFields']);
            properties = JSON.parse(obj['form']['properties']);
            const fields = obj['fields'];
            for (let index = 0; index < fieldInfo.length; index++) {
                let formItem = {}
                const element = fieldInfo[index];
                formItem['properties'] = getOneForm(fields, element['fieldsId'], type, obj.hasOwnProperty('fieldsAuth'), authField)
                for (const key in properties) {
                    if (Object.hasOwnProperty.call(properties, key)) {
                        const element = properties[key];
                        formItem[key] = element
                    }
                }
                formArr[fieldInfo[index]['name']] = formItem;
            }
        }
        console.log('formArr', formArr)
        return formArr;
    } else {
        return {}
    }

}


export function formEditRestore(obj, type) {
    if (JSON.stringify(obj) != "{}") {
        let formArr = {}
        let newSchema = {}
        let fieldInfo;
        let properties;
        let authField = {}
        let Tabs = []
        if (obj.hasOwnProperty('form') && obj['form'].hasOwnProperty('formFields')) {
            fieldInfo = JSON.parse(obj['form']['formFields']);
            properties = JSON.parse(obj['form']['properties']);
            const fields = obj['fields'];
            //说明有多表单

            const element = fieldInfo[0];
            let formItem = {}
            formItem['properties'] = getOneForm(fields, element['fieldsId'], type, obj.hasOwnProperty('fieldsAuth'), authField)
            for (const key in properties) {
                if (Object.hasOwnProperty.call(properties, key)) {
                    const element = properties[key];
                    formItem[key] = element
                }
            }
            newSchema = formItem['properties'];
            if (fieldInfo.length > 1) {//如果有多标签
                for (let i = 1; i < fieldInfo.length; i++) {
                    let item = {}
                    item['label'] = fieldInfo[i]['name']
                    item.key = nanoid()
                    let formItem = {}
                    const element = fieldInfo[i];
                    formItem['properties'] = getOneForm(fields, element['fieldsId'], type, obj.hasOwnProperty('fieldsAuth'), authField)
                    for (const key in properties) {
                        if (Object.hasOwnProperty.call(properties, key)) {
                            const element = properties[key];
                            formItem[key] = element
                        }
                    }
                    item.fields = formItem['properties']
                    Tabs.push(item)
                }
            }


        }
        formArr.properties = newSchema
        formArr.Tabs = Tabs
        console.log('rerere', formArr)
        return formArr;
    } else {
        return {}
    }
}


function getOneForm2(fields, fieldIds) {
    let result = {}
    fieldIds.forEach(item => {
        fields.forEach(field => {
            if (field['fieldId'] == item) {
                const name = field['fieldId']
                result[name] = field;
                result[name]['fieldId'] = field['fieldId'];
            }
        });
    });
    return result
}


export function restore2(obj) {
    let formArr = {}
    let fieldInfo;
    let formInfo;
    console.log(obj);
    if (obj.hasOwnProperty('form') && obj.hasOwnProperty('formFields')) {
        fieldInfo = obj['formFields'];
        formInfo = obj['form'];
        for (let index = 0; index < formInfo.length; index++) {
            let formItem = {}
            const element = formInfo[index];
            formItem['properties'] = getOneForm2(fieldInfo, element['fieldsId'])
            let pObj = {"displayType": "column", "labelWidth": 120, "type": "object"}
            for (const key in pObj) {
                if (Object.hasOwnProperty.call(pObj, key)) {
                    const element = pObj[key];
                    formItem[key] = element
                }
            }
            formArr[formInfo[index]['name']] = formItem;
        }
    }
    return formArr;
}

export function getSchema(columnsArr) {
    let schema = {}
    schema['type'] = 'object'
    let properties = {}
    columnsArr.map((item) => {
        if (!['createPerson', 'createTime', 'updateTime'].includes(item['key'])) {
            properties[item['key']] = item['detailJson']
        }
    })
    schema['labelWidth'] = 30
    schema['properties'] = properties;
    console.log(schema);
    return schema
}

export function getAllField(schema) {
    console.log(schema);
    let obj = {}
    schema.map(item => {
        if (item) {
            Object.keys(item).map(one => {
                console.log(item);
                console.log(one);
                if (item[one].hasOwnProperty('fieldId')) {
                    obj[item[one]['fieldId']] = {
                        'fieldId': item[one]['fieldId'],
                        'fieldName': item[one]['title'],
                        'fieldTypeId': item[one]['typeId']
                    }
                } else {
                    obj[one] = {'fieldId': one, 'fieldName': item[one]['title'], 'fieldTypeId': item[one]['typeId']}
                }
            })
        }

    })
    console.log('getAllField',obj);
    return obj
}

export function checkCondition(list) {
    let flag = true
    list.forEach((item) => {
        if (item['fieldId'] == null || item['fieldTypeId'] == null || item['operand'] == null) {
            flag = false
            return;
        }
    })
    console.log(list);
    return flag
}

export function checkSelf(list) {
    let flag = false
    list.forEach((item) => {
        if (item['custom'] == false) {
            flag = true
            return;
        }
    })
    return flag
}

/**
 *
 * @param {*} formInfo
 * @returns
 */
export function getLinkCondition(formInfo) {
    // console.log(formInfo);
    let LObj = {}
    let FObj = {}
    let DObj = {}
    let DDObj = {}
    formInfo.fields.map((item, index) => {
        let detailJson = JSON.parse(item['detailJson'])
        if (detailJson['default_type'] == '2') {
            LObj[item['id']] = detailJson['link_condition']
            detailJson['link_condition']['conditions'].map((one) => {
                if (one['custom'] == false) {
                    if (FObj.hasOwnProperty(one['operand'])) {
                        FObj[one['operand']].push(item['id'])
                    } else {
                        FObj[one['operand']] = []
                        FObj[one['operand']].push(item['id'])
                    }
                }
            })
        }
        if (item['typeId'] == '14' || item['typeId']=='16') {
            let obj = {...detailJson['linkquery_condition']}

            DObj[item['id']] = obj

            detailJson['linkquery_condition']['conditions'].map(one => {
                if (one['custom'] == false) {
                    if (DDObj.hasOwnProperty(one['operand'])) {
                        DDObj[one['operand']].push(item['id'])
                    } else {
                        DDObj[one['operand']] = []
                        DDObj[one['operand']].push(item['id'])
                    }
                }
            })
        }
    })
    console.log({'LObj': LObj, 'Fobj': FObj, 'DObj': DObj, 'DDObj': DDObj});
    return {'LObj': LObj, 'Fobj': FObj, 'DObj': DObj, 'DDObj': DDObj}
}
