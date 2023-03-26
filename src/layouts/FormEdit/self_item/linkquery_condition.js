/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-04 12:43:55
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-11 18:22:01
 * @FilePath: \bl-device-manage-test\src\layouts\FormEdit\self_item\link_item.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from "react";
import './index.css'
import { inject, observer } from "mobx-react";
import { Button, Input, message, Modal, Radio, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { checkCondition, getAllField ,newExChange} from "../changeTool";
import { toJS } from "mobx";
import { select_arr, select_condtion } from "constants/select_config";
const Linkquery_condition = observer((props) => {
    const { TableStore, FormStore, HomeStore, value, schema, onChange, addons } = props
    const formId = sessionStorage.getItem('formId') ? sessionStorage.getItem('formId') : HomeStore.firstFormId
    // const dataRef = useRef()
    const [vis, setVis] = useState(false);
    const [fieldObj, setFieldObj] = useState({})
    const [list, setList] = useState([])
    const [maps,setMaps]=useState({})
    const [selectOption,setSelectOption]=useState([])

    // useEffect(() => {
    //     dataRef.current = value
    // }, [value])
    useEffect(()=>{

    },[props])
    useEffect(() => {
        FormStore.getFormSimple();
        console.log(schema);
        console.log(props);
        console.log('vallllllue',value)
        console.log(toJS(FormStore.formStru))
        if (value == undefined) {
            if (addons.formData.typeId == '14') {
                onChange({ originId: props.addons.formData.$id.substr(2), restrictType: 'and', conditions: [], fieldIds: [], formId: null, mul: 'one' })
            } else if (addons.formData.typeId == '15') {
                onChange({ originId: props.addons.formData.$id.substr(2), restrictType: 'and', conditions: [], fieldIds: [], fieldShow: [], formId: null })
            }
            console.log('changeValue',value)
        } else {
            setList(value?.conditions)
        }
        console.log('vll',value)
        let s=[]
        for (let i=0;i<FormStore.formStru.length;i++){
            s.push({value:FormStore.formStru[i].formId,label:FormStore.formStru[i].formName})
        }
        setSelectOption(s)
    },[props.addons.formData.$id.substring(2)])
    useEffect(()=>{

    },[])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div className="query_form">
                <div className="query_title">关联表</div>
                <Select style={{ width: '100%' }} value={value?.formId} onChange={(e) => {
                    let obj = { ...value }
                    obj['formId'] = e
                    obj['fieldIds'] = []
                    obj['conditions'] = []
                    if (addons.formData.typeId == '15') {
                        obj['fieldShow'] = []
                    }
                    onChange(obj)
                }}
                options={selectOption}
                >
                    {
                        FormStore.formStru.map((item, index) => {
                            if (item['formId'] != formId) {
                                return (
                                    <Select.Option key={index} value={item['formId']}>{item['formName']}</Select.Option>
                                )
                            }

                        })
                    }
                </Select>
            </div>
            <div className="query_field">
                <div className="query_title">显示字段</div>
                <Select value={value?.fieldIds} mode='multiple' style={{ width: '100%' }} onChange={(e) => {
                    let obj = { ...value }
                    obj['fieldIds'] = e
                    onChange(obj)
                }}>
                    {
                        FormStore.formStru.filter(one => one['formId'] == value?.formId)[0]?.['fieldSimpleVos'].map((item, index) => {
                            return (
                                <Select.Option key={index} value={item['fieldId']}>{item['fieldName']}</Select.Option>
                            )
                        })
                    }
                </Select>
            </div>
            {
                addons.formData.typeId == '15' && (
                    <div className="query_showField">
                        <div className="query_title">表单中显示字段</div>
                        <Select value={value?.fieldShow} mode='multiple' style={{ width: '100%' }} onChange={(e) => {
                            let obj = { ...value }
                            obj['fieldShow'] = e
                            onChange(obj)
                        }}>
                            {
                                value?.fieldIds.map((one, index) => {
                                    return (
                                        <Select.Option key={index} value={one}>{FormStore.fieldNameObj[one]}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </div>

                )
            }
            <div className="query_condition">
                <div className="query_title">数据过滤</div>
                <Button onClick={() => {
                    if (value?.formId == null) {
                        message.info('请先选择联动表单')
                    } else {
                        console.log('formSchema',toJS(FormStore.formEditSchema['properties']) )
                        let params = newExChange(FormStore.formEditSchema, FormStore.selectFormId, toJS(FormStore.schemaList))
                        console.log('params',params)

                        let arr = []
                        let maps={}
                        params.subForms.map(item => arr.push(...item.fields))
                        console.log('arr',arr)
                        for (const item of arr) {
                            maps[item.fieldId]=item.name
                        }
                        setMaps(maps)
                        setFieldObj(arr)
                        setVis(true)
                    }

                }} style={{ width: '100%' }}>{`${value?.conditions.length > 0 ? "已设置过滤条件" : '添加过滤条件'}`}</Button>
            </div>
            {
                addons.formData.typeId == '14' && (
                    <div className="query_mul">
                        <div className="query_title">显示数据条数</div>
                        <Radio.Group value={value?.mul} onChange={(e) => {
                            let obj = { ...value }
                            obj['mul'] = e.target.value
                            onChange(obj)
                        }}>
                            <Radio value={'one'}>一条</Radio>
                            <Radio value={'mul'}>多条</Radio>
                        </Radio.Group>
                    </div>
                )
            }
            <Modal title={'添加过滤条件'} destroyOnClose={true} onCancel={() => {
                setList(value?.conditions)
                setVis(false)
            }} open={vis} footer={null} width={1000}>
                <div className="query_conditions_title">
                    添加过滤条件来限定关联数据范围
                </div>
                <div className="query_condition_list">
                    {
                        list?.map((item, index) => {
                            let oInfo = ''
                            if (item['fieldId'] != null) {
                                oInfo = item['fieldId'] + '-' + item['fieldTypeId']
                            }
                            return (
                                <div className="query_condition_list_one" key={index}>
                                    <Select value={oInfo} style={{ width: '200px', marginRight: '10px' }} placeholder='关联表字段' onChange={(e) => {
                                        let arr = [...list]
                                        let one = arr[index]
                                        let info = e.split('-')
                                        one['fieldId'] = info[0]
                                        one['fieldTypeId'] = info[1];
                                        arr.splice(index, 1, one)
                                        console.log(arr);
                                        setList(arr)
                                    }}>
                                        {
                                            FormStore.formStru.filter(one => one['formId'] == value?.formId)[0]?.['fieldSimpleVos'].map((field, fI) => {
                                                if ([0, 1, 2, 3].indexOf(field['typeId']) > -1) {
                                                    return (
                                                        <Select.Option value={`${field['fieldId']}-${field['typeId']}`} key={fI}>{field['fieldName']}</Select.Option>
                                                    )
                                                }
                                            })
                                        }
                                    </Select>
                                    <Select onChange={(e) => {
                                        let arr = [...list]
                                        let obj = arr[index]
                                        obj['operator'] = e
                                        arr.splice(index, 1, obj)
                                        setList(arr)
                                    }} style={{ width: '150px', marginRight: '10px' }} value={item['operator']}>
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
                                    <Select disabled={['0', '1', '2', '4', '6'].indexOf(item['fieldTypeId']) > -1 ? false : true} value={item['custom']} style={{ width: '150px', marginRight: '10px' }} onChange={(e) => {
                                        let arr = [...list]
                                        let obj = arr[index]
                                        obj['custom'] = e
                                        arr.splice(index, 1, obj)
                                        setList(arr)
                                    }}>
                                        <Select.Option value={false}>当前表单字段</Select.Option>
                                        <Select.Option value={true}>自定义值</Select.Option>
                                    </Select>
                                    {
                                        item['custom'] == false && (
                                            <Select value={maps[item['operand']] } placeholder='当前表单字段' style={{ width: '200px', marginRight: "10px" }} onChange={(e) => {
                                                let arr = [...list]
                                                let obj = arr[index]
                                                console.log(e)
                                                obj['operand'] = e
                                                arr.splice(index, 1, obj)
                                                console.log('arr',arr)
                                                setList(arr)
                                            }}>
                                                {Object.keys(fieldObj).map((info,iI) => {
                                                    console.log('info',info,'iI',iI)
                                                    console.log(fieldObj)
                                                    let obj=fieldObj[info]
                                                    console.log(obj)
                                                    if (info != props.addons.formData.fieldId) {
                                                        if ((item['fieldTypeId'] == '0' || item['fieldTypeId'] == '1' || item['fieldTypeId'] == '4' || item['fieldTypeId'] == '6') &&
                                                            (obj['typeId'] == '0' ||
                                                                obj['typeId'] == '1' ||
                                                                obj['typeId'] == '4' ||
                                                                obj['typeId'] == '6')) {
                                                            return (
                                                                <Select.Option key={iI} value={obj['fieldId']}>{obj['name']}</Select.Option>
                                                            )
                                                        } else if ((item['fieldTypeId'] == '5' || item['fieldTypeId'] == '7') &&
                                                            (obj['fieldTypeId'] == '5' || obj['fieldTypeId'] == '7')) {
                                                            return (
                                                                <Select.Option key={iI} value={obj['fieldId']}>{obj['name']}</Select.Option>
                                                            )
                                                        } else if (item['fieldTypeId'] == obj['fieldTypeId']) {
                                                            return (
                                                                <Select.Option key={iI} value={obj['fieldId']}>{obj['name']}</Select.Option>
                                                            )
                                                        }
                                                    }

                                                })}
                                            </Select>
                                        )
                                    }
                                    {
                                        item['custom'] == true && <Input onChange={(e) => {
                                            let arr = [...list]
                                            let obj = arr[index]
                                            obj['operand'] = e.target.value
                                            arr.splice(index, 1, obj)
                                            setList(arr)
                                        }} placeholder="自定义值" style={{ width: '200px', marginRight: "10px" }} />
                                    }
                                    <DeleteOutlined onClick={() => {
                                        let arr = [...list]
                                        arr.splice(index, 1)
                                        setList(arr)
                                    }} />
                                </div>
                            )
                        })
                    }
                    <div className="query_add_btn" onClick={() => {
                        let arr = [...list]
                        arr.push({ 'fieldId': null, 'operator': "=", 'fieldTypeId': null, 'operand': null, 'custom': false })
                        setList(arr)
                    }}>+ 添加过滤条件</div>
                </div>
                <div className="link_btn">
                    <Button
                        style={{ marginRight: '20px' }}
                        onClick={() => {
                            setVis(false)
                            setList(value.conditions)
                        }}
                    >取消</Button>
                    <Button type='primary' onClick={() => {
                        let flag = true;
                        if (!checkCondition(list)) flag = false
                        if (!flag) {
                            message.info('请完善信息!')
                        } else {
                            let obj = { ...value }
                            obj['conditions'] = list
                            onChange(obj)
                            setVis(false)
                        }
                        console.log(list);
                    }}>确定</Button>
                </div>
            </Modal>
        </div>
    )
})

export default inject((stores) => ({ TableStore: stores.TableStore, FormStore: stores.FormStore, HomeStore: stores.HomeStore }))(Linkquery_condition)
