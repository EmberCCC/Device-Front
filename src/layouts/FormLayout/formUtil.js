/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-07 18:06:38
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-07 18:07:43
 * @FilePath: \bl-device-manage-test\src\layouts\FormLayout\formUtil.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function getCheckArr(schema) {
    let checkArr = []
    for (const key in schema.properties) {
        if (Object.hasOwnProperty.call(schema.properties, key)) {
            const element = schema.properties[key];
            if (Object.hasOwnProperty.call(element, 'check') && element['check']['check_only']) {
                checkArr.push(key)
            }
        }
    }
    return checkArr
}