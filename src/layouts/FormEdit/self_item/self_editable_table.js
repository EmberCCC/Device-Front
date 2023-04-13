import {Button, Form, Input, Modal, Popconfirm, Select, Spin, Table, Typography} from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, {useContext, useEffect, useRef, useState} from 'react'
import * as services from '../../../services/form';
import { put } from 'utils/request';
import { getAllField } from '../changeTool';
import {EditableProTable} from "@ant-design/pro-components";
import './index.css'


const Self_editable_table = observer((props) => {
    const { schema, FormStore,edit=true ,value ,onChange} = props
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
        console.log(props)

        FormStore.getFormSimple().then(() => {
            getTableColumn()
            console.log('column',column)
        })
        // setShowData(dSource)
    }, [])
    useEffect(() => {
        getTableColumn()
    }, [schema.linkquery_condition,schema.table_addEditColumn])

    useEffect(()=>{
        debugger
        console.log(props)
        if (props.value !== undefined && props.value.length !== 0) {
            if(typeof props.value[0]==='object' || undefined){
                return
            }
            let arr = props.value
            try {
                arr= JSON.parse(arr)
            }catch (e){}
            let {newValue,deleteArr}=dataExchange(arr)
            console.log('newValue',newValue)
            console.log('deleteArr',deleteArr)
            //如果那个数据不是新增的，那么就不需要请求接口
            if(newValue.length>0 && typeof newValue[0]==='object'){
                for(const i in deleteArr){
                    let k=arr.findIndex((item)=>item.id===deleteArr[i])
                    if(k!==-1){
                        arr.splice(k,1)
                    }
                }
                console.log('showData',arr)
                tableDataChange(arr)
                return;
            }
            put('/data/FastQuery', newValue).then((res) => {
                let arr = [...showData]
                res.data.data.map((item, index) => {
                    let obj = {}
                    let data = JSON.parse(item['formData'])
                    obj = { ...data }
                    obj['key'] = item['id']
                    obj['id'] = item['id']
                    arr.push(obj)
                })
                for(const i in deleteArr){
                    let k=arr.findIndex((item)=>item.id===deleteArr[i])
                    if(k!==-1){
                        arr.splice(k,1)
                    }
                }
                console.log('showData',arr)
                tableDataChange(arr)
            })
        }
    },[props.value])


    /**
     * 将数组与对象数组比较，返回需要请求的(增加的数组对象)
     * @param newValue
     * @author superxmy
     * @return {{deleteArr: [], newValue: []}}//返回需要删除的id数组和需要请求的数组对象
     */
    const dataExchange= (newValue) => {
        let deleteArr = []
        debugger
        if(newValue!==undefined && typeof newValue[0]!=='object'){
            for(let i in dataSource){
                let index=newValue.findIndex(dataSource[i].id)
                if(index===-1){//不存在
                    deleteArr.push(dataSource[i].id)
                }else{
                    newValue.splice(index,1)
                }
            }
        }
        return {deleteArr,newValue}

    }

    const tableDataChange=(value)=>{
        setShowData(value)
        onChange(value)
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
                arr.push({ title: FormStore.fieldNameObj[item], dataIndex: item, key: item, width: '50', ellipsis: true,editable: false,originId:item.id })
            })
        }
        if(schema.table_addEditColumn && schema.table_addEditColumn.conditions){
            schema.table_addEditColumn.conditions.forEach((item,index)=>{
                arr.push({ title: item.title, dataIndex: item.columnId, key: item.columnId, width: '50', ellipsis: true,editable: true,originId:item.id })
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
                            pagination={{
                                pageSize:10,
                            }}
                            recordCreatorProps = {false}
                            scroll={{ x: 800 }}
                            columns={column}
                            value={showData}
                            onChange={tableDataChange}
                        />
                        </Form>
                    )
                }
            </div>
        </div>
    )
})





export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_editable_table)
