/**
 * result结构{person:{},auth:{}}
 * @param {*} flowProperty 
 */
export function checkFlow(flowProperty) {

    let result = {
        person: {},
        auth: {}
    }
    console.log(flowProperty);
    const { nodes, edges } = flowProperty
    console.log(nodes);
    console.log(edges);
    nodes.map((item) => {
        if (item['id'] != -2 && item['id'] != -1) {
            if (item['charge_person']['department'].length == 0 && item['charge_person']['role'].length == 0 && item['charge_person']['user'].length == 0) {
                result['person'][item['label']] = item['label'] + ':请至少选择一个负责人或者抄送人'
            }
            if (JSON.stringify(item['auth_info']) == "{}") {
                result['auth'][item['label']] = item['label'] + ':请至少选择一个可见字段'
            } else {
                let flag = false
                Object.keys(item['auth_info']).forEach(key => {
                    if (item['auth_info'][key].indexOf('look') > -1) {
                        flag = true
                        return;
                    }
                })
                if (!flag) {
                    result['auth'][item['label']] = item['label'] + ':请至少选择一个可见字段'
                }
            }

        }
    })
    return result;
}