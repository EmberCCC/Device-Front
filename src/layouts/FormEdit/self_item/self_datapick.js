/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-08-09 09:24:55
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-10 16:33:17
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\my_string.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DatePicker } from "antd";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import './index.css'
const Self_datapick = observer((props) => {
    const { schema } = props;
    // const format = 
    return (
        <div style={{ width: '100%' }} >
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <DatePicker
                showTime
                onBlur={() => {
                    console.log(schema);
                    console.log(props);
                    props.FormStore.handleBlur(schema)
                }}
                defaultValue={moment(schema.default)}
                value={moment(props.value)}
                onChange={(e) => {
                    let format = props.format == undefined ? 'dateTime' : props.format
                    let obj = {
                        dateTime: 'YYYY-MM-DD hh:mm:ss',
                        date: "YYYY-MM-DD"
                    }
                    if (e != null) {
                        props.onChange(moment(e).format(obj[format]))
                    } else {
                        props.onChange(undefined)
                    }
                    console.log(e);
                }}
                style={{ width: '100%' }}
                disabled={schema.disabled}
                placeholder={schema.placeholder} />
        </div>
    );
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(Self_datapick)