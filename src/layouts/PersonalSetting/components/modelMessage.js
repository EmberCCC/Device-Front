import React, {useState} from 'react';
import {Form, Input, Spin} from "antd";
import {placeHolder_config_map} from "../config/Person_config"



const ModelMessage = ({selectType,setContent}) => {
    const [isLoading,setIsLoading]=useState(false)

    return (
        <div>
             <Input onBlur={(e)=> setContent(e.target.value)} placeholder={placeHolder_config_map[selectType]}/>
        </div>
    );
};

export default ModelMessage;
