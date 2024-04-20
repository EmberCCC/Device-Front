import React, { Component } from 'react';
import Pic from '../gh_8f2c69871f3b_258.jpg'

export default class NoticePanel extends Component {
  render() {
    const { className, loading, isImg } = this.props;
    return <React.Fragment >
      <div className={className}>
          <span>
            <img src={Pic} alt='小程序码' width='100%' />
          </span>
          <div style={{ textAlign: 'center', color: '#3338' }}>微信扫码使用</div>
        </div>

    </React.Fragment>;
  }
  onTabChange = (tabType) => {
    console.log(tabType)
  }
}