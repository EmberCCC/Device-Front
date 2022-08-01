/*
 * @Author: your name
 * @Date: 2022-04-02 11:12:08
 * @LastEditTime: 2022-08-01 23:58:14
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\BasicManage\ComputerPage\index.js
 */

import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Button, Select, Spin, Table } from 'antd'
import { toJS } from 'mobx';
import { NavLink } from 'react-router-dom';
import './index.less'
import GlobalTabel2 from 'components/GlobalTabel2';
import { InsertRowBelowOutlined } from '@ant-design/icons';
import FormLayout from 'layouts/FormLayout';
const { Option } = Select
@inject('HomeStore', 'TableStore', 'FormStore', 'SocketStore')
@observer
class CommonTable extends Component {

  render() {
    const { secondFormId, selectedKeys, itemDataT, firstFormId, formInfo } = this.props.HomeStore;
    const { dataSource, columns, PageInfo, model, isLoading } = this.props.TableStore;
    const { formAuthInfo } = this.props.FormStore;
    const { userAuth } = this.props.SocketStore
    const handleSelect = (value) => {
      if (value == 'subitAndManage') {
        this.props.TableStore.getAllData({ formId: firstFormId }, 'myself')
      } else {
        this.props.TableStore.getAllData({ formId: firstFormId }, 'all')
      }
      this.props.TableStore.setSelectedRowKeys([])
      this.props.TableStore.changeModel(value);
    }
    return (
      <div className='tableEdit'>
        <div className='tableHeader'>
          <Select value={this.props.TableStore.getModel()} style={{ width: 180, float: 'left', backgroundColor: 'gray', fontWeight: '1000' }} onSelect={handleSelect}>
            <Option value="submit"><InsertRowBelowOutlined /> 直接提交数据</Option>
            {
              formAuthInfo.indexOf(2) > -1 && (
                <Option value="subitAndManage"><InsertRowBelowOutlined /> 提交并管理本人数据</Option>
              )
            }
            {
              formAuthInfo.indexOf(3) > -1 && (
                <Option value="manage"><InsertRowBelowOutlined /> 管理全部数据</Option>
              )
            }
            {
              formAuthInfo.indexOf(4) > -1 && (
                <Option value="look"><InsertRowBelowOutlined /> 查看全部数据</Option>
              )
            }
          </Select>
          {
            (userAuth['creater'] || userAuth['sysAdmin'] || userAuth?.['authDetails']?.['editForm']) && (
              <NavLink to={{ pathname: '/design' }} style={{ float: 'right' }}>
                <Button onClick={() => {
                  sessionStorage.setItem('formId', firstFormId)
                  sessionStorage.setItem('formName', JSON.stringify(formInfo))
                }}>编辑表单</Button>
              </NavLink>
            )
          }
        </div>
        <Spin spinning={isLoading} tip={'loading...'} wrapperClassName={'table_content'}>
          <div className='table_content'>
            {
              model == 'submit' ?
                <FormLayout loading={isLoading} /> :
                <GlobalTabel2 loading={isLoading} scroll={{ x: true }} />
            }
          </div>
        </Spin>
      </div>
    )
  }
  componentWillMount() {
    this.props.FormStore.getFormAuthInfo({ 'formId': this.props.HomeStore.firstFormId })
    this.props.SocketStore.getMyInfo()
    console.log(toJS(this.props.SocketStore.userAuth));
  }
}

export default CommonTable;
