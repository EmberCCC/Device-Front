/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-13 10:02:28
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-13 17:22:54
 * @FilePath: \bl-device-manage-test\src\components\GlobalTabel2\selectLayout.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Select } from "antd";
import { select_arr, select_condtion } from "constants/select_config";
import { indexOf } from "lodash";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";

const SelectLayout = observer(({ TableStore, HomeStore }) => {
    const [select_type, setSelect_type] = useState('and');
    const [selectList, setSelectList] = useState(JSON.parse(sessionStorage.getItem('select_' + HomeStore.firstFormId)) || [])
    const [menu, setMenu] = useState(null)
    useEffect(() => {
        console.log(toJS(TableStore.columns));
    }, [])
    const handleAdd = (item) => {
        const typeId = item['detailJson']['typeId']
        const fieldId = item['detailJson']['fieldId']
        let iList = [...selectList];
        const obj = { 'operator': select_condtion[select_arr[typeId][0]]['value'], 'fieldTypeId': typeId, 'fieldId': fieldId, 'operand': "", 'fieldInfo': toJS(item['detailJson']) };
        iList.push(obj)
        setSelectList(iList);
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
        let iSelectList = [...selectList]
        iSelectList.splice(index, 1, item);
        setSelectList(iSelectList);
        console.log(selectList);
    }
    const getSelectItem = (item, index) => {
        if (item)
            if (item['fieldTypeId'] == '0') {
                console.log(item);
                console.log(['=', '#', '$', '*', '|', '-'].indexOf(item['operator']));
                return (
                    <div className="sel_item" key={index}>
                        <div className="sel_title" key={index}>
                            <div className="sel_title_left">{item['fieldInfo']['title']}</div> 
                            <Select style={{ width: 200 }} defaultValue={item['operator']} bordered={false} onChange={(e) => handleModelChange(e, item, index)}>
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
            }
        console.log(item);
        console.log(select_arr[item['fieldTypeId']]);
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
                <Button type="primary" className="selbtn">筛选</Button>
                <Button type="ghost" className="clebtn">清除</Button>
            </div>
        </div>
    )
})

export default inject((stores) => ({ TableStore: stores.TableStore, HomeStore: stores.HomeStore }))(SelectLayout)