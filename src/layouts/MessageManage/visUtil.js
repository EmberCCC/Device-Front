/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-30 05:15:11
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-31 01:47:46
 * @FilePath: \bl-device-manage-test\src\layouts\MessageManage\visUtil.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function getField(authObj, fieldObj) {
    let endList = [];
    Object.keys(authObj).map((key) => {
        if (authObj[key].indexOf('look') > -1 && fieldObj.hasOwnProperty(key)) {
            let iObj = { ...fieldObj[key] }
            if (iObj.hasOwnProperty('title_vis') && iObj['title_vis'] == false) {
                iObj['title'] = ""
            }
            if (authObj[key].indexOf('edit') <= -1 || iObj.hasOwnProperty('disabled') && iObj['disabled'] == false) {
                iObj['disabled'] = true
            }
            endList.push(iObj)
        }
    })
    return endList;
}