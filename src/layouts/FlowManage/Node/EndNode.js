/*
 * @Author: your name
 * @Date: 2022-04-16 16:12:59
 * @LastEditTime: 2022-05-04 21:24:59
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Node\Node1.js
 */
import React from 'react';
import {
  EditOutlined
} from '@ant-design/icons';

import { Handle, Position } from 'react-flow-renderer';


function TextUpdaterNode({ data }) {
  return (
    <div className="dndnode">
      <Handle type='target' position={Position.Top} id={'top'} />
      <div>
        <EditOutlined />
        <label htmlFor="text">结束流程</label>
      </div>
    </div>
  );
}

export default TextUpdaterNode;
