/*
 * @Author: your name
 * @Date: 2022-03-28 19:45:20
 * @LastEditTime: 2022-05-07 21:22:16
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\BasicRouter\index.js
 */
import React, { PureComponent } from 'react'
import BasicLayout from 'Layouts/BasicManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import { CommonTable } from './configs';
import { PubSub } from 'pubsub-js';
import { createWebSocket, closeWebSocket, websocket } from './webSocket';
import { inject, observer } from 'mobx-react';


@inject('HomeStore', 'MessageStore')
@observer
class BasicRouter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messageSocket: null
    }
  }
  render() {
    return <BasicLayout children={<React.Fragment>
      <Route exact path="/basic" render={() => <Redirect to='/basic/computer' />} />
      <Route path='/basic/computer' component={CommonTable} />
      <Route path='/basic/type' component={CommonTable} />
      <Route path='/basic/department' component={CommonTable} />
      <Route path='/basic/state' component={CommonTable} />
      <Route path='/basic/level' component={CommonTable} />
      <Route path='/basic/storage' component={CommonTable} />
      <Route path='/basic/unit' component={CommonTable} />
      <Route path='/basic/location' component={CommonTable} />
    </React.Fragment>} />;

  }
}

export default BasicRouter
