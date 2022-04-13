/*
 * @Author: your name
 * @Date: 2022-03-28 19:45:20
 * @LastEditTime: 2022-04-13 08:43:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\BasicRouter\index.js
 */
import React, { PureComponent } from 'react'
import EquipmentLayout from 'Layouts/EquipmentManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import { CommonTable } from './configs';

export default class EquipmentRouter extends PureComponent {
  render() {
    return <EquipmentLayout children={<React.Fragment>
      <Route exact path="/equipment" render={() => <Redirect to='/equipment/list' />} />
      <Route path='/equipment/list' component={CommonTable} />
    </React.Fragment>} />;

  }
}
