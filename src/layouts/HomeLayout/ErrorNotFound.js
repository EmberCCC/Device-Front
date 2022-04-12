import React from 'react'
import {Empty} from 'antd';
import './index.less'

export default class ErrorNotAuth extends React.Component{
  render(){
    return <div className='home_empty'>
      <Empty 
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={
          <span style={{
            
          }}>
            很抱歉，您暂时没有系统内菜单的权限，请联系<b>系统管理员</b>配置。
          </span>
        }
      />
    </div>
  }
}