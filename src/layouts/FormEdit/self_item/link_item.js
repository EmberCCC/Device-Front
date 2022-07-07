/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-04 12:43:55
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-07 22:17:25
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\link_item.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import Math_Modal from "../FormModal/Math_Modal";
import './index.css'
export const Link_item = ({value,onChange,...rest}) => {
    const [math,setMath] = useState(false);
    const [relValue,setRelValue] = useState('');
    const {addons} = rest;
    const handleInput = (event) => {
        onChange(event.target.value);
    }
    const handleLink = () => {
        console.log(1);
    }
    const openMath = () => {
        setMath(true);
    }
    const closeMath = () => {
        setMath(false);
    }
    const handleAdd = (info) => {
        if(info == 'true'){
            onChange(relValue)
        }
        closeMath();
    }
    const title_item = (
        <div>
            <span className="title_left">公式编辑</span>
            <span className="title_right">使用数学运算符编辑公式</span>
        </div>
    )
    return (
        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
            {
                addons.dependValues[0] == '1' && 
                <Input onChange={handleInput} defaultValue={addons.formData.default}/>
            }
            {
                addons.dependValues[0] == '2' && 
                <Button onClick={handleLink}>数据联动</Button>
            }
            {
                addons.dependValues[0] == '3' && 
                <Button onClick={openMath}>公式编辑</Button>
            }
            <Modal
                visible={math}
                onCancel={closeMath}
                title={title_item}
                footer={null}
                width={800}
                destroyOnClose='true'
            >
                <Math_Modal title={'车间'} setValue={setRelValue} addItem={handleAdd}/>
            </Modal>
        </div>
    )
}