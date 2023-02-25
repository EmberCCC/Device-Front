import React, {Component, useState} from 'react';
import {inject, observer} from "mobx-react";
import './index.less'
import {Button, Form, Input,Radio } from "antd";
import {LockOutlined, UserOutlined,MailOutlined,PhoneOutlined,DeploymentUnitOutlined} from "@ant-design/icons";
import {useHistory } from "react-router-dom";




const FormEdit = observer(({ HomeStore }) => {
    const [radioValue,setRadioValue]=useState('boss')
    let history = useHistory()
    const login=()=>{
        history.push('/login')
    }
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setRadioValue(e.target.value)
    };
    return (
        <div className='background'>
            <div className='login_header'>
                <div className='header_left'>
                    <div className='header_left_item'>产品</div>
                    <div className='header_left_item'>方案</div>
                    <div className='header_left_item'>案例</div>
                    <div className='header_left_item'>定价</div>
                    <div className='header_left_item'>资源中心</div>
                    <div className='header_left_item'>零代码</div>
                </div>
                <div className='header_right'>
                    <div className='header_left_item'>
                        <Button onClick={login}>登录</Button>
                    </div>
                    <div className='header_left_item'>
                        <Button>注册</Button>
                    </div>
                    <div className='header_left_item'>
                        简体中文
                    </div>
                </div>
            </div>
            <div className='register_main'>
                <div className='register_body'>
                    <Radio.Group defaultValue="boss" buttonStyle="solid" className="register_radio" onChange={onChange}>
                        <Radio.Button value="boss" className="radio_item">以拥有者注册</Radio.Button>
                        <Radio.Button value="member" className="radio_item">以员工注册</Radio.Button>
                    </Radio.Group>
                    <Form className='register_Form'>
                        <Form.Item name='username' rules={[{required:true,message:"请输入你的用户名"}]}>
                            <Input
                                size="large"
                                prefix={<UserOutlined />}
                                placeholder="用户名"
                            />

                        </Form.Item>
                        <Form.Item name='nickname' rules={[{required:true,message:"请输入你的公司内昵称"}]}>
                            <Input
                                size="large"
                                prefix={<UserOutlined />}
                                placeholder="公司内昵称"
                            />

                        </Form.Item>
                        <Form.Item name='password' rules={[{required:true,message:"请输入你的密码"}]}>
                            <Input
                                size="large"
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item name='email' rules={[{required:true,message:"邮箱必填"}]}>
                            <Input
                                size="large"
                                prefix={<MailOutlined />}
                                placeholder="邮箱"
                            />
                        </Form.Item>
                        <Form.Item name='phone' >
                            <Input
                                size="large"
                                prefix={<PhoneOutlined />}
                                placeholder="手机号"
                            />
                        </Form.Item>
                        {
                            radioValue !== 'boss' ? (
                                <Form.Item
                                    name="department"
                                >
                                    <Input
                                        placeholder="加入的公司id"
                                        prefix={<DeploymentUnitOutlined />}
                                        size="large"
                                    />
                                </Form.Item>
                            ) : null
                        }
                        {
                            radioValue === 'boss' ? (
                                <Form.Item
                                    name="department_name"
                                >
                                    <Input
                                        placeholder="创建的公司名"
                                        prefix={<DeploymentUnitOutlined />}
                                        size="large"
                                    />
                                </Form.Item>
                            ) : null
                        }
                        <Form.Item name='button'>
                            <Button type="primary" htmlType="submit"  id="login-form-button" >
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </div>
    )
});

export default inject((stores) => ({ HomeStore: stores.HomeStore, }))(FormEdit);