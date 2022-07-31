import { customAlphabet } from "nanoid"

/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-25 05:29:28
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-30 03:43:56
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\changeTool.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function changeFlow(obj, formId, flowProperty) {
    const nanoid = customAlphabet('1234567890',7)
    let result = {}
    result['formId'] = formId
    result['nodes'] = []
    result['origin'] = { ...obj, 'flowProperty':flowProperty }
    let iArr = []
    console.log(result['origin']);
    result['origin']['edges'].map((item) => {
        if(!item.hasOwnProperty('id') || item['id'] == undefined){
            iArr.push({...item,'id':parseInt(nanoid())})
        }else{
            iArr.push({...item})
        }
    })
    result['origin']['edges'] = iArr
    result['origin'] = JSON.stringify(result['origin'])
    result['flowProperty'] = JSON.stringify({...flowProperty})
    if (obj.hasOwnProperty('nodes')) {
        obj['nodes'].map((item, index) => {
            let iObj = {}
            iObj['nodeId'] = item['id']
            iObj['typeId'] = item['typeId']
            iObj['nodeName'] = item['label']
            iObj['head'] = item['charge_person'] || {}
            iObj['fieldAuth'] = JSON.stringify(item['auth_info'])
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