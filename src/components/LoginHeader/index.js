import React from 'react';
import {Button} from "antd";
import {useHistory} from "react-router-dom";
import './index.less'

const LoginHeader = () => {
    const history=useHistory()
    const login=()=>{
        if(history.location.pathname!=='/login'){
            history.push('/login')
        }
    }
    const register=()=>{
        if(history.location.pathname!=='/register'){
            history.push('/register')
        }
    }
    return (
        <div className='login_header'>
            <div className='header_left'>
                <div className='header_left_item'>产品</div>
                <div className='header_left_item'>方案</div>
                <div className='header_left_item'>案例</div>
                <div className='header_left_item'>定价</div>
                <div className='header_left_item'>资源中心</div>
                <div className='header_left_item'>零代码</div>
            </div>
            <div className='header_right'>
                <div className='header_left_item'>
                    <Button onClick={login}>登录</Button>
                </div>
                <div className='header_left_item'>
                    <Button onClick={register} >注册</Button>
                </div>
                <div className='header_left_item'>
                    简体中文
                </div>
            </div>
        </div>
    );
};

export default LoginHeader;
