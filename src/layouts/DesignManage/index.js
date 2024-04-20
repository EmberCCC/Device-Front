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
@inject('DesignStore', 'HomeStore', 'FlowStore', 'SocketStore')
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

        const { firstFormId, itemDataT, formInfo } = this.props.HomeStore
        const { PersonList } = this.props.DesignStore
        const changeModel = ({ item, key, keyPath, domEvent }) => {
            const arr = {
                1: '/design/edit',
                2: '/design/expand',
                3: '/design/flow',
                4: '/design/flow',
            }
            this.props.DesignStore.changeDesignId(key)
            let formId = sessionStorage.getItem('formId') ? sessionStorage.getItem('formId') : this.props.HomeStore.firstFormId
            if (key == '3') {
                this.props.FlowStore.getOneFlow({ 'formId': formId }).then(() => {
                    this.props.FlowStore.setValue('canOb', false)
                    this.props.history.push({ pathname: arr[key] });
                })
            } else {
                this.props.FlowStore.getOneFlow({ 'formId': formId }).then(() => {
                    this.props.history.push({ pathname: arr[key] });
                })
            }
        }
        const { DesignId } = this.props.DesignStore;

        const item = [
            { label: '表单设计', key: '1' },
            { label: '扩展功能', key: '2' ,disabled: true},
            { label: '表单发布', key: '3', disabled: true },
            { label: '流程设计', key: '4', disabled: sessionStorage.getItem('formName') ? JSON.parse(sessionStorage.getItem('formName'))['type'] !==1 : false }
        ]
        let formName = sessionStorage.getItem('formName') && sessionStorage.getItem('formName') != '{}' ? JSON.parse(sessionStorage.getItem('formName'))['formName'] : '机房'
        return (
            <Layout>
                <Header id={"headerItem"} className="header">
                    <NavLink to='/common'>
                        <span className='form_title'>{formName}</span>
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

    componentDidMount() {
        const arr = {
            1: '/design/edit',
            2: '/design/form',
            3: '/design/flow',
            4: '/design/flow',
        }
        this.props.DesignStore.changeDesignId('1')
        const { DesignId } = this.props.DesignStore
        if (!sessionStorage.getItem('formId')) {
            this.history.push({ pathname: '/message' })
        } else {
            console.log(toJS(DesignId));
            this.props.history.push({ pathname: arr[DesignId] });
            this.props.SocketStore.getMyInfo()
        }

    }
}

export default DesignManage;
