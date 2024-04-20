import React, { PureComponent } from 'react'
import  MaintenanceLayout  from 'Layouts/MaintenanceManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import {CommonTable} from './configs';

export default class ManagerRouter extends PureComponent {
  render() {
    return <MaintenanceLayout children={<React.Fragment>
      <Route path="/maintenance" render={() => <Redirect to='/maintenance/list' />} />
      <Route path='/maintenance/list' component={CommonTable} />
      <Route path='/maintenance/base' component={CommonTable} />
      <Route path='/maintenance/date' component={CommonTable} />
    </React.Fragment>} />;
    
  }
}
