/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-24 21:14:31
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-04 08:26:37
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Self_Form\node_name.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MODELS, useModelAsync, useXFlowApp, XFlowGraphCommands, XFlowNodeCommands } from '@antv/xflow'
import { Input } from 'antd'
import React from 'react'

const Node_name = (props) => {
    const app = useXFlowApp();
    const { commandService, modelService } = useXFlowApp();
    return (
        <Input defaultValue={props.name} onChange={(e) => {
            let newName = e.target.value
            commandService.executeCommand(XFlowGraphCommands.SAVE_GRAPH_DATA.id, {
                saveGraphDataService: async (meta, data) => {
                    let iData = data
                    iData['nodes'].forEach((item,index) => {
                        if(item['id'] == props.initData['id']){
                            iData['nodes'].splice(index,1)
                            iData['nodes'].push({...item,label:newName})
                        }
                    })
                    app.executeCommand(
                        XFlowGraphCommands.GRAPH_RENDER.id, {
                        graphData: { ...iData }
                      }
                    )
                    // console.log(data);
                },
            })
            // MODELS.SELECTED_NODE.useValue(modelService).then(res => {
            //     console.log(res.data);
            //     let iNode = res.data
            //     iNode['label'] = newName
            //     console.log(iNode);
            //     commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
            //         nodeConfig:
            //             { ...iNode }

            //     })
            // })

        }} />
    )
}

export default Node_name
