import { ApartmentOutlined, FolderAddOutlined, FolderOutlined, InfoCircleOutlined, MoreOutlined, TeamOutlined, CloseCircleFilled,UserAddOutlined, UserOutlined ,GoldFilled} from "@ant-design/icons";
import { Button, Checkbox, Input, message, Modal, Popover, Radio, Space, Spin, Tooltip, Tree, TreeSelect } from "antd";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import '../index.css'
import './index.css'
const MaLayout = observer(({ SocketStore }) => {
    const { normalList, maSelectKey, maSelectObj, canClick, deValue, roValue, inDCheck, inRLCheck, inRMCheck, mulSelect, fatherIds, itemName,
        rolesName, itemRoles, maId, norName, addUserObjs, addUserVis, addUserIds, addUserList, allUsers, editForm, userName, sysList,
        initList, deObj, cantList, initRole, } = SocketStore
    useEffect(() => {
        (async ()=>{
            setLoad(true)
            await SocketStore.getNormalList();
            await SocketStore.getAllDepartment();
            await SocketStore.getAllRoles();
            await SocketStore.getAllSys();
            setLoad(false)
        })()

    }, [])
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [cvisible, setCvisible] = useState(false)
    const [addDeVisible, setAddDeVisible] = useState(false)
    const [addRoleVisible, setAddRoleVisible] = useState(false)
    const [addList, setAddList] = useState([])
    const [load, setLoad] = useState(false)
    const ref = useRef()
    const handleMenu = (e, obj, value, type) => {
        e.stopPropagation();
        console.log(obj);
        if (type == 'pop') {
            SocketStore.setValue('maId', value)
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
            SocketStore.setValue('inRMCheck', obj['authDto']['addressBook']['role'][1])
            SocketStore.setValue('editForm', obj['authDto']['editForm'])
        }

    }
    const haneleAddUser = (value) => {
        SocketStore.getAddUserList({ 'departmentId': value });
    }

    const initData = (type) => {
        SocketStore.getAllDepartment();
        SocketStore.getAllRoles();
        SocketStore.getAllSys();
        if (type != 'add') {
            SocketStore.getNormalList().then(() => {
                setLoad(false)
            })
        }
        console.log({ deValue, roValue, inDCheck, inRLCheck, inRMCheck });
    }
    const handleAddRole = () => {
        SocketStore.setValue('cantList', [])
        let arr = []
        if (maSelectKey != '-1') {
            addUserIds.forEach(item => {
                if (initList.indexOf(item) <= -1) arr.push(item)
            })
            SocketStore.createNor({ 'userIds': arr, 'groupId': maSelectKey }).then(() => {
                initData();
            })
        } else if (maSelectKey == '-1') {
            addUserIds.forEach(item => {
                if (initList.indexOf(item) <= -1) arr.push(item)
            })
            SocketStore.createSys(arr).then(() => {
                initData('add');
            })
        }
        SocketStore.setValue('addUserVis', false)
    }
    const handleAddDe = (type) => {
        setLoad(true)
        let iObj = { ...maSelectObj }
        delete iObj.admins
        delete iObj.id
        delete iObj.name
        if (type == 'de') {
            iObj['authDto']['scope']['department'] = addList
            setAddDeVisible(false)
        } else {
            iObj['authDto']['scope']['role'] = addList
            setAddRoleVisible(false)
        }
        SocketStore.updateNor({ 'groupId': maSelectKey }, iObj['authDto']).then(() => {
            initData();
        })
    }
    const popConetnt = (
        <div className="createRole">
            <div onClick={(e) => {
                e.stopPropagation()
                Modal.confirm({
                    title: '修改名称',
                    content: <div>
                        <Input ref={ref} placeholder={'不可为空'} />
                    </div>
                    ,
                    cancelText: '取消',
                    okText: '确定',
                    onOk: () => {
                        if (ref.current.input.value == '') {
                            message.info('名称不可为空')
                        } else {
                            SocketStore.changeNorName({ 'name': ref.current.input.value, "groupId": maId }).then(() => {
                                initData()
                            })
                        }
                        console.log(ref.current.input.value);
                    }
                })
            }}>修改名称</div>
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
                        <UserOutlined  style={{'color':'#0db3a6',marginRight:'10px'}}/>
                        系统管理员
                    </div>
                    <div className="ma_normal">
                        <div className="ma_title">普通管理员组</div>
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
                                            <TeamOutlined style={{'color':'#0db3a6',marginRight:'10px'}}/>
                                            {item['name']}
                                        </div>
                                        <div className="one_menu_right">
                                            <Popover overlayClassName={'myPopover'} placement='right' content={popConetnt} trigger='hover'>
                                                <MoreOutlined onMouseEnter={() => SocketStore.setValue('maId', item['id'])} />
                                            </Popover>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="in_right">
                    <Spin spinning={load} tip='更新中....'>
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
                                            <div className="manage_list">
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
                                                <div className="de_list">
                                                    {
                                                        Object.keys(sysList).map((item, index) => {
                                                            return (
                                                                <div className="de_one" key={index}>

                                                                    <GoldFilled style={{'color':'rgb(255, 190, 1)'}}/> {sysList[item]['username']} <span style={{ cursor: 'pointer' }} onClick={() => {
                                                                        SocketStore.delSys({ 'userId': item }).then(() => {
                                                                            initData('add');
                                                                        })
                                                                        console.log(item);
                                                                    }}> <CloseCircleFilled  style={{color:'rgba(0,0,0,0.5)'}}/> </span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
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
                                            <div className="manage_list">
                                                <div className="mar_r addM" onClick={() => {
                                                    SocketStore.setValue('initList', []);
                                                    SocketStore.setValue('addUserVis', true)
                                                    SocketStore.setValue('addUserIds', [])
                                                    SocketStore.setValue('addUserObjs', {})
                                                    SocketStore.getAllDepartment();
                                                    SocketStore.getAllUsers();
                                                    let arr = []
                                                    let iArr = []
                                                    Object.keys(deObj).map((item) => {
                                                        console.log(item);
                                                        if (item != maSelectKey) {
                                                            deObj[item].map((one) => {
                                                                iArr.push(one['userId'])
                                                            })
                                                        }
                                                    })
                                                    maSelectObj['admins'].map((item, index) => {
                                                        arr.push(item['userId'])
                                                    })
                                                    console.log(arr);
                                                    console.log(toJS(deObj));
                                                    console.log(iArr);
                                                    SocketStore.setValue('addUserIds', arr);
                                                    SocketStore.setValue('initList', arr);
                                                    SocketStore.setValue('cantList', iArr);
                                                    SocketStore.getAddUserList({ 'departmentId': 1 });

                                                }}>
                                                    + 添加管理员
                                                </div>
                                                <div className="de_list">
                                                    {
                                                        maSelectObj['admins'].map((item, index) => {
                                                            return (
                                                                <div className="de_one" key={index}>
                                                                    <UserOutlined style={{'color':'#248af9'}}/> {userName[item['userId']]} <span style={{ cursor: 'pointer' }} onClick={() => {
                                                                        SocketStore.delNor({ 'userId': item['userId'] }).then(() => {
                                                                            initData();
                                                                        })
                                                                    }}> <CloseCircleFilled  style={{color:'rgba(0,0,0,0.5)'}}/></span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
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
                                                    <Radio.Group value={deValue} style={{ marginLeft: "40px" }} onChange={(value) => {
                                                        setLoad(true)
                                                        let iObj = { ...maSelectObj }
                                                        delete iObj.admins
                                                        delete iObj.id
                                                        delete iObj.name
                                                        if (value.target.value == 'all') {
                                                            iObj['authDto']['scope']['department'] = [-1]
                                                        } else {
                                                            iObj['authDto']['scope']['department'] = []
                                                        }
                                                        SocketStore.updateNor({ 'groupId': maSelectKey }, iObj['authDto']).then(() => {
                                                            initData();
                                                        })
                                                    }}>
                                                        <Radio value='all'>全部部门</Radio>
                                                        <Radio value='scope'>部分部门</Radio>
                                                    </Radio.Group>
                                                    {
                                                        deValue == 'scope' && (
                                                            <div className="de_m">
                                                                <div onClick={() => setAddDeVisible(true)} style={{ color: '#0db3a6', cursor: 'pointer', margin: '3px 5px 3px 0' }}>
                                                                    + 选择可管理的部门
                                                                </div>
                                                                <div className="de_list">
                                                                    {
                                                                        maSelectObj['authDto']['scope']['department'].map((item, index) => {
                                                                            if (item != -1) {
                                                                                return (
                                                                                    <div className="de_one" key={index}>
                                                                                        <GoldFilled style={{'color':'rgb(255, 190, 1)'}}/> {itemName[item]}
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
                                                    <Radio.Group value={roValue} style={{ marginLeft: "40px" }} onChange={(value) => {
                                                        setLoad(true)
                                                        let iObj = { ...maSelectObj }
                                                        delete iObj.admins
                                                        delete iObj.id
                                                        delete iObj.name
                                                        if (value.target.value == 'all') {
                                                            iObj['authDto']['scope']['role'] = [-1]
                                                        } else {
                                                            iObj['authDto']['scope']['role'] = []
                                                        }
                                                        SocketStore.updateNor({ 'groupId': maSelectKey }, iObj['authDto']).then(() => {
                                                            initData();
                                                        })
                                                    }}>
                                                        <Radio value='all'>全部角色</Radio>
                                                        <Radio value='scope'>部分角色</Radio>
                                                    </Radio.Group>
                                                    {
                                                        roValue == 'scope' && (
                                                            <div className="de_m">
                                                                <div onClick={() => {
                                                                    setAddRoleVisible(true)
                                                                    setAddList(maSelectObj['authDto']['scope']['role'])
                                                                }} style={{ color: '#0db3a6', cursor: 'pointer', margin: '3px 5px 3px 0' }}>
                                                                    + 选择可管理的角色
                                                                </div>
                                                                <div className="de_list">
                                                                    {
                                                                        maSelectObj['authDto']['scope']['role'].map((item, index) => {
                                                                            if (item != -1) {
                                                                                return (
                                                                                    <div className="de_one" key={index}>
                                                                                        <UserAddOutlined style={{color: '#248af9'}}/> {rolesName[item]}
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
                                            </div>
                                        </div>
                                        <div className="ma_right_m">
                                            <div className="mar_l">
                                                通讯录权限
                                            </div>
                                            <div className="mar_r">
                                                <div style={{ marginBottom: '20px' }}>
                                                    内部部门
                                                    <Checkbox checked={inDCheck} onChange={(value) => {
                                                        setLoad(true)
                                                        let iObj = { ...maSelectObj }
                                                        delete iObj.admins
                                                        delete iObj.id
                                                        delete iObj.name
                                                        iObj['authDto']['addressBook']['department'] = value.target.checked
                                                        SocketStore.updateNor({ 'groupId': maSelectKey }, iObj['authDto']).then(() => {
                                                            initData();
                                                        })
                                                    }} style={{ marginLeft: "40px" }}>可见可管理</Checkbox>
                                                </div>
                                                <div style={{ marginBottom: '20px' }}>
                                                    内部角色
                                                    <Checkbox.Group value={[inRLCheck == true && 'look', inRMCheck == true && 'manage']} style={{ marginLeft: "40px" }} onChange={(value) => {
                                                        setLoad(true)
                                                        let iObj = { ...maSelectObj }
                                                        delete iObj.admins
                                                        delete iObj.id
                                                        delete iObj.name
                                                        iObj['authDto']['addressBook']['role'] = [value.indexOf('look') > -1, value.indexOf('manage') > -1]
                                                        SocketStore.updateNor({ 'groupId': maSelectKey }, iObj['authDto']).then(() => {
                                                            initData();
                                                        })
                                                    }}>
                                                        <Checkbox value='look'>可见</Checkbox>
                                                        <Checkbox value='manage'>可管理</Checkbox>
                                                    </Checkbox.Group>
                                                </div>
                                                <div>
                                                    互联组织
                                                    <Checkbox checked={false} onChange={(value) => { console.log(value) }} style={{ marginLeft: "40px" }}>可见可管理(勾选后，默认管理范围为全部互联组织)</Checkbox>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ma_right_m">
                                            <div className="mar_l">
                                                通讯录权限
                                            </div>
                                            <div className="mar_r">
                                                <div style={{ marginBottom: '20px' }}>
                                                    编辑表单
                                                    <Checkbox checked={editForm} onChange={(value) => {
                                                        setLoad(true)
                                                        let iObj = { ...maSelectObj }
                                                        delete iObj.admins
                                                        delete iObj.id
                                                        delete iObj.name
                                                        iObj['authDto']['editForm'] = value.target.checked
                                                        SocketStore.updateNor({ 'groupId': maSelectKey }, iObj['authDto']).then(() => {
                                                            initData();
                                                        })
                                                    }} style={{ marginLeft: "40px" }}>可编辑</Checkbox>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </Spin>
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
                            addUserIds.map((item, index) => {
                                return (
                                    <div className="addUser_one" key={index}>
                                        <GoldFilled style={{'color':'rgb(255, 190, 1)'}}/>
                                        <div className="one_name">{userName[item]}</div>
                                        {
                                            initList.indexOf(item) <= -1 && (
                                                <div onClick={() => {
                                                    let arr = [...addUserIds]
                                                    arr.splice(arr.indexOf(item), 1)
                                                    SocketStore.setValue('addUserIds', arr)
                                                }} className="one_cross">X</div>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="addUser_bottom">
                        <div className="addUser_left">
                            <Tree defaultExpandAll={true} defaultCheckedKeys={[1]} treeData={mulSelect} onSelect={(selectedKeys, { selected, selectedNodes, node, event }) => {
                                SocketStore.getAddUserList({ 'departmentId': node.value });
                            }} />
                        </div>
                        <div className="addUser_right">
                            <Checkbox.Group value={addUserIds} style={{ width: '100%' }} >
                                <Space direction='vertical'>
                                    {
                                        addUserList.length != 0 && (
                                            allUsers.map((item, index) => {
                                                if (addUserList.some((one) => one['userId'] == item['userId'])) {
                                                    return (
                                                        <Checkbox disabled={initList.indexOf(item['userId']) > -1 || cantList.indexOf(item['userId']) > -1} onClick={() => {
                                                            console.log(item['userId'])
                                                            let arr = [...addUserIds]
                                                            let index = addUserIds.indexOf(item['userId'])
                                                            if (index > -1) {
                                                                arr.splice(index, 1)
                                                            } else {
                                                                arr.push(item['userId'])
                                                            }
                                                            SocketStore.setValue('addUserIds', arr);
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
            <Modal title='添加部门' visible={addDeVisible} onCancel={() => setAddDeVisible(false)} footer={null} destroyOnClose={true}>
                <div className="addUser_main">
                    <TreeSelect multiple treeData={mulSelect} style={{ width: '100%' }} onChange={(value) => setAddList(value)} defaultValue={maSelectObj?.['authDto']?.['scope']?.['department'] || []} />
                    <div className="add_btn">
                        <Button style={{ marginRight: '15px' }} onClick={ () => setAddDeVisible(false)}>取消</Button>
                        <Button type='primary' onClick={() => handleAddDe('de')}>确定</Button>
                    </div>
                </div>
            </Modal>
            <Modal title='添加角色' visible={addRoleVisible} onCancel={() => setAddRoleVisible(false)} footer={null} destroyOnClose={true}>
                <div className="addUser_main">
                    <div className="addUser_top">
                        {
                            addList.map((item, index) => {
                                return (
                                    <div className="addUser_one" key={index}>
                                        <div className="one_name">{rolesName[item]}</div>
                                        <div onClick={() => {
                                            let arr = [...addList]
                                            arr.splice(arr.indexOf(item), 1)
                                            setAddList(arr)
                                        }} className="one_cross">X</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="select_choice">
                        <div style={{ width: '100%' }}>
                            {
                                initRole.map((item, index) => {
                                    if (item.hasOwnProperty('roles') && JSON.stringify(item['roles']) != '{}') {
                                        return (
                                            <div className="select_role_oneItem" key={index}>
                                                <div className="select_role_father">
                                                    <FolderAddOutlined style={{ color: '#248af9' }} /> {item['name']}
                                                </div>
                                                {
                                                    Object.keys(item['roles']).map((key, oIndex) => {
                                                        return (
                                                            <div onClick={() => {
                                                                let iArr = [...addList]
                                                                let keyIndex = iArr.indexOf(parseInt(key))
                                                                if (keyIndex > -1) {
                                                                    iArr.splice(keyIndex, 1)
                                                                } else {
                                                                    iArr.push(parseInt(key))
                                                                }
                                                                console.log(key);
                                                                setAddList(iArr)
                                                            }} key={oIndex} className="select_role_child">
                                                                <div><UserAddOutlined style={{ color: '#248af9' }} /> {item['roles'][key]}</div>
                                                                <Checkbox checked={addList.indexOf(parseInt(key)) > -1} />
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
                    <div className="add_btn">
                        <Button style={{ marginRight: '15px' }} onClick={() =>  setAddRoleVisible(false)}>取消</Button>
                        <Button type='primary' onClick={() => handleAddDe('ro')}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
})

export default inject((stores) => ({ SocketStore: stores.SocketStore }))(MaLayout)
