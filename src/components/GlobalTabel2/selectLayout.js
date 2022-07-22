/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-13 10:02:28
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-22 18:22:34
 * @FilePath: \bl-device-manage-test\src\components\GlobalTabel2\selectLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DeleteOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, InputNumber, message, Popover, Select } from "antd";
import { select_arr, select_condtion } from "constants/select_config";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

const SelectLayout = observer(({ TableStore, HomeStore }) => {
    const [select_type, setSelect_type] = useState('and');
    const [selectList, setSelectList] = useState(JSON.parse(sessionStorage.getItem('select_' + HomeStore.firstFormId)) || [])
    const [menu, setMenu] = useState(null)
    const { allData, columns } = TableStore
    useEffect(() => {
        console.log(toJS(columns));
    }, [])
    const handleAdd = (item) => {
        let iList = []
        if (['createPerson', 'updateTime', 'createTime'].indexOf(item['dataIndex']) <= -1) {
            const typeId = item['detailJson']['typeId']
            const fieldId = item['detailJson']['fieldId']
            iList = [...selectList];
            const obj = { 'operator': select_condtion[select_arr[typeId][0]]['value'], 'fieldTypeId': typeId, 'fieldId': fieldId, 'operand': "", 'fieldInfo': toJS(item['detailJson']) };
            iList.push(obj)
            setSelectList(iList);
        } else if ('updateTime' == item['dataIndex']) {
            iList = [...selectList];
            const obj = { 'operator': select_condtion[select_arr[select_arr.length - 3][0]]['value'], 'fieldTypeId': select_arr.length - 1, 'fieldInfo': { 'fieldId': item['dataIndex'] } };
            iList.push(obj)
            setSelectList(iList);
        } else if ('createTime' == item['dataIndex']) {
            iList = [...selectList];
            const obj = { 'operator': select_condtion[select_arr[select_arr.length - 1][0]]['value'], 'fieldTypeId': select_arr.length - 2, 'fieldInfo': { 'fieldId': item['dataIndex'] } };
            iList.push(obj)
            setSelectList(iList);
        } else if ('createPerson' == item['dataIndex']) {
            iList = [...selectList];
            const obj = { 'operator': select_condtion[select_arr[select_arr.length - 1][0]]['value'], 'fieldTypeId': select_arr.length - 3, 'fieldInfo': { 'fieldId': item['dataIndex'] } };
            iList.push(obj)
            setSelectList(iList);
        }
        sessionStorage.setItem('select_' + HomeStore.firstFormId, JSON.stringify(iList))
    }
    const handleInput = (e, index, item) => {
        item['operand'] = e;
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
            item['operand'] = moment(e).format('YYYY-MM-DD HH:mm:ss')
            let iSelectList = [...selectList]
            iSelectList.splice(index, 1, item);
            setSelectList(iSelectList);
            console.log(selectList);
        } else if (type == 2) {
            item['operand'] = []
            item['operand'].push(moment(e[0]).format('YYYY-MM-DD HH:mm:ss'))
            item['operand'].push(moment(e[1]).format('YYYY-MM-DD HH:mm:ss'))
            let iSelectList = [...selectList]
            iSelectList.splice(index, 1, item);
            setSelectList(iSelectList);
            console.log(selectList);
        }

    }
    const handleDel = (index) => {
        let iSel = [...selectList]
        iSel.splice(index, 1)
        setSelectList(iSel);
        sessionStorage.setItem('select_' + HomeStore.firstFormId, JSON.stringify(iSel))
    }
    const handleAsChange = (e, item, index) => {
        console.log(e);
        item['operand'] = [
            [moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')],
            [moment().add(-1, 'd').startOf('days').format('YYYY-MM-DD HH:mm:ss'), moment().add(-1, 'd').endOf('days').format('YYYY-MM-DD HH:mm:ss')],
            [moment().add(1, 'd').startOf('days').format('YYYY-MM-DD HH:mm:ss'), moment().add(1, 'd').endOf('days').format('YYYY-MM-DD HH:mm:ss')],
            [moment().week(moment().week()).startOf('week').format('YYYY-MM-DD HH:mm:ss'), moment().week(moment().week()).endOf('week').format('YYYY-MM-DD HH:mm:ss')],
            [moment().week(moment().week() - 1).startOf('week').format('YYYY-MM-DD HH:mm:ss'), moment().week(moment().week() - 1).endOf('week').format('YYYY-MM-DD HH:mm:ss')],
            [moment().week(moment().week() + 1).startOf('week').format('YYYY-MM-DD HH:mm:ss'), moment().week(moment().week() + 1).endOf('week').format('YYYY-MM-DD HH:mm:ss')],
            [moment().month(moment().month()).startOf('month').format('YYYY-MM-DD HH:mm:ss'), moment().month(moment().month()).startOf('month').format('YYYY-MM-DD HH:mm:ss')],
            [moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD HH:mm:ss'), moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD HH:mm:ss')],
            [moment().month(moment().month() + 1).startOf('month').format('YYYY-MM-DD HH:mm:ss'), moment().month(moment().month() + 1).startOf('month').format('YYYY-MM-DD HH:mm:ss')],
            [moment().quarter(moment().quarter()).startOf('quarter').format('YYYY-MM-DD HH:mm:ss'), moment().quarter(moment().quarter()).endOf('quarter').format('YYYY-MM-DD HH:mm:ss')],
            [moment().quarter(moment().quarter() - 1).startOf('quarter').format('YYYY-MM-DD HH:mm:ss'), moment().quarter(moment().quarter() - 1).endOf('quarter').format('YYYY-MM-DD HH:mm:ss')],
            [moment().year(moment().year()).startOf('year').format('YYYY-MM-DD HH:mm:ss'), moment().year(moment().year()).endOf('year').format('YYYY-MM-DD HH:mm:ss')],
            [moment().year(moment().year() + 1).startOf('year').format('YYYY-MM-DD HH:mm:ss'), moment().year(moment().year() + 1).endOf('year').format('YYYY-MM-DD HH:mm:ss')],
            [moment().year(moment().year() - 1).startOf('year').format('YYYY-MM-DD HH:mm:ss'), moment().year(moment().year() - 1).endOf('year').format('YYYY-MM-DD HH:mm:ss')]
        ][e - 1]
        let iSelectList = [...selectList]
        iSelectList.splice(index, 1, item);
        setSelectList(iSelectList);
    }
    const getSelectItem = (item, index) => {
        let dataList = [];
        allData.map((info, index) => {
            // if ((info.hasOwnProperty(item['fieldId']) || info.hasOwnProperty('createPerson')) && (dataList.indexOf(info[item['fieldId']]) <= -1 || dataList.indexOf(info['createPerson']) <= -1)) {
            //     dataList.push(info);
            // }
            if (item['fieldTypeId'] == select_arr.length - 3) {
                if (info.hasOwnProperty('createPerson') && dataList.indexOf(info['createPerson']) <= -1) {
                    dataList.push(info['createPerson'])
                }
            } else if (item['fieldTypeId'] == select_arr.length - 2) {
                if (info.hasOwnProperty('createTime') && dataList.indexOf(info['createTime']) <= -1) {
                    dataList.push(info['createTime'])
                }
            } else if (item['fieldTypeId'] == select_arr.length - 1) {
                if (info.hasOwnProperty('updateTime') && dataList.indexOf(info['updateTime']) <= -1) {
                    dataList.push(info['updateTime'])
                }
            } else {
                if (info.hasOwnProperty(item['fieldId']) && dataList.indexOf(info[item['fieldId']]) <= -1) {
                    dataList.push(info[item['fieldId']]);
                }
            }
        })
        let exchangeObj = {}
        if (['4', '5', '6', '7'].indexOf(item['fieldInfo']['typeId']) > -1) {
            item['fieldInfo']['enum'].map((infoE, index) => {
                exchangeObj[infoE] = item['fieldInfo']['enumNames'][index]
            })
        }
        console.log([moment().year(moment().year() - 1).startOf('year').format('YYYY-MM-DD HH:mm:ss'), moment().year(moment().year() - 1).endOf('year').format('YYYY-MM-DD HH:mm:ss')]);
        if (item) {
            if (item['fieldTypeId'] == '0' || item['fieldTypeId'] == select_arr.length - 3) {
                return (
                    <div key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldTypeId'] == select_arr.length - 3 ? '创建人' : item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleDel(index)} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['=', '#'].indexOf(item['operator']) > -1 && (
                                    <Select style={{ width: '100%' }} onChange={(e) => handleInput(e, index, item)} defaultValue={item['operand']}>
                                        {
                                            dataList.map((info, index) => {
                                                return (
                                                    <Select.Option key={index} value={info}>{info}</Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )
                            }
                            {
                                ['$', '*'].indexOf(item['operator']) > -1 && (
                                    <Select style={{ width: '100%' }} onChange={(e) => handleInput(e, index, item)} mode='multiple'>
                                        {dataList.map((info, index) => {
                                            return (
                                                <Select.Option key={index} value={info}>{info}</Select.Option>
                                            )
                                        })}
                                    </Select>
                                )
                            }
                            {
                                ['|', '-'].indexOf(item['operator']) > -1 && (
                                    <Input onChange={(e) => handleInput(e.target.value, index, item)} defaultValue={item['operand']} />
                                )
                            }
                        </div>
                    </div>
                )
            } else if (item['fieldTypeId'] == '1') {
                return (
                    <div key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center' }} onClick={() => handleDel(index)} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['|', '-'].indexOf(item['operator']) > -1 && (
                                    <Input onChange={(e) => handleInput(e, index, item)} defaultValue={item['operand']} />
                                )
                            }
                        </div>
                    </div>
                )
            } else if (item['fieldTypeId'] == '2') {
                return (
                    <div key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center' }} onClick={() => handleDel(index)} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['=', '#'].indexOf(item['operator']) > -1 && (
                                    <InputNumber onChange={(e) => handleMathChange(e, item, index)} defaultValue={item['operand']} />
                                )
                            }
                        </div>
                    </div>
                )
            } else if (item['fieldTypeId'] == '3' || item['fieldTypeId'] == select_arr.length - 2 || item['fieldTypeId'] == select_arr.length - 1) {
                console.log(item);
                let iFormat = item['fieldInfo']['format'] === 'date' ? 'YYYY-MM-DD' : item['fieldInfo']['format'] === 'dateTime' ? 'YYYY-MM-DD HH:mm:ss' : "hh:mm:ss";
                const showTime = item['fieldInfo']['format'] == 'date' ? false : true
                if (item['fieldTypeId'] == select_arr.length - 2 || item['fieldTypeId'] == select_arr.length - 1) {
                    iFormat = 'YYYY-MM-DD HH:mm:ss'
                }
                return (
                    <div key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldTypeId'] == select_arr.length - 2 ? '创建时间' : item['fieldTypeId'] == select_arr.length - 1 ? '更新时间' : item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center' }} onClick={() => handleDel(index)} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['=', '#', '[', ']'].indexOf(item['operator']) > -1 && (
                                    <DatePicker format={iFormat} showNow={false} showTime={showTime} onChange={(e) => handleDateChange(e, item, index, iFormat, 1)} />
                                )
                            }
                            {
                                ['~'].indexOf(item['operator']) > -1 && (
                                    <DatePicker.RangePicker format={iFormat} showNow={false} showTime={showTime} onChange={(e) => handleDateChange(e, item, index, iFormat, 2)} />
                                )
                            }
                            {
                                [','].indexOf(item['operator']) > -1 && (
                                    <Select onChange={(e) => handleAsChange(e, item, index)} style={{ width: 120 }}>
                                        <Select.Option value={1}>今天</Select.Option>
                                        <Select.Option value={2}>昨天</Select.Option>
                                        <Select.Option value={3}>明天</Select.Option>
                                        <Select.Option value={4}>本周</Select.Option>
                                        <Select.Option value={5}>上周</Select.Option>
                                        <Select.Option value={6}>下周</Select.Option>
                                        <Select.Option value={7}>本月</Select.Option>
                                        <Select.Option value={8}>上月</Select.Option>
                                        <Select.Option value={9}>下月</Select.Option>
                                        <Select.Option value={10}>本季度</Select.Option>
                                        <Select.Option value={11}>上季度</Select.Option>
                                        <Select.Option value={12}>今年</Select.Option>
                                        <Select.Option value={13}>明年</Select.Option>
                                        <Select.Option value={14}>去年</Select.Option>
                                    </Select>
                                )
                            }
                        </div>
                    </div>
                )
            } else if (item['fieldTypeId'] == '5' || item['fieldTypeId'] == '7') {
                return (
                    <div key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center' }} onClick={() => handleDel(index)} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['='].indexOf(item['operator']) > -1 && (
                                    <Select style={{ width: '100%' }} defaultValue={item['operand']} onChange={(e) => handleMathChange(e, item, index)}>
                                        {
                                            item['fieldInfo']['enum'].map((infoE, index) => {
                                                return <Select.Option key={index} value={infoE}>{item['fieldInfo']['enumNames'][index]}</Select.Option>
                                            })
                                        }
                                    </Select>
                                )
                            }
                            {
                                ['(', ')'].indexOf(item['operator']) > -1 && (
                                    <Select style={{ width: '100%' }} mode='multiple' defaultValue={item['operand']} onChange={(e) => handleMathChange(e, item, index)}>
                                        {
                                            item['fieldInfo']['enum'].map((infoE, index) => {
                                                return <Select.Option key={index} value={infoE}>{item['fieldInfo']['enumNames'][index]}</Select.Option>
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </div>
                    </div>
                )
            } else if (item['fieldTypeId'] == '4' || item['fieldTypeId'] == '6') {
                return (
                    <div key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldTypeId'] == select_arr.length - 3 ? '创建人' : item['fieldInfo']['title']}</div>
                            <Select style={{ width: 120 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
                                {select_arr[item['fieldTypeId']].map((info, index) => {
                                    return <Select.Option key={index} value={select_condtion[info]['value']}>{select_condtion[info]['title']}</Select.Option>
                                })}
                            </Select>
                            <div className="sel_del">
                                <DeleteOutlined style={{ float: 'right', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleDel(index)} />
                            </div>
                        </div>
                        <div className="sel_check">
                            {
                                ['=', '#', '$', '*'].indexOf(item['operator']) > -1 && (
                                    <Select style={{ width: '100%' }} defaultValue={item['operand']} onChange={(e) => handleMathChange(e, item, index)}>
                                        {
                                            item['fieldInfo']['enum'].map((infoE, index) => {
                                                return <Select.Option key={index} value={infoE}>{item['fieldInfo']['enumNames'][index]}</Select.Option>
                                            })
                                        }
                                    </Select>
                                )
                            }
                            {
                                ['|', '-'].indexOf(item['operator']) > -1 && (
                                    <Input onChange={(e) => handleInput(e, index, item)} defaultValue={item['operand']} />
                                )
                            }
                        </div>
                    </div>
                )
            }
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
        sessionStorage.setItem('select_' + HomeStore.firstFormId, JSON.stringify(selectList))
        if (selectList.length > 0) {
            let params = {}
            params['formId'] = HomeStore.firstFormId
            params['restrictType'] = select_type;
            params['conditions'] = []
            selectList.map((item, index) => {
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
            })
            if (TableStore.model == 'subitAndManage') {
                TableStore.getScreenData(params, 'myself')
            } else {
                TableStore.getScreenData(params, 'all')
            }
        } else {
            message.info('请选择过滤条件')
        }
    }
    const handleClear = () => {
        if (TableStore.model == 'subitAndManage') {
            TableStore.getAllData({ 'formId': HomeStore.firstFormId }, 'myself')
        } else {
            TableStore.getAllData({ 'formId': HomeStore.firstFormId }, 'all')
        }
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