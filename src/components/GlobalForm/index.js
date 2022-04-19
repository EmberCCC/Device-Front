/*
 * @Author: your name
 * @Date: 2022-04-05 11:02:45
 * @LastEditTime: 2022-04-19 22:46:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\components\GlobalForm\index.js
 */

import React from 'react'
import { Form, Button, Select, Modal, message, Tabs } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import { GlobalComponent } from 'layouts/TableEdit/config';
import { inject, observer } from 'mobx-react';
import { typeName } from 'constants/status_constant';
import { toJS } from 'mobx';
import '../../layouts/TableEdit/index.css'

const { Option } = Select;
@inject('HomeStore')
@observer
class GlobalForm extends React.Component {
    render() {
        const { secondFormId, itemDataT } = this.props.HomeStore
        const loading = this.props.loading
        const getData = this.props.getData
        const { TabPane } = Tabs;
        let page = { pageIndex: 1, pageSize: 2 }
        let itemData = []
        //转换为所需对象
        const changeField = () => {
            let obj = []
            if (itemDataT.length != 0) {
                let itemData1 = itemDataT.filter(function (txt) {
                    return txt.secondFormId == secondFormId
                })
                console.log(toJS(itemData1));
                if (itemData1.length == 0) {
                    return [];
                }
                toJS(itemData1)
                if (itemData1[0].properties != undefined && itemData1[0].properties.length != 0) {
                    let properties = {}
                    properties = toJS(itemData1[0].properties)
                    properties.forEach(element => {
                        let ele = {}
                        ele.label = element.name
                        ele.attr = element.others
                        delete ele.attr.value
                        ele.propertyId = element.propertyId
                        ele.name = typeName[element.typeId]
                        obj.push(ele)
                    });
                } else {
                    itemData = []
                    return []
                }
            }
            itemData = obj
            return obj
        }


        const handleLabelChange = (e) => {
            const x = Object.keys(e);
            itemData.map(item => {
                if (item.label == x[0]) {
                    item.attr.value = e[x[0]];
                }
            })
        }

        const renderDiffComponents = (item, indexs, ComponentInfo) => {
            switch (item.name) {
                case 'Divider':
                    return <ComponentInfo key={indexs} {...item.attr}></ComponentInfo>
                case 'Select':
                    return (
                        <ComponentInfo key={indexs} defaultValue={item.attr.value}>
                            {
                                item.attr.options.map(subItem => <Option key={subItem.key} value={subItem.value + ''}>{subItem.label}</Option>)
                            }
                        </ComponentInfo>
                    )
                default:
                    return <ComponentInfo key={indexs} {...item.attr} />
            }
        }
        // 递归函数
        const loop = (arr, index) => {
            arr = changeField()
            console.log(arr);
            return (
                arr.map((item, i) => {
                    const indexs = index === '' ? String(i) : `${index}-${i}`;
                    if (item) {
                        if (item.children) {
                            return (
                                <div {...item.attr} data-id={indexs} key={indexs}>
                                    {loop(item.children, indexs)}
                                </div>
                            )
                        }
                        const ComponentInfo = GlobalComponent[item.name]
                        console.log(item.attr.describe);
                        return (
                            <Form.Item
                                key={indexs}
                                label={item.label}
                                name={item.label}
                                className='formItemStyle'
                            >
                                {
                                    item.attr.descripe &&
                                    <div className='formItemDescripe'>{item.attr.descripe}</div>
                                }
                                {
                                    renderDiffComponents(item, indexs, ComponentInfo)
                                }
                            </Form.Item>
                        )
                    } else {
                        return null
                    }
                })
            )
        };

        const sub = (values) => {
            const { firstFormId, addNew, uploadData } = this.props.HomeStore
            let itemObj = uploadData
            itemData.forEach(element => {
                let key = element.propertyId
                if ('value' in element.attr) {
                    itemObj[key] = element.attr.value
                }
            });
            let params = {};
            params.data = uploadData
            params.firstFormId = firstFormId
            Modal.confirm({
                title: '提示',
                content: '是否添加此条数据？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    console.log(params);
                    getData(page)
                    addNew(params).then(res => {
                        message.success('添加成功')
                    })
                },
            });
        }

        const changeTabs = (e) => {
            this.props.HomeStore.changeSecondFormId(Number(e))
            let itemObj = this.props.HomeStore.uploadData
            itemData.forEach(element => {
                let key = element.propertyId
                if ('value' in element.attr) {
                    itemObj[key] = element.attr.value
                }
            });
        }
        return <div>
            <Tabs size='large' activeKey={this.props.HomeStore.secondFormId.toString()} onChange={changeTabs}>
                {this.props.HomeStore.itemDataT.map((item, index) => {
                    return <TabPane tab={<div><EditOutlined />{item.secondFormId + 1}</div>} key={(index).toString()} />
                })}
            </Tabs>
            <Form layout={'vertical'} onFinish={sub} onValuesChange={handleLabelChange} loading={loading}>
                {loop(itemData, '')}
                <Form.Item>
                    <Button type="primary" onClick={sub}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    }

    componentWillUnmount() {
        this.props.HomeStore.uploadData = {}
        this.props.HomeStore.secondFormId = 0
    }
}
export default GlobalForm