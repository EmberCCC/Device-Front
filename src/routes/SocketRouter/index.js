/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-07-19 23:22:37
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\routes\HomeRouter\index.js
 */
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