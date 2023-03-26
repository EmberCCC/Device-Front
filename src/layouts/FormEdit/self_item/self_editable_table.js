import {Button, Form, Input, Modal, Popconfirm, Select, Spin, Table, Typography} from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, {useContext, useEffect, useRef, useState} from 'react'
import * as services from '../../../services/form';
import { put } from 'utils/request';
import { getAllField } from '../changeTool';

import './index.css'
import FormLayout from 'layouts/FormLayout';
import GlobalModal from 'components/GlobalModal';
import {isDataExist} from "../../../utils/dataTools";
const dSource = [
    {
        key: '1',
        '0_927525ab673f4f14b25': '123',
        'hHcGLylwX6NnHycG-wXx7': 32,
        address: '西湖区湖底公园1号',
    },

];
const Self_linkquery = observer((props) => {
    const { schema, FormStore } = props
    const [column, setColumn] = useState([])
    const [vis, setVis] = useState(false)
    const [form]=Form.useForm()
    const [dataSource, setDataSource] = useState([])
    const [showData, setShowData] = useState([])
    const [load, setLoad] = useState(false)
    const [subVis, setSubVis] = useState(false)
    const [editingKey, setEditingKey] = useState('');
    const [data, setData] = useState({});
    const isEditing = (record) => record.key === editingKey;
    useEffect(() => {
        FormStore.getFormSimple().then(() => {
            getTableColumn()
            console.log('column',column)
        })
    }, [])
    useEffect(() => {
        getTableColumn()

    }, [schema.linkquery_condition,schema.table_addEditColumn])

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
    const components = {
        body: {
            cell: EditableCell
        },
    };
    const edit = (record) => {
        debugger
        form.setFieldsValue({
            ...record,
        });
        console.log('column',column)
        console.log('dSource',dSource)
        setEditingKey(record.key);
    };
    const actionColumn = {
        title: '操作',
        dataIndex: 'operation',
        render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
                <span>
            <Typography.Link
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="确定取消吗" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
            ) : (
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    Edit
                </Typography.Link>
            );
        },
    }
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
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
            arr.push(actionColumn)
        }
        setColumn(arr)
    }

    return (
        <div style={{ width: '100%' }}>
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <div className='self_link_showlist'>
                {   (
                    <Form form={form} component={false}>
                        <Table
                            components={components}
                            scroll={{ x: 800 }}
                            columns={column}
                            rowClassName={() => 'editable-row'}
                            dataSource={showData}
                        />
                        </Form>
                    )
                }
            </div>
        </div>
    )
})


const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode =  <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}

                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};



export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_linkquery)
