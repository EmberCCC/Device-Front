import React, {useEffect, useState} from 'react'
import {inject, observer} from "mobx-react";
import GlobalHeader from "../../components/GlobalHeader";
import './index.less'
import {Button, Input, Modal, message, Form} from "antd";
import {useHistory} from "react-router-dom";
import {ExclamationCircleFilled} from "@ant-design/icons";


const PersonalSettingPage = observer(({HomeStore}) => {
    const [selectType, setSelectType] = useState('nickname')
    const [content, setContent] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const [title, setTitle] = useState('请修改用户名')
    const [isModalOpen, setModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory();
    const {confirm}=Modal
    useEffect(() => {
        HomeStore.ownMessage()
    }, [])
    const showConfirm = () => {
        confirm({
            title: '你确定要退出登录吗',
            icon: <ExclamationCircleFilled />,
            content: '退出登录后需要重新输入账号密码',
            okText:'确定',
            cancelText:"取消",
            onOk() {
                sessionStorage.clear()
                history.push('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const handleOk = async () => {
        let req = {'type': selectType, 'information': content}
        setIsLoading(true)
        let res = await HomeStore.editMessage(req)
        setIsLoading(false)
        messageApi.info('修改用户信息成功')
        setModalOpen(false)

    }
    const handleCancel = () => {
        setModalOpen(false)
    }
    const changeMessage = (e) => {
        return () => {
            setSelectType(e)
            const maps = {"nickname": "修改用户名", "password": "修改密码"}
            setTitle(maps[e])
            setModalOpen(true)
        }
    }

    const ModelMessage = () => {
        if (selectType === 'nickname') {
            return (
                <Input placeholder="输入新用户名"/>
            )
        } else if (selectType === 'password') {
            return (
                <Form>
                    <Form.Item name='oldPassword'>
                        <Input.Password placeholder={"请输入旧密码"}/>
                    </Form.Item>
                    <Form.Item name='newPassword'>
                        <Input.Password placeholder={"请输入新密码"}/>
                    </Form.Item>
                    <Form.Item name={'confirmPassword'}
                               dependencies={['newPassword']}
                               hasFeedback
                               rules={[
                                   {
                                       required: true,
                                       message: '请确认你的密码',
                                   },
                                   ({getFieldValue}) => ({
                                       validator(_, value) {
                                           if (!value || getFieldValue('newPassword') === value) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('密码错误'));
                                       },
                                   }),
                               ]}>
                        <Input.Password placeholder={"重复密码"}/>
                    </Form.Item>
                </Form>
            )
        }
    }
    return (
        <div className={"Groud"}>
            {contextHolder}
            <GlobalHeader/>
            <div className={"Setting"}>
                <div className={"Setting-department Setting-container"}>
                    <div className={"Setting-container-line"}>
                        <div className={"Setting-container-line-header"}>
                            当前所在企业
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div className={"Setting-title"}>
                    基本信息
                </div>
                <div className={"Setting-container"}>
                    <div className={"Setting-container-line"}>
                        <div className={"Setting-container-line-header"}>
                            通讯录姓名
                        </div>
                        <div>
                            {HomeStore.myInfo.name}
                        </div>
                        <Button className={"Setting_chage"} type={"link"} onClick={changeMessage('nickname')}>
                            修改
                        </Button>
                    </div>

                    <div className={"Setting-container-line"}>
                        <div className={"Setting-container-line-header"}>
                            账户名称
                        </div>
                        <div>
                            {HomeStore.myInfo.userName}
                        </div>
                    </div>

                </div>
                <div className={"Setting-title"}>
                    账号安全
                </div>
                <div className={"Setting-container"}>
                    <div className={"Setting-container-line"}>
                        <div className={"Setting-container-line-header"}>
                            密码
                        </div>
                        <div>
                            ******
                        </div>
                        <Button className={"Setting_chage"} type={"link"} onClick={changeMessage('password')}>
                            修改
                        </Button>
                    </div>
                    <div className={"Setting-container-line"}>
                        <div className={"Setting-container-line-header"}>
                            手机
                        </div>
                        <div>
                            {HomeStore.myInfo.phone}
                        </div>
                    </div>
                    <div className={"Setting-container-line"}>
                        <div className={"Setting-container-line-header"}>
                            邮箱
                        </div>
                        <div>
                            {HomeStore.myInfo.email}
                        </div>
                    </div>
                </div>
                <div className={"Setting-container Setting-container-last"}>
                    <div className={"Setting-container-line"}>
                        <div className={"Setting-container-line-header"}>
                            退出账户
                        </div>
                        <Button type={"link"} className={"Setting-Quit"} onClick={showConfirm}>
                            退出
                        </Button>
                    </div>
                </div>
            </div>
            <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认"
                   cancelText="取消" confirmLoading={isLoading}>
                <ModelMessage/>
            </Modal>

        </div>
    )

})

export default inject((stores) => ({HomeStore: stores.HomeStore,}))(PersonalSettingPage);
