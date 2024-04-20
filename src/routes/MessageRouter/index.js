import React, { PureComponent } from 'react'
import MessageLayout from 'Layouts/MessageManage'
import {
  Route, Redirect,
} from 'react-router-dom';
import { ListPage } from './config';


export default class MessageRouter extends PureComponent {
  render() {
    return <MessageLayout children={<React.Fragment>
      {/* <Route path="/message" render={() => <Redirect to='/message/todo' />} /> */}
      <Route path='/message' component={ListPage} />
    </React.Fragment>} />;

  }
}
