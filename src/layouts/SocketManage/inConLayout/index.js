/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-19 23:03:37
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-21 19:10:20
 * @FilePath: \bl-device-manage-test\src\layouts\SocketManage\inConLayout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CheckCircleFilled, FolderFilled } from "@ant-design/icons";
import { Button, Checkbox, Divider, Drawer, Form, Input, Menu, message, Modal, Popover, Radio, Select, Space, Spin, Switch, Table, TreeSelect } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";

import './index.css'
const InConLayout = observer(({ SocketStore }) => {
    const { roleList, SelectKey, allUsers, selectRowKeys, visible, oneUserInfo, loading, departments,
        items, itemName, itemRoles, rolesName, changetype, changeVis, changeId,
        changeName, changeGroupVis, fatherId, initRole, addVisible, mulSelect, mulVisible, fatherIds,
        preId, addUserVis, addUserList, addUserIds, addUserObjs } = SocketStore;
    const [form] = Form.useForm();
    const [mul, setMul] = useState(null);
    const [createVis, setCreateVis] = useState(false)
    const [total, setTotal] = useState('department')
    const ref = useRef();
    const refAdd = useRef();
    const refCreate = useRef()
    const refChange = useRef()
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
            SocketStore.setValue('SelectKey', '1')
            SocketStore.getAllRoles();
            SocketStore.getOneRoleUser({ 'roleId': 1 });
        }
        console.log(value.target.value);
    }
    const handleClick = ({ item, key, keyPath, domEvent }) => {
        if (key == '全部成员' || key == '离职成员') {
            SocketStore.getAllUsers()
        }
    }
    const handleClickRole = ({ item, key, keyPath, domEvent }) => {
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
        console.log({ ...values });
        if (values['departmentIds'] == undefined) {
            values['departmentIds'] = []
        }
        SocketStore.changeUserInfo({ ...values, 'userId': oneUserInfo['userId'], 'state': 1 }).then(() => {
            if (SelectKey == '全部成员') {
                SocketStore.getAllUsers();
            } else {
                SocketStore.getOneDepartment({ 'departmentId': SelectKey })
            }
            SocketStore.getAllDepartment()
        })
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
        SocketStore.setValue('addVisible', true)
    }
    const handleAdd = () => {
        console.log(refAdd.current.input.value);
        if (refAdd.current.input.value == "") {
            message.info('请输入部门名称');
        } else {
            if (SocketStore.addDe({ 'preId': SelectKey, 'name': refAdd.current.input.value })) {
                SocketStore.getOneDepartment({ 'departmentId': SelectKey })
                SocketStore.getAllDepartment()
                SocketStore.setValue('addVisible', false)
            }
        }
        SocketStore.setValue('addVisible', false)
    }
    const handleCreate = (type) => {
        if (type == 'group') {
            setCreateVis(true)
        } else {
            console.log(type);
        }
    }
    const handleRCreate = () => {
        console.log(refCreate.current.input.value);
        if (refCreate.current.input.value == "") {
            message.info('请输入名称')
        } else {
            SocketStore.createRoleGroup({ 'name': refCreate.current.input.value }).then(() => {
                SocketStore.getAllRoles();
                SocketStore.getOneRoleUser({ 'roleId': SelectKey });
            })
            setCreateVis(false)
        }

    }
    const handleNameChange = (type) => {
        console.log(refChange.current.input.value);
        console.log(type);
        console.log(changeId);
        if (refChange.current.input.value != '') {
            if (type == 'roleg') {
                SocketStore.changeRoleGroupName({ 'groupId': changeId, 'name': refChange.current.input.value }).then(() => {
                    SocketStore.getOneRoleUser({ 'roleId': SelectKey })
                    SocketStore.getAllRoles()
                })
            } else if (type == 'role') {
                SocketStore.changeRoleName({ 'roleId': changeId, 'roleName': refChange.current.input.value }).then(() => {
                    SocketStore.getOneRoleUser({ 'roleId': SelectKey })
                    SocketStore.getAllRoles()
                })
            } else if (type == 'de') {
                SocketStore.changeDeName({ 'departmentId': changeId, 'name': refChange.current.input.value }).then(() => {
                    SocketStore.getOneDepartment({ 'departmentId': SelectKey })
                    SocketStore.getAllDepartment()
                })
            }
            SocketStore.setValue('changeVis', false);
        } else {
            message.info('请输入名称')
        }

    }
    const handleSelect = (value) => {
        SocketStore.setValue('fatherId', value)
    }
    const changeRoleGroup = () => {
        SocketStore.changeRoleGroup({ 'roleId': changeId, 'groupId': fatherId }).then(() => {
            SocketStore.getOneRoleUser({ 'roleId': SelectKey })
            SocketStore.getAllRoles()
        })
        SocketStore.setValue('changeGroupVis', false)
    }
    const handleMulChange = (value, label, extra) => {
        SocketStore.setValue('preId', value)
        console.log(value, label, extra);
    }
    const changeDePre = () => {
        SocketStore.changeDePre({ 'preId': preId, 'departmentId': SelectKey, 'name': null }).then(() => {
            SocketStore.getOneDepartment({ 'departmentId': SelectKey })
            SocketStore.getAllDepartment()
        })
        SocketStore.setValue('mulVisible', false)
        console.log(toJS(preId));
    }
    const haneleAddUser = (value) => {
        SocketStore.getAddUserList({ 'departmentId': value });
        console.log(value);
        console.log(toJS(addUserIds));
    }
    const handleAddRole = () => {
        console.log(toJS(addUserIds));
        console.log(toJS(SelectKey));
        console.log(toJS(roleList));
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

    const createContent = (
        <div className="createRole">
            <div onClick={() => handleCreate('group')} className="create_group">创建角色组</div>
            <div onClick={() => handleCreate('role')} className="create_role">创建角色</div>
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
                                <Popover overlayClassName={'myPopover'} placement='bottom' content={createContent} trigger='click'>
                                    <div className="rt_F">
                                        创建的角色 +
                                    </div>
                                </Popover>
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
                                                {
                                                    ['全部成员', '离职成员', 1].indexOf(SelectKey) <= -1 && (
                                                        <>
                                                            <Divider type="vertical" />
                                                            <div onClick={() => {
                                                                SocketStore.setValue('preId', fatherIds[SelectKey])
                                                                SocketStore.setValue('mulVisible', true)
                                                            }}>调整上级部门</div>
                                                        </>
                                                    )
                                                }
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
                                                                console.log(toJS(mulSelect));
                                                                form.resetFields()
                                                                SocketStore.getAllRoles();
                                                                SocketStore.setValue('visible', true);
                                                            })
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
                                        SelectKey != '全部成员' && SelectKey != '离职成员' && (
                                            <div className="inRF_R2">
                                                <Popover content={changeRoleName} trigger='click' destroyTooltipOnHide={true}>
                                                    <div>修改名称</div>
                                                </Popover>
                                                <Divider type="vertical" />
                                                <div onClick={() => {
                                                    SocketStore.setValue('changeGroupVis', true)
                                                    SocketStore.setValue('fatherId', fatherIds[SelectKey])
                                                }}>调整分组</div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="inR_Tool">
                                <div>
                                    <Button onClick={() => {
                                        SocketStore.setValue('addUserVis', true)
                                        SocketStore.setValue('addUserIds', [])
                                        SocketStore.setValue('addUserObjs', {})
                                        SocketStore.getAllDepartment();
                                        SocketStore.getAllUsers();
                                        SocketStore.getAddUserList({ 'departmentId': 1 });
                                    }} type="primary" style={{ marginRight: '10px' }}>添加成员</Button>
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
            <Drawer visible={visible} placement='right' onClose={handleClose} destroyOnClose={true}>
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
                        <Form.Item label="部门" name='departmentIds' initialValue={oneUserInfo['departmentsIds']}>
                            <TreeSelect multiple={true} treeData={mulSelect} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="角色" name='roleIds' initialValue={oneUserInfo['roleIds']}>
                            <Select style={{ width: '100%' }} mode='multiple'>
                                {
                                    initRole.map((item, index) => {
                                        return (
                                            <Select.OptGroup label={item['name']} key={-item['groupId']}>
                                                {
                                                    Object.keys(item['roles']).map((key, oneIndex) => {
                                                        return (
                                                            <Select.Option value={key} key={key}>
                                                                {item['roles'][key]}
                                                            </Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select.OptGroup>
                                        )
                                    })
                                }
                            </Select>
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
            <Modal title={'创建角色组'} visible={createVis} onCancel={() => setCreateVis(false)} footer={null} destroyOnClose={true}>
                <div className="add_modal">
                    <div className="add_title">名称</div>
                    <Input placeholder="请输入角色组名称" ref={refCreate} />
                    <div className="add_btn">
                        <Button style={{ marginRight: '15px' }} onClick={() => setCreateVis(false)}>取消</Button>
                        <Button type='primary' onClick={() => handleRCreate('group')}>确定</Button>
                    </div>
                </div>
            </Modal>
            <Modal width={400} visible={addVisible} onCancel={() => SocketStore.setValue('addVisible', false)} footer={null} destroyOnClose={true}>
                <div className="add_modal">
                    <div className="add_title">添加部门</div>
                    <Input placeholder="请输入部门名称" ref={refAdd} />
                    <div className="add_btn">
                        <Button style={{ marginRight: '15px' }} onClick={() => SocketStore.setValue('addVisible', false)}>取消</Button>
                        <Button type='primary' onClick={() => handleAdd()}>确定</Button>
                    </div>
                </div>
            </Modal>
            <Modal title='修改名称' visible={changeVis} onCancel={() => SocketStore.setValue('changeVis', false)} footer={null} destroyOnClose={true}>
                <div className="change_name">
                    <Input placeholder="" ref={refChange} defaultValue={changeName} />
                    <div className="add_btn">
                        <Button style={{ marginRight: '15px' }} onClick={() => SocketStore.setValue('changeVis', false)}>取消</Button>
                        <Button type='primary' onClick={() => handleNameChange(changetype)}>确定</Button>
                    </div>
                </div>
            </Modal>
            <Modal title={'调整分组'} visible={changeGroupVis} onCancel={() => SocketStore.setValue('changeGroupVis', false)} footer={null} destroyOnClose={true}>
                <div className="changeG_main">
                    <div className="changeG_title">
                        请选择目标分组
                    </div>
                    <div className="changeG_select">
                        {
                            itemRoles.map((item, index) => {
                                let checkClass = "false"
                                if (-item['key'] == fatherId) checkClass = "true"
                                return (
                                    <div className={"sel_item " + checkClass} key={index} onClick={() => handleSelect(-item['key'])}>
                                        <div className="item_l">
                                            <div className="item_l"><FolderFilled style={{ color: '#248af9' }} /></div>
                                            <div className="item_l">{initRole[index]['name']}</div>
                                        </div>
                                        <div className={"item_r" + checkClass}>
                                            <CheckCircleFilled style={{ color: '#248af9' }} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="add_btn">
                        <Button style={{ marginRight: '15px' }} onClick={() => SocketStore.setValue('changeGroupVis', false)}>取消</Button>
                        <Button type='primary' onClick={changeRoleGroup}>确定</Button>
                    </div>
                </div>
            </Modal>
            <Modal title='调整上级部门' visible={mulVisible} onCancel={() => SocketStore.setValue('mulVisible', false)} footer={null} destroyOnClose={true}>
                <div className="changeG_main">
                    <TreeSelect defaultValue={preId} treeData={mulSelect} onChange={handleMulChange} style={{ width: '100%' }} />
                    <div className="add_btn">
                        <Button style={{ marginRight: '15px' }} onClick={() => SocketStore.setValue('mulVisible', false)}>取消</Button>
                        <Button type='primary' onClick={changeDePre}>确定</Button>
                    </div>
                </div>
            </Modal>
            <Modal title='添加成员' visible={addUserVis} onCancel={() => SocketStore.setValue('addUserVis', false)} footer={null} destroyOnClose={true}>
                <div className="addUser_main">
                    <div className="addUser_top">
                        {
                            Object.keys(addUserObjs).map((key,index) => {
                                return (
                                    <div className="addUser_one" key={index}>
                                        <div className="one_name">{addUserObjs[key]}</div>
                                        <div onClick={() => {
                                            console.log(key);
                                            let obj = {...addUserObjs}
                                            let arr = [...addUserIds]
                                            arr.splice(arr.indexOf(key),1)
                                            delete obj[key]
                                            SocketStore.setValue('addUserObjs',obj)
                                            SocketStore.setValue('addUserIds',arr)
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

export default inject((stores) => ({ SocketStore: stores.SocketStore }))(InConLayout)