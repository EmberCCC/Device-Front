/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-05 10:16:45
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-03 11:23:45
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\changeTool.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { nanoid } from "nanoid";

export function exChange(item, firstFormId, name) {
  console.log(item);
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
        if (iObj['detailJson'].hasOwnProperty('fieldId')) {
          iObj['fieldId'] = iObj['detailJson']['fieldId'];
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
  console.log(params);
  params['properties'] = pro
  params['subForms'] = subForms
  return params;
}

function getOneForm(fields, fieldIds, type, flag, authInfo) {
  let result = {}
  fieldIds.forEach(item => {
    fields.forEach((field,index) => {
      if (field != null) {
        if (field['id'] == item) {
          const detailJson = JSON.parse(field['detailJson']);
          detailJson['order'] = index
          const id = field['id']
          const name = type == 'submit' ? field['id'] : "".concat(detailJson['typeId'], "_").concat(nanoid(6))
          if (type == 'submit') {
            if (detailJson.hasOwnProperty('title_vis') && detailJson['title_vis'] == false) {
              detailJson['title'] = ""
            }
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
export function restore(obj, type) {
  console.log(obj);
  if (JSON.stringify(obj) != "{}") {
    let formArr = {}
    let fieldInfo;
    let properties;
    let authField = {}
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
  if (obj.hasOwnProperty('form') && obj.hasOwnProperty('formFields')) {
    fieldInfo = obj['formFields'];
    formInfo = obj['form'];
    for (let index = 0; index < formInfo.length; index++) {
      let formItem = {}
      const element = formInfo[index];
      formItem['properties'] = getOneForm2(fieldInfo, element['fieldsId'])
      let pObj = { "displayType": "column", "labelWidth": 120, "type": "object" }
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