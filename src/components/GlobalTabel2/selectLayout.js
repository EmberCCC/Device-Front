/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-13 10:02:28
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-13 19:28:55
 * @FilePath: \bl-device-manage-test\src\components\GlobalTabel2\selectLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, InputNumber, Popover, Select, TimePicker } from "antd";
import { select_arr, select_condtion } from "constants/select_config";
import { indexOf } from "lodash";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

const SelectLayout = observer(({ TableStore, HomeStore }) => {
    const [select_type, setSelect_type] = useState('and');
    const [selectList, setSelectList] = useState(JSON.parse(sessionStorage.getItem('select_' + HomeStore.firstFormId)) || [])
    const [menu, setMenu] = useState(null)
    useEffect(() => {
        console.log(toJS(TableStore.columns));
    }, [])
    const handleAdd = (item) => {
        if (['createPerson', 'updateTime', 'createTime'].indexOf(item['dataIndex']) <= -1) {
            const typeId = item['detailJson']['typeId']
            const fieldId = item['detailJson']['fieldId']
            let iList = [...selectList];
            const obj = { 'operator': select_condtion[select_arr[typeId][0]]['value'], 'fieldTypeId': typeId, 'fieldId': fieldId, 'operand': "", 'fieldInfo': toJS(item['detailJson']) };
            iList.push(obj)
            setSelectList(iList);
        } else if ('updateTime' == item['dataIndex']) {
            let iList = [...selectList];
            const obj = { 'operator': select_condtion[select_arr[select_arr.length - 3][0]]['value'], 'fieldTypeId': select_arr.length - 1, 'fieldInfo': { 'fieldId': item['dataIndex'] } };
            iList.push(obj)
            setSelectList(iList);
        } else if ('createTime' == item['dataIndex']) {
            let iList = [...selectList];
            const obj = { 'operator': select_condtion[select_arr[select_arr.length - 1][0]]['value'], 'fieldTypeId': select_arr.length - 2, 'fieldInfo': { 'fieldId': item['dataIndex'] } };
            iList.push(obj)
            setSelectList(iList);
        } else if ('createPerson' == item['dataIndex']) {
            let iList = [...selectList];
            const obj = { 'operator': select_condtion[select_arr[select_arr.length - 1][0]]['value'], 'fieldTypeId': select_arr.length - 3, 'fieldInfo': { 'fieldId': item['dataIndex'] } };
            iList.push(obj)
            setSelectList(iList);
        }

    }
    const handleInput = (e, index, item) => {
        item['operand'] = e.target.value;
        let iSelectList = [...selectList]
        iSelectList.splice(index, 1, item);
        setSelectList(iSelectList);
        console.log(selectList);
    }
    const handleModelChange = (e, item, index) => {
        item['operator'] = e
        item['operand'] = ""
        let iSelectList = [...selectList]
        iSelectList.splice(index, 1, item);
        setSelectList(iSelectList);
        console.log(selectList);
    }
    const handleMathChange = (e, item, index) => {
        item['operand'] = e
        let iSelectList = [...selectList]
        iSelectList.splice(index, 1, item);
        setSelectList(iSelectList);
        console.log(selectList);
    }

    const handleDateChange = (e, item, index, format, type) => {
        console.log(e);
        if (type == 1) {
            item['operand'] = moment(e).format(format)
            let iSelectList = [...selectList]
            iSelectList.splice(index, 1, item);
            setSelectList(iSelectList);
            console.log(selectList);
        } else if (type == 2) {
            item['operand'] = []
            item['operand'].push(moment(e[0]).format(format))
            item['operand'].push(moment(e[1]).format(format))
            let iSelectList = [...selectList]
            iSelectList.splice(index, 1, item);
            setSelectList(iSelectList);
            console.log(selectList);
        }

    }
    const getSelectItem = (item, index) => {
        console.log(item);
        if (item)
            if (item['fieldTypeId'] == '0' || item['fieldTypeId'] == '4' || item['fieldTypeId'] == '6' || item['fieldTypeId'] == select_arr.length - 3) {
                return (
                    <div className="sel_item" key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldTypeId'] == select_arr.length - 3 ? '创建人' : item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center' }} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['=', '#', '$', '*', '|', '-'].indexOf(item['operator']) > -1 && (
                                    <Input onChange={(e) => handleInput(e, index, item)} style={{ marginLeft: '24px', marginBottom: '8px', width: 302 }} defaultValue={item['operand']} />
                                )
                            }
                        </div>
                    </div>
                )
            } else if (item['fieldTypeId'] == '1') {
                return (
                    <div className="sel_item" key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center' }} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['|', '-'].indexOf(item['operator']) > -1 && (
                                    <Input onChange={(e) => handleInput(e, index, item)} style={{ marginLeft: '24px', marginBottom: '8px', width: 302 }} defaultValue={item['operand']} />
                                )
                            }
                        </div>
                    </div>
                )
            } else if (item['fieldTypeId'] == '2') {
                return (
                    <div className="sel_item" key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center' }} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['=', '#'].indexOf(item['operator']) > -1 && (
                                    <InputNumber onChange={(e) => handleMathChange(e, item, index)} style={{ marginLeft: '24px', marginBottom: '8px', width: 302 }} defaultValue={item['operand']} />
                                )
                            }
                        </div>
                    </div>
                )
            } else if (item['fieldTypeId'] == '3' || item['fieldTypeId'] == select_arr.length - 2 || item['fieldTypeId'] == select_arr.length - 1) {
                console.log(item);
                const iFormat = item['fieldInfo']['format'] === 'date' ? 'YYYY-MM-DD' : item['fieldInfo']['format'] === 'dateTime' ? 'YYYY-MM-DD HH:mm:ss' : "hh:mm:ss";
                const showTime = item['fieldInfo']['format'] == 'date' ? false : true
                return (
                    <div className="sel_item" key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldTypeId'] == select_arr.length - 2 ? '创建时间' : item['fieldTypeId'] == select_arr.length - 1 ? '更新时间' : item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center' }} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['=', '#', '[', ']'].indexOf(item['operator']) > -1 && (
                                    <DatePicker format={iFormat} showNow={false} showTime={showTime} onChange={(e) => handleDateChange(e, item, index, iFormat, 1)} style={{ marginLeft: '24px', marginBottom: '8px', width: 302 }} defaultValue={item['operand']} />
                                )
                            }
                            {
                                ['~'].indexOf(item['operator']) > -1 && (
                                    <DatePicker.RangePicker format={iFormat} showNow={false} showTime={showTime} onChange={(e) => handleDateChange(e, item, index, iFormat, 2)} style={{ marginLeft: '24px', marginBottom: '8px', width: 302 }} defaultValue={item['operand']} />
                                )
                            }
                        </div>
                    </div>
                )
            } else if (item['fieldTypeId'] == '5' || item['fieldTypeId'] == '7') {
                return (
                    <div className="sel_item" key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center' }} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['='].indexOf(item['operator']) > -1 && (
                                    <Input onChange={(e) => handleInput(e, index, item)} style={{ marginLeft: '24px', marginBottom: '8px', width: 302 }} defaultValue={item['operand']} />
                                )
                            }
                            {
                                ['(', ')'].indexOf(item['operator']) > -1 && (
                                    <Input onChange={(e) => handleInput(e, index, item)} style={{ marginLeft: '24px', marginBottom: '8px', width: 302 }} defaultValue={item['operand']} />
                                )
                            }
                        </div>
                    </div>
                )
            }
    }
    useEffect(() => {
        setMenu(
            (
                <div className='columns_list'>
                    {
                        TableStore.columns.map((item, index) => {
                            if (selectList.some(sort_item => sort_item['fieldInfo']['fieldId'] == item['key'])) {
                                return (
                                    <div className="columns_item" key={index}>
                                        {item['title']}
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="columns_item item_uncheck" onClick={() => handleAdd(item)} key={index}>
                                        {item['title']}
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            )
        )
    }, [selectList])
    const handleSelect = () => {
        console.log(selectList);
        console.log(select_type);
        let params = {}
        params['formId'] = HomeStore.firstFormId
        params['restrictType'] = select_type;
        params['conditions'] = []
        selectList.map((item, index) => {
            if (item['operand'] != '') {
                if (item['fieldTypeId'] == select_arr.length - 3) {
                    params['createPerson'] = { 'operator': item['operator'], 'operand': item['operand'] || "" }
                } else if (item['fieldTypeId'] == select_arr.length - 2) {
                    params['createTime'] = { 'operator': item['operator'], 'operand': item['operand'] || "" }
                } else if (item['fieldTypeId'] == select_arr.length - 1) {
                    params['updateTime'] = { 'operator': item['operator'], 'operand': item['operand'] || "" }
                } else {
                    let iObj = { "fieldId": item['fieldId'], "fieldTypeId": item['fieldTypeId'], "operator": item['operator'], "operand": item['operand'] || "" }
                    params['conditions'].push(iObj);
                }
            }
        })
        if (TableStore.model == 'subitAndManage') {
            TableStore.getScreenData(params, 'myself')
        } else {
            TableStore.getScreenData(params, 'all')
        }
        console.log(params);
    }
    const handleClear = () => {
        setSelectList([]);
    }
    return (
        <div className="select_main">
            <div className="select_title">
                筛选出以下
                <Select onChange={(value) => setSelect_type(value)} defaultValue={select_type} style={{ paddingLeft: '5px', paddingRight: '5px' }} bordered={false}>
                    <Select.Option value='and'>所有</Select.Option>
                    <Select.Option value='or'>任意</Select.Option>
                </Select>
                条件的数据
            </div>
            <Popover content={menu} trigger='click'>
                <div className='sort_add'>
                    <Button>+添加过滤条件</Button>
                </div>
            </Popover>
            <div className="select_content">
                {
                    selectList.map((item, index) => {
                        return getSelectItem(item, index)
                    })
                }
            </div>
            <div className="select_bottom">
                <Button type="primary" className="selbtn" onClick={handleSelect}>筛选</Button>
                <Button type="ghost" className="clebtn" onClick={handleClear}>清除</Button>
            </div>
        </div>
    )
})

export default inject((stores) => ({ TableStore: stores.TableStore, HomeStore: stores.HomeStore }))(SelectLayout)