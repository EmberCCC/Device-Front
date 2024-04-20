/**
 * 最外层包裹的home组件，包括
 */
import React, { PureComponent } from 'react';
import {
    Route, Redirect,
} from 'react-router-dom';
import SocketManage from 'layouts/SocketManage';

class SocketRouter extends PureComponent {
    state = {
        innerHeight: window.innerHeight
    };
    render() {
        const isMobile = navigator.userAgent.toLowerCase().indexOf('mobile') > -1 ? 'mobile' : 'pc';
        return <div className='main'
        >
            <SocketManage children={<React.Fragment>
                <Route exact path="/socket" render={() => <Redirect to='/socket/in' />} />
            </React.Fragment>} />
        </div>;
    }

}
export default SocketRouter;