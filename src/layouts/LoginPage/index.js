/*
 * @Author: your name
 * @Date: 2022-01-24 16:24:19
 * @LastEditTime: 2022-04-09 18:43:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\layouts\LoginPage\index.js
 */
import React from 'react';
import { Input, Checkbox, Button, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { setCookie, getCookie, clearCookie } from 'utils/dataTools';
import './index.less';

@withRouter
@inject('HomeStore')
@observer
class LoginPage extends React.Component {
  render() {
    return <div className='login_container'>
      <div className='login_form'>
        <div className='basic_login'>
          <div className='login_logo'>
            <img src='https://assets-boranet.oss-cn-hangzhou.aliyuncs.com/img/login_logo.png' alt='博拉科技' />
          </div>
          <div>
            <div className='login_title' style={{ paddingTop: 27, paddingBottom: 5, color: '#161616', letterSpacing: 10 }}>设备协同管理</div>
          </div>
          <div style={{ height: 4, width: 80, background: 'rgba(98, 54, 255, 1)', marginTop: 17 }}></div>
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
    </div>;
  }
  handleSubmit = values => {
    console.log(values);
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
      client_id:'pc',
      client_secret:'secret',
    }, (result) => {
      console.log(result);
      const { success, token } = result;
      console.log(token);
      if (success) {
        console.log(token);
        sessionStorage.setItem('selfToken', 'Bearer '+token); // 设置前局登陆token
        sessionStorage.setItem('username', values.username); // 设置登录用户名
        this.props.history.push({
          pathname: '/basic',
          state: { username: values.username, password: values.password, selfToken: token }
        });
      }
    })
  };
}
export default LoginPage;