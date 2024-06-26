import { BulbOutlined, LeftOutlined, QuestionCircleTwoTone, ToolTwoTone } from "@ant-design/icons";
import { Menu } from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import InConLayout from "./inConLayout";

import './index.css'
import MaLayout from "./MaLayout";
const SocketManage = observer(({ SocketStore, props }) => {
    const { SocketId, userAuth } = SocketStore;
    const item = [
        { label: '内部组织', key: '1' },
        { label: '互联组织', key: '2', disabled: true },
        { label: '管理员', key: '3', disabled: !(userAuth['creater'] || userAuth['sysAdmin']) }
    ]
    const changeModel = (key) => {
        console.log(key);
        SocketStore.setValue('SocketId', key.key)
        SocketStore.setValue('maSelectKey', -1)
    }
    useEffect(() => {
        SocketStore.getMyInfo()
    },[])
    return (
        <div className="socket_all">
            <div className="socket_header">
                <NavLink to='/common'>
                    <div className="socket_header_left"><LeftOutlined style={{ color: '#0db3a6' }} />  通讯录</div>
                </NavLink>
                <Menu theme="light" mode='horizontal' selectedKeys={[SocketId]} justify='center' onClick={changeModel} items={item} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10 }}>
                    <BulbOutlined className='d_icon' style={{ marginRight: '15px' }} />
                    <QuestionCircleTwoTone className='d_icon' style={{ marginRight: '15px' }} />
                    <ToolTwoTone className='d_icon' />
                </div>
            </div>
            {
                SocketId == '1' && (
                    <InConLayout />
                )
            }
            {
                SocketId == '3' && (
                    <MaLayout />
                )
            }
        </div>
    )
})

export default inject((stores) => ({ SocketStore: stores.SocketStore }))(SocketManage);