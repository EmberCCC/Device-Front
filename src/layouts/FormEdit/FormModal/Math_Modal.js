/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-04 15:21:36
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-07 22:05:11
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\FormModal\Math_Modal.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Input } from 'antd';
import React, { useEffect } from 'react'
import './index.css'
const Math_Modal = (props) => {
    const { title, setValue ,addItem} = props
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
        <div>
            <div className='top'>
                <div className='top_head'>
                    {title}=
                </div>
                <div className='top_content'>
                    <Input.TextArea onChange={handleChange} />
                </div>
            </div>
            <div className='bottom'>
                <div className='bottom_left'>
                    <div className='title'>可用变量</div>
                    <div className='bl_c'></div>
                </div>
                <div className='bottom_right'>
                    <div className='title'>函数</div>
                    <div className='br_c'>
                        <div className='right_left'>
                        </div>
                        <div className='right_right'></div>
                    </div>
                </div>
            </div>
            <div style={{marginTop:'10px'}}>
                <Button style={{marginRight:'10px'}} onClick={() => {addItem('true')}}>确认</Button>
                <Button onClick={() => {addItem('cancel')}}>取消</Button>
            </div>
        </div>
    )
}
export default Math_Modal;