import React, {useState} from 'react';
import {inject, observer} from "mobx-react";
import {Button, Form, Input, message, Radio, Result} from "antd";
import {useHistory} from "react-router-dom";
import {DeploymentUnitOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";

const RegisterForm=observer((HomeStore,FormStore,setIsOk)=>{
    const [radioValue, setRadioValue] = useState('boss')
    const [messageApi, contextHolder] = message.useMessage();

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setRadioValue(e.target.value)
    };
    const submit = async (e) => {
        console.log(e)
        const user = {...e}
        delete user['button']
        delete user['confirmPassword']
        if (radioValue === 'boss') {
            delete user['tenementId']
            let res = await HomeStore.registerUser(user)
            console.log(res)
            if (res.data.code === 1) {
                messageApi.open({
                    type: 'error',
                    content: res.data.msg,
                });
            } else {
                let tenementIdObj=res.data.data
                setIsOk(true)
                HomeStore.setValue('tenementIdObj',tenementIdObj)
                let res2 = await FormStore.initMenu(tenementIdObj)
                messageApi.open({
                    type: res2.data.code === 1 ? 'error' : 'success',
                    content: res2.data.msg,
                });

            }
        } else if (radioValue === 'member') {
            delete user['tenementName']
            let res = await HomeStore.registerEmployee(user)
            messageApi.open({
                type: res.data.code === 1 ? 'error' : 'success',
                content: res.data.msg,
            });


        }
    }
    return (
        <div className='register_main'>
            {contextHolder}
            <div className='register_body'>
                <Radio.Group defaultValue="boss" buttonStyle="solid" className="register_radio" onChange={onChange}>
                    <Radio.Button value="boss" className="radio_item">以拥有者注册</Radio.Button>
                    <Radio.Button value="member" className="radio_item">以员工注册</Radio.Button>
                </Radio.Group>
                <Form className='register_Form'
                      onFinish={submit}
                >
                    <Form.Item name='username' rules={[{required: true, message: "请输入你的用户名"}]}>
                        <Input
                            size="large"
                            prefix={<UserOutlined/>}
                            placeholder="用户名"
                        />

                    </Form.Item>
                    <Form.Item name='nickname' rules={[{required: true, message: "请输入你的公司内昵称"}]}>
                        <Input
                            size="large"
                            prefix={<UserOutlined/>}
                            placeholder="公司内昵称"
                        />

                    </Form.Item>
                    <Form.Item name='password' rules={[{required: true, message: "请输入你的密码"}]}>
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item name={'confirmPassword'}
                               dependencies={['password']}
                               hasFeedback
                               rules={[
                                   {
                                       required: true,
                                       message: '请确认你的密码',
                                   },
                                   ({getFieldValue}) => ({
                                       validator(_, value) {
                                           if (!value || getFieldValue('password') === value) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('密码错误'));
                                       },
                                   }),
                               ]}>
                        <Input.Password
                            size="large"
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="确认你的密码"
                        />
                    </Form.Item>
                    <Form.Item name='email' rules={[{required: true, message: "邮箱必填"}]}>
                        <Input
                            size="large"
                            prefix={<MailOutlined/>}
                            placeholder="邮箱"
                        />
                    </Form.Item>
                    <Form.Item name='phone'>
                        <Input
                            size="large"
                            prefix={<PhoneOutlined/>}
                            placeholder="手机号"
                        />
                    </Form.Item>
                    {
                        radioValue !== 'boss' ? (
                            <Form.Item
                                name="tenementId"
                                rules={[{required: true, message: "请输入公司id"}]}
                            >
                                <Input
                                    placeholder="加入的公司id"
                                    prefix={<DeploymentUnitOutlined/>}
                                    size="large"
                                />
                            </Form.Item>
                        ) : null
                    }
                    {
                        radioValue === 'boss' ? (
                            <Form.Item
                                name="tenementName"
                                rules={[{required: true, message: "请输入公司名"}]}
                            >
                                <Input
                                    placeholder="创建的公司名"
                                    prefix={<DeploymentUnitOutlined/>}
                                    size="large"
                                />
                            </Form.Item>
                        ) : null
                    }
                    <Form.Item name='button'>
                        <Button type="primary" htmlType="submit" id="login-form-button">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
})
export default inject((stores) => ({HomeStore: stores.HomeStore, FormStore: stores.FormStore}))(RegisterForm);
