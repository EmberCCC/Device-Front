/*
 * @Author: your name
 * @Date: 2022-04-02 11:12:08
 * @LastEditTime: 2022-04-24 00:46:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\BasicManage\ComputerPage\index.js
 */

import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Table} from 'antd'
import GlobalForm from 'components/GlobalForm';
import { toJS } from 'mobx';
import GlobalTabel from 'components/GlobalTabel';


@inject('HomeStore')
@observer
class CommonTable extends Component {

  render() {
    const { dataSource, PageInfo, firstFormId, secondFormId, isLoading, model } = this.props.HomeStore;
    let columns = toJS(this.props.HomeStore.columns)
    if (model == 'look') {
      return <Table columns={columns} dataSource={dataSource} pagination={PageInfo} onChange={this.onChange} loading={isLoading}></Table>;
    } else if (model == 'submit') {
      return <GlobalForm loading={isLoading}/>
    } else if (model == 'manage') {
      return <GlobalTabel columns={columns} dataSource={dataSource} PageInfo={PageInfo} firstFormId={firstFormId} loading={isLoading} itemDataT={this.props.HomeStore.itemDataT} countObj={(params) => this.props.HomeStore.countObj(params)}
        secondFormId={secondFormId} del={(params) => this.props.HomeStore.deleteObj(params)} getData={(page) => { this.getData(page) }} updataData={(params) => { this.props.HomeStore.updataObj(params) }} />
    } else {
      return <GlobalTabel columns={columns} dataSource={dataSource} PageInfo={PageInfo} firstFormId={firstFormId} loading={isLoading} itemDataT={this.props.HomeStore.itemDataT} countObj={(params) => this.props.HomeStore.countObj(params)}
        secondFormId={secondFormId} del={(params) => this.props.HomeStore.deleteObj(params)} getData={(page) => { this.getData(page) }} updataData={(params) => { this.props.HomeStore.updataObj(params) }} />

    }
  }

  onChange = (e) => {
    this.props.HomeStore.PageInfo = e;
    this.props.HomeStore.PageInfo.pageIndex = e.current
    this.getData()
  }

  edit = (txt) => {
    console.log(txt);
  }

  getData = (page) => {
    const { PageInfo, firstFormId } = this.props.HomeStore;
    let params = {};
    params.firstFormId = firstFormId
    if (page != undefined) {
      params.pageIndex = page.pageIndex
      params.pageSize = page.pageSize
    } else {
      params.pageIndex = PageInfo.pageIndex
      params.pageSize = PageInfo.pageSize
    }
    this.props.HomeStore.queryAll(params);
  }
  
  getField = () => {
    const { firstFormId } = this.props.HomeStore
    let params = {};
    this.props.HomeStore.PageInfo.pageSize = 2;
    this.props.HomeStore.PageInfo.pageIndex = 1
    params.firstFormId = firstFormId;
    console.log(this.props.HomeStore.PageInfo);
    this.props.HomeStore.queryField(params)
  }
  componentWillMount() {
    const { firstFormId } = this.props.HomeStore
    let params = {};
    params.firstFormId = firstFormId;
    this.getField();
    this.getData();
    this.props.HomeStore.countObj(params)
  }

}

export default CommonTable;
