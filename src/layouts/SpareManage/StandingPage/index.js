/*
 * @Author: your name
 * @Date: 2022-03-31 23:07:52
 * @LastEditTime: 2022-04-11 18:50:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\SpareManage\StandingPage\index.js
 */
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import {Table } from 'antd';
import GlobalForm from 'components/GlobalForm';


@inject('SpareStore')
@inject('HomeStore')
@observer
class StandingPage extends Component {
  render() {
    const { columns } = this.props.SpareStore;
    const { data } = this.props.SpareStore;
    const { model } = this.props.HomeStore;
    console.log(model);
    if (model == 'look') {
      return <Table columns={columns} dataSource={data}></Table>;
    } else {
      return <GlobalForm/>

    }


  }
}

export default StandingPage;
