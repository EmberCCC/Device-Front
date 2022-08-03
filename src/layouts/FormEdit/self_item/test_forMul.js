/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-08-03 06:45:09
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-03 07:59:48
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\test_forMul.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from "react";

const CustomComA = props => {
    const { schema } = props;
    if (schema.$id === '#') {
        return <div>111{props.children}</div>;
    }
    return (
        <div>
            {props.children}
        </div>
    );
};

export default CustomComA