/*
 * @Author: your name
 * @Date: 2022-03-28 19:45:20
 * @LastEditTime: 2022-04-13 08:31:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\BasicRouter\index.js
 */
import React, { PureComponent } from 'react'
import DeviceLayout from 'Layouts/DeviceManage'
import {
    Route, Redirect,
} from 'react-router-dom';
import { CommonTable} from './configs';

export default class DeviceRouter extends PureComponent {
    render() {
        return <DeviceLayout children={<React.Fragment>
          <Route exact path="/device" render={() => <Redirect to='/device/list' />} />
          <Route path='/device/list' component={CommonTable} />
          <Route path='/device/plan' component={CommonTable} />
          <Route path='/device/content' component={CommonTable} />
          <Route path='/device/time' component={CommonTable} />
        </React.Fragment>} />;
        
      }
}
