/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-24 21:14:31
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-24 21:37:11
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Self_Form\node_name.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MODELS, useXFlowApp, XFlowNodeCommands } from '@antv/xflow'
import { Input } from 'antd'
import React from 'react'

const Node_name = (props) => {
    const { commandService, modelService } = useXFlowApp();
    return (
        <Input defaultValue={props.name} onChange={(e) => {
            console.log(e.target.value);
            let newName = e.target.value
            MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
                    nodeConfig:
                        { ...res.data, 'label': newName }
    
                })
            })
            
        }} />
    )
}

export default Node_name
