/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-24 21:14:37
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-02 14:19:19
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Self_Form\node_copy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MODELS, useXFlowApp, XFlowNodeCommands } from '@antv/xflow';
import { Checkbox } from 'antd';
import React from 'react'

const Node_copy = (props) => {
    const { commandService, modelService } = useXFlowApp();
    return (
        <Checkbox defaultChecked={props.checked} onChange={(e) => {
            let checked = e.target.checked
            MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                let iNode = res.data
                iNode['copy'] = checked
                commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
                    nodeConfig:
                        {...iNode}

                })
            })
        }} />
    )
}

export default Node_copy
