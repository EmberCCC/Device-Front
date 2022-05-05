/*
 * @Author: your name
 * @Date: 2022-03-28 19:45:20
 * @LastEditTime: 2022-05-05 21:22:45
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
  // sendMsg = () => {
  //   let msg = '发送消息'
  //   websocket && websocket.send(msg)
  //   console.log('ws发送')
  // }

  // getMsg = (topic, message) => {
  //   // alert(message);
  //   // console.log('ws获取：', message)
  //   let data = JSON.parse(message).result.data
  //   console.log(data);
  //   if (data instanceof Array) {
  //     data.map((item) => {
  //       if (item.state == 0) {
  //         this.props.MessageStore.addList('todoList', item);
  //       } else if (item.state == 1) {
  //         this.props.MessageStore.addList('createList', item);
  //       } else if (item.state == 2) {
  //         this.props.MessageStore.addList('handleList', item);
  //       }
  //     })
  //   } else {
  //     if (data.state == 0) {
  //       this.props.MessageStore.addList('todoList', data);
  //     } else if (data.state == 1) {
  //       this.props.MessageStore.addList('createList', data);
  //     } else if (data.state == 2) {
  //       this.props.MessageStore.addList('handleList', data);
  //     }
  //   }

  //   // console.log(data);
  // }
  // componentDidMount() {
  //   console.log(this.state.messageSocket);
  //   if (this.state.messageSocket == null) {
  //     this.props.HomeStore.querySelf({})
  //     this.setState({
  //       messageSocket: PubSub.subscribe('message', this.getMsg)
  //     })
  //   }

  //   // this.setState({
  //   //   messageSocket: PubSub.subscribe('message', this.getMsg)
  //   // })

  //   // this.setState({});
  // }
  // componentWillUnmount() {
  //   window.onbeforeunload = () =>
  //   {
  //     PubSub.unsubscribe(this.state.messageSocket);
  //     // this.props.MessageStore.clearList();
  //     closeWebSocket();
  //     this.setState({
  //       messageSocket: null
  //     })
  //     // if (event.clientX > document.body.clientWidth && event.clientY < 0 || event.altKey) {
  //     //   window.event.returnValue = "确定要退出本页吗？";
  //     // }

  //   }
  //   PubSub.unsubscribe(this.state.messageSocket);
  //   //在组件卸载的时候，关闭连接
  //   // PubSub.unsubscribe(this.state.messageSocket);
  //   // closeWebSocket();
  //   // this.setState({
  //   //   messageSocket: null
  //   // })
  // }
}

export default BasicRouter
