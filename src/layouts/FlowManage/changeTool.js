import { customAlphabet } from "nanoid"
export function changeFlow(obj, formId, flowProperty) {
    console.log(obj);
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
                    console.log(one);
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