import { ApartmentOutlined, CopyOutlined, FormOutlined, NodeExpandOutlined, PlayCircleOutlined, PoweroffOutlined } from "@ant-design/icons"
import { createGraphConfig, FlowchartCanvas, XFlow, XFlowCanvas, XFlowGraphCommands } from "@antv/xflow"
import { Button, Drawer, Input, message, Tabs } from "antd"
import FormRender, { useForm } from "form-render"
import { getLinkCondition, restore, restore2 } from "layouts/FormEdit/changeTool"
import { Self_divider } from "layouts/FormEdit/self_item/self_divider"
import { getCheckArr } from "layouts/FormLayout/formUtil"
import { toJS } from "mobx"
import { inject, observer } from "mobx-react"
import moment from "moment"
import React, { useEffect, useRef, useState } from "react"
import './index.less'
import '@antv/xflow/dist/index.css'
import self_select from "layouts/FormEdit/self_item/self_select"
import self_radio from "layouts/FormEdit/self_item/self_radio"
import self_number from "layouts/FormEdit/self_item/self_number"
import self_textarea from "layouts/FormEdit/self_item/self_textarea"
import my_string from "layouts/FormEdit/self_item/my_string"
import self_datapick from "layouts/FormEdit/self_item/self_datapick"
import self_linkquery from "layouts/FormEdit/self_item/self_linkquery"
import { Self_address } from "layouts/FormEdit/self_item/self_address"
import self_department_user from "layouts/FormEdit/self_item/self_department_user"
import self_editable_table from "layouts/FormEdit/self_item/self_editable_table";
import {useHistory} from "react-router-dom";
const DetailPage = observer(({ MessageStore, HomeStore, SocketStore, FlowStore, FormStore, props }) => {
    const [schema, setSchema] = useState({
        "type": "object",
        "properties": {},
        "labelWidth": 120,
        "displayType": "row"
    });
    const dataRef = useRef()
    const { fieldInfo, formInfo, info, model, nameObj, oneDataInfo } = MessageStore
    const { picture } = FlowStore
    const { formData, flag } = FormStore
    const [type, setType] = useState(1)
    const [data, setData] = useState({});
    const [draVis, setDraVis] = useState(false)
    const form = useForm();
    const formList = useForm()
    const ref = useRef();
    const history=useHistory()
    useEffect(() => {
        dataRef.current = data;

    }, [data])
    useEffect(() => {
        console.log(toJS(formData));
        setData(formData)
        form.setValues(formData)
        formList.setValues(formData)
    }, [flag])
    useEffect(() => {
        setSchema(restore2({ 'form': toJS(formInfo), 'formFields': toJS(fieldInfo) }));
        FlowStore.getShowFlow({ 'formId': info['formId'] })
        SocketStore.getAllUsers()
        setData(formData)
        formList.setValues(formData);
        form.setValues(formData);
    }, [])
    const useGraphConfig = createGraphConfig(graphConfig => {
        graphConfig.setX6Config({
            connecting: {
                allowBlank: false,
                allowEdge: false,
                allowLoop: false,
                allowMulti: false,
                allowNode: false,
                allowPort: false,

            },
            grid: false,
            scroller: {
                enabled: false
            },
            mousewheel: {
                enabled: false
            },
            panning: {
                enabled: false
            },
            interacting: {
                nodeMovable: false,
                edgeLabelMovable: false
            }
        })
        graphConfig.setDefaultNodeRender(props => {
            if (props.data.typeId == '1') {
                return <div className={`react-node`}><FormOutlined style={{ marginRight: '10px' }} /> {props.data.label} </div>;
            } else if (props.data.typeId == '2') {
                return <div className="react-node"><CopyOutlined style={{ marginRight: '10px' }} /> {props.data.label} </div>;
            } else if (props.data.typeId == '3') {
                return <div className="react-node"><NodeExpandOutlined style={{ marginRight: '10px' }} /> {props.data.label} </div>;
            } else if (props.data.typeId == '-2') {
                return <div className="react-node"><PoweroffOutlined style={{ marginRight: '10px' }} /> {props.data.label} </div>;
            } else if (props.data.typeId == '-1') {
                return <div className="react-node"><PlayCircleOutlined style={{ marginRight: '10px' }} /> {props.data.label} </div>;
            }
        });
    })
    const onFinish =   (formData) =>  {
        setData({})
        let checkArr = getCheckArr(schema);
        if (checkArr.length > 0) {
             FormStore.changeDataCheck({ 'formId': info['formId'], 'data': { ...formData, ...formList.getValues(), ...data }, 'checkFieldIds': checkArr, 'dataId': info['dataId'] }, (flag) => {
                if (flag) {
                    FlowStore.agreeFlow({ 'workLogId': info['id'] }, { 'message': ref.current?.input?.value||'', 'attachment': "" }).then(()=>{
                        console.log('111')
                        history.push('/common')
                    })

                }
            })
        } else {
             FormStore.changeData({ 'formId': info['formId'], 'data': { ...formData, ...formList.getValues(), ...data }, 'dataId': info['dataId'] }).then(() => {
                FlowStore.agreeFlow({ 'workLogId': info['id'] }, { 'message': ref.current?.input?.value||'', 'attachment': "" })
            }).then(()=>{
                console.log('111')
                 history.push('/common')
             })
        }
        MessageStore.setValue('detailVis', false);
        form.resetFields();
        formList.resetFields();
    }
    const handleMount = () => {
        form.setValues(data)
        formList.setValues(data)
    }
    const watch = {
        '#': val => {
            let data = { ...data, ...val }
            setData(data)
            FormStore.setValue('formData', data)
        }
    }
    const getItem = () => {
        let nArr = []
        for (const key in schema) {
            if (Object.hasOwnProperty.call(schema, key)) {
                const element = schema[key];
                if (key !== 'root') {
                    let iObj = {}
                    iObj['name'] = key
                    iObj['schema'] = element
                    nArr.push(iObj);
                }
            }
        }


        return (
            nArr.map((item, index) => {
                console.log('item',item,index)
                if (JSON.stringify(item['schema']['properties']) !== '{}') {

                    return (
                        <Tabs.items tab={item['name']} key={index}>
                            <FormRender
                                schema={item['schema']}
                                mapping={{ string: 'My_string' }}
                                widgets={{
                                    self_divider: Self_divider,
                                    self_select: self_select,
                                    My_string: my_string,
                                    self_textarea: self_textarea,
                                    self_number: self_number,
                                    self_radio: self_radio,
                                    self_datapick: self_datapick,
                                    self_linkquery: self_linkquery,
                                    self_address: Self_address,
                                    self_department_user: self_department_user,
                                    self_editable_table: self_editable_table,
                                }}
                                form={formList}
                                style={{ overflowY: 'auto' }}
                                watch={watch}
                                onMount={handleMount} />
                        </Tabs.items>
                    )
                }
            })
        )
    }
    const getExactItem = (itemName) => {
        let arr = formInfo.filter((item) => item['name'] == itemName)[0];
        return arr['fieldsId'].map((item, index) => {
            let field = fieldInfo.filter((one) => one.hasOwnProperty('fieldId') && one['fieldId'] == item)[0]
            if (field != undefined) {
                let showData = formData[item]
                if (field['typeId'] == '4') {
                    let index = field['enum'].indexOf(formData[item])
                    showData = field['enumNames'][index]
                    return (
                        <div className='item_content' key={index}>
                            <div className='item_title'>
                                {nameObj[item]}
                            </div>
                            <div className='item_article'>
                                {showData}
                            </div>
                        </div>
                    )
                } else if (field['typeId'] == '5') {
                    showData = ""
                    let iData = formData[item].substring(1, formData[item].length).split(",");
                    iData.map((one, index) => {
                        let oneIndex = field['enum'].findIndex(value => value.charCodeAt() == one.substring(1, one.length - 1).charCodeAt());
                        if (index == 0) {
                            showData += field['enumNames'][oneIndex]
                        } else {
                            showData += ","
                            showData += field['enumNames'][oneIndex]
                        }
                    })
                    return (
                        <div className='item_content' key={index}>
                            <div className='item_title'>
                                {nameObj[item]}
                            </div>
                            <div className='item_article'>
                                {showData}
                            </div>
                        </div>
                    )
                } else if (field['typeId'] == '14') {
                    return (
                        <div className='item_content' key={index}>
                            <div className='item_title'>
                                {nameObj[item]}
                            </div>
                            {
                                field['linkquery_condition']['fieldIds']?.map((one, index) => {
                                    let id = []
                                    if (formData[field['fieldId']]) {
                                        id = JSON.parse(formData[field['fieldId']])
                                    }
                                    return (
                                        <div key={index}>
                                            <div style={{ marginBottom: '5px', color: 'black' }}>{nameObj[one]}</div>
                                            {
                                                id.length > 0 && oneDataInfo.hasOwnProperty(id[0]) && oneDataInfo[id[0]].hasOwnProperty(one) && (
                                                    <div>{oneDataInfo[id[0]][one]}</div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                } else if (field['typeId'] == '15') {
                    return (
                        <div className='item_content' key={index}>
                            <div className='item_title'>
                                {nameObj[item]}
                            </div>
                            {
                                field['linkquery_condition']['fieldShow']?.map((one, index) => {
                                    let id = []
                                    if (formData[field['fieldId']]) {
                                        id = JSON.parse(formData[field['fieldId']])
                                    }
                                    return (
                                        <div key={index}>
                                            <div style={{ marginBottom: '5px', color: 'black' }}>{nameObj[one]}</div>
                                            {
                                                id.length > 0 && oneDataInfo.hasOwnProperty(id[0]) && oneDataInfo[id[0]].hasOwnProperty(one) && (
                                                    <div>{oneDataInfo[id[0]][one]}</div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
                else if (field['typeId'] == '20') {
                    let arr=[]
                    try {
                        arr = JSON.parse(showData)
                    }catch (e){}
                    console.log('arr', arr)
                    console.log(toJS(SocketStore.userName))
                    return (
                        <div className='item_content' key={index}>
                            <div className='item_title'>
                                {nameObj[item]}
                            </div>
                            <div className='item_article'>
                                {
                                    Array.isArray(arr) && arr.map((one, index) => {
                                        console.log(one,index)
                                        return (
                                            <span style={{ marginRight: '5px' }} key={index}>{SocketStore.userName[one]}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className='item_content' key={index}>
                            <div className='item_title'>
                                {nameObj[item]}
                            </div>
                            <div className='item_article'>
                                {showData}
                            </div>
                        </div>
                    )
                }

            }

        })
    }
    const handleCancel = () => {
        MessageStore.setValue('detailVis', false);
    }
    const getData = () => {
        return formInfo.map((item, index) => {
            if (item['name'] !== 'root') {
                return (
                    <Tabs.item tab={item['name']} key={index}>
                        {getExactItem(item['name'])}
                    </Tabs.item>
                )
            }

        })
    }
    const onLoad = async app => {
        FlowStore.getShowFlow({ 'formId': info['formId'] }).then(async () => {
            const graphData = picture
            // render
            console.log(graphData);
            await app.executeCommand(XFlowGraphCommands.GRAPH_RENDER.id, {
                graphData: graphData,
            })
            // 居中
            await app.executeCommand(XFlowGraphCommands.GRAPH_ZOOM.id, {
                factor: 'real',
            })
        })

    }
    return (
        <div className="message_model_container">
            <div className="message_model_left">
                {
                    model == 'wait' && (
                        <div style={{ height: '100%' }}>
                            <div className='form_main'>
                                <FormRender
                                    schema={schema['root']}
                                    form={form}
                                    onFinish={onFinish}
                                    style={{ overflowY: 'auto' }}
                                    mapping={{ string: 'My_string' }}
                                    widgets={{
                                        self_divider: Self_divider,
                                        self_select: self_select,
                                        My_string: my_string,
                                        self_textarea: self_textarea,
                                        self_number: self_number,
                                        self_radio: self_radio,
                                        self_datapick: self_datapick,
                                        self_linkquery: self_linkquery,
                                        self_address: Self_address,
                                        self_department_user: self_department_user,
                                        self_editable_table: self_editable_table,
                                    }}
                                    watch={watch}
                                />

                                <Tabs destroyInactiveTabPane={true} tabBarGutter={20} type='card'>
                                    {
                                        getItem()
                                    }
                                </Tabs>
                            </div>
                            <div className='form_footer_detail'>
                                <div style={{ fontWeight: '700' }}>审批意见</div>
                                <Input ref={ref} style={{ marginTop: "10px", resize: 'none', marginBottom: '10px' }} />
                                <div>
                                    <Button onClick={form.submit} type="primary">提交</Button>
                                    <Button onClick={handleCancel} style={{ marginLeft: '20px' }}>取消</Button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    model != 'wait' && (
                        <div className="message_model_left">
                            {
                                getExactItem('root')
                            }
                            <Tabs type='card' style={{ paddingLeft: '5px' }}>
                                {getData()}
                            </Tabs>
                        </div>
                    )
                }
            </div>
            <div className="message_model_right">
                <div className="mmr_header">
                    <div className={`mmr_h1 ${type == 1 ? "mmr_check" : ""}`} onClick={() => setType(1)}>流程动态</div>
                    <div className={`mmr_h2 ${type == 2 ? "mmr_check" : ""}`} onClick={() => setType(2)}>评论</div>
                    <div className="mmr_flow" onClick={() => {
                        // setDraVis(true)
                    }}><ApartmentOutlined />流转图</div>
                </div>
                {
                    type == 1 && (
                        <div className="mmr_logList">
                            {
                                JSON.parse(info['flowLog']['log']).map((item, index) => {
                                    return (
                                        <div className="mmr_oneLog" key={index}>
                                            <div className="mmr_one_title">
                                                <div className="mmr_one_title1">{item['nodeName']}</div>
                                                <div className="mmr_one_title2">{info['flowLog']['updateTime']}</div>
                                            </div>
                                            <div className="mmr_one_content">
                                                <div className="mmr_one_content1">{item['userName']}</div>
                                                <div className="mmr_one_content2">开始处理: {moment(item['startTime']).format('lll')}</div>
                                                <div className="mmr_one_content3">结束时间: {moment(item['endTime']).format('lll')}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
            <Drawer width={800} visible={draVis} onClose={() => setDraVis(false)}>
                <XFlow graphData={picture} className="xflow-workspace">
                    <XFlowCanvas graphData={picture} config={useGraphConfig(props)} position={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                    </XFlowCanvas>
                </XFlow>
            </Drawer>
        </div>
    )
})


export default inject((stores) => ({ MessageStore: stores.MessageStore, HomeStore: stores.HomeStore, FlowStore: stores.FlowStore, FormStore: stores.FormStore,SocketStore:stores.SocketStore }))(DetailPage)
