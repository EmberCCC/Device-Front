/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-07 16:13:38
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-31 23:44:06
 * @FilePath: \bl-device-manage-test\src\layouts\LoginPage\loginLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'
import { clearCookie, setCookie } from 'utils/dataTools'

import './index.less'


@withRouter
@inject('HomeStore','SocketStore','MessageStore')
@observer
class LoginLayout extends Component {
    render() {
        return (
            <div className='login_window'>
                <div className='basic_login'>
                    <div>
                        <div className='login_title' style={{ paddingTop: 27, paddingBottom: 5, color: '#161616', letterSpacing: 10 }}>设备协同管理</div>
                    </div>
                    <div style={{ height: 4, width: 80, background: '#0db3a6', marginTop: 17 }}></div>
                    <Form onFinish={this.handleSubmit} className="login-form">
                        <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input
                                size="large"
                                prefix={<UserOutlined />}
                                placeholder="用户名"
                                style={{ maxWidth: 290 }}
                            />
                        </Form.Item>
                        <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input
                                size="large"
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="密码"
                                style={{ maxWidth: 290 }}
                            />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                        <Form.Item >
                            <div className='login-btn'>
                                <Button type="primary" style={{ maxWidth: 290 }} htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
    handleSubmit = values => {
        if (values.remember) {
            for (let name in values) {
                setCookie(name, values[name]);
            }
        } else {
            for (let name in values) {
                clearCookie(name);
            }
        }
        // 请求登陆接口
        this.props.HomeStore.setLogin({
            grant_type: 'password',
            username: values.username,
            password: values.password,
            client_id: 'pc',
            client_secret: 'secret',
        }, (result) => {
            const { success, token } = result;
            if (success) {
                sessionStorage.setItem('selfToken', 'Bearer ' + token); // 设置前局登陆token
                sessionStorage.setItem('username', values.username); // 设置登录用户名
                this.props.SocketStore.getMyInfo();
                this.props.MessageStore.getWaitList()
                this.props.MessageStore.getLaunchList()
                this.props.MessageStore.getHandleList()
                this.props.MessageStore.getCopyList()
                this.props.history.push({
                    pathname: '/common',
                    state: { username: values.username, password: values.password, selfToken: token }
                });
            }
        })
    };
}
export default LoginLayout
