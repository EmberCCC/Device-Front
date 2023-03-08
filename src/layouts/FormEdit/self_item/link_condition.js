/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-04 12:43:55
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-14 05:19:13
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\link_item.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, message, Modal, Select } from "antd";
import './index.css'
import { inject, observer } from "mobx-react";
import { DeleteOutlined } from "@ant-design/icons";
import { toJS } from "mobx";
import { checkCondition, checkSelf, getAllField } from "../changeTool";
import { select_arr, select_condtion } from "constants/select_config";
const Link_condition = observer((props) => {
    const { TableStore, FormStore, HomeStore, value, schema, onChange } = props
    const formId = sessionStorage.getItem('formId') ? sessionStorage.getItem('formId') : HomeStore.firstFormId
    const [vis, setVis] = useState(false)
    const [conditionList, setConditionList] = useState([])
    const [fieldObj, setFieldObj] = useState({})
    const [id, setId] = useState(null)
    const [link, setLink] = useState(null)
    const dataRef = useRef()
    useEffect(() => {
        dataRef.current = value
    }, [value])
    useEffect(() => {
        FormStore.getFormSimple();
        let fId = props.addons.formData.hasOwnProperty('fieldId') ? props.addons.formData.fieldId : props.addons.formData.$id.substr(2)
        if (value == undefined) {
            onChange({ 'formId': null, 'conditions': [], 'linkFieldId': null, 'originId': fId });
        } else {
            setConditionList(value.conditions)
            setId(value.formId)
            setLink(value.linkFieldId)
        }

    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Button onClick={() => {
                let arr = []
                // arr.push(toJS(FormStore.rootSchema['properties']))
                let obj={...toJS(FormStore.formEditSchema['properties'])}
                delete obj['Tabs']
                arr.push(obj)
                if (FormStore.formEditSchema['properties'].hasOwnProperty('Tabs')){
                    console.log('schemaList',toJS(FormStore.schemaList))
                    for (const item of FormStore.schemaList) {
                        arr.push(item['fields'])
                    }
                }
                // FormStore.schemaList.map(item => arr.push(toJS(item['schema']['properties'])))
                console.log('props',props)
                setFieldObj(getAllField(arr))
                setVis(true)
            }}>数据联动设置</Button>
            <Modal visible={vis} onCancel={() => setVis(false)} title={'数据联动设置'} destroyOnClose={true} footer={null} width={1200}>
                <div className="link_content">
                    <div className="link_form">
                        <div className="link_form_title">联动表单</div>
                        <Select defaultValue={id} style={{ width: '100%' }} placeholder='请选择联动表单' onChange={(e) => {
                            setId(e)
                            setConditionList([])
                            setLink(null)
                        }}>
                            {
                                FormStore.formStru.filter(one => one['formId'] != formId).map((item, index) => {
                                    return (
                                        <Select.Option key={index} value={item['formId']}>{item['formName']}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className="link_condition">
                        <div className="link_condition_title">满足以下条件时</div>
                        <div className="link_condition_list">
                            {
                                conditionList !== undefined && (
                                    conditionList.map((item, index) => {
                                        let oInfo = ''
                                        if (item['fieldId'] != null) {
                                            oInfo = item['fieldId'] + '-' + item['fieldTypeId']
                                        }
                                        return (
                                            <div className="link_condition_one" key={index}>
                                                <Select value={oInfo} style={{ width: '400px', marginRight: '10px' }} placeholder='联动表单字段' onChange={(e) => {
                                                    let arr = [...conditionList]
                                                    let one = arr[index]
                                                    let info = e.split('-')
                                                    one['fieldId'] = info[0]
                                                    one['fieldTypeId'] = info[1];
                                                    arr.splice(index, 1, one)
                                                    console.log(arr);
                                                    setConditionList(arr)
                                                }}>
                                                    {
                                                        FormStore.formStru.filter(one => one['formId'] == id)[0]?.['fieldSimpleVos'].map((field, fI) => {
                                                            if ([0, 1, 2, 3].indexOf(field['typeId']) > -1) {
                                                                return (
                                                                    <Select.Option value={`${field['fieldId']}-${field['typeId']}`} key={fI}>{field['fieldName']}</Select.Option>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </Select>
                                                <Select onChange={(e) => {
                                                    let arr = [...conditionList]
                                                    let obj = arr[index]
                                                    obj['operator'] = e
                                                    arr.splice(index, 1, obj)
                                                    setConditionList(arr)
                                                }} style={{ width: '120px', marginRight: '10px' }} value={item['operator']}>
                                                    {
                                                        select_arr[item['fieldTypeId']] != undefined && select_arr[item['fieldTypeId']].map((one, oi) => {
                                                            return (
                                                                <Select.Option key={oi} value={select_condtion[one]['value']}>{select_condtion[one]['title']}</Select.Option>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        select_arr[item['fieldTypeId']] == undefined && (
                                                            <Select.Option disabled={true} value={'='}>等于</Select.Option>

                                                        )
                                                    }
                                                </Select>
                                                <Select disabled={['0', '1', '2', '4', '6'].indexOf(item['fieldTypeId']) > -1 ? false : true} value={item['custom']} style={{ width: '120px', marginRight: '10px' }} onChange={(e) => {
                                                    let arr = [...conditionList]
                                                    let obj = arr[index]
                                                    obj['custom'] = e
                                                    arr.splice(index, 1, obj)
                                                    setConditionList(arr)
                                                }}>
                                                    <Select.Option value={false}>当前表单字段</Select.Option>
                                                    <Select.Option value={true}>自定义值</Select.Option>
                                                </Select>
                                                {
                                                    item['custom'] == false && (
                                                        <Select value={item['operand']} placeholder='当前表单字段' style={{ width: '400px', marginRight: "10px" }} onChange={(e) => {
                                                            let arr = [...conditionList]
                                                            let obj = arr[index]
                                                            obj['operand'] = e
                                                            arr.splice(index, 1, obj)
                                                            setConditionList(arr)
                                                        }}>
                                                            {Object.keys(fieldObj).map((info, iI) => {
                                                                // console.log('info',info,'iI',iI)
                                                                // console.log(item,fieldObj[info])
                                                                // console.log('props',props)
                                                                if (info !== props.addons.formData.fieldId) {
                                                                    // console.log(item['fieldTypeId'],fieldObj[info]['fieldTypeId'])
                                                                    if ((item['fieldTypeId'] == '0' || item['fieldTypeId'] == '1' || item['fieldTypeId'] == '4' || item['fieldTypeId'] == '6') &&
                                                                        (fieldObj[info]['fieldTypeId'] == '0' ||
                                                                            fieldObj[info]['fieldTypeId'] == '1' ||
                                                                            fieldObj[info]['fieldTypeId'] == '4' ||
                                                                            fieldObj[info]['fieldTypeId'] == '6')) {
                                                                        return (
                                                                            <Select.Option key={iI} value={info}>{fieldObj[info]['fieldName']}</Select.Option>
                                                                        )
                                                                    } else if ((item['fieldTypeId'] == '5' || item['fieldTypeId'] == '7') &&
                                                                        (fieldObj[info]['fieldTypeId'] == '5' || fieldObj[info]['fieldTypeId'] == '7')) {
                                                                        return (
                                                                            <Select.Option key={iI} value={info}>{fieldObj[info]['fieldName']}</Select.Option>
                                                                        )
                                                                    } else if (item['fieldTypeId'] == fieldObj[info]['fieldTypeId']) {
                                                                        return (
                                                                            <Select.Option key={iI} value={info}>{fieldObj[info]['fieldName']}</Select.Option>
                                                                        )
                                                                    }
                                                                }

                                                            })}
                                                        </Select>
                                                    )
                                                }
                                                {
                                                    item['custom'] == true && <Input onChange={(e) => {
                                                        let arr = [...conditionList]
                                                        let obj = arr[index]
                                                        obj['operand'] = e.target.value
                                                        arr.splice(index, 1, obj)
                                                        setConditionList(arr)
                                                    }} placeholder="自定义值" style={{ width: '400px', marginRight: "10px" }} />
                                                }
                                                <DeleteOutlined onClick={() => {
                                                    let arr = [...conditionList]
                                                    arr.splice(index, 1)
                                                    setConditionList(arr)
                                                }} />
                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>
                        <div className="link_condition_add" onClick={() => {
                            let arr = [...conditionList]
                            arr.push({ 'fieldId': null, 'operator': "=", 'fieldTypeId': null, 'operand': null, 'custom': false })
                            setConditionList(arr)
                        }}>+ 添加条件</div>
                    </div>
                    <div className="link_result">
                        <div className="link_result_title">触发以下联动</div>
                        <div className="link_result_content">
                            <Input style={{ width: '400px' }} value={props.addons.formData.title} disabled={true} />
                            <div style={{ width: '60px' }}>联动显示</div>
                            <Select value={link} style={{ width: '400px', marginRight: '10px' }} placeholder='联动表单字段' onChange={(e) => {
                                setLink(e)
                            }}>
                                {
                                    FormStore.formStru.filter(one => one['formId'] == id)[0]?.['fieldSimpleVos'].map((field, fI) => {
                                        console.log(toJS(field),fI)
                                        console.log(field['typeId'],props.addons.formData.typeId)
                                        if (['0', '1', '4', '5'].indexOf(props.addons.formData.typeId) > -1) {
                                            if ([0, 1, 4, 5].indexOf(field['typeId']) > -1) {
                                                return (
                                                    <Select.Option value={field['fieldId']} key={fI}>{field['fieldName']}</Select.Option>
                                                )
                                            }
                                        } else {
                                            if (props.addons.formData.typeId == field['typeId']) {
                                                return (
                                                    <Select.Option value={field['fieldId']} key={fI}>{field['fieldName']}</Select.Option>
                                                )
                                            }
                                        }
                                    })
                                }
                            </Select>
                            <div>的值</div>
                        </div>
                    </div>
                    <div className="link_btn">
                        <Button style={{ marginRight: '20px' }} onClick={() => {
                            if (value == undefined) {
                                onChange({ 'formId': null, 'conditions': [], 'linkFieldId': null });
                            } else {
                                setConditionList(value.conditions)
                                setId(value.formId)
                                setLink(value.linkFieldId)
                            }
                            setVis(false)
                        }}>取消</Button>
                        <Button type='primary' onClick={() => {
                            let flag = true
                            if (id == null) {
                                flag = false
                            }
                            if (link == null) flag = false
                            if (!checkCondition(conditionList)) flag = false
                            if (!flag) {
                                message.info('请完善信息!')
                            } else {
                                if (!checkSelf(conditionList)) {
                                    message.info('至少选择一个当前字段类型')
                                } else {
                                    onChange({ 'formId': id, 'conditions': conditionList, 'linkFieldId': link })
                                    setVis(false)
                                }
                            }
                        }}>确定</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
})

export default inject((stores) => ({ TableStore: stores.TableStore, FormStore: stores.FormStore, HomeStore: stores.HomeStore }))(Link_condition)
