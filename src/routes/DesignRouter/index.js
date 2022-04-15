/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-04-14 21:02:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\routes\HomeRouter\index.js
 */
/**
 * 最外层包裹的home组件，包括
 */
 import React, { PureComponent } from 'react';
 import DesignManage from 'Layouts/DesignManage';
 import {
   Route, Redirect,
 } from 'react-router-dom';
 import { EditTable, FlowTable } from './configs';
 
 class HomeRouter extends PureComponent {
   state = {
     innerHeight: window.innerHeight
   };
   render() {
     const isMobile = navigator.userAgent.toLowerCase().indexOf('mobile') > -1 ? 'mobile' : 'pc';
     return <div className='main'
     >
       <DesignManage children={<React.Fragment>
         <Route exact path="/design" render={() => <Redirect to='/design/edit' />} />
         <Route path='/design/edit' component={EditTable} />
         <Route path='/design/flow' component={FlowTable} />
       </React.Fragment>} />
     </div>;
   }
 
 }
 export default HomeRouter;