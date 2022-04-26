/*
 * @Author: your name
 * @Date: 2022-03-28 19:45:52
 * @LastEditTime: 2022-04-24 12:39:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\SpareRouter\index.js
 */
import React, { PureComponent } from 'react'
import MessageLayout from 'Layouts/MessageManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import { ListPage } from './config';


export default class MessageRouter extends PureComponent {
  render() {
    return <MessageLayout children={<React.Fragment>
      <Route path="/message" render={() => <Redirect to='/message/todo' />} />
      <Route path='/message/todo' component={ListPage} />
      <Route path='/message/create' component={ListPage} />
      <Route path='/message/handle' component={ListPage} />
      <Route path='/message/copy' component={ListPage} />
    </React.Fragment>} />;

  }
}
