import React, { Component } from 'react';
import { Spin, } from 'antd';
import List from './NoticeList.js';

export default class NoticePanel extends Component {
  render() {
    const { className, loading, isImg } = this.props;
    return <React.Fragment >
      {
        isImg ? <div className={className}>
          <span>
            <img src='https://assets-boranet.oss-cn-hangzhou.aliyuncs.com/applet/project-code.jpg' alt='小程序码' width='100%' />
          </span>
          <div style={{ textAlign: 'center', color: '#3338' }}>微信扫码使用</div>
        </div> :
          <div className={className}>
            <Spin spinning={loading} delay={0}>
              <List />
            </Spin>
          </div>
      }

    </React.Fragment>;
  }
  onTabChange = (tabType) => {
    console.log(tabType)
  }
}