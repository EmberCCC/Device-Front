import { Select } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'

import './index.css'
const Self_select = observer((props) => {
    const { schema, FormStore } = props
    const [load, setLoad] = useState(false)
    useEffect(() => {

    }, [schema.option_list])
    const handleOpen = () => {
        setLoad(true)
        if (schema.option_type == '2' && schema.option_list != undefined && schema.option_list.hasOwnProperty('formId') && schema.option_list.hasOwnProperty('fieldId')) {
            let sort
            if (schema.option_sort) {
                sort = schema.option_sort
            } else {
                sort = '<v'
            }
            FormStore.getLinkData({ 'formId': schema.option_list.formId, 'fieldId': schema.option_list.fieldId, 'order': sort }).then(() => setLoad(false))
        }
    }
    return (
        <div style={{ width: '100%' }}>
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            {
                schema.option_type != '2' && schema.option_type != '3' && (
                    <Select
                        onBlur={() => {
                            console.log(props);
                            console.log(schema);
                            props.FormStore.handleBlur(schema)
                        }}
                        placeholder={schema.placeholder}
                        value={props.value}
                        mode={`${(schema.typeId == '7') ? 'multiple' : ''}`}
                        style={{ width: '100%' }}
                        onChange={(e) => props.onChange(e)}>
                        {
                            schema.hasOwnProperty('option_list') && schema['option_list'] != undefined && !schema['option_list'].hasOwnProperty('formId') && (
                                schema['option_list'].map((item, index) => {
                                    return (
                                        <Select.Option value={item} key={index}>{item}</Select.Option>
                                    )
                                })
                            )
                        }
                    </Select>
                )
            }
            {
                schema.option_type == '2' && schema.option_list.hasOwnProperty('formId') && (
                    <Select
                        onBlur={() => {
                            console.log(props);
                            console.log(schema);
                            props.FormStore.handleBlur(schema)
                        }}
                        placeholder={schema.placeholder}
                        onDropdownVisibleChange={() => {
                            handleOpen()
                        }}
                        value={props.value}
                        mode={`${(schema.typeId == '7') ? 'multiple' : ''}`}
                        style={{ width: '100%' }}
                        onChange={(e) => {
                            props.onChange(e)
                            console.log(e);
                        }}>
                        {
                            FormStore.linkData.map((item, index) => {
                                return (
                                    <Select.Option value={item} key={index}>{item}</Select.Option>
                                )
                            })
                        }
                    </Select>
                )
            }
            {
                schema.option_type == '2' && !schema.option_list.hasOwnProperty('formId') && (
                    <Select
                        onBlur={() => {
                            console.log(props);
                            console.log(schema);
                            props.FormStore.handleBlur(schema)
                        }}
                        placeholder={schema.placeholder}
                        value={props.value}
                        mode={`${schema.typeId == '7' ? 'multiple' : ''}`}
                        style={{ width: '100%' }} />
                )
            }
        </div>
    )
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_select)