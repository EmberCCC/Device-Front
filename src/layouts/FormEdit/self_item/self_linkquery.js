/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-10 16:01:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-11 17:50:23
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\myDivider.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Select, Table } from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { getAllField } from '../changeTool';

import './index.css'
const Self_linkquery = observer((props) => {
    const { schema, FormStore } = props
    const [column, setColumn] = useState([])
    useEffect(() => {
        FormStore.getFormSimple();
    }, [])
    useEffect(() => {
        let arr = []
        if (schema.linkquery_condition && schema.linkquery_condition.fieldIds) {
            schema.linkquery_condition.fieldIds.forEach((item, index) => {
                let obj = JSON.parse(item)
                arr.push({ title: obj['fieldName'], dataIndex: obj['fieldId'], key: obj['fieldId'], width: '50', ellipsis: true })
            })
        }

        setColumn(arr)
    }, [schema.linkquery_condition])
    return (
        <div style={{ width: '100%' }}>
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <div className='self_link_showlist'>
                {
                    schema?.linkquery_condition?.mul == 'one' && schema.typeId == '14' && (
                        schema?.linkquery_condition.fieldIds.map((item, index) => {
                            return (
                                <div className='self_link_show_one' key={index}>
                                    <div className='self_link_show_title'>
                                        {FormStore.fieldNameObj[item]}
                                    </div>
                                    <div className='self_link_show_content'>
                                        {
                                            props.value == undefined && (
                                                "暂无信息"
                                            )
                                        }
                                        {
                                            props.value != undefined && props.value.length == 0 && (
                                                "暂无信息"
                                            )
                                        }
                                        {
                                            props.value != undefined && props.value.length > 0 && (
                                                props.value[0][item]
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    )
                }
                {
                    schema?.linkquery_condition?.mul == 'mul' && schema.typeId == '14' && (
                        <Table
                            scroll={{ x: 800 }}
                            columns={column}
                            dataSource={props.value}
                        />
                    )
                }
                {
                    schema.typeId == '15' && (
                        <Button style={{ width: '50%' }}>选择数据</Button>
                    )
                }
            </div>
        </div>
    )
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_linkquery)