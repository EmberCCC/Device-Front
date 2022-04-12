import React from 'react';
import { Avatar, List } from 'antd';

export default function NoticeList() {
  const data = [
    {
      title: '博拉科技',
    },
    {
      title: '博拉科技 2',
    },
    {
      title: '博拉科技 3',
    },
    {
      title: '博拉科技 4',
    },
  ];
  return <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="ccc" />}
          title={<a href="http://localhost:3001/order/query">{item.title}</a>}
          description="博拉科技博拉科技博拉科技博拉科技博拉科技博拉科技博拉科技博拉科技博拉科技博拉科技博拉科技博拉科技博拉科技博拉科技"
        />
      </List.Item>
    )}
  />;
}
