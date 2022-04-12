/*
 * @Author: your name
 * @Date: 2022-03-28 19:45:20
 * @LastEditTime: 2022-04-09 12:35:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\BasicRouter\index.js
 */
import React, { PureComponent } from 'react'
import  BasicLayout  from 'Layouts/BasicManage'
import {
    Route, Redirect,
} from 'react-router-dom';
import { ComputerPage, DepartPage, LevelPage, LocationPage, StatePage, StoragePage, TypePage, UnitPage } from './configs';

export default class BasicRouter extends PureComponent {
    render() {
        return <BasicLayout children={<React.Fragment>
          <Route exact path="/basic" render={() => <Redirect to='/basic/computer' />} />
          <Route path='/basic/computer' component={ComputerPage} />
          <Route path='/basic/type' component={ComputerPage} />
          <Route path='/basic/department' component={ComputerPage} />
          <Route path='/basic/state' component={ComputerPage} />
          <Route path='/basic/level' component={ComputerPage} />
          <Route path='/basic/storage' component={ComputerPage} />
          <Route path='/basic/unit' component={ComputerPage} />
          <Route path='/basic/location' component={ComputerPage} />
        </React.Fragment>} />;
        
      }
}
