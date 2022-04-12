/*
 * @Author: your name
 * @Date: 2022-03-28 20:01:19
 * @LastEditTime: 2022-04-05 14:57:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\BasicManage\index.js
 */
import { inject } from 'mobx-react'
import React from 'react'

@inject('HomeStore')
class BasicManage extends React.Component{
  render(){
    return <div>
      {this.props.children}
    </div>
  }
}

export default BasicManage;