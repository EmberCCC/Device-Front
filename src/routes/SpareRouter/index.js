import React, { PureComponent } from 'react'
import  SpareLayout  from 'Layouts/SpareManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import {CommonTable} from './configs';

export default class SpareRooter extends PureComponent {
  render() {
    return <SpareLayout children={<React.Fragment>
      <Route path="/spare" render={() => <Redirect to='/spare/standing' />} />
      <Route path='/spare/standing' component={CommonTable} />
      <Route path='/spare/storage' component={CommonTable} />
      <Route path='/spare/receive' component={CommonTable} />
    </React.Fragment>} />;
    
  }
}
