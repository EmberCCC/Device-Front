import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  // Redirect,
  Route,
  Switch
} from 'react-router-dom';

/* 引入组件 */
import {
  HomeRouter, LoginPage, FlowPage, DesignPage, SocketManage, ManageManage, RegisterPage, SettingPage
} from './home';

export default class RootRouter extends PureComponent {
  render() {
    return (
      <Router >
        <Switch>
          <Route path="/design" component={DesignPage} />
          <Route path="/flow" component={FlowPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/socket" component={SocketManage} />
          <Route path="/manage" component={ManageManage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/personalSetting" component={SettingPage} />
          <Route path='/' component={HomeRouter} />
        </Switch>
      </Router>
    );
  }
}



