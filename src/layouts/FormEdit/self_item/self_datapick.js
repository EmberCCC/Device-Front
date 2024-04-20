import { DatePicker } from "antd";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import './index.css'
const Self_datapick = observer((props) => {
    const { schema } = props;
    return (
        <div style={{ width: '100%' }} >
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <DatePicker
                format={props.format == 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'}
                onBlur={() => {
                    props.FormStore.handleBlur(schema)
                }}
                showTime
                defaultValue={schema.default && moment(schema.default).isValid() && moment(schema.default)}
                value={props.value && moment(props.value).isValid() && moment(props.value)}
                onChange={(e) => {
                    let format = props.format == undefined ? 'dateTime' : props.format
                    let obj = {
                        dateTime: 'YYYY-MM-DD HH:mm:ss',
                        date: "YYYY-MM-DD"
                    }
                    if (e != null) {
                        props.onChange(moment(e).format(obj[format]))
                    } else {
                        props.onChange(undefined)
                    }
                }}
                style={{ width: '100%' }}
                disabled={schema.disabled}
                placeholder={schema.placeholder} />
        </div>
    );
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_datapick)
