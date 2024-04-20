import React, { PureComponent } from 'react'
import DeviceLayout from 'Layouts/DeviceManage'
import {
    Route, Redirect,
} from 'react-router-dom';
import { CommonTable} from './configs';

export default class DeviceRouter extends PureComponent {
    render() {
        return <DeviceLayout children={<React.Fragment>
          <Route exact path="/device" render={() => <Redirect to='/device/list' />} />
          <Route path='/device/list' component={CommonTable} />
          <Route path='/device/plan' component={CommonTable} />
          <Route path='/device/content' component={CommonTable} />
          <Route path='/device/time' component={CommonTable} />
        </React.Fragment>} />;
        
      }
}
