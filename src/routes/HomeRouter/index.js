/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-04-13 08:52:02
 * @LastEditors: Please set LastEditors
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
import { BasicManager,DeviceManager,EquipmentManager,MaintenanceManager,SpareManager,ManagerManager } from './configs';

class HomeRouter extends PureComponent {
  state = {
    innerHeight: window.innerHeight
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