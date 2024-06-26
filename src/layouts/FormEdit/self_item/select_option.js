import { DeleteOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import './index.css'
const Select_option = observer(({ FormStore, value, onChange, ...rest }) => {
    const { addons } = rest;
    const { formStru } = FormStore
    useEffect(() => {
        if (addons.dependValues[0] != '2' && addons.dependValues[0] != '3' && (value == undefined || value.hasOwnProperty('formId'))) {
            onChange(['选项一', '选项二', '选项三']);
        }
    }, [value])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {
                addons.dependValues[0] != '2' && addons.dependValues[0] != '3' && value && value != undefined && !value.hasOwnProperty('formId') && (
                    value.map((item, index) => {
                        return (
                            <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5px' }}>
                                <Input value={item} key={index} onChange={(e) => {
                                    let arr = value;
                                    arr.splice(index, 1, e.target.value)
                                    onChange(arr);
                                }} style={{ marginRight: '5px' }} />
                                <DeleteOutlined onClick={() => {
                                    let arr = value;
                                    arr.splice(index, 1);
                                    onChange(arr)
                                }} />
                            </div>
                        )
                    })

                )

            }
            {
                addons.dependValues[0] != '2' && addons.dependValues[0] != '3' && (
                    <div style={{ cursor: 'pointer', color: '#0DB3A6' }} onClick={() => {
                        let arr = value == undefined ? [] : value
                        arr.push(['选项']);
                        onChange(arr)
                    }}>添加选项</div>
                )
            }
            {
                addons.dependValues[0] == '2' && (
                    <Select
                        value={`${value?.formId}.${value?.fieldId}`}
                        onChange={(e) => {
                            let arr = e.split('.')
                            console.log(value);
                            onChange({ 'formId': arr[0], 'fieldId': arr[1] })
                        }}>
                        {
                            formStru.map((item, index) => {
                                return (
                                    <Select.OptGroup label={item['formName']} key={index}>
                                        {
                                            item['fieldSimpleVos'].map((one, oIndex) => {
                                                return (
                                                    <Select.Option key={one['fieldId']} onClick={() => {
                                                        onChange({ 'formId': item['formId'], 'fieldId': one['fieldId'] })
                                                    }} value={`${item['formId']}.${one['fieldId']}`}>{one['fieldName']}</Select.Option>
                                                )
                                            })
                                        }
                                    </Select.OptGroup>
                                )
                            })
                        }
                    </Select>
                )
            }
        </div>
    )
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Select_option)