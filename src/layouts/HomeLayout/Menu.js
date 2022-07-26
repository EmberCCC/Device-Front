import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import './index.less';
import { BellTwoTone, CarryOutTwoTone, FileTextOutlined, FolderFilled, FolderOpenOutlined, FolderOutlined, PlayCircleTwoTone, SoundTwoTone, ToolOutlined } from '@ant-design/icons';
import { Menu, Layout, Badge } from 'antd';
import { toJS } from 'mobx';
import { MenuObj } from 'constants/configs';
const { Sider } = Layout;

let firstMount = false;
@withRouter
@inject('HomeStore', 'MessageStore', 'TableStore', 'FormStore')
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
    const { todoCount, createCount, handleCount, copyCount } = this.props.MessageStore;
    return (
      <Sider
        theme='light'
        style={{ overflow: 'auto' }}
      >
        <div id='manu_container'>
          <div className='manu_top'>
            <div className='message_list'>
              <div className='message_logo'>
                <div className='message_item'>
                  <BellTwoTone />
                  <div className='message_name'>我的待办</div>
                </div>
                <Badge count={todoCount} style={{ float: 'right' }} offset={[1, 5]}></Badge>
              </div>
              <div className='message_logo'>
                <div className='message_item'>
                  <PlayCircleTwoTone />
                  <div className='message_name'>我发起的</div>
                </div>
                <Badge count={createCount} style={{ float: 'right' }} offset={[1, 5]}></Badge>
              </div>
              <div className='message_logo'>
                <div className='message_item'>
                  <CarryOutTwoTone />
                  <div className='message_name'>我处理的</div>
                </div>
                <Badge count={handleCount} style={{ float: 'right' }} offset={[1, 5]}></Badge>
              </div>
              <div className='message_logo'>
                <div className='message_item'>
                  <SoundTwoTone />
                  <div className='message_name'>抄送我的</div>
                </div>
                <Badge count={copyCount} style={{ float: 'right' }} offset={[1, 5]}></Badge>
              </div>
            </div>
            <div className='left_menu_all'>
              {
                MenuObj.leafMenuModels.map((item, index) => {
                  let idIndex = this.store.openMenuKeys.indexOf(item['id']);
                  return (
                    <div className='left_menu_father'>
                      <div onClick={() => {

                        let iArr = [...this.store.openMenuKeys]
                        if (idIndex > -1) {
                          iArr.splice(idIndex, 1)
                        } else {
                          iArr.push(item['id'])
                        }
                        this.store.setValue('openMenuKeys', iArr)
                        console.log(this.store.openMenuKeys);
                      }} className='left_menu_f1'>
                        {idIndex > -1 && (
                          <FolderOpenOutlined className='node_icon' style={{ color: "#0db3a6" }} />
                        )}
                        {idIndex <= -1 && (
                          <FolderFilled className='node_icon' style={{ color: "#0db3a6" }} />
                        )}
                        <span className='node_name'>{item.name}
                        </span>
                      </div>
                      {
                        item.leafMenuModels.length > 0 && (
                          item.leafMenuModels.map((one, oIndex) => {
                            return (
                              <div onClick={() => {
                                this.props.TableStore.getAllData({ formId: one['id'] }, 'myself')
                                this.props.FormStore.getFormField({ formId: one['id'] })
                                this.props.HomeStore.setValue('firstFormId', one['id'])

                              }} className={`left_menu_child ${idIndex > -1 ? 'display' : 'undisplay'}`}><FileTextOutlined className='node_icon' style={{ color: '#5da0cc' }} /><span className='node_name'>{one.name}</span></div>
                            )
                          })
                        )
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='bottom_name'><ToolOutlined style={{marginRight:'5px'}}/>管理后台</div>
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
    if (key.startsWith('my')) {
      this.props.HomeStore.changeViewModel(key)
    } else if (lo != '/manage/todo' && lo != '/manage/create' && lo != '/manage/handle' && lo != '/manage/copy') {
      console.log(key);
      this.props.TableStore.getAllData({ formId: key }, 'myself')
      this.props.FormStore.getFormField({ formId: key })
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