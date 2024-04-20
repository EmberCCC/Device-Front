import React, { PureComponent } from 'react'
import BasicLayout from 'Layouts/BasicManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import { CommonTable } from './configs';
import { inject, observer } from 'mobx-react';


@inject('HomeStore', 'MessageStore')
@observer
class BasicRouter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messageSocket: null
    }
  }
  render() {
    return <BasicLayout children={<React.Fragment>
      <Route exact path="/basic" render={() => <Redirect to='/basic/computer' />} />
      <Route path='/basic/computer' component={CommonTable} />
      <Route path='/basic/type' component={CommonTable} />
      <Route path='/basic/department' component={CommonTable} />
      <Route path='/basic/state' component={CommonTable} />
      <Route path='/basic/level' component={CommonTable} />
      <Route path='/basic/storage' component={CommonTable} />
      <Route path='/basic/unit' component={CommonTable} />
      <Route path='/basic/location' component={CommonTable} />
    </React.Fragment>} />;

  }
}

export default BasicRouter
