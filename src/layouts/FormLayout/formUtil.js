/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-07 18:06:38
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-19 04:44:44
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