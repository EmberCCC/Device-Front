/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-06 08:14:52
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-16 12:03:07
 * @FilePath: \bl-device-manage-test\src\components\GlobalTabel2\mulChange.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message, Select, Spin } from 'antd'
import { toJS } from 'mobx'
import FormRender, { useForm } from 'form-render';
import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'
import stores from 'stores'

import './index.less'
import { LeftOutlined } from '@ant-design/icons';
const MulChange = observer(({ HomeStore, TableStore }) => {
    const { columns } = TableStore;
    const { Option } = Select
    const [schema, setSchema] = useState({})
    const [itemVis, setItemVis] = useState(false)
    const [value, setValue] = useState(null);
    const form = useForm();
    const handleSelect = (value) => {
        setValue(value)
        form.resetFields()
        let obj = {}
        columns.filter((item) => {
            if (item.key == value) {
                obj = toJS(item)
            }
        });
        console.log(obj);
        let iObj = {}
        iObj['type'] = 'object';
        iObj['labelWidth'] = '80'
        iObj['displayType'] = 'column'
        let pro = {}
        obj['detailJson']['title'] = ''
        pro[obj['key']] = obj['detailJson']
        iObj['properties'] = pro
        console.log(iObj);
        setSchema(iObj);
        setItemVis(true);
    }
    const handleClick = (type) => {
        TableStore.setValue('mulVis', false)
        console.log(type);
    }
    const onFinish = (formData) => {
        if (value == null) {
            message.info('请选择要修改的字段')
            return;
        }
        if (JSON.stringify(formData) == '{}') formData = JSON.parse(`{"${value}":""}`)
        const params = {
            'formId': toJS(HomeStore.firstFormId),
            'dataId': toJS(TableStore.selectedRowKeys),
            'fieldId': value,
            'newValue': formData[value]
        }
        TableStore.mulChange(params).then(() => {
            TableStore.setSelectedRowKeys([])
            if (TableStore.model == 'subitAndManage') {
                TableStore.getAllData({ formId: HomeStore.firstFormId }, 'myself')
            } else {
                TableStore.getAllData({ formId: HomeStore.firstFormId }, 'all')
            }
            TableStore.getBatchLog({ 'formId': toJS(HomeStore.firstFormId) }).then(() => {
                TableStore.setValue('mulType', '2')
            });
        });
        console.log(params);
    }
    const handleChange = () => {
        TableStore.getBatchLog({ 'formId': HomeStore.firstFormId })
        TableStore.setValue('mulType', '2');
    }
    const handleBack = () => {
        setItemVis(false);
        setSchema({});
        setValue(null)
        TableStore.setValue('mulType', '1');
    }
    const changeLayout = (
        <div className='mul_total'>
            <div className='mul_header'>
                <span className='mul_header_line'>• 批量修改后无法撤销，请谨慎操作！</span>
                <span className='mul_header_line'>• 批量修改为「公式计算值」时，每次最多修改 50000 条数据。</span>
                <span className='mul_header_line'>• 图片、附件、定位、手写签名、关联数据、关联查询、分割线字段不支持批量修改。</span>
                <span className='mul_header_line'>• 设置为「不允许重复值」的字段不支持批量修改。</span>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <span>请选择需要修改的字段</span>
                <br />
                <Select style={{ width: 150 }} onSelect={handleSelect}>
                    {columns.map((item, index) => {
                        if (!(['createPerson', 'createTime', 'updateTime'].includes(item.key))) {
                            return (
                                <Option value={item.key} key={index}>
                                    {item.title}
                                </Option>
                            )
                        }

                    })}
                </Select>
            </div>
            <div>
                <div className='mul_change'>修改为{itemVis && <Select style={{ width: 150, marginLeft: '15px' }}>
                    <Option value={1}>固定值</Option>
                    <Option value={2}>公式计算值</Option>
                </Select>}</div>
                <br />
                <FormRender schema={schema} form={form} onFinish={onFinish} style={{ overflowY: 'auto' }} />
                <span className='mul_header_line'>如需清空字段，保留此项为空即可</span>
            </div>
            <div className='mul_footer'>
                <a onClick={handleChange}>查看修改记录</a>
                <div>
                    <button onClick={() => handleClick('cancel')} className="mul_cancel">取消</button>
                    <button onClick={form.submit} className='mul_sure'>确定</button>
                </div>
            </div>
        </div>
    )
    const logLayout = (
        <Spin spinning={TableStore.isLoading} tip='加载中' size='large'>
            <div className='log_main'>
                {TableStore.mulType == '2' &&
                    <div className='log_title'>
                        <LeftOutlined onClick={handleBack} />
                        修改记录
                    </div>
                }
                <div style={{ overflowY: 'auto' }}>
                    {
                        TableStore.batchLog.map((item, index) => {
                            return (
                                <div className='log_one' key={index}>
                                    <div className='log_detail'>
                                        <div className='log_info'>修改时间：{item['formModifyLog']['createTime']}</div>
                                        <div className='log_info'>修改人：{item['formModifyLog']['createPerson']}</div>
                                        <div className='log_info'>修改字段：{item['fieldName']}</div>
                                        <div className='log_info'>新增：{item['formModifyLog']['newValue']}</div>
                                        <div className='detail_data'>
                                            <div>修改数据：{item['formModifyLog']['modifyNum']}</div>
                                            <div>成功：{item['formModifyLog']['successNum']}</div>
                                            <div>失败：{item['formModifyLog']['modifyNum'] - item['formModifyLog']['successNum']}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Spin>
    )
    return (
        TableStore.mulType == '1' ? changeLayout : logLayout
    )
});


export default inject((stores) => ({ HomeStore: stores.HomeStore, TableStore: stores.TableStore }))(MulChange)