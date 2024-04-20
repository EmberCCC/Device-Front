import React, { PureComponent } from 'react'
import EquipmentLayout from 'Layouts/EquipmentManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import { CommonTable } from './configs';

export default class EquipmentRouter extends PureComponent {
  render() {
    return <EquipmentLayout children={<React.Fragment>
      <Route exact path="/equipment" render={() => <Redirect to='/equipment/list' />} />
      <Route path='/equipment/list' component={CommonTable} />
    </React.Fragment>} />;

  }
}
