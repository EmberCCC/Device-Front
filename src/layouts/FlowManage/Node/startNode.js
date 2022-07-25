/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-23 10:41:11
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-25 00:41:35
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Node\startNode.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
export const DndNode = props => {
    const { size = { width: 126, height: 104 }, data } = props
    const { width, height } = size
    const { label, stroke, fill, fontFill, fontSize } = data

    return (
        <div
            className="container"
            style={{
                width,
                height,
                borderColor: stroke,
                backgroundColor: fill,
                color: fontFill,
                fontSize,
            }}
        >
            <span>{label}</span>
        </div>
    )
}