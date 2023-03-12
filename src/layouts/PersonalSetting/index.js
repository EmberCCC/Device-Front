import React, {useEffect, useState} from 'react'
import {inject, observer} from "mobx-react";
import GlobalHeader from "../../components/GlobalHeader";
import './index.less'
import {Button, Input, Modal, message, Form, Spin} from "antd";
import {useHistory} from "react-router-dom";
import {ExclamationCircleFilled} from "@ant-design/icons";
import {toJS} from "mobx";


const PersonalSettingPage = observer(({HomeStore}) => {
    const [selectType, setSelectType] = useState('nickname')
    const [content, setContent] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const [title, setTitle] = useState('请修改用户名')
    const [isModalOpen, setModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [oldPassword,setOldPassword]=useState("")
    const [info,setInfo]=useState(HomeStore.myInfo)
    const [olpPasswordTips,setolpPasswordTips]=useState(false)
    const history = useHistory();
    const [form]=Form.useForm()
    const {confirm}=Modal
    let timerId = null

    useEffect(() => {
        HomeStore.ownMessage()
    }, [])
    useEffect(()=>{
        setInfo(HomeStore.myInfo)
        console.log(toJS(info))
    },[JSON.stringify(HomeStore.myInfo)])

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
        if(req.type==='password'){
            let res =await HomeStore.confirmPwd({'oldPassword':oldPassword})
            if (res.code!==0){
                setIsLoading(false)
                return
            }
        }

        let res = await HomeStore.editMessage(req)
        console.log(res)
        if(res.code==='0'){
            messageApi.info(res.data.msg)
        }else{
            messageApi.info(
                {
                    type:'error',
                    content:res.data.msg
                }
            )
        }
        if(selectType==='nickname'){
            HomeStore.setValue('myInfo', {...toJS(HomeStore.myInfo),'name':req.information})
        }
        setIsLoading(false)
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
        return (
            <Spin tip="Loading" spinning={isLoading}>
                {selectType === 'nickname'&&
                    <Input onBlur={(e)=> setContent(e.target.value)} placeholder="输入新用户名"/>
                }
                {selectType === 'password'&&
                    <Form
                    form={form}>
                        <Form.Item name='oldPassword'
                                   // validateStatus={olpPasswordTips.validateStatus}
                                   // help={olpPasswordTips.help}
                                   validateTrigger="onBlur"
                                   rules={[
                                       {
                                           required: true,
                                           message:"旧密码为必填项"
                                       }
                                   ]}


                        >
                            <Input.Password    onBlur={(e)=> setOldPassword(e.target.value)} placeholder={"请输入旧密码"}/>
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
                                               console.log('queren')
                                               if (!value || getFieldValue('newPassword') === value) {
                                                   return Promise.resolve();
                                               }
                                               return Promise.reject(new Error('与新密码不一致'));
                                           },
                                       }),
                                   ]}>
                            <Input.Password onBlur={(e)=> setContent(e.target.value)} placeholder={"重复密码"}/>
                        </Form.Item>
                    </Form>
                }
            </Spin>
        )

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
                            {info.tenementName}
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
                            {info.name}
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
                            {info.userName}
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
