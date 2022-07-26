/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-07-27 03:27:21
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
import { BasicManager, DeviceManager, EquipmentManager, MaintenanceManager, SpareManager, ManagerManager, MessageManager, CommonForm } from './configs'
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
        <Route path='/common' component={CommonForm} />
        {/* <Route path='/device' component={DeviceManager} />
        <Route path='/equipment' component={EquipmentManager} />
        <Route path='/maintenance' component={MaintenanceManager} />
        <Route path='/spare' component={SpareManager} />
        <Route path='/manage' component={ManagerManager} /> */}
        <Route path='/message' component={MessageManager} />
      </React.Fragment>} />
    </div>;
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize = (e) => {
    this.setState({
      innerHeight: e.target.innerHeight
    });
  }

}
export default HomeRouter;