import { Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";

import './index.css'
const Self_textarea = observer((props) => {
    const { schema } = props;
    return (
        <div style={{ width: '100%' }} >
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <Input.TextArea
                onBlur={() => {
                    console.log(schema);
                    console.log(props);
                    props.FormStore.handleBlur(schema)
                }}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                style={{ width: '100%' }}
                placeholder={schema.placeholder} 
                disabled={schema.disabled}
                defaultValue={schema.default}
            />
        </div>
    );
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_textarea)