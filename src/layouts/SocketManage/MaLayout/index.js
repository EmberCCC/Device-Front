/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-22 15:01:06
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-23 00:28:24
 * @FilePath: \bl-device-manage-test\src\layouts\SocketManage\MaLayout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import { ApartmentOutlined, InfoCircleOutlined, MoreOutlined, TeamOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, message, Modal, Popover, Radio, Space, Tooltip, TreeSelect } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import '../index.css'
import './index.css'
const MaLayout = observer(({ SocketStore }) => {
    const { normalList, maSelectKey, maSelectObj, canClick, deValue, roValue, inDCheck, inRLCheck, inRMCheck, mulSelect, fatherIds, itemName,
        rolesName, itemRoles, maId, norName, addUserObjs, addUserVis, addUserIds, addUserList, allUsers } = SocketStore
    useEffect(() => {
        SocketStore.getNormalList();
        SocketStore.getAllDepartment();
        SocketStore.getAllRoles();
        SocketStore.getAllSys();
        console.log(11);
    }, [])
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [cvisible, setCvisible] = useState(false)
    const handleMenu = (e, obj, value, type) => {
        if (type == 'pop') {
            e.stopPropagation();
            SocketStore.setValue('maId', value)
            console.log(value);
            console.log(type);
        } else {
            SocketStore.getAllDepartment();
            SocketStore.getAllRoles();
            SocketStore.getAllSys();
            SocketStore.setValue('maSelectKey', value)
            SocketStore.setValue('maSelectObj', obj)
            SocketStore.setValue('deValue', obj['authDto']['scope']['department'][0] == -1 ? 'all' : 'scope')
            SocketStore.setValue('roValue', obj['authDto']['scope']['role'][0] == -1 ? 'all' : 'scope')
            SocketStore.setValue('inDCheck', obj['authDto']['addressBook']['department'])
            SocketStore.setValue('inRLCheck', obj['authDto']['addressBook']['role'][0])
            SocketStore.setValue('inRMCheck', obj['authDto']['addressBook']['role'][0])
            console.log(toJS(value));
            console.log(toJS(obj));
            console.log(toJS(mulSelect));
            console.log(toJS(fatherIds));
            console.log(toJS(itemName));
            console.log(toJS(rolesName));
            console.log(toJS(itemRoles));
        }

    }
    const haneleAddUser = (value) => {
        SocketStore.getAddUserList({ 'departmentId': value });
    }
    const handleAddRole = () => {
        console.log(addUserIds);
    }
    const popConetnt = (
        <div className="createRole">
            <div>修改名称</div>
            <div onClick={(e) => {
                e.stopPropagation()
                setVisible(true)
            }}>删除</div>
        </div>
    )
    return (
        <div className="all">
            <div className="in_all">
                <div className="in_left">
                    <div className="ma_title">
                        系统管理员
                    </div>
                    <div onClick={() => SocketStore.setValue('maSelectKey', '-1')} className={`ma_left_menu ${maSelectKey == '-1' ? `checked` : ``}`}>
                        <UserOutlined />
                        系统管理员
                    </div>
                    <div className="ma_normal">
                        <div className="ma_title">普通管理员</div>
                        <div className="ma_add" onClick={() => {
                            setCvisible(true)
                        }}>+</div>
                    </div>
                    <div className="ma_left_menuList">
                        {
                            normalList.map((item, index) => {
                                let clsName = ""
                                if (item['id'] == maSelectKey) {
                                    clsName = 'ma_left_menu one_menu checked'
                                } else {
                                    clsName = 'ma_left_menu one_menu'
                                }
                                return (

                                    <div key={index} onClick={(e) => handleMenu(e, item, item['id'])} className={clsName}>
                                        <div className="one_menu_left">
                                            <TeamOutlined />
                                            {item['name']}
                                        </div>
                                        <div className="one_menu_right">
                                            <Popover overlayClassName={'myPopover'} placement='right' content={popConetnt} trigger='hover'>
                                                <MoreOutlined onMouseEnter={() => SocketStore.setValue('maId', item['id'])} onClick={(e) => handleMenu(e, null, item['id'], 'pop')} />
                                            </Popover>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="in_right">
                    {
                        maSelectKey == '-1' && (
                            <div className="ma_right">
                                <div className="ma_right_title">
                                    系统管理组
                                </div>
                                <div className="ma_right_content">
                                    <div className="ma_right_m">
                                        <div className="mar_l">
                                            系统管理员
                                        </div>
                                        <div className="mar_r addM" onClick={() => {
                                            SocketStore.setValue('addUserVis', true)
                                            SocketStore.setValue('addUserIds', [])
                                            SocketStore.setValue('addUserObjs', {})
                                            SocketStore.getAllDepartment();
                                            SocketStore.getAllSys();
                                            SocketStore.getAllUsers();
                                            SocketStore.getAddUserList({ 'departmentId': 1 });

                                        }}>
                                            + 添加管理员
                                        </div>
                                    </div>
                                    <div className="ma_right_m">
                                        <div className="mar_l">
                                            应用权限
                                        </div>
                                        <div className="mar_r">

                                            具备对所有应用的管理权限
                                        </div>
                                    </div>
                                    <div className="ma_right_m">
                                        <div className="mar_l">
                                            知识库权限
                                        </div>
                                        <div className="mar_r">
                                            具备对所有知识库的管理权限
                                        </div>
                                    </div>
                                    <div className="ma_right_m">
                                        <div className="mar_l">
                                            通讯录权限
                                        </div>
                                        <div className="mar_r">
                                            具备对通讯录的全部管理权限
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        maSelectKey != '-1' && (
                            <div className="ma_right">
                                <div className="ma_right_title">
                                    {maSelectObj['name']}
                                </div>
                                <div className="ma_right_content">
                                    <div className="ma_right_m">
                                        <div className="mar_l">
                                            管理员
                                        </div>
                                        <div className="mar_r addM" onClick={() => {
                                            SocketStore.setValue('addUserVis', true)
                                            SocketStore.setValue('addUserIds', [])
                                            SocketStore.setValue('addUserObjs', {})
                                            SocketStore.getAllDepartment();
                                            SocketStore.getAllUsers();
                                            let arr = []
                                            maSelectObj['admins'].map((item,index) => {
                                                Object.keys(item).forEach(one => [
                                                    arr.push(one)
                                                ])
                                            })
                                            SocketStore.setValue('addUserIds',arr);
                                            SocketStore.getAddUserList({ 'departmentId': 1 });

                                        }}>
                                            + 添加管理员
                                        </div>
                                    </div>
                                    <div className="ma_right_m">
                                        <div className="mar_l">
                                            管理范围
                                            <Tooltip placement='top' title='控制通讯录管理范围，以及表单&流程&仪表盘设计和发布中，部门和角色的选择范围。'>
                                                <InfoCircleOutlined />
                                            </Tooltip>
                                        </div>
                                        <div className="mar_r">
                                            <div style={{ marginBottom: '20px' }}>
                                                部门管理范围
                                                <Radio.Group key={deValue} defaultValue={deValue} style={{ marginLeft: "40px" }} onChange={(value) => console.log(value)}>
                                                    <Radio value='all'>全部部门</Radio>
                                                    <Radio value='scope'>部分部门</Radio>
                                                </Radio.Group>
                                                {
                                                    deValue == 'scope' && (
                                                        <div className="de_m">
                                                            <div style={{ color: '#0db3a6', cursor: 'pointer', margin: '3px 5px 3px 0' }}>
                                                                + 选择可管理的部门
                                                            </div>
                                                            <div className="de_list">
                                                                {
                                                                    maSelectObj['authDto']['scope']['department'].map((item, index) => {
                                                                        if (item != -1) {
                                                                            return (
                                                                                <div className="de_one" key={index}>
                                                                                    <ApartmentOutlined /> {itemName[item]}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                角色管理范围
                                                <Radio.Group key={roValue} defaultValue={roValue} style={{ marginLeft: "40px" }} onChange={(value) => console.log(value)}>
                                                    <Radio value='all'>全部角色</Radio>
                                                    <Radio value='scope'>部分角色</Radio>
                                                </Radio.Group>
                                                {
                                                    roValue == 'scope' && (
                                                        <div className="de_m">
                                                            <div style={{ color: '#0db3a6', cursor: 'pointer', margin: '3px 5px 3px 0' }}>
                                                                + 选择可管理的角色
                                                            </div>
                                                            <div className="de_list">
                                                                {
                                                                    maSelectObj['authDto']['scope']['role'].map((item, index) => {
                                                                        if (item != -1) {
                                                                            return (
                                                                                <div className="de_one" key={index}>
                                                                                    <UserAddOutlined /> {rolesName[item]}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    roValue == 'scope' && maSelectObj['authDto']['scope']['role'].length != 0 && (
                                                        <div className="de_m">

                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ma_right_m">
                                        <div className="mar_l">
                                            通讯录权限
                                        </div>
                                        <div className="mar_r">
                                            <div style={{ marginBottom: '20px' }}>
                                                内部部门
                                                <Checkbox key={inDCheck} defaultChecked={inDCheck} onChange={(value) => { console.log(value) }} style={{ marginLeft: "40px" }}>可见可管理</Checkbox>
                                            </div>
                                            <div style={{ marginBottom: '20px' }}>
                                                内部角色
                                                <Checkbox.Group key={[inRLCheck == true && 'look', inRMCheck == true && 'manage']} defaultValue={[inRLCheck == true && 'look', inRMCheck == true && 'manage']} style={{ marginLeft: "40px" }} onChange={(value) => console.log(value)}>
                                                    <Checkbox value='look'>可见</Checkbox>
                                                    <Checkbox value='manage'>可管理</Checkbox>
                                                </Checkbox.Group>
                                            </div>
                                            <div>
                                                互联组织
                                                <Checkbox defaultChecked={false} onChange={(value) => { console.log(value) }} style={{ marginLeft: "40px" }}>可见可管理(勾选后，默认管理范围为全部互联组织)</Checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Modal visible={visible} title={`您确定要删除"${norName[maId]}"吗？`} onCancel={() => {
                setVisible(false)
                setName('')
            }} footer={null} destroyOnClose={true}>
                <div className="changeG_main">
                    <div style={{ marginBottom: '5px', color: '#5e6d82', fontSize: '12px' }}>删除普通管理组则相关管理员及权限也将一并删除，且无法还原。如确定删除，请输入组名：</div>
                    <Input onChange={e => setName(e.target.value)} />
                    <div className="add_btn">
                        <Button onClick={() => {
                            setVisible(false)
                            setName('')
                        }} style={{ marginRight: '15px' }}>取消</Button>
                        <Button type='primary' disabled={norName[maId] != name} onClick={() => {
                            SocketStore.delNormalGroup({ 'groupId': maId }).then(() => {
                                setVisible(false)
                                setName('')
                                SocketStore.getAllSys();
                                SocketStore.getNormalList();
                                SocketStore.getAllDepartment();
                                SocketStore.getAllRoles();
                                SocketStore.setValue('maSelectKey', -1)
                            })
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
            <Modal visible={cvisible} title={'添加管理组'} footer={null} onCancel={() => {
                setCvisible(false)
                setName('')
            }} destroyOnClose={true}>
                <div className="changeG_main">
                    <Input placeholder="请输入管理组名称" onChange={e => setName(e.target.value)} />
                    <div className="add_btn">
                        <Button onClick={() => {
                            setCvisible(false)
                            setName('')
                        }} style={{ marginRight: '15px' }}>取消</Button>
                        <Button type='primary' onClick={() => {
                            if (name == '') {
                                message.info('请输入名称')
                            } else {
                                let obj = {
                                    "editForm": false,
                                    "name": name,
                                    "addressBook": {
                                        "department": false,
                                        "role": [
                                            false,
                                            false
                                        ]
                                    },
                                    "scope": {
                                        "department": [

                                        ],
                                        "role": [

                                        ]
                                    }
                                }
                                SocketStore.creNormalGroup(obj).then(() => {
                                    setCvisible(false)
                                    setName('')
                                    SocketStore.getAllSys();
                                    SocketStore.getNormalList();
                                    SocketStore.getAllDepartment();
                                    SocketStore.getAllRoles();
                                })
                            }
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
            <Modal title='添加成员' visible={addUserVis} onCancel={() => SocketStore.setValue('addUserVis', false)} footer={null} destroyOnClose={true}>
                <div className="addUser_main">
                    <div className="addUser_top">
                        {
                            Object.keys(addUserObjs).map((key, index) => {
                                return (
                                    <div className="addUser_one" key={index}>
                                        <div className="one_name">{addUserObjs[key]}</div>
                                        <div onClick={() => {
                                            console.log(key);
                                            let obj = { ...addUserObjs }
                                            let arr = [...addUserIds]
                                            arr.splice(arr.indexOf(key), 1)
                                            delete obj[key]
                                            SocketStore.setValue('addUserObjs', obj)
                                            SocketStore.setValue('addUserIds', arr)
                                        }} className="one_cross">X</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="addUser_bottom">
                        <div className="addUser_left">
                            <TreeSelect defaultValue={1} treeData={mulSelect} onChange={haneleAddUser} style={{ width: '100%' }} />
                        </div>
                        <div className="addUser_right">
                            <Checkbox.Group value={addUserIds} style={{ width: '100%' }} >
                                <Space direction='vertical'>
                                    {
                                        addUserList.length != 0 && (
                                            allUsers.map((item, index) => {
                                                if (addUserList.some((one) => one['userId'] == item['userId'])) {
                                                    return (
                                                        <Checkbox onClick={() => {
                                                            console.log(item['userId'])
                                                            let arr = [...addUserIds]
                                                            let obj = { ...addUserObjs }
                                                            let index = addUserIds.indexOf(item['userId'])
                                                            if (index > -1) {
                                                                arr.splice(index, 1)
                                                                delete obj[item['userId']]
                                                            } else {
                                                                arr.push(item['userId'])
                                                                obj[item['userId']] = item['name']
                                                            }
                                                            SocketStore.setValue('addUserIds', arr);
                                                            SocketStore.setValue('addUserObjs', obj);
                                                        }} value={item['userId']} key={index}>{item['name']}</Checkbox>
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
                    <div className="add_btn">
                        <Button style={{ marginRight: '15px' }} onClick={() => SocketStore.setValue('addUserVis', false)}>取消</Button>
                        <Button type='primary' onClick={handleAddRole}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
})

export default inject((stores) => ({ SocketStore: stores.SocketStore }))(MaLayout)