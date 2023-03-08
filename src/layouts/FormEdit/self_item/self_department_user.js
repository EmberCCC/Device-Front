/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-08-09 09:24:55
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-14 05:23:25
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\my_string.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import User_choose from "../user_choose";
import {string2Array} from "../../../utils/dataTools"

import './index.css'
const Self_department_user = observer((props) => {
    const { schema, FormStore, SocketStore } = props;
    console.log('Self_department_user',props)
    let value=props.value
    console.log(value)
    debugger
    if(Object.prototype.toString.call(props.value)=='[object String]'){
        value=string2Array(value)
    }

    console.log(value)
    console.log(typeof value)
    console.log(Object.prototype.toString.call(value))

    const handleUpdate = (value) => {
        props.onChange(value)
    }
    return (
        <div style={{ width: '100%' }} >
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <User_choose disabled={schema.disabled} handleUpdate={handleUpdate} mode={schema.self_setting?.mul} initUserList={value === undefined ? [] : value} initChooseList={schema?.self_setting?.scope} />
        </div>
    );
})

export default inject((stores) => ({ FormStore: stores.FormStore, SocketStore: stores.SocketStore }))(Self_department_user)
