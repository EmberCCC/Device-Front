/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-24 21:41:47
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-16 13:14:08
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Self_Form\node_charge.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { UserOutlined } from "@ant-design/icons";
import { Checkbox, Modal, Space, Tree } from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";

import '../FlowManage/Self_Form/index.css'
const User_choose = observer(({ SocketStore, handleUpdate, initUserList, mode, initChooseList, disabled }) => {
    const { rolesName, mulSelect, userName, roleUserList, departmentUserList } = SocketStore
    const [userList, setUserList] = useState(initUserList)
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState(null)
    useEffect(() => {
        setUserList(initUserList)
        console.log('initUserList',initUserList)
        console.log(Object.prototype.toString.call(initUserList))
    }, [])
    useEffect(() => {
        SocketStore.getAllDepartment()
        SocketStore.getAllRoles()
        SocketStore.getAllUsers()
        SocketStore.setValue("departmentUserList", [])
    }, [])
    return (
        <div>
            <div className="select_show" onClick={() => {
                if (disabled != true) {
                    setVisible(true)
                }
            }}>
                {
                    Object.prototype.toString.call(initUserList) === '[object Array]' && initUserList.map((item, index) => {

                        return (
                            <div key={index} className="select_display_item">
                                <UserOutlined style={{ color: '#5d9cee' }} />
                                {userName[item]}
                            </div>
                        )
                    })
                }
            </div>
            <Modal width={650} visible={visible} title={'部门成员列表'} onCancel={() => setVisible(false)} footer={null} destroyOnClose={true}>
                <div className="select_person">
                    <div className="select_display">
                        {
                            Object.prototype.toString.call(userList) === '[object Array]' && userList.map((item, index) => {
                                return (
                                    <div key={index} className="select_display_item">
                                        <UserOutlined style={{ color: '#5d9cee' }} />
                                        {userName[item]}
                                        <span onClick={() => {
                                            let arr = [...userList]
                                            arr.splice(index, 1)
                                            setUserList(arr)
                                        }} className="select_cancel">
                                            X
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="select_menu">
                        <div className="select_menu_head">
                            {
                                Array.isArray(initChooseList?.department) && initChooseList['department'].length > 0 && (
                                    <div className={`select_menu_1 ${type == '1' ? 'checkedS' : ''}`} onClick={() => {
                                        setType('1')
                                        SocketStore.getAllDepartment();
                                    }}>组织架构</div>
                                )
                            }
                            {
                                Array.isArray(initChooseList?.role) && initChooseList['role'].length > 0 && (
                                    <div className={`select_menu_2 ${type == '2' ? 'checkedS' : ''}`} onClick={() => {
                                        setType('2')
                                        SocketStore.getAllRoles()
                                    }}>角色</div>
                                )
                            }
                            {
                                Array.isArray(initChooseList?.user) && initChooseList['user'].length > 0 && (
                                    <div className={`select_menu_3 ${type == '3' ? 'checkedS' : ''}`} onClick={() => {
                                        setType('3')
                                        SocketStore.getAllUsers()
                                    }}>成员</div>
                                )
                            }
                        </div>
                        <div className="select_choice">
                            {
                                type == '3' && (
                                    <Checkbox.Group value={userList} style={{ width: '100%' }} >
                                        <Space direction='vertical'>
                                            {
                                                initChooseList['user'].map((item, index) => {
                                                    return (
                                                        <Checkbox value={item.toString()} key={index} onClick={(e) => {
                                                            let index = userList.indexOf(item.toString())
                                                            let arr = [...userList]
                                                            if (mode == false) {
                                                                if (index > -1) {
                                                                    setUserList([])
                                                                } else {
                                                                    setUserList([item.toString()])
                                                                }
                                                            } else if (mode == true) {
                                                                if (index > -1) {
                                                                    arr.splice(index, 1)
                                                                    setUserList(arr)
                                                                } else {
                                                                    arr.push(item.toString())
                                                                    setUserList(arr)
                                                                }
                                                            }
                                                        }}>{userName[item]}</Checkbox>
                                                    )
                                                })
                                            }
                                        </Space>
                                    </Checkbox.Group>
                                )
                            }
                            {
                                type == '2' && (
                                    <div className="select_user" style={{ width: '100%' }}>
                                        <div className="select_user_left">
                                            {
                                                initChooseList['role'].map((item, index) => {
                                                    return (
                                                        <div className="select_role_child" key={index} onClick={(e) => {
                                                            SocketStore.getOneRoleUser({ 'roleId': item })
                                                        }}>
                                                            {rolesName[item]}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="select_user_right">
                                            <Checkbox.Group value={userList} style={{ width: '100%' }} >
                                                <Space direction='vertical'>
                                                    {
                                                        roleUserList.map((item, index) => {
                                                            return (
                                                                <Checkbox value={item['userId'].toString()} key={index} onClick={(e) => {
                                                                    let index = userList.indexOf(item['userId'].toString())
                                                                    let arr = [...userList]
                                                                    if (mode == false) {
                                                                        if (index > -1) {
                                                                            setUserList([])
                                                                        } else {
                                                                            setUserList([item['userId'].toString()])
                                                                        }
                                                                    } else if (mode == true) {
                                                                        if (index > -1) {
                                                                            arr.splice(index, 1)
                                                                            setUserList(arr)
                                                                        } else {
                                                                            arr.push(item['userId'].toString())
                                                                            setUserList(arr)
                                                                        }
                                                                    }
                                                                }}>{item['nickName']}</Checkbox>
                                                            )
                                                        })
                                                    }
                                                </Space>

                                            </Checkbox.Group>
                                        </div>
                                    </div>

                                )
                            }{
                                type == '1' && (
                                    <div className="select_user">
                                        <div className="select_user_left">
                                            <Tree defaultExpandAll={true}
                                                treeData={mulSelect}
                                                onSelect={(selectedKeys, { selected, selectedNodes, node, event }) => {
                                                    if (initChooseList['department'].indexOf(node.value) > -1) {
                                                        SocketStore.getAddUserList({ 'departmentId': node.value })
                                                    } else {
                                                        SocketStore.setValue("departmentUserList", [])
                                                    }
                                                }} />
                                        </div>
                                        <div className="select_user_right">
                                            {
                                                departmentUserList.length > 0 && (
                                                    <Checkbox.Group value={userList} style={{ width: '100%' }} >
                                                        <Space direction='vertical'>
                                                            {
                                                                departmentUserList.map((item, index) => {
                                                                    return (
                                                                        <Checkbox value={item['userId'].toString()} key={index} onClick={() => {
                                                                            let index = userList.indexOf(item['userId'].toString())
                                                                            let arr = [...userList]
                                                                            console.log(mode);
                                                                            if (mode == false) {
                                                                                if (index > -1) {
                                                                                    setUserList([])
                                                                                } else {
                                                                                    setUserList([item['userId'].toString()])
                                                                                }
                                                                            } else if (mode == true) {
                                                                                if (index > -1) {
                                                                                    arr.splice(index, 1)
                                                                                    setUserList(arr)
                                                                                } else {
                                                                                    arr.push(item['userId'].toString())
                                                                                    setUserList(arr)
                                                                                }
                                                                            }
                                                                        }}>{item['name']}</Checkbox>
                                                                    )
                                                                })
                                                            }
                                                        </Space>
                                                    </Checkbox.Group>
                                                )
                                            }
                                            {
                                                departmentUserList.length == 0 && (
                                                    <div>暂无可选成员</div>
                                                )
                                            }
                                        </div>
                                    </div>

                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="add_btn">
                    <div onClick={() => {
                        setVisible(false)
                        setUserList(initUserList)
                    }} className="add_cancel">取消</div>
                    <div onClick={() => {
                        handleUpdate(userList)
                        setVisible(false)
                    }} className="add_sure">确定</div>
                </div>
            </Modal>
        </div>
    )
})

export default inject((stores) => ({ FlowStore: stores.FlowStore, HomeStore: stores.HomeStore, TableStore: stores.TableStore, SocketStore: stores.SocketStore }))(User_choose)
