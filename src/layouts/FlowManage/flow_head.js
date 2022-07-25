import { BulbOutlined } from "@ant-design/icons";
import { MODELS, useXFlowApp } from "@antv/xflow";
import { inject, observer } from "mobx-react";
import React from "react";

const Flow_head = observer(({ HomeStore, FlowStore, TableStore }) => {
    
    const { flowProperty } = FlowStore

    return (
        <div>11</div>
    )
})

export default inject((stores) => ({ HomeStore: stores.HomeStore, FlowStore: stores.FlowStore, TableStore: stores.TableStore }))(Flow_head)