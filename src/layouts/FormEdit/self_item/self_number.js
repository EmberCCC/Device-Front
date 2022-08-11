/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-08-09 09:24:55
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-10 10:02:07
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\my_string.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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