import React, {useState} from 'react';
import {Form, Input, Spin} from "antd";

const ModelMessage = ({selectType,setContent}) => {
    const [isLoading,setIsLoading]=useState(false)
    console.log(selectType,setContent)
    return (
        <div>
                {selectType === 'nickname'&&
                    <Input onBlur={(e)=> setContent(e.target.value)} placeholder="输入新用户名"/>
                }
        </div>
    );
};

export default ModelMessage;
