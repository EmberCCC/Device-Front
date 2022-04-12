import './index.less';
import React from 'react';

export default ({ isLoading, error }) => {
  if (isLoading) {
    return <div className="component-loading">
      <p>页面加载中</p>
    </div>;
  } else if (error) {
    return <div className="component-loading">
      <p className="wrong-msg">出错了，请
        刷新
        页面重试，或者确认地址是否正确</p>
    </div>;
  } else {
    return null;
  }
};