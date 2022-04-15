/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-04-14 20:50:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\routes\index.js
 */
/* 
* router by zyn on 0509
* Router -- 根节点
* BrowserHistory 建立路由传递文件 当前路由引入方式
* Switch 路由切换组件 Router 路由包裹  Redirect 路由指向
* HomeLayout 最外层Home包裹架子
*/

import WrapperList from 'components/GlobalList';
import React,{PureComponent} from 'react';
import { 
  BrowserRouter as Router,
  // Redirect,
  Route,
  Switch
} from 'react-router-dom';

/* 引入组件 */
import { 
  HomeRouter,EditPage,LoginPage,FlowPage,DesignPage
} from './home';

export default class RootRouter extends PureComponent{
  render(){
    return (
      <Router >
        <Switch>
          <Route path="/design" component={DesignPage}/>
          <Route path="/flow" component={FlowPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/globalList" component={WrapperList}/>
          <Route path='/' component={HomeRouter} />
        </Switch>
      </Router>
    );
  }
}



