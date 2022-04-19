/*
 * @Author: your name
 * @Date: 2022-03-28 20:01:19
 * @LastEditTime: 2022-04-19 15:20:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\BasicManage\index.js
 */
import React from 'react'
import { Layout, Button, Menu, Dropdown, Divider, Modal } from 'antd';
import { LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { NavLink, withRouter } from 'react-router-dom';
import { getCookie } from 'utils/dataTools';
import NoticePanel from 'components/GlobalHeader/NoticePanel';
import './index.css'
import { inject } from 'mobx-react';
const { Header, Sider, Content } = Layout;

@withRouter
@inject('DesignStore')
@inject('HomeStore')
class DesignManage extends React.Component {

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
        const {firstFormId} = this.props.HomeStore.firstFormId
        const changeModel = ({ item, key, keyPath, domEvent }) => {
            const arr = {
                1: '/design/edit',
                2: '/design/form',
                3: '/design/flow',
                4: '/design/flow',
            }
            this.props.DesignStore.changeDesignId(key)
            this.props.history.push({pathname:arr[key],state : { firstFormId : firstFormId }});
        }
        const {DesignId} = this.props.DesignStore;
        return (
            <Layout>
                <Header className="header">
                    <NavLink to='/basic'><Button type='dashed' className='backButton'>Back</Button></NavLink>
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={[DesignId]} justify='center' className='headerMenu' onClick={changeModel}>
                        <Menu.Item key="1">表单设计</Menu.Item>
                        <Menu.Item key="2">扩展功能</Menu.Item>
                        <Menu.Item key="3">表单发布</Menu.Item>
                        <Menu.Item key="4">流程设计</Menu.Item>
                    </Menu>
                    <div style={{ display: 'flex', alignItems: 'center', paddingRight: 25 }}>
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
                {this.props.children}
            </Layout>
        );
    }

    componentWillMount(){
        const arr = {
            1: '/design/edit',
            2: '/design/form',
            3: '/design/flow',
            4: '/design/flow',
        }
        const {DesignId} = this.props.DesignStore
        this.props.history.push({pathname:arr[DesignId],state : { firstFormId : 1 }});
    }
}

export default DesignManage;