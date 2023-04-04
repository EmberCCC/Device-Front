import {Button, Form, Input, Modal, Popconfirm, Select, Spin, Table, Typography} from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, {useContext, useEffect, useRef, useState} from 'react'
import * as services from '../../../services/form';
import { put } from 'utils/request';
import { getAllField } from '../changeTool';
import {EditableProTable} from "@ant-design/pro-components";
import './index.css'

const dSource = [
    {
        id: '111',
        "0_ssFvScH60A9bAMm63bq": '123',
        "3_jfxYwd3wahBbyNvVLyW": 456,
        "vNHc8CFaEg0rlw-0qEQwU": '1111',
    },
    {
        id: '222',
        "0_ssFvScH60A9bAMm63bq": '123',
        "3_jfxYwd3wahBbyNvVLyW": 456,
        "vNHc8CFaEg0rlw-0qEQwU": '1111',
    },

];
const Self_editable_table = observer((props) => {
    const { schema, FormStore,edit=true ,value } = props
    const [column, setColumn] = useState([])
    const [form]=Form.useForm()
    const [dataSource, setDataSource] = useState([])
    const editorFormRef = useRef();
    const [editingKey, setEditingKey] = useState('');
    const [editableKeys, setEditableRowKeys] = useState( []);
    const [showData, setShowData] = useState([])
    const [load, setLoad] = useState(false)
    const [subVis, setSubVis] = useState(false)
    useEffect(() => {
        console.log('editingKey变化')
    },[editingKey])
    // const [data, setData] = useState({});
    useEffect(() => {
        FormStore.getFormSimple().then(() => {
            getTableColumn()
            console.log('column',column)
        })
        setShowData(dSource)
    }, [])
    useEffect(() => {
        getTableColumn()
    }, [schema.linkquery_condition,schema.table_addEditColumn])

    useEffect(()=>{
        let arr = props.value
        try {
            arr= JSON.parse(arr)
        }catch (e){}
        let iArr = []
        if (!Array.isArray(arr)) {
            iArr = [arr]
        } else {
            iArr = arr
        }
        console.log('iArr',iArr)
        if (typeof arr[0]!== 'object'){

        }

        // FormStore.fastQuery(iArr).then((res) => {
        //     let arr = []
        //     res.data.data.map((item, index) => {
        //         let obj = {}
        //         let data = JSON.parse(item['formData'])
        //         obj = { ...data }
        //         obj['key'] = item['id']
        //         obj['id'] = item['id']
        //         arr.push(obj)
        //     })
        //     console.log('showData',arr)
        //     setShowData(arr)
        // })
    },[])

    useEffect(() => {
        console.log('这是否是多余的fastQuery',props)
        if (props.value !== undefined && props.value.length !== 0) {
            // let arr = props.value
            // if (!Array.isArray(arr)) {
            //     arr = JSON.parse(arr)
            // }
            // let iArr = []
            // if (!Array.isArray(arr)) {
            //     iArr = [arr]
            // } else {
            //     iArr = arr
            // }
            // put('/data/FastQuery', iArr).then((res) => {
            //
            //     let arr = []
            //     res.data.data.map((item, index) => {
            //         let obj = {}
            //         let data = JSON.parse(item['formData'])
            //         obj = { ...data }
            //         obj['key'] = item['id']
            //         obj['id'] = item['id']
            //         arr.push(obj)
            //     })
            //     console.log('showData',arr)
            //     setShowData(arr)
            // })
        } else {
            setShowData(dSource)
        }
    }, [props.value])

    const dataExchange= (data) => {

    }


    const actionColumn = {
        title: '操作',
        dataIndex: 'operation',
        valueType: 'option',
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    console.log('action',action,record)
                    // eslint-disable-next-line no-unused-expressions
                    action?.startEditable?.(record.id);
                }}
            >
                编辑
            </a>,

        ],
    }
    const SaveValue = () => {
        console.log()
    }
    const getTableColumn=()=>{
        let arr = []
        if (schema.linkquery_condition && schema.linkquery_condition.fieldIds) {
            schema.linkquery_condition.fieldIds.forEach((item, index) => {
                arr.push({ title: FormStore.fieldNameObj[item], dataIndex: item, key: item, width: '50', ellipsis: true,editable: false })
            })
        }
        if(schema.table_addEditColumn && schema.table_addEditColumn.conditions){
            schema.table_addEditColumn.conditions.forEach((item,index)=>{
                arr.push({ title: item.title, dataIndex: item.columnId, key: item.columnId, width: '50', ellipsis: true,editable: true })
            })
            if(edit){
                arr.push(actionColumn)
            }
        }
        console.log('TableColumn',arr)

        setColumn(arr)
    }

    return (
        <div style={{ width: '100%' }}>
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <div className='self_link_showlist'>
                {   (
                    <Form form={form} component={false}>
                        <EditableProTable
                            style={{ padding: '0px' }}
                            rowKey="id"
                            editableFormRef={editorFormRef}
                            editable={{
                                type: 'single',
                                editableKeys,
                                onChange: setEditableRowKeys,
                                actionRender: (row, config, defaultDom) => {
                                    console.log('actionRender',row,config,defaultDom)
                                    return [
                                        defaultDom.save,
                                        defaultDom.cancel,
                                    ];
                                },
                            }}
                            recordCreatorProps = {false}
                            scroll={{ x: 800 }}
                            columns={column}
                            value={showData}
                            onChange={setShowData}
                        />
                        </Form>
                    )
                }
            </div>
        </div>
    )
})





export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_editable_table)
