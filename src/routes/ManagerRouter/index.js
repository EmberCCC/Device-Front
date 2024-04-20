import React, { PureComponent } from 'react'
import ManageLayout from 'Layouts/ManageManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import { CommonTable } from './configs';

export default class ManagerRouter extends PureComponent {
  render() {
    return <ManageLayout children={<React.Fragment>
      <Route path="/manage" render={() => <Redirect to='/manage/dynamic' />} />
      <Route path='/manage/dynamic' component={CommonTable} />
      <Route path='/manage/check' component={CommonTable} />
      <Route path='/manage/protect' component={CommonTable} />
      <Route path='/manage/repair' component={CommonTable} />
    </React.Fragment>} />;

  }
}
