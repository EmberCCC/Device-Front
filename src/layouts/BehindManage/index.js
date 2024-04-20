import {
    BellOutlined,
    CompassOutlined,
    FileTextOutlined,
    FolderFilled,
    FolderOpenOutlined,
    FolderOutlined,
    LeftOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons"
import { Button, Spin, Switch } from "antd"
import { MenuObj } from "constants/configs"
import Node_charge from "layouts/FlowManage/Self_Form/node_charge"
import { toJS } from "mobx"
import { inject, observer } from "mobx-react"
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import './index.less'
const BehindLayout = observer(({ HomeStore, TableStore, SocketStore, FormStore }) => {
    const { selectFormId, arr1, arr2, arr3, arr4 } = FormStore
    const { menu } = HomeStore
    const [operation, setOperation] = useState(1);
    const [type, setType] = useState(1)
    const [openKey, setOpenKey] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        FormStore.getFormAuth({ 'formId': selectFormId })
        HomeStore.getMenuList();
    }, [])
    const handleUpdate = (value) => {
        setLoading(true)
        FormStore.updateFormInfo({ 'operation': operation, 'formId': selectFormId, 'department': value['department'], 'role': value['role'], 'user': value['user'] }, operation).then(() => {
            FormStore.getFormAuth({ 'formId': selectFormId }).then(() => setLoading(false))
        })
    }
    return (
        <div>
            <div className="manage_header">
                <div>
                    <NavLink to={'/common'}>
                        <LeftOutlined />
                    </NavLink>
                </div>
                <div>管理后台</div>
                <div>
                    <BellOutlined className="message_icon" />
                    <QuestionCircleOutlined className="message_icon" />
                    <CompassOutlined className="message_icon" />
                </div>
            </div>
            <div className="manage_content">
                <div className="manage_left">
                    <div className="manage_menu">
                        <div className="manage_menu_title">
                            应用设置
                        </div>
                        <div className={`manage_menu_item ${type == 1 ? 'active' : ''}`} onClick={() => {
                            setType(1)
                        }}>
                            表单/仪表盘权限
                        </div>
                        <div className={`manage_menu_item ${type == 2 ? 'active' : ''}`} onClick={() => {
                            console.log(2);
                        }}>
                            跨应用
                        </div>
                        <div className={`manage_menu_item ${type == 3 ? 'active' : ''}`} onClick={() => {
                            console.log(3);
                        }}>
                            应用信息/URL
                        </div>
                    </div>
                    <div className="manage_menu">
                        <div className="manage_menu_title">
                            高级功能
                        </div>
                        <div className={`manage_menu_item ${type == 4 ? 'active' : ''}`} onClick={() => {
                            console.log(4);
                        }}>
                            聚合表
                        </div>
                        <div className={`manage_menu_item ${type == 5 ? 'active' : ''}`} onClick={() => {
                            console.log(5);
                        }}>
                            智能助手
                        </div>
                        <div className={`manage_menu_item ${type == 6 ? 'active' : ''}`} onClick={() => {
                            console.log(6);
                        }}>
                            数据工厂
                        </div>
                        <div className={`manage_menu_item ${type == 7 ? 'active' : ''}`} onClick={() => {
                            console.log(7);
                        }}>
                            流程分析
                        </div>
                    </div>
                </div>
                <div className="manage_right">
                    <div className="manage_right_title">
                        表盘/仪表盘权限
                    </div>
                    <div className="manage_right_detail">
                        <div className="manage_right_operation">
                            <div className="operation_left">
                                <div className="operation_left_title">
                                    <span className="title_1">1、选择表盘/仪表盘</span>
                                    <span className="title_2">批量选择</span>
                                </div>
                                <div className="operation_left_content">
                                    {
                                        menu.map((item, index) => {
                                            let idIndex = openKey.indexOf(item['menuId'])
                                            return (
                                                <div className='left_menu_father' key={index}>
                                                    <div onClick={() => {
                                                        let iArr = [...openKey]
                                                        if (idIndex > -1) {
                                                            iArr.splice(idIndex, 1)
                                                        } else {
                                                            iArr.push(item['menuId'])
                                                        }
                                                        setOpenKey(iArr)
                                                    }} className='left_menu_f1'>
                                                        {idIndex > -1 && (
                                                            <FolderOpenOutlined className='node_icon' style={{ color: "#0db3a6" }} />
                                                        )}
                                                        {idIndex <= -1 && (
                                                            <FolderFilled className='node_icon' style={{ color: "#0db3a6" }} />
                                                        )}
                                                        <span className='node_name'>{item.menuName}
                                                        </span>
                                                    </div>
                                                    {
                                                        item.simpleForms.length > 0 && (
                                                            item.simpleForms.map((one, oIndex) => {
                                                                return (
                                                                    <div key={oIndex} onClick={() => {
                                                                        setLoading(true)
                                                                        FormStore.setValue('selectFormId', one['formId'])
                                                                        FormStore.getFormAuth({ 'formId': one['formId'] }).then(() => setLoading(false))
                                                                    }} className={`left_menu_child ${idIndex > -1 ? 'display' : 'undisplay'} ${selectFormId == one['id'] ? 'actived' : ''}`}><FileTextOutlined className='node_icon' style={{ 'color': `${one['type'] == 0 ? "#5da0cc" : "rgb(245, 164, 57)"}` }} /><span className='node_name'>{one.formName}</span></div>
                                                                )
                                                            })
                                                        )
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <Spin spinning={loading} tip={'加载中.....'} wrapperClassName="operation_right">
                                <div className="operation_right">
                                    <div className="operation_left_title">
                                        <span className="title_1">2、配置权限</span>
                                        <span className="title_3">将成员加入权限组，授权他们填写、管理表单数据或查看仪表盘/报表</span>
                                    </div>
                                    <div className="operation_right_content">
                                        <div className="operation_right_detail">
                                            <div className="auth_group">
                                                <Button type="primary" style={{ width: '120px' }}>+ 新建权限组</Button>
                                                <Button danger>停用全部权限组</Button>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="auth_group_item">
                                                <div className="auth_item_title1">
                                                    <span className="title1_1">直接提交数据</span>
                                                    <Switch />
                                                </div>
                                                <div className="auth_item_title2">在此分组内的成员只可以填报数据</div>
                                                <div className="auth_item_content" onClick={() => setOperation(1)}>
                                                    <Node_charge handleUpdate={handleUpdate} charge_person={arr1} />
                                                </div>
                                            </div>
                                            <div className="auth_group_item">
                                                <div className="auth_item_title1">
                                                    <span className="title1_1">提交并管理本人数据</span>
                                                    <Switch />
                                                </div>
                                                <div className="auth_item_title2">在此分组内的成员可以填报数据、管理自己填报的数据</div>
                                                <div className="auth_item_content" onClick={() => setOperation(2)}>
                                                    <Node_charge handleUpdate={handleUpdate} charge_person={arr2} />
                                                </div>
                                            </div>
                                            <div className="auth_group_item">
                                                <div className="auth_item_title1">
                                                    <span className="title1_1">管理全部数据</span>
                                                    <Switch />
                                                </div>
                                                <div className="auth_item_title2">在此分组内的成员可以管理全部数据、填报数据、但不可以导入数据</div>
                                                <div className="auth_item_content" onClick={() => setOperation(3)}>
                                                    <Node_charge handleUpdate={handleUpdate} charge_person={arr3} />
                                                </div>
                                            </div>
                                            <div className="auth_group_item">
                                                <div className="auth_item_title1">
                                                    <span className="title1_1">查看全部数据</span>
                                                    <Switch />
                                                </div>
                                                <div className="auth_item_title2">在此分组内的成员可以查看所有数据</div>
                                                <div className="auth_item_content" onClick={() => setOperation(4)}>
                                                    <Node_charge handleUpdate={handleUpdate} charge_person={arr4} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Spin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})


export default inject((stores) => ({ HomeStore: stores.HomeStore, TableStore: stores.TableStore, SocketStore: stores.SocketStore, FormStore: stores.FormStore }))(BehindLayout)
