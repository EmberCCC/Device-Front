/*
 * @Author: your name
 * @Date: 2022-03-28 19:45:52
 * @LastEditTime: 2022-04-13 08:34:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\SpareRouter\index.js
 */
import React, { PureComponent } from 'react'
import  MaintenanceLayout  from 'Layouts/MaintenanceManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import {CommonTable} from './configs';

export default class ManagerRouter extends PureComponent {
  render() {
    return <MaintenanceLayout children={<React.Fragment>
      <Route path="/maintenance" render={() => <Redirect to='/maintenance/list' />} />
      <Route path='/maintenance/list' component={CommonTable} />
      <Route path='/maintenance/base' component={CommonTable} />
      <Route path='/maintenance/date' component={CommonTable} />
    </React.Fragment>} />;
    
  }
}
