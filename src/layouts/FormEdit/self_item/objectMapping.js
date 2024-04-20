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