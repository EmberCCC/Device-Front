/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-07 18:06:38
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-10 10:57:31
 * @FilePath: \bl-device-manage-test\src\layouts\FormLayout\formUtil.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function getCheckArr(schema) {
    let checkArr = []
    for (const key in schema) {
        if (Object.hasOwnProperty.call(schema, key)) {
            const element = schema[key];
            for (const key1 in element.properties) {
                if (Object.hasOwnProperty.call(element.properties, key1)) {
                    const element1 = element.properties[key1];
                    if (Object.hasOwnProperty.call(element1, 'check') && element1['check']['check_only']) {
                        checkArr.push(key1)
                    }
                }
            }
        }
    }
    return checkArr
}

export function getNotNullObj(field, fieldAuth, data) {
    console.log(fieldAuth);
    let auth = {}
    let result = {}
    let fieldObj = {}
    field.map((item, index) => {
        fieldObj[item['id']] = JSON.parse(item['detailJson'])
    })
    if (fieldAuth) {
        auth = JSON.parse(fieldAuth)
        Object.keys(auth).map((key, index) => {
            if (auth[key].indexOf('edit') > -1 || auth[key].indexOf('look') > -1) {
                if (fieldObj[key].hasOwnProperty('required') && fieldObj[key]['required']) {
                    if (!data.hasOwnProperty(key) || data[key] == "" || data[key] == []) {
                        result[key] = fieldObj[key]['title'] + "为必填项!"
                    }
                }
            }
        })
    } else {
        Object.keys(fieldObj).map((key, index) => {
            if (fieldObj[key].hasOwnProperty('required') && fieldObj[key]['required']) {
                if (!data.hasOwnProperty(key) || data[key] == "" || data[key] == []) {
                    result[key] = fieldObj[key]['title'] + "为必填项!"
                }
            }
        })
    }
    console.log(fieldObj);
    console.log(auth);
    console.log(data);
    console.log(result);
    return result
}