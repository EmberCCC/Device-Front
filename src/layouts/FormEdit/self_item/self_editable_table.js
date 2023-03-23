import {Button, Form, Input, Modal, Select, Spin, Table} from 'antd';
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

            console.log('column',arr);
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
            setShowData([])
        }

    }, [props.value])
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    return (
        <div style={{ width: '100%' }}>
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <div className='self_link_showlist'>
                {   (
                        <Table
                            components={components}
                            scroll={{ x: 800 }}
                            columns={column}
                            rowClassName={() => 'editable-row'}
                            dataSource={showData}
                        />
                    )
                }
            </div>
        </div>
    )
})
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_linkquery)
