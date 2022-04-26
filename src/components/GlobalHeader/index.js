import React, { Component } from 'react';
import './index.less';
import NoticePanel from './NoticePanel';
import { ArrowRightOutlined, LogoutOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout, Dropdown, Menu, Button, Modal, Divider, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import { NavLink, withRouter } from 'react-router-dom';
import GlobalCrumbs from 'Components/GlobalCrumbs'
import { getCookie } from 'utils/dataTools'
import { toJS } from 'mobx';
const { Header } = Layout;
const { Option } = Select;

@withRouter
@inject('HomeStore')
@observer
class HeaderLayout extends Component {
  render() {
    const menu = (
      <Menu selectedKeys={[]} style={{ marginTop: '-12px' }} onClick={this.backToLogin}>
        <div style={{ textAlign: "center" }}>
          {getCookie('username')}
        </div>
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    const isMobile = this.props.mobile === 'true';
    const isShow = (isMobile ? false : this.props.sizetype === 'l_size');
    const { selectedKeys, itemDataT, secondFormId } = this.props.HomeStore;
    return (
      <Header className='header_layout'>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          {
            this.props.isAuth && !this.props.ishome && <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
              <LegacyIcon
                className="trigger"
                type={this.props.visible ? 'menu-unfold' : 'menu-fold'}
                onClick={() => this.props.toggle()}
              />
              <GlobalCrumbs sizetype={this.props.sizetype}
                mobile={this.props.mobile}
                dataSource={this.props.dataSource} toIndex={e => this.props.history.push('/index')} />
            </div>
          }
          {
            this.props.ishome && <Button type='primary' style={{ marginLeft: 25 }} onClick={this.handleInSystem}><ArrowRightOutlined style={{ padding: 0 }} />进入系统</Button>
          }
        </div>
        <div className='global_header_right' style={{ display: 'flex', alignItems: 'center', paddingRight: 25 }}>
          <Dropdown
            // className={'noticePanel'}
            overlay={<NoticePanel
              className='noticePanel'
              loading={false}
            />} trigger={['hover']}>
            <div style={{ display: 'inline-block', marginRight: '20px', cursor: 'pointer', color: '#C4C4C4' }}>
              <i className='iconfont icon-warning' style={{ marginRight: '5px', color: '#9D9D9D' }} />预警
            </div>
          </Dropdown>
          <Dropdown
            // className={'noticePanel'}
            overlay={<NoticePanel
              className='noticePanel'
              loading={false}
            />} trigger={['hover']}>
            <div style={{ display: 'inline-block', marginRight: '20px', cursor: 'pointer', color: '#C4C4C4' }}>
              <i className='iconfont icon-alerm' style={{ marginRight: '5px', color: '#9D9D9D' }} />通知
            </div>
          </Dropdown>
          <Divider type="vertical" />
          <Dropdown
            // className={'noticePanel'}
            placement="bottomCenter"
            overlay={<span style={{ background: "#fff", padding: 10, boxShadow: '0 1px 10px #ccc', borderRadius: 7 }}>400-880-5687</span>} trigger={['hover']}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', border: '1px solid rgba(196,196,196,1)', width: 40, height: 40 }}>
              <i className='iconfont icon-service' style={{ display: 'inline-block', color: '#9D9D9D' }}></i>
            </span>
          </Dropdown>
          <Dropdown
            // className={'noticePanel'}
            placement="bottomCenter"
            overlay={<NoticePanel
              className='ImgPanel'
              loading={false}
              isImg={true}
            />} trigger={['hover']}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', border: '1px solid rgba(196,196,196,1)', width: 40, height: 40 }}>
              <i className='iconfont icon-weixin' style={{ display: 'inline-block', color: '#9D9D9D' }}></i>
            </span>
          </Dropdown>
          <Dropdown
            // className={'noticePanel'}
            placement="bottomCenter"
            overlay={menu} trigger={['hover']}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', border: '1px solid rgba(196,196,196,1)', width: 40, height: 40 }}>
              <i className='iconfont icon-user' style={{ display: 'inline-block', color: '#9D9D9D' }}></i>
            </span>
          </Dropdown>
        </div>
      </Header>
    );
  }
  handleInSystem = () => {
    /* 进入即请求菜单 */
    this.props.HomeStore.getMenuList().then((url) => {
      if (this.props.HomeStore.isAuth) {
        this.props.history.push(url)
        this.props.HomeStore.initMenu(url)
      } else {
        Modal.warn({
          title: '提示',
          content: '很抱歉，您没有任何系统菜单的权限，请联系管理员添加'
        })
      }
    })
  }
  backToLogin = (e) => {
    if (e.key === "logout") this.props.backToLogin();
  }


}
export default HeaderLayout;