import { MODELS, useXFlowApp, XFlowNodeCommands } from '@antv/xflow';
import { Checkbox } from 'antd';
import React from 'react'

const Node_copy = (props) => {
    const { commandService, modelService } = useXFlowApp();
    return (
        <Checkbox defaultChecked={props.checked} onChange={(e) => {
            MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
                    nodeConfig:
                        { ...res.data, 'copy': e.target.checked }
    
                })
            })
            console.log(props.initData);
            console.log(e.target.checked);
        }} />
    )
}

export default Node_copy
