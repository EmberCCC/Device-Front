/*
 * @Author: your name
 * @Date: 2022-03-28 19:45:20
 * @LastEditTime: 2022-04-27 11:24:26
 * @LastEditors: Please set LastEditors
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
import {createWebSocket,closeWebSocket,websocket} from './webSocket';

export default class BasicRouter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messageSocket:null
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
  sendMsg = () => {
    let msg = '发送消息'
    websocket && websocket.send(msg)
    console.log('ws发送')
  }

  getMsg = (topic, message) => {
    alert(message);
    console.log('ws获取：', message)
  }
  componentDidMount() {
    let url = "ws://device.misaki.center:8000/websocket";//服务端连接的url
    createWebSocket(url)
    this.setState({
      messageSocket: PubSub.subscribe('message', this.getMsg)
    })
    
    // this.setState({});
  }
  componentWillUnmount() {
    //在组件卸载的时候，关闭连接
    PubSub.unsubscribe(this.state.messageSocket);
    closeWebSocket();
  }
}
