import { InputNumber } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { useEffect } from "react";
import './index.css'
const Self_number = observer((props) => {
    const { schema } = props;
    useEffect(() => {
        console.log(schema);
        console.log(props);
    }, [])
    return (
        <div style={{ width: '100%' }} >
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <InputNumber
                onBlur={() => {
                    console.log(schema);
                    console.log(props);
                    props.FormStore.handleBlur(schema)
                }}
                controls={false}
                value={props.value}
                formatter={(value) => {
                    if (schema?.self_pattern?.type == 2) {
                        return `${value}%`
                    } else {
                        return value
                    }
                }}
                parser={(value) => {
                    if (schema?.self_pattern?.type == 2) {
                        return value.replace('%','')
                    } else {
                        return value
                    }
                }}
                onChange={(e) => props.onChange(e)}
                style={{ width: '100%' }}
                disabled={schema.disabled}
                placeholder={schema.placeholder}
            />
        </div>
    );
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_number)