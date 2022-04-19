/*
 * @Author: your name
 * @Date: 2022-04-11 16:13:26
 * @LastEditTime: 2022-04-17 11:07:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Sidebar.js
 */
import React from 'react';
import { Divider, Tag } from 'antd';
import {
  TwitterOutlined,
  FormOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      <Tag icon={<FormOutlined />} color="#55acee">
        <div  onDragStart={(event) => onDragStart(event, 'FlowNode')} draggable>
          流程节点
        </div>
      </Tag>
      <Tag icon={<TwitterOutlined />} color="#55acee">
        <div  onDragStart={(event) => onDragStart(event, 'CopyNode')} draggable>
          抄送节点
        </div>
      </Tag>
      <Divider type="vertical" />
      <Tag icon={<FormOutlined />} color="#55acee">
        水平等距
      </Tag>
      <Tag icon={<TwitterOutlined />} color="#55acee">
        垂直等距
      </Tag>
      <Divider type="vertical" />
      <Tag icon={<FormOutlined />} color="#55acee">
        -
      </Tag>
      <Tag icon={<TwitterOutlined />} color="#55acee">
        100%
      </Tag>
      <Tag icon={<TwitterOutlined />} color="#55acee">
        +
      </Tag>
      <Divider type="vertical" />
    </div>
  );
};
