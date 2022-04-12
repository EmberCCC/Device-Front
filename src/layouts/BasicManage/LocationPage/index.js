/*
 * @Author: your name
 * @Date: 2022-04-04 19:54:43
 * @LastEditTime: 2022-04-05 18:44:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\BasicManage\DepartPage\index.js
 */
/*
 * @Author: your name
 * @Date: 2022-04-02 11:12:08
 * @LastEditTime: 2022-04-02 13:22:02
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\BasicManage\ComputerPage\index.js
 */

import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Table} from 'antd'
import GlobalForm from 'components/GlobalForm';


@inject('BasicStore')
@inject('HomeStore')
@observer
class LocationPage extends React.Component {
  render() {
    const {columns} = this.props.BasicStore;
    const {data} = this.props.BasicStore;
    const { model } = this.props.HomeStore;
    console.log(model);
    if (model == 'look') {
      return <Table columns={columns} dataSource={data}></Table>;
    } else {
      return <GlobalForm/>

    }
    
  }
}

export default LocationPage;
