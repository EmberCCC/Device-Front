/*
 * @Author: your name
 * @Date: 2022-04-24 12:36:43
 * @LastEditTime: 2022-06-28 16:59:11
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\MessageManage\ListPage\index.js
 */
import { Button, DatePicker, Dropdown, List, Select } from 'antd'
import React, { Component } from 'react'
import VirtualList from 'rc-virtual-list';
import { inject, observer } from 'mobx-react';
import DetailPage from '../DetailPage'
import { firstFormName, state } from 'constants/status_constant';
import '../index.css'
import { messageName } from '../constants';

@inject('MessageStore')
@observer
// @withRouter
class index extends Component {
    state =  {
        isLoading:false
    }
    render() {
        const ContainerHeight = 800;
        const { modalVisible, data } = this.props.MessageStore
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
            this.setState({
                isLoading:true
            })
            this.props.MessageStore.getLog(data)
            this.props.MessageStore.setItemInfo(data);
            this.props.MessageStore.getField(params).then(() => {
                this.props.MessageStore.getOne(data).then(() => {
                    this.setState({
                        isLoading:false
                    })
                    this.props.MessageStore.changeModal()
                    if (nowL == 'todo') {
                        this.props.MessageStore.changeSubFlag(true);
                    }
                })
            })



        }
        // const {data} = this.props.MessageStore
        return (
            <div>
                <div className='title'>
                    <div style={{ paddingTop: '5px', fontWeight: '700' }}>{messageName[this.props.location.pathname.split('/')[2]]}</div>
                    <div>
                        <Button style={{ float: 'right' }}>最新</Button>
                        <Dropdown overlay={this.selectList} placement="bottomLeft">
                            <Button style={{ float: 'right' }}>筛选</Button>
                        </Dropdown>
                        <Button style={{ float: 'right' }}>批量提交</Button>
                    </div>
                </div>
                <hr />
                <List loading={this.state.isLoading}>
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
            </div>
        )


    }
    selectList = (
        <div className='selectList'>
            <div
                label="发起人"
                name="subPeople"
            >
                <div>发起人</div>
                <Select style={{ width: '100px' }}></Select>
            </div>
            <div
                label="发起时间"
                name="subTime"
            >
                <div>发起时间</div>
                <DatePicker />
            </div>
            <div
                label="流程表单"
                name="flowForm"
            >
                <div>流程表单</div>
                <Select style={{ width: '100px' }}></Select>
            </div>
            <div
                label="当前节点"
                name="atNode"
            >
                <div>当前节点</div>
                <Select style={{ width: '100px' }}></Select>
            </div>
            <Button type="primary" htmlType="submit">
                筛选
            </Button>
        </div>
    )
    componentWillMount() {
        const location = this.props.location.pathname
        const nowL = location.split('/')[2];
        this.props.MessageStore.setData(nowL);
    }
}

export default index
