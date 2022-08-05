/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-08-04 10:44:34
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-05 05:26:41
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\objectMapping.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect } from "react";
import React from "react";
import { Tabs } from "antd";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

const ObjectMapping = observer((props) => {
    const { schema, FormStore } = props;
    const { testObj } = FormStore
    useEffect(() => {

        console.log(schema.$id);
        console.log(props);
        console.log(props.children);
    }, [schema])
    if (schema.$id === '#') {
        return <div>{props.children}</div>;
    } else {
        // const childrenList = props.children.props.children.props.children
        // console.log(childrenList);
        return (
            <div>
                {/* {props.children} */}
                <Tabs type='card'>
                    <Tabs.TabPane tab={1} key={2}>
                        {props.children}
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
})

export default inject((stores) => ({ FormStore: stores.FormStore }))(ObjectMapping);