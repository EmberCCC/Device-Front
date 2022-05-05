/*
 * @Author: your name
 * @Date: 2022-04-02 11:12:08
 * @LastEditTime: 2022-04-28 19:18:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\BasicManage\ComputerPage\index.js
 */

import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Button, Layout, Select, Table } from 'antd'
import GlobalForm from 'components/GlobalForm';
import { toJS } from 'mobx';
import GlobalTabel from 'components/GlobalTabel';
import { NavLink } from 'react-router-dom';
import './index.css'
import TableLayout from 'components/TableLayout';
import GlobalTabel2 from 'components/GlobalTabel2';
const { Header, Content } = Layout;
const { Option } = Select
@inject('HomeStore')
@observer
class CommonTable extends Component {

  render() {
    const { dataSource, PageInfo, firstFormId, secondFormId, isLoading, model, selectedKeys, itemDataT } = this.props.HomeStore;
    let columns = toJS(this.props.HomeStore.columns)
    return (
      <div className='tableEdit'>
        <div className='tableHeader'>
          <Select value={this.props.HomeStore.getModel()} style={{ width: 180, float: 'left' }} onSelect={value => { this.props.HomeStore.changeModel(value) }}>
            <Option value="submit">直接提交数据</Option>
            <Option value="subitAndManage">提交并管理本人数据</Option>
            <Option value="manage">管理全部数据</Option>
            <Option value="look">查看全部数据</Option>
          </Select>
          <NavLink to={{ pathname: '/design', state: { selectedKeys: toJS(selectedKeys), item: toJS(itemDataT), secondFormId: toJS(secondFormId) } }} style={{ float: 'right' }}><Button type='primary'>编辑表单</Button></NavLink>
        </div>
        <div>
          {
            model == 'look' ?
              <TableLayout columns={columns} dataSource={dataSource} pagination={PageInfo} onChange={this.onChange} loading={isLoading}></TableLayout> :
              model == 'submit' ?
                <GlobalForm loading={isLoading} type={false}/> :
                model == 'manage' ?
                  <GlobalTabel columns={columns} dataSource={dataSource} PageInfo={PageInfo} firstFormId={firstFormId} loading={isLoading} itemDataT={this.props.HomeStore.itemDataT} countObj={(params) => this.props.HomeStore.countObj(params)}
                    secondFormId={secondFormId} del={(params) => this.props.HomeStore.deleteObj(params)} getData={(page) => { this.getData(page) }} updataData={(params) => { this.props.HomeStore.updataObj(params) }} />
                  :
                  <GlobalTabel2 />
          }
        </div>
      </div>
    )
  }

  onChange = (e) => {
    this.props.HomeStore.PageInfo = e;
    this.props.HomeStore.PageInfo.pageIndex = e.current
    let params = {};
    params.firstFormId = this.props.HomeStore.firstFormId;
    this.props.HomeStore.countObj(params)
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
    this.props.HomeStore.PageInfo.pageSize = 10;
    this.props.HomeStore.PageInfo.pageIndex = 1
    params.firstFormId = firstFormId;
    this.props.HomeStore.queryField(params)
  }
  componentDidMount() {
    const { firstFormId } = this.props.HomeStore
    let params = {};
    params.firstFormId = firstFormId;
    this.getField();
    this.getData();
    this.props.HomeStore.countObj(params)
  }

}

export default CommonTable;
