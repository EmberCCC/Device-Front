/*
 * @Author: your name
 * @Date: 2022-04-24 12:36:43
 * @LastEditTime: 2022-05-06 11:09:07
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\MessageManage\ListPage\index.js
 */
import { List } from 'antd'
import React, { Component } from 'react'
import VirtualList from 'rc-virtual-list';
import { inject, observer } from 'mobx-react';
import DetailPage from '../DetailPage'
import { firstFormName, state } from 'constants/status_constant';


@inject('MessageStore')
@observer
// @withRouter
class index extends Component {
    render() {
        const ContainerHeight = 800;
        const { modalVisible, data } = this.props.MessageStore
        // const { id } = this.props.location.state || ''
        const onScroll = e => {
            if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
                this.appendData();
            }
        };
        const changeVisible = (data) => {
            const location = this.props.location.pathname
            const nowL = location.split('/')[2];
            let params = {}
            params.firstFormId = data.firstFormId

            this.props.MessageStore.getOne(data).then(() => {
                this.props.MessageStore.getLog(data).then(() => {
                    this.props.MessageStore.getField(params).then(() => {
                        this.props.MessageStore.setItemInfo(data);
                        this.props.MessageStore.changeModal()
                        if (nowL == 'todo') {
                            this.props.MessageStore.changeSubFlag(true);
                        }
                    });

                });

            });

        }
        // const {data} = this.props.MessageStore
        return (
            <List>
                <VirtualList
                    data={data}
                    height={ContainerHeight}
                    itemHeight={47}
                    onScroll={onScroll}
                >
                    {item => (
                        <List.Item key={item.dataId} extra={<div>{firstFormName[item.firstFormId]}</div>} onClick={() => changeVisible(item)} style={{ border: '1px solid grey', margin: '5px', padding: '4px', borderRadius: '5px', textShadow: '0 0 8px #DDD', backgroundColor: 'white' }}>
                            <div>
                                <div>
                                    维修工单：{item.flowLogId}
                                </div>
                                <div>
                                    流程版本：{item.flowId}
                                </div>
                                <div>
                                    状态：{state[item.state]}
                                </div>
                            </div>
                        </List.Item>
                    )}
                </VirtualList>
                {modalVisible && <DetailPage />}
            </List>
        )
    }
    componentDidMount() {
        const location = this.props.location.pathname
        const nowL = location.split('/')[2];
        // console.log(nowL);
        this.props.MessageStore.setData(nowL);
        // console.log(this.props.MessageStore.handleList);
    }
}

export default index
