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
@inject('HomeStore', 'MessageStore', 'TableStore', 'FormStore', 'SocketStore')
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
    const {menu} = this.props.HomeStore;
    const { waitList, launchList, handleList, copyList } = this.props.MessageStore;
    const { userAuth } = this.props.SocketStore
    return (
      <Sider
        theme='light'
        style={{ overflow: 'auto' }}
      >
        <div id='manu_container'>
          <div className='manu_top'>
            <div className='message_list'>
              <div className='message_logo' onClick={() => {
                this.props.history.push({ pathname: '/message' });
                this.props.MessageStore.setValue('loading', true)
                this.props.MessageStore.getWaitList().then(() => {
                  this.props.MessageStore.setValue('list', waitList);
                  this.props.MessageStore.setValue('model', 'wait');
                  this.props.MessageStore.setValue('loading', false)

                })


                console.log(toJS(waitList));
              }}>
                <div className='message_item'>
                  <BellTwoTone />
                  <div className='message_name'>我的待办</div>
                </div>
                <Badge count={waitList.length} style={{ float: 'right' }} offset={[1, 5]}></Badge>
              </div>
              <div className='message_logo' onClick={() => {
                this.props.history.push({ pathname: '/message' });
                this.props.MessageStore.setValue('loading', true)
                this.props.MessageStore.getLaunchList().then(() => {
                  this.props.MessageStore.setValue('list', launchList);
                  this.props.MessageStore.setValue('model', 'launch');
                  this.props.MessageStore.setValue('loading', false)

                })

                console.log(toJS(waitList));
              }}>
                <div className='message_item'>
                  <PlayCircleTwoTone />
                  <div className='message_name'>我发起的</div>
                </div>
                <Badge count={launchList.length} style={{ float: 'right' }} offset={[1, 5]}></Badge>
              </div>
              <div className='message_logo' onClick={() => {
                this.props.history.push({ pathname: '/message' });
                this.props.MessageStore.setValue('loading', true)
                this.props.MessageStore.getHandleList().then(() => {
                  this.props.MessageStore.setValue('list', handleList);
                  this.props.MessageStore.setValue('model', 'handle');
                  this.props.MessageStore.setValue('loading', false)

                })

                console.log(toJS(waitList));
              }}>
                <div className='message_item'>
                  <CarryOutTwoTone />
                  <div className='message_name'>我处理的</div>
                </div>
                <Badge count={handleList.length} style={{ float: 'right' }} offset={[1, 5]}></Badge>
              </div>
              <div className='message_logo' onClick={() => {
                this.props.history.push({ pathname: '/message' });
                this.props.MessageStore.setValue('loading', true)

                this.props.MessageStore.getCopyList().then(() => {
                  this.props.MessageStore.setValue('list', copyList);
                  this.props.MessageStore.setValue('model', 'copy');
                  this.props.MessageStore.setValue('loading', false)

                })
              }}>
                <div className='message_item'>
                  <SoundTwoTone />
                  <div className='message_name'>抄送我的</div>
                </div>
                <Badge count={copyList.length} style={{ float: 'right' }} offset={[1, 5]}></Badge>
              </div>
            </div>
            <div className='left_menu_all'>
              {
                menu.map((item, index) => {
                  let idIndex = this.store.openMenuKeys.indexOf(item['menuId']);
                  return (
                    <div className='left_menu_father' key={index}>
                      <div onClick={() => {
                        let iArr = [...this.store.openMenuKeys]
                        if (idIndex > -1) {
                          iArr.splice(idIndex, 1)
                        } else {
                          iArr.push(item['menuId'])
                        }
                        this.store.setValue('openMenuKeys', iArr)
                      }} className='left_menu_f1'>
                        {idIndex > -1 && (
                          <FolderOpenOutlined className='node_icon' style={{ color: "#0db3a6" }} />
                        )}
                        {idIndex <= -1 && (
                          <FolderFilled className='node_icon' style={{ color: "#0db3a6" }} />
                        )}
                        <span className='node_name'>{item.menuName}
                        </span>
                      </div>
                      {
                        item.simpleForms.length > 0 && (
                          item.simpleForms.map((one, oIndex) => {
                            return (
                              <div key={oIndex} onClick={() => {
                                this.props.history.push({ pathname: '/common' });
                                this.props.FormStore.getFormField({ 'formId': one['formId'] })
                                this.props.HomeStore.setValue('firstFormId', one['formId'])
                                this.props.FormStore.getFormAuthInfo({ 'formId': one['formId'] })
                                this.props.HomeStore.setValue('formInfo', one)
                                this.props.SocketStore.getMyInfo()
                              }} className={`left_menu_child ${idIndex > -1 ? 'display' : 'undisplay'}`}>
                                <FileTextOutlined className='node_icon' style={{ 'color': `${one['type'] == 0 ? "#5da0cc" : "rgb(245, 164, 57)"}` }} />
                                <span className='node_name'>{one.formName}</span>
                              </div>
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
          {
            (userAuth['creater'] || userAuth['sysAdmin']) && (
              <div className='bottom_name' onClick={() => {
                console.log(11);
                this.props.history.push({
                  pathname: '/manage'
                });
              }} ><ToolOutlined style={{ marginRight: '5px' }} />管理后台</div>
            )
          }
        </div>

      </Sider>
    );
  }
  componentDidMount() {
    firstMount = false;
    if (sessionStorage.getItem('selfToken') != null) {
      this.props.MessageStore.getWaitList()
      this.props.MessageStore.getLaunchList()
      this.props.MessageStore.getHandleList()
      this.props.MessageStore.getCopyList()
      this.props.SocketStore.getMyInfo();
    }
    this.props.HomeStore.initMenu(this.props.location.pathname);
    this.props.HomeStore.getMenuList()
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
}
export default MenuLayout;