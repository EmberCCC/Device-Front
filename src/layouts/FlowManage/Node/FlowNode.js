/*
 * @Author: your name
 * @Date: 2022-04-16 16:12:59
 * @LastEditTime: 2022-04-17 11:58:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Node\Node1.js
 */
import React, { memo, useCallback } from 'react';
import {
  EditOutlined
} from '@ant-design/icons';

import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data }) {
  return (
    <div className="dndnode">
      <Handle type='target' position={Position.Top} id={'top'} />
      <div>
        <EditOutlined />
        <label htmlFor="text">{data.label}</label>
      </div>
      <Handle position={Position.Bottom} id={'bottom'} />
      <Handle position={Position.Left} id={'left'} />
      <Handle position={Position.Right} id={'right'} />
    </div>
  );
}

export default TextUpdaterNode;
