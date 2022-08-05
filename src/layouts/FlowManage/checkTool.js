/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-08-04 01:38:47
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-04 12:34:29
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\checkTool.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

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