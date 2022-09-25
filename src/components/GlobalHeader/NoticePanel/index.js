/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-03-26 12:43:21
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-09-25 21:38:30
 * @FilePath: \bl-device-manage-test\src\components\GlobalHeader\NoticePanel\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react';
import { Spin, } from 'antd';
import List from './NoticeList.js';
import Pic from '../gh_8f2c69871f3b_258.jpg'

export default class NoticePanel extends Component {
  render() {
    const { className, loading, isImg } = this.props;
    return <React.Fragment >
      {
        isImg ? <div className={className}>
          <span>
            <img src={Pic} alt='小程序码' width='100%' />
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