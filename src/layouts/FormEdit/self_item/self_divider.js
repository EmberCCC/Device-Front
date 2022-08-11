/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-10 16:01:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-10 20:55:43
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\myDivider.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Divider } from 'antd'
import React, { useEffect } from 'react'
import './index.css'
export const Self_divider = (props) => {
  const { schema } = props
  return (
    <div style={{width:'100%'}}>
      <Divider />
      <div className="self_rich_text" dangerouslySetInnerHTML={{ __html: schema.describe }} />
    </div>
  )
}
