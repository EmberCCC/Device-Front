/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-10 16:01:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-09-24 16:24:18
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\myDivider.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Modal, Select, Spin, Table } from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import * as services from '../../../services/form';
import { put } from 'utils/request';
import { getAllField } from '../changeTool';

import './index.css'
import FormLayout from 'layouts/FormLayout';
import GlobalModal from 'components/GlobalModal';
const Self_linkquery = observer((props) => {
    const { schema, FormStore } = props
    const [column, setColumn] = useState([])
    const [vis, setVis] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [showData, setShowData] = useState([])
    const [load, setLoad] = useState(false)
    const [subVis, setSubVis] = useState(false)
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
    useEffect(() => {
        if (props.value != undefined && props.value.length != 0) {
            let arr = props.value
            if (!Array.isArray(arr)) {
                arr = JSON.parse(arr)
            }
            let iArr = []
            if (!Array.isArray(arr)) {
                iArr = [arr]
            } else {
                iArr = arr
            }
            put('/data/FastQuery', iArr).then((res) => {
                let arr = []
                res.data.data.map((item, index) => {
                    let obj = {}
                    let data = JSON.parse(item['formData'])
                    obj = { ...data }
                    obj['key'] = item['id']
                    obj['id'] = item['id']
                    arr.push(obj)
                })
                setShowData(arr)
            })
        } else {
            setShowData([])
        }

    }, [props.value])
    const getInfo = () => {
        if (showData.length > 0) {
            return schema?.linkquery_condition?.fieldIds.map((item, index) => {
                return (
                    <div className='self_link_show_one' key={index}>
                        <div className='self_link_show_title'>
                            {FormStore.fieldNameObj[item]}
                        </div>
                        <div className='self_link_show_content'>
                            {
                                !showData[0].hasOwnProperty(item) && (
                                    "暂无信息"
                                )
                            }
                            {
                                showData[0].hasOwnProperty(item) && (
                                    showData[0][item]
                                )
                            }
                        </div>
                    </div>
                )
            })
        } else {
            return schema?.linkquery_condition?.fieldIds.map((item, index) => {
                return (
                    <div className='self_link_show_one' key={index}>
                        <div className='self_link_show_title'>
                            {FormStore.fieldNameObj[item]}
                        </div>
                        <div className='self_link_show_content'>
                            暂无信息
                        </div>
                    </div>
                )
            })
        }

    }
    return (
        <div style={{ width: '100%' }}>
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <div className='self_link_showlist'>
                {
                    schema.typeId == '14' && (
                        <div className='self_add_data' onClick={() => {
                            // if(schema?.linkquery_condition?.formId){
                            //     setSubVis(true)
                            // }
                        }}>+ 添加数据</div>
                    )
                }
                {
                    schema?.linkquery_condition?.mul == 'one' && schema.typeId == '14' && (
                        getInfo()
                    )
                }
                {
                    schema?.linkquery_condition?.mul == 'mul' && schema.typeId == '14' && (
                        <Table
                            scroll={{ x: 800 }}
                            columns={column}
                            dataSource={showData}
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
                                    console.log(res[schema.$id]);
                                    let idArr = res[schema.$id]
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
                                    put('/data/FastQuery', idArr).then((res) => {
                                        let arr = []
                                        res.data.data.map((item, index) => {
                                            let obj = {}
                                            let data = JSON.parse(item['formData'])
                                            obj = { ...data }
                                            obj['key'] = item['id']
                                            obj['id'] = item['id']
                                            arr.push(obj)
                                        })
                                        setLoad(false)
                                        setDataSource(arr)
                                    })
                                })
                            }}>选择数据</Button>
                            <div>
                                {
                                    getInfo()
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
                                            props.onChange([selectedRows[0]['id']])
                                        }
                                    }}
                                />
                            </div>
                        </Spin>
                    </Modal>
                )
            }
            <GlobalModal
                visible={subVis}
                onCancel={() => setSubVis(false)}
                footer={null}
                destroyOnClose={true}
                width={1000}
            >
                <FormLayout
                    formId={schema?.linkquery_condition?.formId}
                    type={'link'}
                    handleCancel={() => {
                        setSubVis(false)
                    }}
                />
            </GlobalModal>
        </div>
    )
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_linkquery)