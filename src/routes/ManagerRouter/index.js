/*
 * @Author: your name
 * @Date: 2022-03-28 19:45:52
 * @LastEditTime: 2022-04-13 08:49:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\SpareRouter\index.js
 */
import React, { PureComponent } from 'react'
import ManageLayout from 'Layouts/ManageManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import { CommonTable } from './configs';

export default class ManagerRouter extends PureComponent {
  render() {
    return <ManageLayout children={<React.Fragment>
      <Route path="/manage" render={() => <Redirect to='/manage/dynamic' />} />
      <Route path='/manage/dynamic' component={CommonTable} />
      <Route path='/manage/check' component={CommonTable} />
      <Route path='/manage/protect' component={CommonTable} />
      <Route path='/manage/repair' component={CommonTable} />
    </React.Fragment>} />;

  }
}
