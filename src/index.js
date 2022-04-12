import React from 'react';
import ReactDOM from 'react-dom';
/* 引入总的样式文件 */
import './css/index.less';
import './css/newTheme.less';

/* 引入Store注入组件 */
import { Provider } from 'mobx-react';
import store from './stores';

/* 引入router根组件 */
import RootRouter from './routes';

/* 引入最外层组件 */
import * as serviceWorker from './serviceWorker';

/* 设置组件国际化配置 */
import 'constants/global_config';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(
  <Provider {...store}>
    <RootRouter />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
