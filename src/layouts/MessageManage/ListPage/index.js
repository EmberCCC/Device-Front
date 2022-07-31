/*
 * @Author: your name
 * @Date: 2022-04-24 12:36:43
 * @LastEditTime: 2022-07-31 09:19:24
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\MessageManage\ListPage\index.js
 */
import { Button, DatePicker, Dropdown, Select } from 'antd'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import '../index.less'
import { messageName } from '../constants';
import { toJS } from 'mobx';
import { getField } from '../visUtil';
import GlobalModal from 'components/GlobalModal';
import Detail from '../detail';

@inject('MessageStore', 'HomeStore', 'TableStore', 'FormStore')
@observer
class index extends Component {
    state = {
        isLoading: false
    }
    render() {
        const ContainerHeight = 800;
        const { waitList, launchList, handleList, copyList, model, list, detailVis, info } = this.props.MessageStore
        return (
            <div>
                <div className='title'>
                    {model == 'wait' && (
                        <div style={{ paddingTop: '5px', fontWeight: '700' }}>{'我的待办'}<span style={{ paddingLeft: '2px', color: '#f0ad4e', fontWeight: 400 }}>{`(${list.length})`}</span></div>
                    )}
                    {model == 'launch' && (
                        <div style={{ paddingTop: '5px', fontWeight: '700' }}>{'我发起的'}</div>
                    )}
                    {model == 'handle' && (
                        <div style={{ paddingTop: '5px', fontWeight: '700' }}>{'我处理的'}</div>
                    )}
                    {model == 'copy' && (
                        <div style={{ paddingTop: '5px', fontWeight: '700' }}>{'抄送我的'}</div>
                    )}
                    <div>
                        <Button style={{ float: 'right' }}>最新</Button>
                        <Dropdown overlay={this.selectList} placement="bottomLeft">
                            <Button style={{ float: 'right' }}>筛选</Button>
                        </Dropdown>
                        <Button style={{ float: 'right' }}>批量提交</Button>
                    </div>
                </div>
                <hr />
                <div className='all_message_list'>
                    {
                        list.map((item, index) => {
                            let auth = {}
                            let data = {}
                            let fieldList = []
                            let nameObj = {}
                            let fieldObj = {}
                            item['oneDataVo']['fields'].map((one) => {
                                try {
                                    fieldObj[one['id']] = toJS(JSON.parse(one['detailJson']))
                                    nameObj[one['id']] = one['name']
                                } catch (error) {
                                    fieldObj[one['id']] = toJS({})
                                }

                            })
                                auth = JSON.parse(item['nodeProperty']['fieldAuth'])
                                data = JSON.parse(item['oneDataVo']['data']['formData'])
                                fieldList = getField(auth, fieldObj);
                            return (
                                <div className='one_message' key={index} onClick={() => {
                                    this.props.MessageStore.setValue('fieldInfo', fieldList)
                                    this.props.MessageStore.setValue('detailVis', true)
                                    this.props.MessageStore.setValue('info', item)
                                    this.props.MessageStore.setValue('formData', JSON.parse(item['oneDataVo']['data']['formData']));
                                    this.props.MessageStore.setValue('formInfo', toJS(item['oneDataVo']['form']))
                                    this.props.MessageStore.setValue('nameObj', toJS(nameObj))
                                }}>
                                    <div className='one_message1'>{item['flowLog']['createPerson']}</div>
                                    <div className='one_message2'>
                                        <div className='message2_name'>{item['formName']}</div>
                                        {
                                            model == 'wait' && (
                                                <div className='message2_node'>当前: {item['nodeProperty']['nodeName']}</div>
                                            )
                                        }
                                        {
                                            model != 'wait' && (
                                                <div className='message_statu'>{item['nodeId'] == -2 ? '已结束' : '进行中'}</div>
                                            )
                                        }
                                    </div>
                                    <div className='one_message3'>
                                        {
                                            Object.keys(auth).map((key, kIndex) => {
                                                if (auth[key].indexOf('sketch') > -1 && data.hasOwnProperty(key)) {
                                                    return (
                                                        <div className='message_sketch' key={kIndex}>
                                                            <span className='sketch_name'>{nameObj[key]}:</span>
                                                            <span className='sketch_content'>{data[key]}</span>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        <div className='message_sketch'></div>
                                        <div className='message_sketch'></div>
                                        <div className='message_sketch'></div>
                                    </div>
                                    <div className='one_message4'>{item['updateTime']}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <GlobalModal
                    title={info['formName']}
                    visible={detailVis}
                    width={1080}
                    footer={null}
                    onCancel={() => { this.props.MessageStore.setValue('detailVis', false) }}
                    children={
                        <Detail />
                    }
                />
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
}

export default index
