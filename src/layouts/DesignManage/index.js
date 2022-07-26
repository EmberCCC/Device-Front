/*
 * @Author: your name
 * @Date: 2022-03-28 20:01:19
 * @LastEditTime: 2022-07-26 10:27:17
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\BasicManage\index.js
 */
import React from 'react'
import { Layout, Menu } from 'antd';
import { LogoutOutlined, BulbOutlined, QuestionCircleTwoTone, ToolTwoTone } from '@ant-design/icons';
import { NavLink, withRouter } from 'react-router-dom';
import { getCookie } from 'utils/dataTools';
import { firstFormName } from '../../constants/status_constant'
import './index.css'
import { inject } from 'mobx-react';
import { toJS } from 'mobx';
const { Header } = Layout;

@withRouter
@inject('DesignStore', 'HomeStore', 'FlowStore')
class DesignManage extends React.Component {
    render() {
        const backToLogin = (e) => {
            if (e.key === "logout") {
                sessionStorage.clear();
                this.props.history.push('/login')
            }
        }
        const menu = (
            <Menu selectedKeys={[]} style={{ marginTop: '-12px' }} onClick={backToLogin}>
                <div style={{ textAlign: "center" }}>
                    {getCookie('username')}
                </div>
                <Menu.Item key="logout">
                    <LogoutOutlined />
                    退出登录
                </Menu.Item>
            </Menu>
        );

        const { firstFormId, itemDataT } = this.props.HomeStore
        const { PersonList } = this.props.DesignStore
        const changeModel = ({ item, key, keyPath, domEvent }) => {
            const arr = {
                1: '/design/edit',
                2: '/design/expand',
                3: '/design/flow',
                4: '/design/flow',
            }
            let itemData = { ...toJS(itemDataT) }
            let PersonListT = { ...toJS(PersonList) };
            this.props.DesignStore.changeDesignId(key)

            if (key == '3') {
                this.props.FlowStore.getOneFlow({ 'formId': firstFormId }).then(() => {
                    this.props.history.push({ pathname: arr[key], state: { firstFormId, itemData, PersonListT } });
                })
            } else {
                this.props.FlowStore.getOneFlow({ 'formId': firstFormId }).then(() => {
                    this.props.history.push({ pathname: arr[key], state: { firstFormId, itemData, PersonListT } });
                })
            }
        }
        const { DesignId } = this.props.DesignStore;
        const item = [
            { label: '表单设计', key: '1' },
            { label: '扩展功能', key: '2' },
            { label: '表单发布', key: '3' },
            { label: '流程设计', key: '4' }
        ]
        return (
            <Layout>
                <Header className="header">
                    <NavLink to='/basic'>
                        <span className='form_title'>{firstFormName[firstFormId]}</span>
                    </NavLink>
                    <Menu theme="light" mode="horizontal" selectedKeys={[DesignId]} justify='center' className='headerMenu' onClick={changeModel} items={item} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10 }}>
                        <BulbOutlined className='d_icon' style={{ marginRight: '15px' }} />
                        <QuestionCircleTwoTone className='d_icon' style={{ marginRight: '15px' }} />
                        <ToolTwoTone className='d_icon' />
                    </div>
                </Header>
                {this.props.children}
            </Layout>
        );
    }

    componentWillMount() {
        const arr = {
            1: '/design/edit',
            2: '/design/form',
            3: '/design/flow',
            4: '/design/flow',
        }
        this.props.DesignStore.changeDesignId('1')
        const { DesignId, PersonList } = this.props.DesignStore
        const { firstFormId, itemDataT } = this.props.HomeStore
        console.log(toJS(DesignId));
        let itemData = { ...toJS(itemDataT) }
        let PersonListT = { ...toJS(PersonList) };
        this.props.history.push({ pathname: arr[DesignId], state: { firstFormId, itemData, PersonListT } });
    }
}

export default DesignManage;