/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-04 15:21:36
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-04 16:01:51
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\FormModal\Math_Modal.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import './index.css'
const Math_Modal = () => {
    return (
        <div>
            <div className='top'>
                <div className='top_head'>
                    车间=
                </div>
                <div className='top_content'>

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
        </div>
    )
}
export default Math_Modal;