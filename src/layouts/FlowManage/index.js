import {
    BulbOutlined,
    CopyOutlined,
    FormOutlined,
    NodeExpandOutlined,
    PlayCircleOutlined,
    PoweroffOutlined
} from "@ant-design/icons";
import {
    CanvasToolbar,
    XFlow,
    XFlowNodeCommands,
    CanvasScaleToolbar,
    CanvasSnapline,
    JsonSchemaForm,
    NsJsonSchemaForm,
    CanvasNodePortTooltip,
    FlowchartCanvas,
    FlowchartExtension,
    XFlowGraphCommands,
    randomInt,
    XFlowEdgeCommands,
    XFlowCanvas,
    createGraphConfig,
    CanvasContextMenu
} from "@antv/xflow";
import {DataUri} from '@antv/x6'
import {inject, observer} from "mobx-react";
import AuthShape from './Self_Form/field_auth';
import React, {useEffect, useReducer, useState} from "react";
import './index.less'
import '@antv/xflow/dist/index.css'
import {useToolbarConfig} from "./tool_bar";
import {set} from "lodash";
import Node_name from "./Self_Form/node_name";
import Node_copy from "./Self_Form/node_copy";
import Node_charge from "./Self_Form/node_charge";
import Flow_Config from "./flowConfig";
import {changeFlow} from "./changeTool";
import {Button, message, Popover, Spin} from "antd";
import {toJS} from "mobx";
import {customAlphabet} from "nanoid";
import {checkFlow} from "./checkTool";
import {Select, Space} from 'antd';
import {useMenuConfig} from "./Config/Menu_config";
export const useGraphConfig = createGraphConfig(graphConfig => {
    graphConfig.setX6Config(
        {
            grid: false,
            mousewheel: {
                enabled: true,
                minScale: 0.5,
                maxScale: 3,
            },
            history: true,
            // 节点是否可旋转
            // 节点是否可调整大小
            selecting: {
                enabled: true,
                multiple: false,
                selectCellOnMoved: true,
                showNodeSelectionBox: true,
                movable: false,
                boolean: true,
                edgeMovable: false,
                vertexAddable: false,

            },
            connecting: {
                router: {
                    name: 'manhattan',
                    args: {
                        padding: 0,
                    },
                },
                connector: {
                    name: 'rounded',
                    args: {
                        radius: 2,
                    },
                },
                anchor: 'center',
                connectionPoint: 'anchor',
                allowBlank: false,
                allowMulti: false,
                allowEdge: false,
                allowLoop: false,
                allowNode: false,
                snap: {
                    radius: 20,
                },
                validateConnection({sourceView, targetView, sourceMagnet, targetMagnet}) {
                    let sourceId = sourceView.cell.data.typeId
                    let targetId = targetView.cell.data.typeId
                    if (targetId == '-1') return false
                    if (sourceId == '2' || sourceId == '-2') return false
                    return !!targetMagnet
                },
            },
        }
    )
    graphConfig.setDefaultNodeRender(props => {
        if (props.data.typeId == '1') {
            return <div className="react-node"><FormOutlined style={{marginRight: '10px'}}/> {props.data.label} </div>;
        } else if (props.data.typeId == '2') {
            return <div className="react-node"><CopyOutlined style={{marginRight: '10px'}}/> {props.data.label} </div>;
        } else if (props.data.typeId == '3') {
            return <div className="react-node"><NodeExpandOutlined style={{marginRight: '10px'}}/> {props.data.label}
            </div>;
        } else if (props.data.typeId == '-2') {
            return <div className="react-node"><PoweroffOutlined style={{marginRight: '10px'}}/> {props.data.label}
            </div>;
        } else if (props.data.typeId == '-1') {
            return <div className="react-node"><PlayCircleOutlined style={{marginRight: '10px'}}/> {props.data.label}
            </div>;
        }
    });
})


const FlowManage = observer(({FlowStore, HomeStore, TableStore, SocketStore, props}) => {
    const {flowProperty, canOb, allFlowList, flowversion, ableversion} = FlowStore
    const {firstFormId} = HomeStore
    const [load, setIsload] = useState(false)
    const [app, setApp] = useState(null)
    const [graph, setGraph] = useState(null)
    const [toolbarConfig, setBoolbarConfig] = useState(useToolbarConfig(props))
    const [isAdmin,setAdmin]=useState(true)
    var NsJsonForm;
    (function (NsJsonForm) {
        /** ControlShape的Enum */
        const {ControlShape} = NsJsonSchemaForm;
        /** 保存form的values */
        NsJsonForm.formValueUpdateService = async (args) => {
            const {values, commandService, targetData} = args;
            console.log(args)
            const updateNode = (node) => {
                return commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {nodeConfig: node});
            };
            console.log('formValueUpdateService  values:', values, args);
            const nodeConfig = Object.assign({}, targetData);
            values.forEach(val => {
                set(nodeConfig, val.name, val.value);
            });
            updateNode(nodeConfig);
        };

        NsJsonForm.getCustomRenderComponent = (
            targetType,
            targetData
        ) => {
            if (targetData != null && !targetData.hasOwnProperty('auth_info')) {
                targetData['auth_info'] = {}
            }
            if (targetData != null && !targetData.hasOwnProperty('charge_person')) {
                let person = {
                    'department': [],
                    'role': [],
                    'user': []
                }
                targetData['charge_person'] = person
            }
            if (targetData != null && !targetData.hasOwnProperty('wx')) {
                targetData['wx'] = false
            }
            if (targetData != null && !targetData.hasOwnProperty('email')) {
                targetData['email'] = false
            }
            if (targetType === 'node') {
                if (targetData.typeId == '1') {
                    return () => (
                        <div>
                            <div className="form_self">
                                <div className="formItem_title">
                                    <div className="formItem_name">节点名称</div>
                                    <Node_name initData={targetData} name={targetData.label}/>
                                </div>
                                <div className="formItem_chargePerson">
                                    <div className="formItem_name">负责人</div>
                                    <Node_charge typeName={'node'} initData={targetData}
                                                 charge_person={targetData.charge_person}/>
                                </div>
                                <div className="formItem_copy">
                                    <Node_copy initData={targetData} checked={targetData.copy}/>
                                    <div className="formItem_name">启用抄送</div>
                                </div>
                                <div className="formItem_auth">
                                    <div className="formItem_name">字段权限</div>
                                    <AuthShape data={targetData.auth_info} initData={targetData} typeId={1}/>
                                </div>
                            </div>
                        </div>
                    )
                } else if (targetData.typeId == '2') {
                    return () => (
                        <div className="form_self">
                            <div className="formItem_title">
                                <div className="formItem_name">节点名称</div>
                                <Node_name initData={targetData} name={targetData.label}/>
                            </div>
                            <div className="formItem_chargePerson">
                                <div className="formItem_name">抄送人</div>
                                <Node_charge typeName={'node'} initData={targetData}
                                             charge_person={targetData.charge_person}/>
                            </div>
                            <div className="formItem_copy">
                                <div className="formItem_name copyself">打印</div>
                                <Node_copy initData={targetData} checked={targetData.copy}/>
                            </div>
                            <div className="formItem_auth">
                                <div className="formItem_name">字段权限</div>
                                <AuthShape data={targetData.auth_info} initData={targetData} typeId={2}/>
                            </div>
                        </div>
                    )
                } else if (targetData.typeId == '3') {
                    return () => (
                        <div className="form_self">
                            <div className="formItem_title">
                                <div className="formItem_name">节点名称</div>
                                <Node_name initData={targetData} name={targetData.label}/>
                            </div>
                            <div className="formItem_chargePerson">
                                <div className="formItem_name">子流程发起人</div>
                                <Node_charge typeNam={'node'} initData={targetData}
                                             charge_person={targetData.charge_person}/>
                            </div>
                            <div className="formItem_auth">
                                <div className="formItem_name">数据传递</div>
                                {/* <AuthShape data={targetData.auth_info} initData={targetData} typeId={2} /> */}
                            </div>
                        </div>
                    )
                } else if (targetData.typeId == '-1') {
                    return () => (
                        <div className="form_self">
                            <div className="formItem_title">
                                <div className="formItem_name">节点名称</div>
                                <Node_name initData={targetData} name={targetData.label}/>
                            </div>
                            <div className="formItem_auth">
                                <div className="formItem_name">字段权限</div>
                                <AuthShape data={targetData.auth_info} initData={targetData} typeId={-1}/>
                            </div>
                        </div>
                    )
                } else if (targetData.typeId == '-2') {
                    return () => (
                        <div className="end_node">
                            <div
                                className="end_sketch">没有下级节点的节点会自动连接至流程结束；如果您需要在中途结束流程，请将需要结束流程的节点，连接到流程结束，并设置相应的流转条件。
                            </div>
                        </div>
                    )
                } else {

                }

            }
            if (targetType === 'canvas') {
                return () => (
                    <div className="form_self">
                        <Flow_Config/>
                    </div>
                )
            }
            if (targetType === 'edge' &&isAdmin===true) {
                return () => (
                    <div className={"form_edge"}>
                        <div className={"form_edge_title"}>
                            数据流转条件
                        </div>
                        <Select defaultValue={'self'} className={"form_edge_selection"} options={[
                            {
                                value: 'self',
                                label: '使用自定义流转条件'
                            },
                            {
                                value: 'else',
                                label: '使用Else条件'
                            }
                        ]}></Select>
                        <div className={"form_edge_tips"}>
                            {true ? '添加后，满足流转条件的数据，才会进入这条连接线下的节点' : '当数据不满足同级的其他流转条件时，进入这条连接线下的节点。'}
                        </div>
                        {true &&
                            <div>
                                <div className="select_title">
                                    筛选出以下
                                    <Select defaultValue={'and'}
                                            style={{paddingLeft: '5px', paddingRight: '5px', color: '#0db3a6'}}
                                            bordered={false}>
                                        <Select.Option value='and'>所有</Select.Option>
                                        <Select.Option value='or'>任意</Select.Option>
                                    </Select>
                                    条件的数据
                                </div>
                                <Popover trigger='click' placement="bottomLeft">
                                    <div className='sort_add'>
                                        <Button type="link">+ 添加流转条件</Button>
                                    </div>
                                </Popover>
                            </div>
                        }
                    </div>
                )
            }

            return null
        }
        /** 根据选中的节点更新formSchema */
        NsJsonForm.formSchemaService = async (args) => {
            const {targetData} = args;
            console.log('args', args)
            if (!targetData) {
                return {
                    tabs: [
                        {
                            /** Tab的title */
                            name: '流程属性',
                            groups: [],
                        },
                    ],
                };
            } else {

            }

        };
    })(NsJsonForm || (NsJsonForm = {}));
    useEffect(() => {
        let formId = sessionStorage.getItem('formId') ? sessionStorage.getItem('formId') : HomeStore.firstFormId
        (async ()=>{
            setIsload(true)
            await FlowStore.getOneFlow({"formId": formId})
            setIsload(false)
        })

    }, [])
    useEffect(()=>{

    },[JSON.stringify(NsJsonForm)])
    const onLoad = async app => {
        setApp(app)
        await app.getGraphInstance().then(res => setGraph(res))
        console.log(toJS(flowProperty));
        let iObj = JSON.parse(JSON.stringify(flowProperty))
        delete iObj['flowProperty']
        console.log('iObj',iObj)
        await app.executeCommand(
            XFlowGraphCommands.GRAPH_RENDER.id,
            {
                'graphData': {...iObj}
            }
        )
        // }
    }
    return (
        <div className="flow_all">
            <div className="edit_header">
                <div className='edit_left' style={{"overflow": "hidden"}}>
                    <BulbOutlined className='icon_edit'/>
                    <a>查看新手引导</a>
                    {
                        canOb === false && (
                            <div style={{
                                display: 'inline-block',
                                marginLeft: '20px',
                                background: '#f1f1f1',
                                userSelect: 'none'
                            }}>流程已启用，如需增删节点和连线，请<a onClick={() => {
                                FlowStore.setValue('canOb', true)
                            }}>添加新版本</a></div>
                        )
                    }
                </div>

                <div className='edit_right'>
                    <Popover overlayClassName="myPop" trigger={'click'} placement='bottom' content={
                        <div className="allFlow_list">
                            {allFlowList.map((item, index) => {
                                return (
                                    <div onClick={async () => {
                                        if (flowversion !== item['id']) {
                                            FlowStore.setValue('canOb', false)
                                            setIsload(true)
                                            let ig1 = {
                                                'nodes': JSON.parse(item['origin'])['nodes'],
                                                'edges': JSON.parse(item['origin'])['edges']
                                            }
                                            let ig2 = {'nodes': [], 'edges': []}
                                            flowProperty['edges'].forEach(async (item) => {
                                                await app.executeCommand(
                                                    XFlowEdgeCommands.DEL_EDGE.id, {
                                                        edgeConfig: {...item}
                                                    }
                                                )
                                            })
                                            // console.log(ig);
                                            app.executeCommand(
                                                XFlowGraphCommands.GRAPH_RENDER.id, {
                                                    graphData: {...ig2}
                                                }
                                            ).then(() => {
                                                app.executeCommand(
                                                    XFlowGraphCommands.GRAPH_RENDER.id, {
                                                        graphData: {...ig1}
                                                    }
                                                )
                                            })
                                            FlowStore.setValue('flowversion', item['id'])
                                            FlowStore.setValue('flowProperty', JSON.parse(item['origin']))
                                            setIsload(false)
                                        }

                                    }} key={index} className="oneflowversion">
                                        <div className="oneflow1">{flowversion == item['id'] ? '√' : ''}</div>
                                        <div className="oneflow2">流程版本(V{item['id']})</div>
                                        <div
                                            className={`oneflow3 ${item['enable'] == true ? 'true' : ""}`}>{item['enable'] == true ? '启用中' : '设计'}</div>
                                    </div>
                                )
                            })}
                            <div className="controlVersion">管理流程版本</div>
                        </div>
                    }>
                        <div className="all_flowversion">
                            流程版本（V{flowversion != -1 ? flowversion : '(新版本)'}）
                        </div>
                    </Popover>
                    <button className='edit_save' onClick={() => {
                        if (canOb === true) {
                            app.commandService.executeCommand(
                                XFlowGraphCommands.SAVE_GRAPH_DATA.id,
                                {
                                    saveGraphDataService: async (meta, data) => {
                                        console.log('finallyAns',changeFlow(data, firstFormId, flowProperty['flowProperty']))
                                        let formId=sessionStorage.getItem('formId')
                                        const result = checkFlow(data);
                                        console.log(result);
                                        if (JSON.stringify(result['auth']) === "{}" && JSON.stringify(result['person']) === "{}") {
                                            FlowStore.createFlow(changeFlow(data, formId, flowProperty['flowProperty'])).then(() => {
                                                FlowStore.getOneFlow({'formId': formId});
                                            })
                                        } else {
                                            message.info(<div>
                                                {
                                                    Object.keys(result).map(key => {
                                                        return Object.keys(result[key]).map((one, index) => {
                                                            console.log(result[key][one]);
                                                            return (
                                                                <div key={index}>{result[key][one]}</div>
                                                            )
                                                        })
                                                    })
                                                }
                                            </div>)
                                        }

                                    },
                                },
                            )
                            FlowStore.setValue('canOb', false);
                        } else {
                            app.commandService.executeCommand(
                                XFlowGraphCommands.SAVE_GRAPH_DATA.id,
                                {
                                    saveGraphDataService: async (meta, data) => {
                                        const result = checkFlow(data);
                                        console.log(result);
                                        if (JSON.stringify(result['auth']) == "{}" && JSON.stringify(result['person']) == "{}") {
                                            message.info({
                                                type:'warning',
                                                content:'请添加新版本进行编辑'
                                            })
                                            // graph.toPNG(datauri => {
                                            //     DataUri.downloadDataUri(datauri, 'chart.png')
                                            // })
                                            return;
                                        } else {
                                            message.info(<div>
                                                {
                                                    Object.keys(result).map(key => {
                                                        return Object.keys(result[key]).map((one, index) => {
                                                            console.log(result[key][one]);
                                                            return (
                                                                <div key={index}>{result[key][one]}</div>
                                                            )
                                                        })
                                                    })
                                                }
                                            </div>)
                                        }
                                    },
                                },
                            )
                        }
                    }}>保存
                    </button>
                    {
                        flowversion != ableversion && canOb == false && (
                            <button className='edit_save edit_open' onClick={() => {
                                FlowStore.openFlow({'flowId': flowversion}).then(() => {
                                    FlowStore.getOneFlow({'formId': firstFormId})
                                })
                            }}>启用流程</button>
                        )
                    }
                </div>
            </div>
            <div className="flow_main">
                <Spin spinning={load} tip={'loading...'}>
                    <XFlow
                        onLoad={onLoad}
                        className="xflow-workspace"
                        // graphConfig={useGraphConfig(props)}
                        // config={useGraphConfig(props)}
                        isAutoCenter={true}
                    >
                        <FlowchartExtension />

                        {
                            canOb == true && (
                                <CanvasToolbar
                                    config={isAdmin ? toolbarConfig : ''}
                                    position={{left: 200}}
                                    style={{zIndex: 100}}
                                />
                            )
                        }
                        <CanvasScaleToolbar
                            layout='horizontal'
                            position={{right: 500}}/>
                        <FlowchartCanvas
                            config={{grid:false,resizing:false ,
                                connecting: {
                                    snap: true,
                                    dangling: false,
                                    highlight: false,
                                    allowNode:false,
                                    allowPort:isAdmin,
                                    connectionPoint: 'rect',
                                    router: { name: 'er' },
                                    connector: {
                                        name: 'rounded',
                                        args: {
                                            radius: 15,
                                        },
                                    },
                                },
                                interacting: {
                                    /** 节点默认可以被移动 */
                                    nodeMovable: isAdmin,
                                },
                            }}
                            // config={useGraphConfig(props)}
                            style={{"overflow":"hidden"}}
                            onAddNode={(e)=>{console.log(e)}}
                            onAddEdge={(e)=>{
                                console.log(e)
                            }}
                            position={{top: 0, left: 0, height: 800}}
                        >
                            <CanvasSnapline/>
                            <CanvasNodePortTooltip/>

                            <JsonSchemaForm
                                targetType={['node', 'edge', 'canvas']}
                                getCustomRenderComponent={NsJsonForm.getCustomRenderComponent}
                                formSchemaService={NsJsonForm.formSchemaService}
                                formValueUpdateService={NsJsonForm.formValueUpdateService}
                                position={{top: 0, bottom: 0, right: 0, width: 290}}/>
                        </FlowchartCanvas>
                        {isAdmin && <CanvasContextMenu config={useMenuConfig()}/>}
                        {/*<CanvasContextMenu config={useMenuConfig()}/>*/}

                    </XFlow>
                </Spin>
            </div>
        </div>
    )
})

export default inject((stores) => ({
    FlowStore: stores.FlowStore,
    HomeStore: stores.HomeStore,
    TableStore: stores.TableStore,
    SocketStore: stores.SocketStore
}))(FlowManage)
