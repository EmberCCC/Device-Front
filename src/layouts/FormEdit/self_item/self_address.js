/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-10 16:01:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-11 22:37:14
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\myDivider.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Cascader, Divider, Input } from 'antd'
import { options } from 'constants/address'
import React, { useEffect } from 'react'
import './index.css'
export const Self_address = (props) => {
    const { schema } = props
    useEffect(() => {
        console.log(props);
        console.log(schema);
    }, [])
    return (
        <div style={{ width: '100%' }}>
            <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
            <Cascader
                style={{ width: '100%' }}
                placeholder={'请选择地址'}
                options={options}
                changeOnSelect
                onChange={(e) => {
                    console.log(e);
                }}
            />
            {
                schema.address_pattern == '2' && (
                    <Input.TextArea
                        style={{ marginTop: '10px' }}
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                )
            }
        </div>
    )
}
