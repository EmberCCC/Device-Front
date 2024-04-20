/**
 * 最外层包裹的home组件，包括
 */
 import React, { PureComponent } from 'react';
 import DesignManage from 'Layouts/DesignManage';
 import {
   Route, Redirect,
 } from 'react-router-dom';
 import {  FlowTable, ExpandTable, FormEdit } from './configs';
 
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
         <Route path='/design/edit' component={FormEdit} />
         <Route path='/design/expand' component={ExpandTable  } />
         <Route path='/design/flow' component={FlowTable} />
       </React.Fragment>} />
     </div>;
   }
 
 }
 export default HomeRouter;