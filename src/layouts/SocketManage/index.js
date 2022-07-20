/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-19 23:02:26
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-20 14:56:20
 * @FilePath: \bl-device-manage-test\src\layouts\SocketManage\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BulbOutlined, LeftOutlined, QuestionCircleTwoTone, ToolTwoTone } from "@ant-design/icons";
import { Menu } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { NavLink } from "react-router-dom";
import InConLayout from "./inConLayout";

import './index.css'
const SocketManage = observer(({ SocketStore,props }) => {
    const {SocketId} = SocketStore;
    const item = [
        { label: '内部组织', key: '1' },
        { label: '互联组织', key: '2' },
        { label: '管理员', key: '3' }
    ]
    const changeModel = (key) => {
        console.log(key);
        SocketStore.setValue('SocketId',key.key)
    }
    return (
        <div className="socket_all">
            <div className="socket_header">
                <NavLink to='/baisc'>
                    <div className="socket_header_left"><LeftOutlined style={{color:'#0db3a6'}}/>通讯录</div>
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
        </div>
    )
})

export default inject((stores) => ({ SocketStore: stores.SocketStore }))(SocketManage);