/*
 * @Author: your name
 * @Date: 2022-04-24 12:36:43
 * @LastEditTime: 2022-04-25 22:49:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\MessageManage\ListPage\index.js
 */
import { List, message } from 'antd'
import React, { Component } from 'react'
import VirtualList from 'rc-virtual-list';
import { inject, observer } from 'mobx-react';
import DetailPage from '../DetailPage'


@inject('MessageStore')
@observer
class index extends Component {
    render() {
        const ContainerHeight = 800;
        const {modalVisible} = this.props.MessageStore
        const onScroll = e => {
            if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
                this.appendData();
            }
        };
        const changeVisible = () =>{
            this.props.MessageStore.changeModal();
            console.log(modalVisible);
            console.log(11);
        }
        return (
            <List>
                <VirtualList
                    data={this.props.MessageStore.data}
                    height={ContainerHeight}
                    itemHeight={47}
                    onScroll={onScroll}
                >
                    {item => (
                        <List.Item key={321} extra={<div>21321</div>} onClick={() => changeVisible()} style={{border:'1px solid grey',margin:'5px',padding:'4px'}}>
                            <div>
                                <div>
                                    维修工单：1
                                </div>
                                <div>
                                    维修工单：1
                                </div>
                                <div>
                                    维修工单：1
                                </div>
                            </div>
                            <div>
                                <div>
                                    11
                                </div>
                            </div>
                            <div>
                                <div>
                                    11
                                </div>
                            </div>
                        </List.Item>
                    )}
                </VirtualList>
                {modalVisible && <DetailPage />}
            </List>
        )
    }
}

export default index
