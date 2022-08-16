/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-06-30 09:07:55
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-16 12:01:49
 * @FilePath: \bl-device-manage-test\src\components\GlobalTabel2\dataModal.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CopyOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FunnelPlotOutlined, PrinterOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Checkbox, Modal, Popover, Spin, Tabs } from 'antd'
import { Radio } from 'components/BLComps'
import GlobalModal from 'components/GlobalModal'
import { firstFormName } from 'constants/status_constant'
import FormData from 'layouts/FormLayout/formData'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { put } from 'utils/request'
import './index.less'

@inject('TableStore', 'HomeStore', 'FormStore')
@observer
class DataModal extends Component {
    render() {
        const { itemIndex, dataSource, modalFieldValue, modalField, modalData, formArr } = this.props.TableStore
        const { fieldNameObj } = this.props.FormStore
        const getExactData = (formName) => {
            if (typeof (formArr[formName]) != 'undefined') {
                const element = formArr[formName]['properties'];
                return (
                    modalField.map((item, index) => {
                        if (modalFieldValue.includes(item['id']) && !(['createPerson', 'createTime', 'updateTime'].indexOf(item['id']) > -1) && element.hasOwnProperty(item['id'])) {
                            let showData = modalData[item['id']]
                            let jsonData = JSON.parse(item['detailJson'])
                            if (jsonData['typeId'] == '4') {
                                let index = jsonData['enum'].indexOf(modalData[item['id']])
                                showData = jsonData['enumNames'][index]
                                return (
                                    <div className='item_content' key={index}>
                                        <div className='item_title'>
                                            {element[item['id']]['title']}
                                        </div>
                                        <div className='item_article'>
                                            {showData}
                                        </div>
                                    </div>
                                )
                            } else if (jsonData['typeId'] == '5') {
                                showData = ""
                                let iData = modalData[item['id']].substring(1, modalData[item['id']].length).split(",");
                                iData.map((one, index) => {
                                    let oneIndex = jsonData['enum'].findIndex(value => value.charCodeAt() == one.substring(1, one.length - 1).charCodeAt());
                                    if (index == 0) {
                                        showData += jsonData['enumNames'][oneIndex]
                                    } else {
                                        showData += ","
                                        showData += jsonData['enumNames'][oneIndex]
                                    }
                                })
                                return (
                                    <div className='item_content' key={index}>
                                        <div className='item_title'>
                                            {element[item['id']]['title']}
                                        </div>
                                        <div className='item_article'>
                                            {showData}
                                        </div>
                                    </div>
                                )
                            } else if (jsonData['typeId'] == '14') {
                                let arr = []
                                if (showData != undefined && showData != '') {
                                    arr = JSON.parse(showData)
                                }
                                return (
                                    <div className='item_content' key={index}>
                                        <div className='item_title'>
                                            {element[item['id']]['title']}
                                        </div>
                                        {
                                            jsonData['linkquery_condition']['fieldIds'].map((one, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div>{fieldNameObj[one]}</div>
                                                        {/* <div>{arr[0][one]}</div> */}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            } else if (jsonData['typeId'] == '15') {
                                jsonData['linkquery_condition']['fieldShow'].map(one => {
                                    console.log(fieldNameObj[one]);
                                })
                                return (
                                    <div className='item_content' key={index}>
                                        <div className='item_title'>
                                            {element[item['id']]['title']}
                                        </div>
                                        {
                                            jsonData['linkquery_condition']['fieldShow'].map(one => {
                                                return (
                                                    <div>{fieldNameObj[one]}</div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            } else {
                                return (
                                    <div className='item_content' key={index}>
                                        <div className='item_title'>
                                            {element[item['id']]['title']}
                                        </div>
                                        <div className='item_article'>
                                            {showData}
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })
                )
            }
        }
        const getInfo = () => {
            const arr = ['createPerson', 'createTime', 'updateTime'];
            const arr_title = {
                'createPerson': '创建人',
                'createTime': '创建时间',
                'updateTime': '更新时间'
            }
            return (
                arr.map((item, index) => {
                    if (modalFieldValue.includes(item)) {
                        return (
                            <div className='info_item' key={index}>
                                <div className='info_title'>{arr_title[item]}</div>
                                <div className='info_article'>{modalData[item]}</div>
                            </div>
                        )
                    }
                })
            )
        }
        const handleClickFront = () => {
            this.props.TableStore.getOneData({ 'formId': this.props.HomeStore.firstFormId, "dataId": dataSource[itemIndex - 1]['key'] })
            this.props.TableStore.setValue('itemIndex', itemIndex - 1);
        }
        const handleClickBehind = () => {
            this.props.TableStore.getOneData({ 'formId': this.props.HomeStore.firstFormId, "dataId": dataSource[itemIndex + 1]['key'] })
            this.props.TableStore.setValue('itemIndex', itemIndex + 1);

        }
        const judgeFront = () => {
            if (itemIndex == 0) {
                return true;
            } else {
                return false;
            }
        }
        const judgeBehind = () => {
            if (itemIndex == dataSource.length - 1) {
                return true;
            } else {
                return false;
            }
        }
        const checkChange = (value) => {
            this.props.TableStore.setValue('modalFieldValue', value)
        }
        const visibleChange = (visible) => {
            console.log(visible);
        }
        const handleClick = (value) => {
            if (value == 'del') {
                this.props.TableStore.delOneData({ 'formId': this.props.HomeStore.firstFormId, 'dataId': modalData['id'] }).then(() => {
                    if (this.props.TableStore.model == 'subitAndManage') {
                        this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'myself')
                    } else {
                        this.props.TableStore.getAllData({ formId: this.props.HomeStore.firstFormId }, 'all')
                    }
                })
                this.props.TableStore.setDataPageModalVis(false);
            } else if (value == 'copy') {
                this.props.FormStore.setValue('formCopyVis', true);
            } else if (value == 'edit') {
                this.props.TableStore.setValue('formEdit', true);
            }
            console.log(value);
        }
        const fieldChoose = (
            <>
                <Checkbox.Group onChange={checkChange} defaultValue={this.props.TableStore.modalFieldValue}>
                    {modalField.map((item, index) => {
                        return <>
                            <Checkbox value={item.id} key={index} style={{ width: '300px', paddingLeft: '20px' }}>{item.name}</Checkbox>
                            <br />
                        </>
                    })}
                </Checkbox.Group>
            </>
        )
        const getItemInfo = () => {
            // console.log(toJS(this.props.TableStore.detailData['logs']));
            if (this.props.TableStore.detailData['logs']) {
                return (
                    this.props.TableStore.detailData['logs'].map((item, index) => {
                        const changeContent = JSON.parse(toJS(item['changeContent']))
                        let dex = 0
                        let infoItem = []
                        let flag = false;
                        for (const key in changeContent) {
                            if (Object.hasOwnProperty.call(changeContent, key)) {
                                const element = changeContent[key];
                                infoItem[dex] = new Object()
                                infoItem[dex].front = element[0]
                                infoItem[dex].behind = element[1]
                                toJS(this.props.TableStore.detailData['fields']).filter((info) => {
                                    if (info['id'] == key) {
                                        infoItem[dex].title = JSON.parse(info['detailJson'])['title'];
                                        flag = true;
                                    }
                                })
                            }
                            dex = dex + 1;
                        }
                        if (flag) return (
                            <div className='right_content_item'>
                                <div className='right_content_header'>
                                    <div className='item_header_left'>
                                        1
                                    </div>
                                    <div className='item_header_right'>
                                        <div className='item_name'>
                                            {item['createPerson']}
                                        </div>
                                        <div className='item_time'>
                                            修改 {item['createTime']}
                                        </div>
                                        <div className='item_count'>
                                            有{item['changeNum']}处更改
                                        </div>
                                    </div>
                                </div>
                                <div className='right_content_content'>
                                    {
                                        infoItem.map((item, key) => {
                                            return <>
                                                <div className='item_title' key={key}>{item.title}:</div>
                                                {
                                                    item.front != '' && <div className='item_front'>
                                                        <div className='tag'>{item.front}</div>
                                                    </div>
                                                }
                                                <div className='item_behind'>
                                                    <div className='tag'>{item.behind}</div>
                                                </div>
                                                {
                                                    key != infoItem.length - 1 && <div className='item_line'></div>
                                                }
                                            </>
                                        })
                                    }

                                </div>
                            </div>
                        )
                    })
                )
            }

        }
        const getData = () => {
            let newArr = []
            for (const key in formArr) {
                if (Object.hasOwnProperty.call(formArr, key)) {
                    const element = formArr[key];
                    if (key != 'root') {
                        newArr.push(key);
                    }
                }
            }
            return newArr.map((item, index) => {
                return (
                    <Tabs.TabPane tab={item} key={index}>
                        {getExactData(item)}
                    </Tabs.TabPane>
                )
            })
        }
        return (
            <Spin spinning={this.props.TableStore.isLoading} size='large' tip='Loading..' wrapperClassName='my_spin'>
                <div className='main_modal'>
                    {
                        this.props.TableStore.formEdit == false ? (
                            <div className='left_main'>
                                <div className='left_modal'>
                                    <div className='left_header_left'>
                                        <Popover placement="bottomRight" content={fieldChoose} trigger="click"
                                            onVisibleChange={visibleChange}
                                        >
                                            <button className='header_btn'><EyeOutlined style={{ color: '#0db3a6' }} /></button>
                                        </Popover>
                                        <button onClick={() => { handleClick('share') }} className='header_btn'><ShareAltOutlined style={{ color: '#0db3a6', marginRight: '5px' }} /></button>
                                        <div className='header_split' />
                                        <button onClick={() => { handleClick('print') }} className='header_btn'><PrinterOutlined style={{ color: '#0db3a6', marginRight: '5px' }} />打印</button>
                                        <button onClick={() => { handleClick('copy') }} className='header_btn'><CopyOutlined style={{ color: '#0db3a6', marginRight: '5px' }} />复制</button>
                                        <button onClick={() => { handleClick('edit') }} className='header_btn'><EditOutlined style={{ color: '#0db3a6', marginRight: '5px' }} />编辑</button>
                                        <button onClick={() => { handleClick('del') }} className='header_btn'><DeleteOutlined style={{ color: '#0db3a6', marginRight: '5px' }} />删除</button>

                                    </div>
                                    <div className='left_header_right'>
                                        <Button size='small' disabled={judgeFront()} type='text' onClick={handleClickFront}>←</Button>
                                        <span type='text' >{itemIndex + 1}/{dataSource.length}</span>
                                        <Button size='small' disabled={judgeBehind()} type='text' onClick={handleClickBehind}>→</Button>
                                    </div>
                                </div>
                                <div className='left_content'>
                                    <div className='left_content_top'>
                                        {getExactData('root')}
                                        <Tabs type='card' style={{ paddingLeft: '5px' }}>
                                            {getData()}
                                        </Tabs>
                                    </div>
                                    <div className='info_content'>
                                        {getInfo()}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='left_main'>
                                <FormData />
                            </div>
                        )
                    }
                    <div className='right_modal'>
                        <div className='right_header'>
                            <Radio.Group onChange={(value) => console.log(value)} defaultValue="1" style={{ paddingLeft: '5px' }}>
                                <Radio.Button value={'1'}>数据日志</Radio.Button>
                                <Radio.Button value={'2'}>评论</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className='right_content'>
                            {getItemInfo()}
                        </div>

                    </div>
                </div>
                {
                    this.props.FormStore.formCopyVis &&
                    <GlobalModal
                        style={{
                            top: 0,
                        }}
                        width={800}
                        title={firstFormName[this.props.HomeStore.firstFormId]}
                        footer={null}
                        visible={this.props.FormStore.formCopyVis}
                        onCancel={() => this.props.FormStore.setValue('formCopyVis', false)}
                        children={
                            <FormData />
                        }
                    />
                }
            </Spin>
        )
    }
}

export default DataModal
