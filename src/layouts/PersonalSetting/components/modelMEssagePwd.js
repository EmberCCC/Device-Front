import React, {useState} from 'react';
import {Button, Form, Input, message} from "antd";
import {inject, observer} from "mobx-react";

const tailLayout = {
    wrapperCol: {
        span: 30,
    },
};

const ModelMEssagePwd = observer(({HomeStore,setIsPwdModal}) => {
    const [form]=Form.useForm()
    const onCancel=()=>{
        setIsPwdModal(false)
    }
    const onSubmit=async (e)=>{
        console.log(e)
        let res =await HomeStore.confirmPwd({'oldPassword':e.oldPassword})
        if (res.code===0){
            let req={'type': 'password', 'information': e.newPassword}
            let res = await HomeStore.editMessage(req)
            if (res.code===0){
                message.success('修改成功')
                setIsPwdModal(false)
                form.resetFields();
            }
        }
    }

    return (
        <div>
            <Form
                form={form}
                onFinish={onSubmit}
            >
                <Form.Item name='oldPassword'
                           validateTrigger="onBlur"
                           rules={[
                               {
                                   required: true,
                                   message:"旧密码为必填项"
                               }
                           ]}
                >
                    <Input.Password    placeholder={"请输入旧密码"}/>
                </Form.Item>
                <Form.Item name='newPassword'
                           rules={[
                               {
                                   required:true,
                                   message:'输入新密码'
                               }
                           ]}
                >
                    <Input.Password placeholder={"请输入新密码"}/>
                </Form.Item>
                <Form.Item
                            name={'confirmPassword'}
                           dependencies={['newPassword']}
                           hasFeedback
                           rules={[
                               {
                                   required: true,
                                   message: '请确认你的密码',
                               },
                               ({getFieldValue}) => ({
                                   validator(_, value) {
                                       console.log('queren')
                                       if (!value || getFieldValue('newPassword') === value) {
                                           return Promise.resolve();
                                       }
                                       return Promise.reject(new Error('与新密码不一致'));
                                   },
                               }),
                           ]}>
                    <Input.Password  placeholder={"重复密码"}/>
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                >
                    <Button   onClick={onCancel} style={{margin:'0 20px 0 0'}}>
                        取消
                    </Button>
                    <Button htmlType="submit"  type="primary">
                        确定
                    </Button>

                </Form.Item>
            </Form>

        </div>
    );
});

export default inject((stores) => ({HomeStore: stores.HomeStore,}))(ModelMEssagePwd);;
