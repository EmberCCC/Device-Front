/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-10 16:01:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-11 20:31:52
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\myDivider.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Modal, Select, Spin, Table } from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { getAllField } from '../changeTool';

import './index.css'
const Self_linkquery = observer((props) => {
    const { schema, FormStore } = props
    const [column, setColumn] = useState([])
    const [vis, setVis] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [load, setLoad] = useState(false)
    useEffect(() => {
        FormStore.getFormSimple().then(() => {
            let arr = []
            if (schema.linkquery_condition && schema.linkquery_condition.fieldIds) {
                schema.linkquery_condition.fieldIds.forEach((item, index) => {
                    arr.push({ title: FormStore.fieldNameObj[item], dataIndex: item, key: item, width: '50', ellipsis: true })
                })
            }
            console.log(arr);
            setColumn(arr)
        })

    }, [])
    useEffect(() => {
        let arr = []
        if (schema.linkquery_condition && schema.linkquery_condition.fieldIds) {
            schema.linkquery_condition.fieldIds.forEach((item, index) => {
                arr.push({ title: FormStore.fieldNameObj[item], dataIndex: item, key: item, width: '50', ellipsis: true })
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
                            // console.log(props.value);
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
                                                JSON.parse(props.value)[0][item]
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
                        <div>
                            <Button style={{ width: '50%' }} onClick={() => {
                                setLoad(true)
                                setVis(true)
                                FormStore.getSearchData([{ ...schema?.linkquery_condition, "nowValue": FormStore.formData }]).then(res => {
                                    console.log(res);
                                    console.log(schema);
                                    setDataSource(res[schema.$id])
                                    setLoad(false)
                                })
                            }}>选择数据</Button>
                            <div>
                                {
                                    schema?.linkquery_condition.fieldShow.map((item, index) => {
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
                                                        props.value != undefined && !JSON.parse(props.value).hasOwnProperty(item) && (
                                                            "暂无信息"
                                                        )
                                                    }
                                                    {
                                                        props.value != undefined && JSON.parse(props.value).hasOwnProperty(item) && (
                                                            JSON.parse(props.value)[item]
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            {
                schema.typeId == '15' && (
                    <Modal width={1000} visible={vis} footer={null} destroyOnClose={true} title={'选择数据'} onCancel={() => setVis(false)}>
                        <Spin spinning={load} tip={'查询数据中...'}>
                            <div style={{ height: '600px', overflow: 'auto' }}>
                                <Table
                                    columns={column}
                                    dataSource={dataSource}
                                    rowKey={record => record.id}
                                    scroll={{ y: 200 }}
                                    rowSelection={{
                                        type: 'radio',
                                        onChange: (selectedRowKeys, selectedRows) => {
                                            console.log(selectedRows);
                                            props.onChange(JSON.stringify(selectedRows[0]))
                                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                                        }
                                    }}
                                />
                            </div>
                        </Spin>
                    </Modal>
                )
            }
        </div>
    )
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_linkquery)