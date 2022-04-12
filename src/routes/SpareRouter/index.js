/*
 * @Author: your name
 * @Date: 2022-03-28 19:45:52
 * @LastEditTime: 2022-04-02 18:05:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\SpareRouter\index.js
 */
import React, { PureComponent } from 'react'
import  SpareLayout  from 'Layouts/SpareManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import {StandingPage} from './configs';

export default class SpareRooter extends PureComponent {
  render() {
    return <SpareLayout children={<React.Fragment>
      <Route path="/spare" render={() => <Redirect to='/spare/standing' />} />
      <Route path='/spare/standing' component={StandingPage} />
      <Route path='/spare/storage' component={StandingPage} />
      <Route path='/spare/receive' component={StandingPage} />
    </React.Fragment>} />;
    
  }
}
