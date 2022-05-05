/*
 * @Author: your name
 * @Date: 2022-04-25 22:05:14
 * @LastEditTime: 2022-05-06 02:21:12
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\MessageManage\DetailPage\index.js
 */
import { Button, Empty, Modal } from 'antd'
import GlobalForm2 from 'components/GlobalForm2'
import GlobalModal from 'components/GlobalModal'
import LogPage from '../LogPage'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'

import '../index.css'
import { toJS } from 'mobx'

@inject('MessageStore')
@observer
class DetailPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            val: 1,
            visible: false
        }
    }
    render() {
        const { modalVisible ,itemInfo} = this.props.MessageStore
        let ok = '了解'
        let cancel = '关闭'
        return (
            <div>{modalVisible && <GlobalModal
                width={1000}
                height={'100%'}
                title={'工单详情'}
                visible={modalVisible}
                onOk={e => {
                    if (this.props.MessageStore.subFlag) {
                        // console.log(itemInfo);
                        let params = {}
                        params.message = '同意'
                        ok = '同意'
                        params.messageDto = toJS(itemInfo)
                        this.props.MessageStore.agreeFlow(params)
                    }
                    this.props.MessageStore.changeModal()
                    this.props.MessageStore.changeSubFlag(false)
                }}
                onCancel={e => {
                    if (this.props.MessageStore.subFlag) {
                        // console.log(itemInfo);
                        let params = {}
                        cancel = '拒绝'
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
                    <div className='detail'>
                        <GlobalForm2 btnVis={false}/>
                        <LogPage />
                    </div>
                }
            />}
                <Modal
                    title="详情"
                    visible={this.state.visible}
                    width='80%'
                    onCancel={e => this.setState({
                        visible: !this.state.visible
                    })}
                    footer={[
                        <Button key="submit" type="primary" onClick={e => this.setState({
                            visible: !this.state.visible
                        })}>
                            确定
                        </Button>
                    ]}
                >
                    <div className='table-content-bk'>
                        <div className='breaken-table'>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default DetailPage
