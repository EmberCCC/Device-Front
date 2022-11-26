/*
 * @Author: your name
 * @Date: 2022-04-24 12:36:43
 * @LastEditTime: 2022-09-25 21:17:05
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\layouts\MessageManage\ListPage\index.js
 */
import { Button, DatePicker, Dropdown, Select, Spin } from 'antd'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import '../index.less'
import { messageName } from '../constants';
import { toJS } from 'mobx';
import { getField } from '../visUtil';
import GlobalModal from 'components/GlobalModal';
import Detail from '../detail';
import { getLinkCondition } from 'layouts/FormEdit/changeTool';
import { put } from 'utils/request';

@inject('MessageStore', 'HomeStore', 'TableStore', 'FormStore', 'SocketStore')
@observer
class index extends Component {
    state = {
        isLoading: false
    }
    componentDidMount() {
        //获取我的待办
        this.props.MessageStore.getWaitList().then(() => {
            this.props.MessageStore.setValue('list', this.props.MessageStore.waitList);
            this.props.MessageStore.setValue('model', 'wait');
        })
        //获取我发起的
        this.props.MessageStore.getLaunchList()
        //获取我处理的
        this.props.MessageStore.getHandleList()
        //获取抄送我的
        this.props.MessageStore.getCopyList()
        //获取个人信息
        this.props.SocketStore.getMyInfo();
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
                    {
                        model == 'wait' && (
                            <div>
                                <Button style={{ float: 'right' }}>最新</Button>
                                <Dropdown overlay={this.selectList} placement="bottomLeft">
                                    <Button style={{ float: 'right' }}>筛选</Button>
                                </Dropdown>
                                <Button style={{ float: 'right' }}>批量提交</Button>
                            </div>
                        )
                    }
                </div>
                <hr />
                {
                    <Spin wrapperClassName='all_message_list' spinning={this.props.MessageStore.loading} tip={'加载中....'}>
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
                                            let de = JSON.parse(one['detailJson'])
                                            de['fieldId'] = one['id']
                                            fieldObj[one['id']] = toJS(de)
                                            nameObj[one['id']] = one['name']
                                        } catch (error) {
                                            fieldObj[one['id']] = toJS({})
                                        }

                                    })
                                    // 获取流程配置，设定字段是否可见
                                    auth = JSON.parse(item['nodeProperty']['fieldAuth'])
                                    // 获取流程数据
                                    data = JSON.parse(item['oneDataVo']['data']['formData'])
                                    fieldList = getField(auth, fieldObj);
                                    return (
                                        <div className='one_message' key={index} onClick={() => {
                                            let dataIdArr = []
                                            this.props.MessageStore.setValue('fieldInfo', fieldList)
                                            console.log(fieldList);
                                            console.log(data);
                                            fieldList.forEach(element => {
                                                if (element.typeId == 15 || element.typeId == 14) {
                                                    console.log(data[element['fieldId']]);
                                                    if (data[element['fieldId']] != undefined && data[element['fieldId']] != '') {
                                                        if (Array.isArray(JSON.parse(data[element['fieldId']]))) {
                                                            dataIdArr = dataIdArr.concat(JSON.parse(data[element['fieldId']]))
                                                        } else {
                                                            dataIdArr = dataIdArr.concat(data[element['fieldId']])
                                                        }

                                                    }
                                                }
                                            });
                                            put('/data/FastQuery', dataIdArr).then((res) => {
                                                let arr = {}
                                                if (res.data && res.data.data) {
                                                    if (Array.isArray(res.data.data)) {
                                                        res.data.data.map((item, index) => {
                                                            if (item != null) {
                                                                let obj = {}
                                                                let data = JSON.parse(item['formData'])
                                                                obj = { ...data }
                                                                obj['key'] = item['id']
                                                                obj['id'] = item['id']
                                                                arr[item['id']] = obj
                                                            }

                                                        })
                                                        this.props.MessageStore.setValue('oneDataInfo', arr)
                                                    }
                                                }
                                            })
                                            this.props.MessageStore.setValue('detailVis', true)
                                            this.props.MessageStore.setValue('info', item)
                                            this.props.FormStore.setValue('formData', JSON.parse(item['oneDataVo']['data']['formData']));
                                            this.props.MessageStore.setValue('formInfo', toJS(item['oneDataVo']['form']))
                                            this.props.MessageStore.setValue('nameObj', toJS(nameObj))
                                            this.props.FormStore.setValue('linkDataObj', getLinkCondition({ 'fields': item['oneDataVo']['fields'] })['LObj']);
                                            this.props.FormStore.setValue('linkFieldObj', getLinkCondition({ 'fields': item['oneDataVo']['fields'] })['Fobj']);
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
                                                        <div className='message_statu'>{item['flowLog']['state'] ? '已结束' : '进行中'}</div>
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
                    </Spin>
                }
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
