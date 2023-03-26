import {inject, observer} from "mobx-react";
import {Button, Input, message, Modal, Select} from "antd";
import {toJS} from "mobx";
import {checkCondition, newExChange} from "../changeTool";
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {DeleteOutlined} from "@ant-design/icons";

const Select_option=[{
        'value':'string',
        'label':'文本'
        }
    ]


const table_addEditColumn = observer((props) => {
    const { TableStore, FormStore, HomeStore ,onChange,value} = props
    const [vis, setVis] = React.useState(false)
    const [list, setList] = useState([])


    useEffect(()=>{
        let arr=value?.conditions||[]
        setList(arr)
    },[])
    const Select_change=(index)=>{
        return (e)=>{
            let arr=[...list]
            arr[index].type=e
            setList(arr)
            console.log(arr)
        }
    }
    const Input_change=(index)=>{
        return (e)=>{
            let arr=[...list]
            arr[index].title=e.target.value
            setList(arr)
            console.log(arr)
        }
    }

    const submit=()=>{
        let flag=true
        for(const i in list){
            if(list[i].title===''){
                flag=false
                break
            }
        }
        if(!flag){
            message.info('标题不能为空')
            return
        }
        let obj = { ...value }
        obj['conditions'] = list
        onChange(obj)
        setVis(false)
    }
    return (
        <>
            <div className="query_condition">
                <div className="query_title">可编辑表格</div>
                <Button onClick={() => {
                    // if (value?.formId == null) {
                    //     message.info('请先选择联动表单')
                    // } else {
                    //     console.log('formSchema',toJS(FormStore.formEditSchema['properties']) )
                    //     let params = newExChange(FormStore.formEditSchema, FormStore.selectFormId, toJS(FormStore.schemaList))
                    //     console.log('params',params)
                    //
                    //     let arr = []
                    //     let maps={}
                    //     params.subForms.map(item => arr.push(...item.fields))
                    //     console.log('arr',arr)
                    //     for (const item of arr) {
                    //         maps[item.fieldId]=item.name
                    //     }
                    //     setMaps(maps)
                    //     setFieldObj(arr)
                    //     setVis(true)
                    // }
                    setVis(true)
                }} style={{ width: '100%' }}>设置可编辑表格</Button>
            </div>
            <Modal title={'设置可编辑表格'} open={vis} onCancel={()=>{setVis(false)}} footer={null} width={1000} destroyOnClose>
                <div className="query_conditions_title">
                    添加可编辑表格来展示表单数据
                </div>
                <div className="query_condition_list">
                    {
                        list.map((item, index) => {
                                return (
                                    <div className="Select_columns_item" key={item.columnId}>
                                        <div className="Select_columns_item_title">
                                            标题:
                                        </div>
                                        <div className={"Select_columns_item_title_content"}>
                                            <Input onBlur={Input_change(index)} style={{width: 250}}  defaultValue={item.title}></Input>
                                        </div>
                                        <div className={"Select_columns_item_type"}>
                                            类型:
                                        </div>
                                        <div className={"Select_columns_item_title_content"}>
                                            <Select options={Select_option} style={{width: 250}} onChange={Select_change(index)} defaultValue={'string'}></Select>
                                        </div>
                                        <div>
                                            <DeleteOutlined onClick={() => {
                                                let arr = [...list]
                                                arr.splice(index, 1)
                                                setList(arr)
                                            }} />
                                        </div>
                                    </div>
                                )
                        })
                    }

                    <div className="query_add_btn" onClick={() => {
                        let arr = [...list]
                        setList([...arr, { columnId: nanoid(), title: '' , type: 'string'}])
                    }}>+ 添加展示数据</div>
                </div>
                <div className="link_btn">
                    <Button
                        style={{ marginRight: '20px' }}
                        onClick={() => {
                            setVis(false)
                        }}
                    >取消</Button>
                    <Button type='primary' onClick={submit}>确定</Button>
                </div>
            </Modal>
        </>


    )

})
export default inject((stores) => ({ TableStore: stores.TableStore, FormStore: stores.FormStore, HomeStore: stores.HomeStore }))(table_addEditColumn)
