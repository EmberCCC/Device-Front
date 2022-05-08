/*
 * @Author: your name
 * @Date: 2022-04-25 22:05:14
 * @LastEditTime: 2022-05-07 21:19:57
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\MessageManage\DetailPage\index.js
 */
import { Button, Empty, Modal } from 'antd'
import GlobalForm from 'components/GlobalForm'
import GlobalModal from 'components/GlobalModal'
import LogPage from '../LogPage'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'

import '../index.css'
import { toJS } from 'mobx'
import { firstFormName } from 'constants/status_constant'

@inject('MessageStore', 'HomeStore')
@observer
class DetailPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { modalVisible, itemInfo } = this.props.MessageStore
        let ok = this.props.MessageStore.subFlag ? '同意' : "了解"
        let cancel = this.props.MessageStore.subFlag ? '拒绝' : "关闭"
        return (
            <div>{modalVisible && <GlobalModal
                width={1000}
                height={'100%'}
                title={firstFormName[this.props.HomeStore.firstFormId]}
                visible={modalVisible}
                onOk={e => {
                    if (this.props.MessageStore.subFlag) {
                        let params = {}
                        params.message = '同意'
                        params.messageDto = toJS(itemInfo)
                        this.props.MessageStore.agreeFlow(params)
                    }
                    this.props.MessageStore.changeModal()
                    this.props.MessageStore.changeSubFlag(false)
                }}
                onCancel={e => {
                    if (this.props.MessageStore.subFlag) {
                        let params = {}
                        params.message = '拒绝'
                        params.messageDto = toJS(itemInfo)
                        this.props.MessageStore.refuseFlow(params)
                    }
                    this.props.MessageStore.changeModal()
                    this.props.MessageStore.changeSubFlag(false)
                }}
                okText={ok}
                cancelText={cancel}
                children={
                    this.props.MessageStore.subFlag ?
                        <div className='detail'>
                            <GlobalForm btnVis={false} type={true} dataVis={true} dataType = {1}/>
                            <LogPage />
                        </div> :
                        <div className='detail'>
                            <GlobalForm btnVis={false} type={false} dataVis={true} dataType = {1}/>
                            <LogPage />
                        </div>
                }
            />}
            </div>
        )
    }
}

export default DetailPage
