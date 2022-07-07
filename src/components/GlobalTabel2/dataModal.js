/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-06-30 09:07:55
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-07 18:27:10
 * @FilePath: \bl-device-manage-test\src\components\GlobalTabel2\dataModal.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FunnelPlotOutlined } from '@ant-design/icons'
import { Button, Checkbox, Modal, Popover, Spin } from 'antd'
import { Radio } from 'components/BLComps'
import { firstFormName } from 'constants/status_constant'
import FormData from 'layouts/FormLayout/formData'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { injectSelfToken } from 'utils/request'
import './index.css'

@inject('TableStore', 'HomeStore', 'FormStore')
@observer
class DataModal extends Component {
    render() {
        const { itemIndex, dataSource, modalFieldValue, modalField, modalData, formArr } = this.props.TableStore
        const getExactData = (formName) => {
            if (typeof (formArr[formName]) != 'undefined') {
                const element = formArr[formName]['properties'];
                return (
                    modalField.map((item) => {
                        if (modalFieldValue.includes(item['id']) && !(['createPerson', 'createTime', 'updateTime'].indexOf(item['id']) > -1)) {
                            return (
                                <div className='item_content' key={item['fieldId']}>
                                    <div className='item_title'>
                                        {element[item['id']]['title']}
                                    </div>
                                    <div className='item_article'>
                                        {modalData[item['id']]}
                                    </div>
                                </div>
                            )
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
                arr.map((item) => {
                    if (modalFieldValue.includes(item)) {
                        return (
                            <div className='info_item'>
                                <div className='info_title'>{arr_title[item]}</div>
                                <div className='info_article'>{modalData[item]}</div>
                            </div>
                        )
                    }
                })
            )
        }
        const handleClickFront = () => {
            console.log(dataSource[itemIndex - 1]);
            this.props.TableStore.getOneData({ 'formId': this.props.HomeStore.firstFormId, "dataId": dataSource[itemIndex - 1]['key'] })
            this.props.TableStore.setValue('itemIndex', itemIndex - 1);
        }
        const handleClickBehind = () => {
            console.log(dataSource[itemIndex + 1]);
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
                {/* <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Check all
                </Checkbox> */}
                <Checkbox.Group onChange={checkChange} defaultValue={this.props.TableStore.modalFieldValue}>
                    {modalField.map((item, index) => {
                        return <>
                            <Checkbox value={item.id} key={index} style={{ width: '300px' }}>{item.name}</Checkbox>
                            <br />
                        </>
                    })}
                </Checkbox.Group>
            </>
        )
        return (
            <Spin spinning={this.props.TableStore.isLoading} size='large' tip='Loading..'>
                <div className='main_modal'>
                    {
                        this.props.TableStore.formEdit == false ? (
                            <div className='left_main'>
                                <div className='left_modal'>
                                    <div className='left_header_left'>
                                        <Popover placement="bottomRight" content={fieldChoose} trigger="click"
                                            onVisibleChange={visibleChange}
                                        >
                                            <button className='header_btn'><FunnelPlotOutlined />字段</button>
                                        </Popover>
                                        <button onClick={() => { handleClick('share') }} className='header_btn'><FunnelPlotOutlined />分享</button>
                                        <div className='header_split' />
                                        <button onClick={() => { handleClick('print') }} className='header_btn'><FunnelPlotOutlined />打印</button>
                                        <button onClick={() => { handleClick('copy') }} className='header_btn'><FunnelPlotOutlined />复制</button>
                                        <button onClick={() => { handleClick('edit') }} className='header_btn'><FunnelPlotOutlined />编辑</button>
                                        <button onClick={() => { handleClick('del') }} className='header_btn'><FunnelPlotOutlined />删除</button>

                                    </div>
                                    <div className='left_header_right'>
                                        <Button size='small' disabled={judgeFront()} type='text' onClick={handleClickFront}>←</Button>
                                        <span type='text' >{itemIndex + 1}/{dataSource.length}</span>
                                        <Button size='small' disabled={judgeBehind()} type='text' onClick={handleClickBehind}>→</Button>
                                    </div>
                                </div>
                                <div className='left_content'>
                                    {getExactData('root')}
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
                    </div>
                </div>
                {
                    this.props.FormStore.formCopyVis &&
                    <Modal
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
