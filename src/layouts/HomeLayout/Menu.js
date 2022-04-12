import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import './index.less';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { FolderOutlined } from '@ant-design/icons';
import { AlertOutlined, RightCircleOutlined, CheckCircleOutlined ,SendOutlined, CommentOutlined} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { toJS } from 'mobx';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

let firstMount = false;
@withRouter
@inject('HomeStore')
@observer
class MenuLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      sizetype: '',
      pathname: '',
      isPath: false,
    }
    this.store = this.props.HomeStore;
  }
  render() {
    const isMobile = this.props.mobile === 'true';
    const { menuObj } = toJS(this.store);
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={
          this.props.sizetype === 's_size' ? false : this.state.collapsed
        }
        className={
          classnames({
            'ant-sider-menu-content': true,
            'ant-sider-menu-none': isMobile
          })
        }
        style={{
          overflowY: 'auto',
          height: this.props.sizetype === 's_size' && '100%'
        }}
      >
        <div id='manu_container'>
          <Menu theme="dark"
            // defaultOpenKeys={toJS(this.store.openKeys)}
            selectedKeys={toJS(this.store.selectedKeys)}
            // openKeys={this.store.openKeys}
            mode={'inline'}
            onClick={this.handleMenu}
            onOpenChange={this.onOpenChange}
            onSelect={this.onMenuSelect}
          // inlineCollapsed={this.state.collapsed}
          >
            <SubMenu title={<span><CommentOutlined /><span style={{ display: this.state.collapsed && 'none' }}>我的消息</span></span>}>
              <Menu.Item><AlertOutlined />我的待办</Menu.Item>
              <Menu.Item><RightCircleOutlined />我发起的</Menu.Item>
              <Menu.Item><CheckCircleOutlined />我处理的</Menu.Item>
              <Menu.Item><SendOutlined />抄送我的</Menu.Item>
            </SubMenu>
            {
              menuObj.map(leaf => !leaf.displayNone && <SubMenu
                key={leaf.id}
                title={<span><FolderOutlined /><span style={{ display: this.state.collapsed && 'none' }}>{leaf.name}</span></span>}
              >
                {
                  leaf.leafMenuModels.length > 0 && leaf.leafMenuModels.map(ele =>
                    !ele.displayNone && <Menu.Item key={ele.id}>{ele.name}</Menu.Item>)
                }
              </SubMenu>)
            }
          </Menu>
        </div>

      </Sider>
    );
  }
  onMenuSelect = ({ selectedKeys }) => {
    this.store.selectedKeys = selectedKeys;
  }
  onOpenChange = (openKeys) => {
    this.store.openKeys = openKeys;
  }
  handleMenu = ({ item, key, }) => {
    this.props.HomeStore.toggleMenu({ actionItem: item, actionId: key, from: 'menu-click' }, (url) => {
      if (url) {
        this.props.history.push(url);
      } else {
        alert('false');
      }
    });
  }
  goBack = () => {
    this.props.history.push('/index');
  }
  componentDidMount() {
    firstMount = false;
    // this.props.HomeStore.getMenuList(this.props.location.pathname).then(() => {
    //   this.props.HomeStore.initMenu(this.props.location.pathname);
    // });

    /* 初始化判断是否显示 */
    if (this.props.sizetype !== 'l_size') {
      this.state.collapsed = true;
    } else {
      this.state.collapsed = false;
    }
    this.setState({});
  }

  static getDerivedStateFromProps(props, state) {
    let newState = { ...state };
    if (props.sizetype === 'l_size') {
      if (props.HomeStore.isClickCollapsed) {
        if (props.sizetype !== state.sizetype) {
          props.HomeStore.changeValue('collapsed', false)
        }
        Object.assign(newState, {
          sizetype: props.sizetype,
          collapsed: props.HomeStore.collapsed,
          pathname: props.location.pathname
        })
      } else {
        Object.assign(newState, {
          sizetype: props.sizetype,
          collapsed: false,
          pathname: props.location.pathname
        })
      }
    } else {
      if (props.HomeStore.isClickCollapsed) {
        if (props.sizetype !== state.sizetype) {
          props.HomeStore.changeValue('collapsed', true)
        }
        Object.assign(newState, {
          sizetype: props.sizetype,
          collapsed: props.HomeStore.collapsed,
          pathname: props.location.pathname
        })
      } else {
        Object.assign(newState, {
          sizetype: props.sizetype,
          collapsed: true,
          pathname: props.location.pathname
        })
      }
    }
    if (props.location.pathname !== state.pathname) {
      Object.assign(newState, {
        isPath: true
      })
    } else {
      Object.assign(newState, {
        isPath: false
      })
    }
    return newState;
  }
  componentDidUpdate() {
    if (this.state.isPath) {
      this.props.HomeStore.initMenu(this.state.pathname)
    }
  }
}
export default MenuLayout;