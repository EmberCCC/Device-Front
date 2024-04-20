import { Tabs } from "antd";
import React, { useEffect, useRef } from "react";
import Generator from 'fr-generator';
import { observable } from "mobx";
import { inject } from "mobx-react";
const { Provider, Sidebar, Canvas, Settings } = Generator;
export 
const MyMulTag = observable(({ FormStore,value, onChange, ...rest }) => {
    const { addons } = rest
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
})

export default inject((stores) => ({FormStore:stores.FormStore}))(MyMulTag);