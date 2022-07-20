/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-19 23:03:37
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-20 14:55:08
 * @FilePath: \bl-device-manage-test\src\layouts\SocketManage\inConLayout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Divider, Drawer, Form, Input, Menu, message, Modal, Popover, Radio, Spin, Switch, Table } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";

import './index.css'
const InConLayout = observer(({ SocketStore }) => {
    const { roleList, SelectKey, allUsers, selectRowKeys, visible, oneUserInfo, loading, departments, items, itemName, itemRoles, rolesName } = SocketStore;
    const [form] = Form.useForm();
    const [addVisible, setAddVisible] = useState(false)
    const [total, setTotal] = useState('department')
    const ref = useRef();
    const refAdd = useRef();
    useEffect(() => {
        setTotal('department')
        SocketStore.setValue('SelectKey', '全部成员')
        SocketStore.getAllUsers();
        SocketStore.getAllDepartment()
    }, [])
    const columnAll = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '手机',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            render: (text, record, index) => {
                let newArr = []
                for (const key in text) {
                    if (Object.hasOwnProperty.call(text, key)) {
                        const element = text[key];
                        newArr.push({ 'group': key, 'name': element })
                    }
                }
                return (
                    <div className="role_item">
                        {
                            newArr.map((item, index) => {
                                return <div className="role_one" key={index}>{item['name']}</div>
                            })
                        }
                    </div>
                )
            }
        }
    ]
    const columnRole = [
        {
            title: '姓名',
            dataIndex: 'nickName',
            key: 'nickName'
        }, {
            title: '部门',
            dataIndex: 'departments',
            key: 'departments',
            render: (text, record, index) => {
                let newArr = []
                for (const key in text) {
                    if (Object.hasOwnProperty.call(text, key)) {
                        const element = text[key];
                        newArr.push({ 'group': key, 'name': element })
                    }
                }
                return (
                    <div className="role_item">
                        {
                            newArr.map((item, index) => {
                                return <div className="role_one" key={index}>{item['name']}</div>
                            })
                        }
                    </div>
                )
            }
        },
    ]
    const handleChange = (value) => {
        setTotal(value.target.value)
        SocketStore.setValue('selectRow', [])
        SocketStore.setValue('selectRowKeys', [])
        SocketStore.setValue('allUsers', [])
        SocketStore.setValue('roleList', [])
        if (value.target.value == 'department') {
            SocketStore.setValue('SelectKey', '全部成员')
            SocketStore.getAllUsers();
            SocketStore.getAllDepartment()
        } else {
            SocketStore.getAllRoles();
        }
        console.log(value.target.value);
    }
    const handleClick = ({ item, key, keyPath, domEvent }) => {
        console.log({ item, key, keyPath, domEvent });
        SocketStore.setValue('SelectKey', key)
        SocketStore.setValue('selectRow', [])
        SocketStore.setValue('selectRowKeys', [])
        if (key == '全部成员' || key == '离职成员') {
            SocketStore.getAllUsers()
        } else {
            SocketStore.getOneDepartment({ 'departmentId': SelectKey })
        }
    }
    const handleClickRole = ({ item, key, keyPath, domEvent }) => {
        console.log({ item, key, keyPath, domEvent });
        SocketStore.setValue('SelectKey', key)
        SocketStore.getOneRoleUser({ 'roleId': key });
    }
    const handleSwitch = (value) => {
        console.log(value);
    }
    const rowSelection = {
        selectRowKeys,
        columnWidth: 2,
        onChange: (selectedRowKeys, selectedRows) => {
            SocketStore.setValue('selectRowKeys', selectedRowKeys);
            SocketStore.setValue('selectRow', selectedRows);
            console.log(selectedRowKeys);
            console.log(toJS(selectedRows));
        },
    };
    const handleClose = () => {
        SocketStore.setValue('visible', false)
    }
    const onFinish = (values) => {
        console.log(values);
    }
    const handlePop = (type, name) => {
        if (type == 'sure' && ref.current.input.value != '') {
            if (name == 'de') {
                console.log(ref.current.input.value);
                SocketStore.changeDeName({ 'departmentId': SelectKey, 'name': ref.current.input.value }).then(() => {
                    SocketStore.getOneDepartment({ 'departmentId': SelectKey })
                    SocketStore.getAllDepartment()
                })
            } else if (name == 'role') {
                console.log(ref.current.input.value);
                SocketStore.changeRoleName({ 'roleId': SelectKey, 'roleName': ref.current.input.value }).then(() => {
                    SocketStore.getOneRoleUser({ 'roleId': SelectKey })
                    SocketStore.getAllRoles()
                })
            }
        } else {
            message.info('请输入名称');
        }
    }
    const handleOpenModal = () => {
        setAddVisible(true)
    }
    const handleAdd = () => {
        console.log(refAdd.current.input.value);
        if (refAdd.current.input.value == "") {
            message.info('请输入部门名称');
        } else {
            if (SocketStore.addDe({ 'preId': SelectKey, 'name': refAdd.current.input.value })) {
                SocketStore.getOneDepartment({ 'departmentId': SelectKey })
                SocketStore.getAllDepartment()
                setAddVisible(false)
            }
        }
        console.log(refAdd.current.input.value == "");
        setAddVisible(false)
    }
    const changeNameContent = (
        <div className="pop_change">
            <Input defaultValue={itemName[SelectKey]} ref={ref} />
            <div className="change_btn">
                <Button type="primary" onClick={() => handlePop('sure', 'de')}>确定</Button>
            </div>
        </div>
    )
    const changeRoleName = (
        <div className="pop_change">
            <Input defaultValue={rolesName[SelectKey]} ref={ref} />
            <div className="change_btn">
                <Button type="primary" onClick={() => handlePop('sure', 'role')}>确定</Button>
            </div>
        </div>
    )
    return (
        <div className="all">
            <div className="in_all">
                <div className="in_left">
                    <div className="inL_first">
                        <Radio.Group onChange={handleChange} defaultValue={total}>
                            <Radio.Button value='department'>部门</Radio.Button>
                            <Radio.Button value='role'>角色</Radio.Button>
                        </Radio.Group>
                    </div>
                    {
                        total == 'department' && (
                            <Menu selectable={!loading} items={items} onClick={(value) => handleClick(value)} mode='inline' theme='light' defaultSelectedKeys={[SelectKey]} />
                        )
                    }{
                        total == 'role' && (
                            <div className="role_top">
                                <div className="rt_F">
                                    创建的角色 +
                                </div>
                                <Menu selectable={!loading} items={itemRoles} onClick={(value) => handleClickRole(value)} mode='inline' theme='light' defaultSelectedKeys={[SelectKey]} />

                            </div>
                        )
                    }
                </div>
                {
                    total == 'department' && (
                        <div className="in_right">
                            <div className="inR_first">
                                <div className="inRF_L">
                                    {itemName[SelectKey]}
                                </div>
                                <div className="inRF_R">
                                    {
                                        SelectKey == '全部成员' && (
                                            <>
                                                <Switch onChange={handleSwitch} size='small' />
                                                <div className="switch_des">允许成员修改姓名</div>
                                            </>
                                        )
                                    }
                                    {
                                        SelectKey != '全部成员' && SelectKey != '离职成员' && (
                                            <div className="inRF_R2">
                                                <Popover content={changeNameContent} trigger='click' destroyTooltipOnHide={true}>
                                                    <div>修改名称</div>
                                                </Popover>
                                                <Divider type="vertical" />
                                                <div>设置部门总管</div>
                                                <Divider type="vertical" />
                                                <div onClick={handleOpenModal}>添加子部门</div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="inR_Tool">
                                <div>
                                    <Button type="primary" style={{ marginRight: '10px' }}>邀请成员</Button>
                                    <Button>导出</Button>
                                </div>
                                <Input placeholder="搜索成员" style={{ width: '200px', marginRight: '20px' }} />
                            </div>
                            <Spin spinning={loading} tip='Loading...'>
                                <div className="socket_table">
                                    {
                                        SelectKey != '离职成员' && (
                                            <Table
                                                columns={columnAll}
                                                dataSource={allUsers}
                                                rowKey={record => record.userId}
                                                rowSelection={{
                                                    type: 'checkbox',
                                                    ...rowSelection,
                                                }}
                                                bordered
                                                onRow={(key, record) => {
                                                    return {
                                                        onClick: event => {
                                                            SocketStore.getOneUser({ 'userId': key['userId'] }).then(() => {
                                                                SocketStore.setValue('visible', true);
                                                            })
                                                            console.log(toJS(key));
                                                            console.log(record);
                                                        }
                                                    }
                                                }}
                                            />
                                        )
                                    }
                                </div>
                            </Spin>

                        </div>
                    )
                }{
                    total == 'role' && (
                        <div className="in_right">
                            <div className="inR_first">
                                <div className="inRF_L">
                                    {rolesName[SelectKey]}
                                </div>
                                <div className="inRF_R">
                                    {
                                        SelectKey == '全部成员' && (
                                            <>
                                                <Switch onChange={handleSwitch} size='small' />
                                                <div className="switch_des">允许成员修改姓名</div>
                                            </>
                                        )
                                    }
                                    {
                                        SelectKey != '全部成员' && SelectKey != '离职成员' && (
                                            <div className="inRF_R2">
                                                <Popover content={changeRoleName} trigger='click' destroyTooltipOnHide={true}>
                                                    <div>修改名称</div>
                                                </Popover>
                                                <Divider type="vertical" />
                                                <div>调整分组</div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="inR_Tool">
                                <div>
                                    <Button type="primary" style={{ marginRight: '10px' }}>邀请成员</Button>
                                </div>
                                <Input placeholder="搜索成员" style={{ width: '200px', marginRight: '20px' }} />
                            </div>
                            <Spin spinning={loading} tip='Loading...'>
                                <div className="socket_table">
                                    {
                                        SelectKey != '离职成员' && (
                                            <Table
                                                columns={columnRole}
                                                dataSource={roleList}
                                                rowKey={record => record.userId}
                                                rowSelection={{
                                                    type: 'checkbox',
                                                    ...rowSelection,
                                                }}
                                                bordered
                                            />
                                        )
                                    }
                                </div>
                            </Spin>

                        </div>
                    )
                }
            </div>
            <Drawer visible={visible} placement='right' onClose={handleClose}>
                <Spin spinning={loading} tip='Loading...'>
                    <div className="drawer_header">

                    </div>
                    <Form form={form} onFinish={onFinish} layout='vertical'>
                        <Form.Item label="姓名" name='name' rules={[{ required: true, message: '请输入姓名' }]} initialValue={oneUserInfo['name']}>
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="用户名" name='userName' rules={[{ required: true, message: '请输入用户名' }]} initialValue={oneUserInfo['userName']}>
                            <Input placeholder="input placeholder" disabled />
                        </Form.Item>
                        <Form.Item label="手机" name='phone' initialValue={oneUserInfo['phone']}>
                            <Input placeholder="input placeholder" disabled />
                        </Form.Item>
                        <Form.Item label="邮箱" name='email' initialValue={oneUserInfo['email']}>
                            <Input placeholder="input placeholder" disabled />
                        </Form.Item>
                        <Form.Item label="部门" name='departmentIds'>
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="角色" name='roleIds'>
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item>
                            <div className="btn_group">
                                <Button type="primary" htmlType="submit">修改</Button>
                                <Button>交接工作</Button>
                                <Button danger>转为离职</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Spin>
            </Drawer>
            <Modal width={400} visible={addVisible} onCancel={() => setAddVisible(false)} footer={null} destroyOnClose={true}>
                <div className="add_modal">
                    <div className="add_title">添加部门</div>
                    <Input placeholder="请输入部门名称" ref={refAdd} />
                    <div className="add_btn">
                        <Button style={{ marginRight: '15px' }} onClick={() => setAddVisible(false)}>取消</Button>
                        <Button type='primary' onClick={() => handleAdd()}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
})

export default inject((stores) => ({ SocketStore: stores.SocketStore }))(InConLayout)