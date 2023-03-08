import React, {Component, useState} from 'react';
import {inject, observer} from "mobx-react";
import './index.less'
import {Button} from "antd";
import {useHistory} from "react-router-dom";
import RegisterResult from "./components/RegisterResult";
import RegisterForm from "./components/RegisterForm";
import LoginHeader from "../../components/LoginHeader";


const FormEdit = observer(({HomeStore, FormStore}) => {
    const [isOk,setIsOk]=useState(false)
    return (
        <div className='background'>
            <LoginHeader/>
            {
                isOk ?
                    <RegisterResult setIsOk={setIsOk}  />
                    :
                    <RegisterForm setIsOk={setIsOk}></RegisterForm>

            }
        </div>
    )
});

export default inject((stores) => ({HomeStore: stores.HomeStore, FormStore: stores.FormStore}))(FormEdit);
