import { Checkbox, Input, Select } from "antd";
import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { useEffect } from "react";
import './index.css'
const Self_pattern = observer((props) => {
    const { schema } = props;
    const [type, setType] = useState(1);
    useEffect(() => {
        if (props.value == undefined) {
            props.onChange({ 'type': 1, 'show': [false, false] })
            setType(1)
        } else {
            setType(props.value?.type)
        }

        console.log(schema);
        console.log(props);
    }, [])
    return (
        <div style={{ width: '100%' }} >
            <Select value={props.value?.type} style={{ width: '100%' }} onChange={(e) => {
                let iObj = { ...props.value }
                iObj.type = e
                setType(e)
                props.onChange(iObj)
            }}>
                <Select.Option value={1}>数值</Select.Option>
                <Select.Option value={2}>百分比</Select.Option>
            </Select>
            {
                type == 1 && (
                    <div className="self_pattern_con">
                        <div>
                            <Checkbox checked={props.value?.show[0]} onChange={(e) => {
                                let iObj = { ...props.value }
                                iObj.show[0] = e.target.checked
                                props.onChange(iObj)
                            }}>保留小数位数</Checkbox>
                        </div>
                        <div>
                            <Checkbox checked={props.value?.show[1]} onChange={(e) => {
                                let iObj = { ...props.value }
                                iObj.show[1] = e.target.checked
                                props.onChange(iObj)
                            }}>显示千分符</Checkbox>
                        </div>
                    </div>
                )
            }
            {
                type == 2 && (
                    <div className="self_pattern_con">
                        <Checkbox checked={props.value?.show[0]} onChange={(e) => {
                            let iObj = { ...props.value }
                            iObj.show[0] = e.target.checked
                            props.onChange(iObj)
                        }}>保留小数位数</Checkbox>
                    </div>
                )
            }
        </div>
    );
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_pattern)