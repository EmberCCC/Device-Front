import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {Button, Form, Input, message, Radio, Result} from "antd";
import {useHistory} from "react-router-dom";
import {DeploymentUnitOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {isDataExist} from "../../../utils/dataTools";

const RegisterForm=observer(({HomeStore, FormStore, setIsOk})=>{
    const [radioValue, setRadioValue] = useState('boss')
    const [messageApi, contextHolder] = message.useMessage();
    const history= useHistory()
    const [form]=Form.useForm()
    const [Loading,setLoading]=useState(false)
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        form.resetFields();
        setRadioValue(e.target.value)

    };

    const submit = async (e) => {
        console.log(e)
        const user = {...e}
        delete user['button']
        delete user['confirmPassword']
        setLoading(true)
        if (radioValue === 'boss') {
            delete user['tenementId']
            let res = await HomeStore.registerUser(user)
            console.log(res)
            if(!isDataExist(res)){
                return
            }
            if(res.data.data.tenementId<0){
                messageApi.open({
                    type:'error',
                    content:res.data.msg
                })
                setLoading(false)
                return
            }
            if (res?.data?.code !== 0) {
                setLoading(false)
                return
            } else {
                let tenementIdObj=res.data.data
                HomeStore.setValue('tenementIdObj',tenementIdObj)
                let res2 = await FormStore.initMenu(tenementIdObj)
                setLoading(false)
                setIsOk(true)
                messageApi.open({
                    type: res2.data.code === 1 ? 'error' : 'success',
                    content: res2.data.msg,
                });
            }
        } else if (radioValue === 'member') {
            delete user['tenementName']
            let res = await HomeStore.registerEmployee(user)
            if(res.code!==0){
                return
            }
            messageApi.open({
                type: res.data.data !==undefined ? 'error' : 'success',
                content: res.data.msg,
            });
            setLoading(false)
            if(res.data.data===undefined){
                history.push('/login')
            }
        }
    }
    const isRegisterUserName=(s)=>  {
        var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
        if (!patrn.exec(s))
            return false
	return true
    }
    const isNumber=(s)=>{
        if(!(/^[0-9]+$/.test(s))){
            return false
        }
        return true
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
                      form={form}
                >
                    <Form.Item name='username'
                               validateTrigger="onBlur"
                               rules={[
                        {required: true, message: "请输入你的用户名"},
                        {
                            validator:async (_, value) =>{
                                // let res =await HomeStore.confirmPwd({'oldPassword':value})
                                if(isRegisterUserName(value)){
                                    return Promise.resolve()
                                }else{
                                    return Promise.reject(new Error("用户名必须长度为5-20,以字母开头可带数字、‘.’，‘_’的字符"));
                                }
                            }
                        }
                    ]
                    }>
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
                                rules={[{required: true, message: "请输入公司id"},
                                    {
                                        validator:async (_, value) =>{
                                            // let res =await HomeStore.confirmPwd({'oldPassword':value})
                                            if(isNumber(value)){
                                                return Promise.resolve()
                                            }else{
                                                return Promise.reject(new Error("公司id出错"));
                                            }
                                        }
                                    }]}

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
                        <Button type="primary" htmlType="submit" id="login-form-button" loading={Loading}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
})
export default inject((stores) => ({HomeStore: stores.HomeStore, FormStore: stores.FormStore}))(RegisterForm);
