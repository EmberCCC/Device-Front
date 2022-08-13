/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-24 21:41:47
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-14 05:08:40
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Self_Form\node_charge.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApartmentOutlined, FolderOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { MODELS, useXFlowApp, XFlowNodeCommands } from "@antv/xflow";
import { Checkbox, Modal, Space, Tree, TreeSelect } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";

import './index.css'
const Node_charge = observer(({ FlowStore, HomeStore, TableStore, SocketStore, initData, charge_person, handleUpdate, typeName }) => {
    const { commandService, modelService } = typeName == 'node' ? useXFlowApp() : { commandService: null, modelService: null };
    const { itemName, rolesName, mulSelect, itemRoles, initRole, addUserList, allUsers, addUserObjs, userName } = SocketStore
    const { loading } = FlowStore
    const [icharge, setIcharge] = useState(charge_person);
    const [visible, setVisible] = useState(false);
    const [openKey, setOpenKey] = useState([]);
    const [type, setType] = useState('1')
    const [roleOpenKey, setRoleOpenKey] = useState([])
    useEffect(() => {
        SocketStore.getAllDepartment()
        SocketStore.getAllRoles()
        SocketStore.getAllUsers()
    }, [])
    useEffect(() => {
        setIcharge(charge_person)
    }, [charge_person])
    return (
        <div>
            <div className="select_show" onClick={() => {
                setVisible(true)
            }}>
                {
                    Object.keys(charge_person).map((key, index) => {
                        return (
                            charge_person[key].map((one, oIndex) => {
                                if (key == 'department') {
                                    return (
                                        <div key={parseInt(index.toString() + oIndex.toString())} className="select_display_item">
                                            <ApartmentOutlined style={{ color: '#fa0' }} />
                                            {itemName[one]}
                                        </div>
                                    )
                                } else if (key == 'role') {
                                    return (
                                        <div key={parseInt(index.toString() + oIndex.toString())} className="select_display_item">
                                            <UserAddOutlined style={{ color: '#248af9' }} />
                                            {rolesName[one]}
                                        </div>
                                    )
                                } else if (key == 'user') {
                                    return (
                                        <div key={parseInt(index.toString() + oIndex.toString())} className="select_display_item">
                                            <UserOutlined style={{ color: '#5d9cee' }} />
                                            {userName[one]}
                                        </div>
                                    )
                                }
                            })
                        )
                    })
                }
            </div>
            <Modal width={650} visible={visible} title={'部门成员列表'} onCancel={() => setVisible(false)} footer={null} destroyOnClose={true}>
                <div className="select_person">
                    <div className="select_display">
                        {
                            Object.keys(icharge).map((key, index) => {
                                return (
                                    icharge[key].map((one, oIndex) => {
                                        if (key == 'department') {
                                            return (
                                                <div key={parseInt(index.toString() + oIndex.toString())} className="select_display_item">
                                                    <ApartmentOutlined style={{ color: '#fa0' }} />
                                                    {itemName[one]} <span onClick={() => {
                                                        let nCharge = { ...icharge }
                                                        let iArr = [...nCharge['department']]
                                                        iArr.splice(oIndex, 1);
                                                        nCharge['department'] = iArr
                                                        if (typeName == 'node') {
                                                            MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                                                                let nCharge = res.data.charge_person
                                                                nCharge = iArr
                                                                commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
                                                                    nodeConfig:
                                                                        { ...res.data, ...nCharge }

                                                                })
                                                            })
                                                        }
                                                        setIcharge({ ...nCharge })
                                                    }} className="select_cancel">X</span>
                                                </div>
                                            )
                                        } else if (key == 'role') {
                                            return (
                                                <div key={parseInt(index.toString() + oIndex.toString())} className="select_display_item">
                                                    <UserAddOutlined style={{ color: '#248af9' }} />
                                                    {rolesName[one]} <span onClick={() => {
                                                        let nCharge = { ...icharge }
                                                        let iArr = [...nCharge['role']]
                                                        iArr.splice(oIndex, 1);
                                                        nCharge['role'] = iArr
                                                        if (typeName == 'node') {
                                                            MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                                                                let nCharge = res.data.charge_person
                                                                nCharge = iArr
                                                                commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
                                                                    nodeConfig:
                                                                        { ...res.data, ...nCharge }

                                                                })
                                                            })
                                                        }
                                                        setIcharge({ ...nCharge })
                                                    }} className="select_cancel">X</span>
                                                </div>
                                            )
                                        } else if (key == 'user') {
                                            return (
                                                <div key={parseInt(index.toString() + oIndex.toString())} className="select_display_item">
                                                    <UserOutlined style={{ color: '#5d9cee' }} />
                                                    {userName[one]}
                                                    <span onClick={() => {
                                                        let nCharge = { ...icharge }
                                                        let iArr = [...nCharge['user']]
                                                        console.log(nCharge['user']);
                                                        iArr.splice(oIndex, 1);
                                                        console.log(iArr);
                                                        nCharge['user'] = iArr
                                                        if (typeName == 'node') {
                                                            MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                                                                let nCharge = res.data.charge_person
                                                                nCharge = iArr
                                                                commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
                                                                    nodeConfig:
                                                                        { ...res.data, ...nCharge }

                                                                })
                                                            })
                                                        }
                                                        setIcharge({ ...nCharge })
                                                    }} className="select_cancel">
                                                        X
                                                    </span>
                                                </div>
                                            )
                                        }
                                    })
                                )
                            })
                        }
                    </div>
                    <div className="select_menu">
                        <div className="select_menu_head">
                            <div className={`select_menu_1 ${type == '1' ? 'checkedS' : ''}`} onClick={() => {
                                setType('1')
                                SocketStore.getAllDepartment();
                            }}>组织架构</div>
                            <div className={`select_menu_2 ${type == '2' ? 'checkedS' : ''}`} onClick={() => {
                                setType('2')
                                SocketStore.getAllRoles()
                            }}>角色</div>
                            <div className={`select_menu_3 ${type == '3' ? 'checkedS' : ''}`} onClick={() => {
                                setType('3')
                                SocketStore.getAllUsers()
                                SocketStore.getAddUserList({ 'departmentId': 1 });
                            }}>成员</div>
                            {
                                typeName == 'node' && (
                                    <div className={`select_menu_4 ${type == '4' ? 'checkedS' : ''}`} onClick={() => {
                                        setType('4')
                                    }}>动态负责人</div>
                                )
                            }
                        </div>
                        <div className="select_choice">
                            {
                                type == '1' && (
                                    <TreeSelect multiple style={{ width: '100%' }} treeData={mulSelect} value={icharge['department']} onChange={(value) => {
                                        if (typeName == 'node') {
                                            MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                                                let nCharge = res.data.charge_person
                                                nCharge['department'] = value
                                                commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
                                                    nodeConfig:
                                                        { ...res.data, ...nCharge }

                                                })
                                            })
                                        }
                                        let nCharge = { ...icharge }
                                        nCharge['department'] = value
                                        setIcharge({ ...nCharge })
                                    }} />
                                )
                            }
                            {
                                type == '2' && (
                                    <div style={{ width: '100%' }}>
                                        <div className="select_role">创建的角色</div>
                                        <div>
                                            {
                                                initRole.map((item, index) => {
                                                    if (item.hasOwnProperty('roles') && JSON.stringify(item['roles']) != '{}') {
                                                        return (
                                                            <div className="select_role_oneItem" key={index}>
                                                                <div className="select_role_father">
                                                                    <FolderOutlined style={{ color: '#248af9' }} /> {item['name']}
                                                                </div>
                                                                {
                                                                    Object.keys(item['roles']).map((key, oIndex) => {
                                                                        return (
                                                                            <div onClick={() => {
                                                                                let iArr = [...icharge['role']]
                                                                                let keyIndex = icharge['role'].indexOf(key)
                                                                                if (keyIndex > -1) {
                                                                                    iArr.splice(keyIndex, 1)
                                                                                } else {
                                                                                    iArr.push(key)
                                                                                }
                                                                                let nCharge = { ...icharge }
                                                                                nCharge['role'] = iArr
                                                                                if (typeName == 'node') {
                                                                                    MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                                                                                        let nCharge = res.data.charge_person
                                                                                        nCharge['role'] = iArr
                                                                                        commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
                                                                                            nodeConfig:
                                                                                                { ...res.data, ...nCharge }

                                                                                        })
                                                                                    })
                                                                                }
                                                                                setIcharge({ ...nCharge })
                                                                            }} key={oIndex} className="select_role_child">
                                                                                <div>
                                                                                    <UserAddOutlined style={{ color: '#248af9' }} /> {item['roles'][key]}
                                                                                </div>
                                                                                <Checkbox checked={icharge['role'].indexOf(key) > -1} />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>

                                                        )
                                                    } else {
                                                        return (
                                                            <div className="select_role_oneItem" key={index}>
                                                                <div className="select_role_father">
                                                                    <FolderOutlined style={{ color: '#248af9' }} /> {item['name']}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>

                                )
                            }{
                                type == '3' && (
                                    <div className="select_user">
                                        <div className="select_user_left">
                                            <Tree defaultExpandAll={true} defaultCheckedKeys={[1]} treeData={mulSelect} onSelect={(selectedKeys, { selected, selectedNodes, node, event }) => {
                                                SocketStore.getAddUserList({ 'departmentId': node.value });
                                            }} />
                                        </div>
                                        <div className="select_user_right">
                                            <Checkbox.Group value={icharge['user']} style={{ width: '100%' }} >
                                                <Space direction='vertical'>
                                                    {
                                                        addUserList.length != 0 && (
                                                            allUsers.map((item, index) => {
                                                                if (addUserList.some((one) => one['userId'] == item['userId'])) {
                                                                    return (
                                                                        <Checkbox onClick={() => {
                                                                            console.log(item['userId'])
                                                                            let arr = [...icharge['user']]
                                                                            let obj = { ...addUserObjs }
                                                                            let index 
                                                                            if(typeName == 'node'){
                                                                                index = icharge['user'].indexOf(item['userId'])
                                                                            }else{
                                                                                index = icharge['user'].indexOf(item['userId'].toString())
                                                                            }
                                                                            if (index > -1) {
                                                                                arr.splice(index, 1)
                                                                                delete obj[item['userId']]
                                                                            } else {
                                                                                if (typeName == 'node') {
                                                                                    arr.push(item['userId'])
                                                                                } else {
                                                                                    arr.push(item['userId'].toString())

                                                                                }
                                                                                obj[item['userId']] = item['name']
                                                                            }
                                                                            let nCharge = { ...icharge }
                                                                            nCharge['user'] = arr
                                                                            if (typeName == 'node') {
                                                                                MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                                                                                    let nCharge = res.data.charge_person
                                                                                    nCharge['user'] = arr
                                                                                    commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
                                                                                        nodeConfig:
                                                                                            { ...res.data, ...nCharge }

                                                                                    })
                                                                                })
                                                                            }
                                                                            setIcharge({ ...nCharge })
                                                                            SocketStore.setValue('addUserObjs', obj);
                                                                        }} value={typeName == 'node' ? item['userId'] : item['userId'].toString()} key={index}>{item['name']}</Checkbox>
                                                                    )
                                                                }
                                                            })
                                                        )
                                                    }
                                                    {
                                                        addUserList.length == 0 && (
                                                            <div>没有可选成员</div>
                                                        )
                                                    }
                                                </Space>
                                            </Checkbox.Group>
                                        </div>
                                    </div>

                                )
                            }
                        </div>
                    </div>
                </div>
                {
                    typeName != 'node' && (
                        <div className="add_btn">
                            <div onClick={() => {
                                setIcharge(charge_person)
                                setVisible(false)
                            }} className="add_cancel">取消</div>
                            <div onClick={() => {
                                handleUpdate(toJS(icharge))
                                setVisible(false)
                            }} className="add_sure">确定</div>
                        </div>
                    )
                }
            </Modal>
        </div>
    )
})

export default inject((stores) => ({ FlowStore: stores.FlowStore, HomeStore: stores.HomeStore, TableStore: stores.TableStore, SocketStore: stores.SocketStore }))(Node_charge)