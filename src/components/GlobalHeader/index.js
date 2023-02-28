import React, { Component } from 'react';
import './index.less';
import NoticePanel from './NoticePanel';
import { ArrowRightOutlined, LogoutOutlined, TeamOutlined ,IdcardFilled,LeftOutlined} from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout, Dropdown, Menu, Button, Modal, Divider, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { withRouter } from 'react-router-dom';
import GlobalCrumbs from 'Components/GlobalCrumbs'
import { getCookie } from 'utils/dataTools'
const { Header } = Layout;

@withRouter
@inject('HomeStore','SocketStore')
@observer
class HeaderLayout extends Component {
  render() {
    let history=this.props.history.location.pathname

    console.log(history)
    const menu = (
      <Menu selectedKeys={[]} style={{ marginTop: '-12px' }} onClick={this.onBindMenu}>
        <div style={{ textAlign: "center" }}>
          {/* {getCookie('username')} */}
        </div>
        <Menu.Item key={"mySetting"} >
          <IdcardFilled />
          &nbsp;个人设置
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutOutlined />
          &nbsp;退出登录
        </Menu.Item>
      </Menu>
    );
    const isMobile = this.props.mobile === 'true';
    const isShow = (isMobile ? false : this.props.sizetype === 'l_size');
    const handleClick = (value) => {
      if (value == 'socket') {
        this.props.history.push('/socket')
      }
    }
    const pathReturn=()=>{
      this.props.history.goBack()
    }
    const userName=getCookie('username')
    console.log('userName',userName)
    return (
      <Header className='header_layout'>
        { history==='/personalSetting' &&
            <div className={'global_header_left'}>
              <LeftOutlined onClick={pathReturn}/>
            </div>

        }
        <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          {
            this.props.isAuth && !this.props.ishome && <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
              <LegacyIcon
                className="trigger"
                type={this.props.visible ? 'menu-unfold' : 'menu-fold'}
                onClick={() => this.props.toggle()}
              />
            </div>
          }
          {
            this.props.ishome && <Button type='primary' style={{ marginLeft: 25 }} onClick={this.handleInSystem}><ArrowRightOutlined style={{ padding: 0 }} />进入系统</Button>
          }
        </div>

        <div className='global_header_right' style={{ display: 'flex', alignItems: 'center', paddingRight: 25 }}>
          <div style={{ display: 'inline-block', marginRight: '20px', cursor: 'pointer', color: '#C4C4C4' }}>
            <i className='iconfont icon-alerm' style={{ marginRight: '5px', color: '#9D9D9D' }} />{getCookie('username')||null}
          </div>
          <Divider type="vertical" />
          <Dropdown
            // className={'noticePanel'}
            onClick={() => handleClick('socket')}
            placement="bottomCenter"
            overlay={<span style={{ background: "#fff", padding: 10, boxShadow: '0 1px 10px #ccc', borderRadius: 7 }}>通讯录</span>} trigger={['hover']}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', border: '1px solid rgba(196,196,196,1)', width: 40, height: 40 }}>
              {/* <i className='iconfont icon-service' style={{ display: 'inline-block', color: '#9D9D9D' }}></i>
              <TeamOutlined /> */}
              <TeamOutlined />
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
  onBindMy=(e)=>{
    this.props.history.push('/personalSetting')
  }

  onBindMenu=(e)=>{
    if (e.key==="logout") {
      this.backToLogin(e)
    }else if(e.key==="mySetting"){
      if(this.props.history.location.pathname!=="/personalSetting"){
        this.onBindMy(e)
      }
    }
  }
  backToLogin = (e) => {
    if (e.key === "logout") {
      sessionStorage.clear();
      this.props.history.push('/login')
    }
  }


}
export default HeaderLayout;
