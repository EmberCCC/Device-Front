import { Button, Input, Radio, Select } from "antd";
import Node_charge from "layouts/FlowManage/Self_Form/node_charge";
import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";

import './index.css'
const Self_setting = observer((props) => {
    const { schema, FormStore, SocketStore } = props;
    useEffect(() => {
        console.log(props);
        console.log(schema);
        if (props.value == undefined) {
            props.onChange({ type: '1', scope: { 'department': [], 'role': [], 'user': [] }, judge: false, mul: false })
        }
    }, [props])
    const handleChange = (value) => {
        let obj = { ...props.value }
        obj.scope = value
        props.onChange(obj)
        console.log(value);
    }
    return (
        <div style={{ width: '100%' }} >
            <Select value={props.value?.type} style={{ width: '100%', marginBottom: '10px' }} onChange={(e) => {
                let obj = { ...props.value }
                obj.type = e
                props.onChange(obj)
            }}>
                <Select.Option key={'1'}>自定义</Select.Option>
                <Select.Option key={'2'}>由部门字段决定</Select.Option>
            </Select>
            {
                props.value?.type != '2' && (
                    <Node_charge handleUpdate={handleChange} charge_person={props.value?.scope ? props.value.scope : { 'department': [], 'role': [], 'user': [] }} />
                )
            }
            {
                props.value?.type == '2' && (
                    <Radio checked={props.value?.judge} onClick={(e) => {
                        let obj = { ...props.value }
                        obj.judge = !obj.judge
                        props.onChange(obj)
                    }}>部门单选</Radio>
                )
            }
            <div>
                <Radio.Group style={{ marginTop: '10px' }} value={props.value?.mul} onChange={(e) => {
                    let obj = { ...props.value }
                    obj.mul = e.target.value
                    props.onChange(obj)
                }}>
                    <Radio value={false}>单选</Radio>
                    <Radio value={true}>多选</Radio>
                </Radio.Group>
            </div>
        </div>
    );
})

export default inject((stores) => ({ FormStore: stores.FormStore, SocketStore: stores.SocketStore }))(Self_setting)