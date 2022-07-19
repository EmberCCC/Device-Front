/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-18 14:53:18
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-18 19:54:31
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\myMulTag.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Tabs } from "antd";
import React, { useEffect, useRef } from "react";
import Generator from 'fr-generator';
const { Provider, Sidebar, Canvas, Settings } = Generator;
export const MyMulTag = ({ value, onChange, ...rest }) => {
    const { addons } = rest
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    useEffect(() => {
        console.log(rest);
    },[])
    return (
        <Tabs>
            <Tabs.TabPane tab="Tab 1" key="1">
                <Provider
                    extraButtons={[false, false, false, false]}
                    ref={ref1}
                    onSchemaChange={(schema) => console.log(schema)}
                >
                    <Canvas />
                </Provider>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2">
                <Provider
                    ref={ref2}
                    extraButtons={[false, false, false, false]}
                    onSchemaChange={(schema) => console.log(schema)}
                >
                    <Canvas />
                </Provider>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="3">
                <Provider
                    ref={ref3}
                    extraButtons={[false, false, false, false]}
                    onSchemaChange={(schema) => console.log(schema)}
                >
                    <Canvas />
                </Provider>
            </Tabs.TabPane>
        </Tabs>
    )
}