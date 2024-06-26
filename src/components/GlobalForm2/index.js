import React from 'react'
import { Form, Button, Select, Modal, message, Tabs } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import { GlobalComponent } from 'layouts/TableEdit/config';
import { inject, observer } from 'mobx-react';
import { typeName } from 'constants/status_constant';
import { toJS } from 'mobx';
import moment from 'moment';
import '../../layouts/TableEdit/index.css'

const { Option } = Select;
@inject('HomeStore', 'TableStore', 'MessageStore')
@observer
class GlobalForm extends React.Component {
    state = {
        secondFormId: 0
    };
    render() {
        const secondFormId = this.state.secondFormId;
        const { itemInfo, field, itemField } = this.props.MessageStore;
        const { TabPane } = Tabs;
        let itemData = []
        //转换为所需对象
        const changeField = () => {
            let obj = []
            if (field.length != 0) {
                let itemData1 = field.filter(function (txt) {
                    return txt.secondFormId == secondFormId
                })
                if (itemData1.length == 0) {
                    return [];
                }
                toJS(itemData1)
                if (itemData1[0].properties != undefined && itemData1[0].properties.length != 0) {
                    let properties = {}
                    properties = toJS(itemData1[0].properties)
                    if (properties != undefined && itemField.length != 0) {
                        properties.forEach(element => {
                            let ele = {}
                            ele.label = element.name
                            ele.attr = element.others
                            if (element.propertyId && itemField.data[element.propertyId] && itemField.data) {
                                ele.attr.value = itemField.data[element.propertyId]
                            }
                            ele.propertyId = element.propertyId
                            ele.name = typeName[element.typeId]
                            obj.push(ele)
                        });
                    }

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
                    if (item.name == "RangePicker") {
                        let time = []
                        e[x[0]].map((item) => {
                            time.push(moment(item).format('lll   '))
                        })
                        item.attr.value = time
                    } else if (item.name == "DatePicker") {
                        let time = []
                        time.push(moment(e[x[0]]).format('lll'))
                        item.attr.value = time
                    } else {
                        item.attr.value = e[x[0]];
                    }
                }
            })
        }

        const dateFormat = 'lll';

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
                case "RangePicker":
                    if (item.attr.value != undefined) {
                        return <ComponentInfo key={indexs} {...item.attr} defaultValue={[moment(item.attr.value[0], dateFormat), moment(item.attr.value[1], dateFormat)]} format={dateFormat} />
                    } else {
                        return <ComponentInfo key={indexs} {...item.attr} format={dateFormat} />
                    }
                case "DatePicker":
                    if (item.attr.value != undefined) {
                        return <ComponentInfo key={indexs} {...item.attr} defaultValue={moment(item.attr.value, dateFormat) || ''} format={dateFormat} />
                    } else {
                        return <ComponentInfo key={indexs} {...item.attr} format={dateFormat} />
                    }
                case 'InputNumber':
                    return <ComponentInfo key={indexs} {...item.attr} defaultValue={Number(item.attr.value)} />
                default:
                    return <ComponentInfo key={indexs} {...item.attr} defaultValue={item.attr.value} />
            }
        }
        // 递归函数
        const loop = (arr, index) => {
            arr = changeField()
            return (
                arr.map((item, i) => {
                    const indexs = index === '' ? String(i) : `${index}-${i}`;
                    if (item) {
                        const ComponentInfo = GlobalComponent[item.name]
                        const text = item.attr.descripe || ''
                        return (
                            <Form.Item
                                key={indexs}
                                label={item.label}
                                name={item.label}
                                className='formItemStyle'
                                extra={text}
                            >
                                {
                                    renderDiffComponents(item, indexs, ComponentInfo)
                                }
                                <hr></hr>
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
            params.firstFormId = firstFormId
            params.secondFormId = 0;
            this.props.HomeStore.countObj({ firstFormId: firstFormId });
            if (this.props.type == true) {
                Modal.confirm({
                    title: '提示',
                    content: '是否修改此条数据？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        params.updateData = toJS(uploadData)
                        params.dataId = toJS(this.props.dataInfo).id
                        console.log(params);
                        console.log(this.props.dataInfo);
                        this.props.HomeStore.updataObj(params).then(res => {
                            message.success('修改成功')
                        })
                    },
                });
            } else {
                Modal.confirm({
                    title: '提示',
                    content: '是否添加此条数据？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        params.data = toJS(uploadData)

                        addNew(params).then(res => {
                            message.success('添加成功')
                        })
                    },
                });
            }
        }

        const changeTabs = (e) => {
            this.setState({
                secondFormId: Number(e)
            })
            let itemObj = this.props.HomeStore.uploadData
            itemData.forEach(element => {
                let key = element.propertyId
                if ('value' in element.attr) {
                    itemObj[key] = element.attr.value
                }
            });
        }
        return <div style={{ width: '50%', borderRight: 'solid 1px grey' }}>
            {
                this.props.MessageStore.field.length > 1 && <Tabs activeKey={this.state.secondFormId.toString()} onChange={changeTabs} type='card'>
                    {this.props.HomeStore.field.map((item, index) => {
                        return <TabPane tab={<div><EditOutlined />{item.secondFormId + 1}</div>} key={(index).toString()} />
                    })}
                </Tabs>
            }
            <Form layout={'vertical'} onFinish={sub} onValuesChange={handleLabelChange}>
                {loop(itemData, '')}
                {/* <Form.Item>
                    <Button type="primary" onClick={sub}>Submit</Button>
                </Form.Item> */}
            </Form>
        </div>
    }

    componentWillUnmount() {
        this.props.MessageStore.setItemInfo({});
    }
}
export default GlobalForm