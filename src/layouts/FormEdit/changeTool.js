/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-05 10:16:45
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-07 23:22:57
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\changeTool.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { firstFormName } from "constants/status_constant";

export function exChange(item, firstFormId) {
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
      obj['name'] = 'root';
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
  params['properties'] = pro
  params['subForms'] = subForms
  return params;
}

function getOneForm(fields, fieldIds) {
  let result = {}
  fieldIds.forEach(item => {
    fields.forEach(field => {
      if (field['id'] == item) {
        const detailJson = JSON.parse(field['detailJson']);
        result[item] = detailJson;
        result[item]['fieldId'] = field['id'];
      }
    });
  });
  return result
}
export function restore(obj) {
  let formArr = {}
  const fieldInfo = JSON.parse(obj['form']['formFields']);
  const properties = JSON.parse(obj['form']['properties']);
  const fields = obj['fields'];
  for (let index = 0; index < fieldInfo.length; index++) {
    let formItem = {}
    const element = fieldInfo[index];
    formItem['properties'] = getOneForm(fields, element['fieldsId'])
    for (const key in properties) {
      if (Object.hasOwnProperty.call(properties, key)) {
        const element = properties[key];
        formItem[key] = element
      }
    }
    formArr[fieldInfo[index]['name']] = formItem;
  }
  return formArr;
}

export function getSchema(columnsArr){
  let schema = {}
  schema['type'] = 'object'
  let properties = {}
  columnsArr.map((item) => {
    if(!['createPerson','createTime','updateTime'].includes(item['key'])){
      properties[item['key']] = item['detailJson']
    }
  })
  schema['labelWidth'] = 30
  schema['properties'] = properties;
  console.log(schema);
  return schema
}