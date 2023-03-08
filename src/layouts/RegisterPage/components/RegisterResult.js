import React, {useState} from 'react';
import {inject, observer} from "mobx-react";
import {Button, Result} from "antd";
import {useHistory} from "react-router-dom";

const RegisterResult=observer(({HomeStore,FormStore,setIsOk})=> {
    const [isLoading,setIsLoading]=useState(false)
    const history=useHistory()
    const onBegin= async ()=>{
        setIsLoading(true)
        // setIsOk(false)
        setIsLoading(false)
        // history.push('/login')
    }
    const onCancel=()=>{
        history.push('/login')
    }
    return (
        <Result
            status="success"
            title="注册用户成功"
            subTitle="是否需要生成模板，这可能需要花费一定的时间"
            extra={[
                <Button type="primary" key="console" onClick={onBegin} loading={isLoading}>
                    生成模板
                </Button>,
                <Button key="buy" onClick={onCancel}>取消</Button>,
            ]}
        >

        </Result>
    );

})

export default inject((stores) => ({HomeStore: stores.HomeStore, FormStore: stores.FormStore}))(RegisterResult);
