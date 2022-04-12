/**
 * @author zyn on 0516
 * @description 全局crumbs设置
 * @param {Array} dataSource - 面包屑的数据源数组
 * @param {String} mobile - 判断是否是移动端
 */

import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './index.less';
const BreadcrumbItem = Breadcrumb.Item;

class GlobalCrumbs extends Component {
  render() {
    const { dataSource, mobile } = this.props;
    const isShow = mobile === 'true' ? false : true;
    return isShow && <Breadcrumb className='crumb_layout' separator=">">
      <BreadcrumbItem onClick={this.props.toIndex} style={{cursor:'pointer'}}>首页</BreadcrumbItem>
      {
        dataSource && dataSource.map(crumb => {
          return <BreadcrumbItem key={crumb.id}>
            <a>{crumb.name}</a>
          </BreadcrumbItem>
        })
      }
    </Breadcrumb>
  }
}

export default GlobalCrumbs;