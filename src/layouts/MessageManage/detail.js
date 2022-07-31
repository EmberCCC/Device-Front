/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-30 05:48:44
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-01 07:22:20
 * @FilePath: \bl-device-manage-test\src\layouts\MessageManage\detail.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApartmentOutlined, CopyOutlined, FormOutlined, NodeExpandOutlined, PlayCircleOutlined, PoweroffOutlined } from "@ant-design/icons"
import { createGraphConfig, FlowchartCanvas, XFlow, XFlowCanvas, XFlowGraphCommands } from "@antv/xflow"
import { Button, Drawer, Input, Tabs } from "antd"
import FormRender, { useForm } from "form-render"
import { restore, restore2 } from "layouts/FormEdit/changeTool"
import { Self_divider } from "layouts/FormEdit/self_item/self_divider"
import { getCheckArr } from "layouts/FormLayout/formUtil"
import { toJS } from "mobx"
import { inject, observer } from "mobx-react"
import moment from "moment"
import React, { useEffect, useRef, useState } from "react"
import './index.less'
import '@antv/xflow/dist/index.css'
const DetailPage = observer(({ MessageStore, HomeStore, FlowStore, FormStore, props }) => {
    const [schema, setSchema] = useState({
        "type": "object",
        "properties": {},
        "labelWidth": 120,
        "displayType": "row"
    });
    const { fieldInfo, formData, formInfo, info, model, nameObj } = MessageStore
    const { picture } = FlowStore
    const [type, setType] = useState(1)
    const [data, setData] = useState({});
    const [draVis, setDraVis] = useState(false)
    const form = useForm();
    const formList = useForm()
    const ref = useRef();
    useEffect(() => {
        setSchema(restore2({ 'form': toJS(formInfo), 'formFields': toJS(fieldInfo) }));
        console.log(toJS(info));
        FlowStore.getShowFlow({ 'formId': info['formId'] })
        formList.setValues(formData);
        form.setValues(formData);
    }, [])
    const useGraphConfig = createGraphConfig(graphConfig => {
        graphConfig.setX6Config({
            connecting:{
                allowBlank:false,
                allowEdge:false,
                allowLoop:false,
                allowMulti:false,
                allowNode:false,
                allowPort:false,
                
            },
            grid:false,
            scroller:{
                enabled:false
            },
            mousewheel:{
                enabled:false
            },
            panning:{
                enabled:false
            },
            interacting:{
                nodeMovable:false,
                edgeLabelMovable:false
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
    const onFinish = (formData) => {
        setData({})
        const { firstFormId } = HomeStore;
        let checkArr = getCheckArr(schema);
        if (checkArr.length > 0) {
            FormStore.changeDataCheck({ 'formId': info['formId'], 'data': { ...formData, ...formList.getValues(), ...data }, 'checkFieldIds': checkArr, 'dataId': info['dataId'] }).then(() => {
                FlowStore.agreeFlow({ 'workLogId': info['id'] }, { 'message': ref.current.input.value, 'attachment': "" })
            })
        } else {
            FormStore.changeData({ 'formId': info['formId'], 'data': { ...formData, ...formList.getValues(), ...data }, 'dataId': info['dataId'] }).then(() => {
                FlowStore.agreeFlow({ 'workLogId': info['id'] }, { 'message': ref.current.input.value, 'attachment': "" })
            })
        }
        MessageStore.setValue('detailVis', false);
        MessageStore.getWaitList();
        form.resetFields();
        formList.resetFields();
    }
    const handleChange = (activeKey) => {
        let tdata = formList.getValues()
        let nData = { ...data, ...tdata }
        setData(nData);
        let iObj = {}
        for (const key in nData) {
            if (Object.hasOwnProperty.call(nData, key)) {
                const element = nData[key];
                iObj[key] = element
            }
        }
        formList.resetFields()
        formList.setValues(nData)


    }
    const getItem = () => {
        let nArr = []
        for (const key in schema) {
            if (Object.hasOwnProperty.call(schema, key)) {
                const element = schema[key];
                if (key != 'root') {
                    let iObj = {}
                    iObj['name'] = key
                    iObj['schema'] = element
                    nArr.push(iObj);
                }
            }
        }
        return (
            nArr.map((item, index) => {
                return (
                    <Tabs.TabPane tab={item['name']} key={index}>
                        <FormRender schema={item['schema']} widgets={{ self_divider: Self_divider }}
                            form={formList} style={{ overflowY: 'auto' }} />
                    </Tabs.TabPane>
                )
            })
        )
    }
    const getExactItem = (itemName) => {
        let arr = formInfo.filter((item) => item['name'] == itemName)[0];
        return arr['fieldsId'].map((item, index) => {
            let field = fieldInfo.filter((one) => one.hasOwnProperty('fieldId') && one['fieldId'] == item)[0]
            if (field != undefined) {
                console.log(field);
                let showData = formData[item]
                if (field['typeId'] == '4' || field['typeId'] == '6') {
                    let index = field['enum'].indexOf(formData[item])
                    showData = field['enumNames'][index]
                } else if (field['typeId'] == '5' || field['typeId'] == '7') {
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
                }
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

        })
    }
    const handleCancel = () => {
        MessageStore.setValue('detailVis', false);
    }
    const getData = () => {
        return formInfo.map((item, index) => {
            if (item['name'] != 'root') {
                return (
                    <Tabs.TabPane tab={item['name']} key={index}>
                        {getExactItem(item['name'])}
                    </Tabs.TabPane>
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
                                <FormRender schema={schema['root']} form={form} onFinish={onFinish} style={{ overflowY: 'auto' }} widgets={{ self_divider: Self_divider }} />
                                <div style={{ fontSize: "10", fontWeight: '200' }}>（双击恢复之前数据）</div>
                                <Tabs destroyInactiveTabPane={true} onTabClick={handleChange} tabBarGutter={20} type='card'>
                                    {
                                        getItem()
                                    }
                                </Tabs>
                            </div>
                            <div className='form_footer'>
                                <div style={{ fontWeight: '700' }}>审批意见</div>
                                <Input ref={ref} style={{ marginTop: "20px", resize: 'none', marginBottom: '50px' }} />
                                <Button onClick={form.submit} type="primary">提交</Button>
                                <Button onClick={handleCancel} style={{ marginLeft: '20px' }}>取消</Button>
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
                    <div className="mmr_flow" onClick={() => setDraVis(true)}><ApartmentOutlined />流转图</div>
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


export default inject((stores) => ({ MessageStore: stores.MessageStore, HomeStore: stores.HomeStore, FlowStore: stores.FlowStore, FormStore: stores.FormStore }))(DetailPage)