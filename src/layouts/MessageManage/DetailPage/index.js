/*
 * @Author: your name
 * @Date: 2022-04-25 22:05:14
 * @LastEditTime: 2022-04-26 08:06:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\MessageManage\DetailPage\index.js
 */
import { Button, Empty, Modal } from 'antd'
import GlobalForm from 'components/GlobalForm'
import GlobalModal from 'components/GlobalModal'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'

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
        const {modalVisible} = this.props.MessageStore
        return (
            <div>{modalVisible && <GlobalModal
                title={'工单详情'}
                visible={modalVisible}
                onOk={e => this.props.MessageStore.changeModal()}
                onCancel={e => this.props.MessageStore.changeModal()}
                children={
                    <GlobalForm />
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
