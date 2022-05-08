/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-05-07 22:22:51
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\routes\HomeRouter\index.js
 */
/**
 * 最外层包裹的home组件，包括
 */
import React, { PureComponent } from 'react';
import HomeLayout from 'Layouts/HomeLayout';
import {
  Route, Redirect,
} from 'react-router-dom';
import { BasicManager, DeviceManager, EquipmentManager, MaintenanceManager, SpareManager, ManagerManager, MessageManager } from './configs';
import { PubSub } from 'pubsub-js';
import { closeWebSocket, websocket } from 'routes/BasicRouter/webSocket';
import { inject, observer } from 'mobx-react';

let id = 1;
@inject('HomeStore', 'MessageStore')
@observer
class HomeRouter extends PureComponent {
  state = {
    innerHeight: window.innerHeight,
    messageSocket: null,
  };
  render() {
    const isMobile = navigator.userAgent.toLowerCase().indexOf('mobile') > -1 ? 'mobile' : 'pc';
    return <div className='main'
      style={{
        height: this.state.innerHeight + 'px',
      }}
    >
      <HomeLayout type={isMobile} children={<React.Fragment>
        <Route exact path="/" render={() => <Redirect to='/login' />} />
        <Route path='/basic' component={BasicManager} />
        <Route path='/device' component={DeviceManager} />
        <Route path='/equipment' component={EquipmentManager} />
        <Route path='/maintenance' component={MaintenanceManager} />
        <Route path='/spare' component={SpareManager} />
        <Route path='/manage' component={ManagerManager} />
        <Route path='/message' component={MessageManager} />
      </React.Fragment>} />
    </div>;
  }
  sendMsg = () => {
    let msg = '发送消息'
    websocket && websocket.send(msg)
    console.log('ws发送')
  }

  getMsg = (topic, message) => {
    // alert(message);
    // console.log('ws获取：', message)
    let data = JSON.parse(message).result.data
    console.log(data);
    if (data instanceof Array) {
      data.map((item) => {
        if (item.state == 0) {
          this.props.MessageStore.addList('todoList', item);
        } else if (item.state == 1) {
          this.props.MessageStore.addList('createList', item);
        } else if (item.state == 2) {
          this.props.MessageStore.addList('handleList', item);
        }
      })
    } else {
      if (data.state == 0) {
        this.props.MessageStore.addList('todoList', data);
      } else if (data.state == 1) {
        this.props.MessageStore.addList('createList', data);
      } else if (data.state == 2) {
        this.props.MessageStore.addList('handleList', data);
      }
    }
    const location = this.props.location.pathname
    const nowL = location.split('/')[2];
    this.props.MessageStore.setData(nowL);
    console.log(this.props.MessageStore.data);
  }
  toWebsocket = () => {
    console.log(id);
    console.log(sessionStorage.getItem('username'));
    if (this.state.messageSocket == null && sessionStorage.getItem('username') != undefined) {
      clearInterval(id)
      this.props.HomeStore.querySelf({}).then(() => {
        this.setState({
          messageSocket: PubSub.subscribe('message', this.getMsg)
        })
      })

    }
  }
  componentDidMount() {
    clearInterval(id);
    id = setInterval(this.toWebsocket, 1000);
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.onbeforeunload = () => {
      PubSub.unsubscribe(this.state.messageSocket);
      closeWebSocket();
      this.setState({
        messageSocket: null
      })

    }
    this.props.MessageStore.clearList();
    PubSub.unsubscribe(this.state.messageSocket);

  }
  handleResize = (e) => {
    this.setState({
      innerHeight: e.target.innerHeight
    });
  }

}
export default HomeRouter;