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
