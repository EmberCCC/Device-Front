/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-25 05:29:28
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-25 17:15:10
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\changeTool.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function changeFlow(obj, formId, flowProperty) {
    let result = {}
    result['formId'] = formId
    result['nodes'] = []
    result['origin'] = JSON.stringify({ ...obj, 'flowProperty':flowProperty })
    result['flowProperty'] = JSON.stringify({...flowProperty})
    if (obj.hasOwnProperty('nodes')) {
        obj['nodes'].map((item, index) => {
            let iObj = {}
            iObj['nodeId'] = item['id']
            iObj['typeId'] = item['typeId']
            iObj['nodeName'] = item['label']
            iObj['head'] = item['charge_person'] || {}
            iObj['fieldAuth'] = JSON.stringify(item['auto_info'])
            iObj['downIds'] = []
            iObj['upIds'] = []
            if (obj.hasOwnProperty('edges')) {
                obj['edges'].map((one) => {
                    if (one['source']['cell'] == item['id']) {
                        iObj['downIds'].push(one['target']['cell'])
                    }
                    if (one['target']['cell'] == item['id']) {
                        iObj['upIds'].push(one['source']['cell'])
                    }
                })
            }
            result['nodes'].push(iObj)
        })
    }
    return result;
}