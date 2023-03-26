import React, {useEffect, useState} from 'react'
import {inject, observer} from "mobx-react";
import GlobalHeader from "../../components/GlobalHeader";
import './index.less'
import {Button, Input, Modal, message, Form, Spin} from "antd";
import {useHistory} from "react-router-dom";
import {ExclamationCircleFilled} from "@ant-design/icons";
import {toJS} from "mobx";
import ModelMessage from "./components/modelMessage";
import ModelMEssagePwd from "./components/modelMEssagePwd";
import {person_config_map}from "./config/Person_config"

const PersonalSettingPage = observer(({HomeStore,SocketStore}) => {
    const [selectType, setSelectType] = useState('nickname')
    const [content, setContent] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const [title, setTitle] = useState('请修改用户名')
    const [isModalOpen, setModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [oldPassword,setOldPassword]=useState("")
    const [info,setInfo]=useState(HomeStore.myInfo)
    const [showId,setShowId]=useState(false)
    const [isPwdModal,setIsPwdModal]=useState(false)
    const history = useHistory();
    const [form]=Form.useForm()
    const {confirm}=Modal
    let timerId = null

    useEffect(() => {
        HomeStore.ownMessage()
        SocketStore.getMyInfo()
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
        if(res.code===0){
            messageApi.success(res.data.msg)
            await HomeStore.ownMessage()
        }else{
            messageApi.info(
                {
                    type:'error',
                    content:res.data.msg
                }
            )
        }
        // if(selectType!=='password'){
        //     HomeStore.setValue('myInfo', {...toJS(HomeStore.myInfo),[selectType]:req.information})
        // }
        //

        setIsLoading(false)
        setModalOpen(false)
    }
    const handleCancel = () => {
        setModalOpen(false)
    }
    const changeMessage = (e) => {
        return () => {
            setSelectType(e)
            setTitle(person_config_map[e])
            if(e==='password'){
                setIsPwdModal(true)
            }else{
                setModalOpen(true)
            }
        }
    }
    const handlePwdCancel=(e)=>{
        setIsPwdModal(false)
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
                        <div className={"Setting-container-line-content"}>
                            {info.tenementName}
                        </div>
                    </div>
                    {
                        (SocketStore.userAuth.creater || SocketStore.userAuth.sysAdmin) &&
                        <div className={"Setting-container-line"}>
                        <div className={"Setting-container-line-header"}>
                            企业Id
                        </div>
                        <div className={"Setting-container-line-content"}>
                            {!showId ? '******' : info.tenementId}
                        </div>
                        <Button type={"link"} className={"Setting_chage"} onClick={() => setShowId(!showId)}>
                            {showId ? '隐藏' : '显示'}
                        </Button>
                    </div>}
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
                        <div className={"Setting-container-line-content"}>
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
                        <div className={"Setting-container-line-content"}>
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
                        <div className={"Setting-container-line-content"}>
                            {HomeStore.myInfo.phone}
                        </div>
                        <Button className={"Setting_chage"} type={"link"} onClick={changeMessage('telephone')}>
                            修改
                        </Button>
                    </div>
                    <div className={"Setting-container-line"}>
                        <div className={"Setting-container-line-header"}>
                            邮箱
                        </div>
                        <div className={"Setting-container-line-content"}>
                            {HomeStore.myInfo.email}
                        </div>
                        <Button className={"Setting_chage"} type={"link"} onClick={changeMessage('email')}>
                            修改
                        </Button>
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
                   destroyOnClose
                   cancelText="取消" confirmLoading={isLoading}>
                <ModelMessage selectType={selectType} setContent={setContent}/>
            </Modal>
            <Modal title={title} open={isPwdModal} footer={[]} onCancel={handlePwdCancel} destroyOnClose>
                <ModelMEssagePwd  setIsPwdModal={setIsPwdModal}></ModelMEssagePwd>
            </Modal>

        </div>
    )

})

export default inject((stores) => ({HomeStore: stores.HomeStore,SocketStore:stores.SocketStore}))(PersonalSettingPage);
