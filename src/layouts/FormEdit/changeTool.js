/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-05 10:16:45
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-19 06:53:07
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\changeTool.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { firstFormName } from "constants/status_constant";
import { nanoid } from "nanoid";

export function exChange(item, firstFormId, name) {
  let params = {};
  let pro = {};
  let subForms = [];
  params.formId = firstFormId;
  params.formName = firstFormName[firstFormId]
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

function getOneForm(fields, fieldIds, type) {
  let result = {}
  fieldIds.forEach(item => {
    fields.forEach(field => {
      if (field['id'] == item) {
        const detailJson = JSON.parse(field['detailJson']);
        const name = type == 'submit' ? field['id'] : "".concat(detailJson['typeId'], "_").concat(nanoid(6))
        result[name] = detailJson;
        result[name]['fieldId'] = field['id'];
      }
    });
  });
  console.log(result);
  return result
}
export function restore(obj, type) {
  let formArr = {}
  let fieldInfo;
  let properties;
  if (obj.hasOwnProperty('form') && obj['form'].hasOwnProperty('formFields')) {
    fieldInfo = JSON.parse(obj['form']['formFields']);
    properties = JSON.parse(obj['form']['properties']);
    const fields = obj['fields'];
    for (let index = 0; index < fieldInfo.length; index++) {
      let formItem = {}
      const element = fieldInfo[index];
      formItem['properties'] = getOneForm(fields, element['fieldsId'], type)
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