import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import './index.less';
import { BellTwoTone, CarryOutTwoTone, FolderOutlined, PlayCircleTwoTone, SoundTwoTone } from '@ant-design/icons';
import { Menu, Layout, Badge } from 'antd';
import { toJS } from 'mobx';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

let firstMount = false;
@withRouter
@inject('HomeStore', 'MessageStore', 'TableStore')
@observer
class MenuLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      sizetype: '',
      pathname: '',
      isPath: false
    }
    this.store = this.props.HomeStore;
  }
  render() {
    const isMobile = this.props.mobile === 'false';
    const { menuObj } = toJS(this.store);
    const { todoCount, createCount, handleCount, copyCount } = this.props.MessageStore;
    return (
      <Sider
        theme='light'
        style={{overflow:'auto'}}
      >
        <div id='manu_container'>
          <NavLink to={{ pathname: "/message/todo" }} onClick={this.loadData}>
            <div className='message_logo'>
              <div>
                <BellTwoTone />
                我的待办
              </div>
              <Badge count={todoCount} style={{ float: 'right' }} offset={[1, 5]}></Badge>
            </div>
          </NavLink>
          <NavLink to={{ pathname: "/message/create" }}>
            <div className='message_logo'>
              <div>
                <PlayCircleTwoTone />
                我发起的
              </div>
              <Badge count={createCount} style={{ float: 'right' }} offset={[1, 5]}></Badge>
            </div>
          </NavLink>
          <NavLink to={{ pathname: "/message/handle" }}>
            <div className='message_logo'>
              <div>
                <CarryOutTwoTone />
                我处理的
              </div>
              <Badge count={handleCount} style={{ float: 'right' }} offset={[1, 5]}></Badge>
            </div>
          </NavLink>
          <NavLink to={{ pathname: "/message/copy" }}>
            <div className='message_logo'>
              <div>
                <SoundTwoTone />
                抄送我的
              </div>
              <Badge count={copyCount} style={{ float: 'right' }} offset={[1, 5]}></Badge>
            </div>
          </NavLink>
          <hr></hr>
          <Menu theme="light"
            // defaultOpenKeys={toJS(this.store.openKeys)}
            selectedKeys={toJS(this.store.selectedKeys)}
            // openKeys={this.store.openKeys}
            mode={'inline'}
            onClick={this.handleMenu}
            onOpenChange={this.onOpenChange}
            onSelect={this.onMenuSelect}
          // inlineCollapsed={this.state.collapsed}
          >
            {
              menuObj.map(leaf => !leaf.displayNone && <SubMenu
                theme='light'
                key={leaf.id}
                title={<span><FolderOutlined /><span >{leaf.name}</span></span>}
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
    this.store.model = 'look'
    this.store.selectedKeys = selectedKeys;
  }
  onOpenChange = (openKeys) => {
    this.store.openKeys = openKeys;
  }
  handleMenu = ({ item, key, }) => {
    let lo = this.props.location.pathname
    this.props.HomeStore.model = 'look'
    if (key.startsWith('my')) {
      this.props.HomeStore.changeViewModel(key)
    } else if (lo != '/manage/todo' && lo != '/manage/create' && lo != '/manage/handle' && lo != '/manage/copy') {
      this.props.HomeStore.toggleMenu({ actionItem: item, actionId: key, from: 'menu-click' }, (url) => {
        if (url) {
          this.props.history.push(url);
        } else {
          alert('false');
        }
      });
    }
  }
  handleRe = (key) => {
    console.log(key);
  }
  goBack = () => {
    this.props.history.push('/index');
  }

  loadData = () => {
    const location = this.props.location.pathname
    const nowL = location.split('/')[2];
    this.props.MessageStore.setData(nowL);
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