import { Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { useEffect } from "react";
import './index.css'
const My_string = observer((props) => {
    const { schema } = props;
    return (
        <div style={{ width: '100%' }} >
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <Input
                onBlur={() => {
                    console.log(schema);
                    console.log(props);
                    props.FormStore.handleBlur(schema)
                }}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                style={{ width: '100%' }}
                disabled={schema.disabled}
                placeholder={schema.placeholder} />
        </div>
    );
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(My_string)