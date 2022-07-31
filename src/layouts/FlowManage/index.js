/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-04-11 16:11:20
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-31 08:58:14
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-04-11 16:11:20
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-25 16:20:11
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BulbOutlined, CopyOutlined, FormOutlined, NodeExpandOutlined, PlayCircleOutlined, PoweroffOutlined } from "@ant-design/icons";
import { CanvasToolbar, createGraphConfig, XFlow, XFlowNodeCommands, CanvasScaleToolbar, CanvasSnapline, JsonSchemaForm, NsJsonSchemaForm, CanvasNodePortTooltip, FlowchartCanvas, FlowchartExtension, XFlowGraphCommands, randomInt, XFlowEdgeCommands } from "@antv/xflow";
import { inject, observer } from "mobx-react";
import AuthShape from './Self_Form/field_auth';
import React, { useEffect, useReducer, useState } from "react";
import './index.less'
import '@antv/xflow/dist/index.css'
import { useToolbarConfig } from "./tool_bar";
import { controlMapService } from './Self_Form'
import { set } from "lodash";
import Node_name from "./Self_Form/node_name";
import Node_copy from "./Self_Form/node_copy";
import Node_charge from "./Self_Form/node_charge";
import Flow_Config from "./flowConfig";
import { changeFlow } from "./changeTool";
import { message, Popover, Spin } from "antd";
import { toJS } from "mobx";
export const useGraphConfig = createGraphConfig(graphConfig => {
  graphConfig.setX6Config({
    grid: false,
    mousewheel: {
      enabled: true,
      minScale: 0.5,
      maxScale: 3,
    },
    // 节点是否可旋转
    rotating: false,
    // 节点是否可调整大小
    resizing: false,
    selecting: {
      enabled: false,
      multiple: false,
      selectCellOnMoved: false,
      showNodeSelectionBox: false,
      movable: false,
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
      snap: {
        radius: 20,
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet
      },
    },
  })
  graphConfig.setDefaultEdgeRender(props => {
    console.log(props);
  })
  graphConfig.setDefaultNodeRender(props => {
    if (props.data.typeId == '1') {
      return <div className="react-node"><FormOutlined /> {props.data.label} </div>;
    } else if (props.data.typeId == '2') {
      return <div className="react-node"><CopyOutlined /> {props.data.label} </div>;
    } else if (props.data.typeId == '3') {
      return <div className="react-node"><NodeExpandOutlined /> {props.data.label} </div>;
    } else if (props.data.typeId == '-2') {
      return <div className="react-node"><PoweroffOutlined /> {props.data.label} </div>;
    } else if (props.data.typeId == '-1') {
      return <div className="react-node"><PlayCircleOutlined /> {props.data.label} </div>;
    }
  });
});
const configCanvas = {
  setDefaultNodeRender: (props) => {
    if (props.data.typeId == '1') {
      return <div className="react-node"><FormOutlined /> {props.data.label} </div>;
    } else if (props.data.typeId == '2') {
      return <div className="react-node"><CopyOutlined /> {props.data.label} </div>;
    } else if (props.data.typeId == '3') {
      return <div className="react-node"><NodeExpandOutlined /> {props.data.label} </div>;
    } else if (props.data.typeId == '-2') {
      return <div className="react-node"><PoweroffOutlined /> {props.data.label} </div>;
    } else if (props.data.typeId == '-1') {
      return <div className="react-node"><PlayCircleOutlined /> {props.data.label} </div>;
    }
  },
  grid: false,
  mousewheel: {
    enabled: true,
    minScale: 0.5,
    maxScale: 3,
  },
  // 节点是否可旋转
  rotating: false,
  // 节点是否可调整大小
  resizing: false,
  selecting: {
    enabled: true,
    multiple: false,
    selectCellOnMoved: true,
    showNodeSelectionBox: true,
    movable: false,
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
    validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
      let sourceId = sourceView.cell.data.typeId
      let targetId = targetView.cell.data.typeId
      if (targetId == '-1') return false
      if (sourceId == '2' || sourceId == '-2') return false
      return !!targetMagnet
    },

  },
}




const FlowManage = observer(({ FlowStore, HomeStore, TableStore, SocketStore, props }) => {
  const { flowProperty, canOb, allFlowList, flowversion, ableversion } = FlowStore
  const { firstFormId } = HomeStore
  const [load, setIsload] = useState(false)
  const [app, setApp] = useState(null)
  const toolbarConfig = useToolbarConfig(props)
  const graphConfig = useGraphConfig(props);
  const forceUpdate = useReducer((bool) => !bool)[1]
  var NsJsonForm;
  (function (NsJsonForm) {
    /** ControlShape的Enum */
    const { ControlShape } = NsJsonSchemaForm;
    /** 保存form的values */
    NsJsonForm.formValueUpdateService = async (args) => {
      const { values, commandService, targetData } = args;
      const updateNode = (node) => {
        return commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, { nodeConfig: node });
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
                  <Node_name initData={targetData} name={targetData.label} />
                </div>
                <div className="formItem_chargePerson">
                  <div className="formItem_name">负责人</div>
                  <Node_charge typeName={'node'} initData={targetData} charge_person={targetData.charge_person} />
                </div>
                <div className="formItem_copy">
                  <Node_copy initData={targetData} checked={targetData.copy} />
                  <div className="formItem_name">启用抄送</div>
                </div>
                <div className="formItem_auth">
                  <div className="formItem_name">字段权限</div>
                  <AuthShape data={targetData.auth_info} initData={targetData} typeId={1} />
                </div>
              </div>
            </div>
          )
        } else if (targetData.typeId == '2') {
          return () => (
            <div className="form_self">
              <div className="formItem_title">
                <div className="formItem_name">节点名称</div>
                <Node_name initData={targetData} name={targetData.label} />
              </div>
              <div className="formItem_chargePerson">
                <div className="formItem_name">抄送人</div>
                <Node_charge typeName={'node'} initData={targetData} charge_person={targetData.charge_person} />
              </div>
              <div className="formItem_copy">
                <div className="formItem_name copyself">打印</div>
                <Node_copy initData={targetData} checked={targetData.copy} />
              </div>
              <div className="formItem_auth">
                <div className="formItem_name">字段权限</div>
                <AuthShape data={targetData.auth_info} initData={targetData} typeId={2} />
              </div>
            </div>
          )
        } else if (targetData.typeId == '3') {
          return () => (
            <div className="form_self">
              <div className="formItem_title">
                <div className="formItem_name">节点名称</div>
                <Node_name initData={targetData} name={targetData.label} />
              </div>
              <div className="formItem_chargePerson">
                <div className="formItem_name">子流程发起人</div>
                <Node_charge typeNam={'node'} initData={targetData} charge_person={targetData.charge_person} />
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
                <Node_name initData={targetData} name={targetData.label} />
              </div>
              <div className="formItem_auth">
                <div className="formItem_name">字段权限</div>
                <AuthShape data={targetData.auth_info} initData={targetData} typeId={-1} />
              </div>
            </div>
          )
        } else if (targetData.typeId == '-2') {
          return () => (
            <div className="end_node">
              <div className="end_sketch">没有下级节点的节点会自动连接至流程结束；如果您需要在中途结束流程，请将需要结束流程的节点，连接到流程结束，并设置相应的流转条件。</div>
            </div>
          )
        }

      }
      if (targetType === 'canvas') {
        return () => (
          <div className="form_self">
            <Flow_Config />
          </div>
        )
      }
      if (targetType === 'edge') {
        return null
      }

      return null
    }
    /** 根据选中的节点更新formSchema */
    NsJsonForm.formSchemaService = async (args) => {
      const { targetData } = args;
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
  const onLoad = async app => {
    setApp(app)
    console.log(toJS(flowProperty));
    let iObj = JSON.parse(JSON.stringify(flowProperty))
    delete iObj['flowProperty']
    console.log(iObj);
    //  else {
    await app.executeCommand(
      XFlowGraphCommands.GRAPH_RENDER.id,
      {
        'graphData': iObj
      }
    )
    // }
  }
  useEffect(() => {
    // FlowStore.getOneFlow({ 'formId': firstFormId })
    console.log(firstFormId);
  }, [])
  return (
    <div className="flow_all">
      <div className="edit_header">
        <div className='edit_left'>
          <BulbOutlined className='icon_edit' />
          <a>查看新手引导</a>
          {
            canOb == false && (
              <div style={{ display: 'inline-block', marginLeft: '20px', background: '#f1f1f1', userSelect: 'none' }}>流程已启用，如需增删节点和连线，请<a onClick={() => {
                FlowStore.setValue('canOb', true)
                forceUpdate()
                console.log(canOb);
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
                    FlowStore.setValue('canOb', false)
                    setIsload(true)
                    let ig = { 'nodes': JSON.parse(item['origin'])['nodes'], 'edges': JSON.parse(item['origin'])['edges'] }
                    console.log(ig);
                    flowProperty['nodes'].forEach(async (item) => {
                      await app.executeCommand(
                        XFlowNodeCommands.DEL_NODE.id, {
                        nodeConfig: item
                      })
                    })

                    FlowStore.setValue('flowversion', item['id'])
                    FlowStore.setValue('flowProperty', JSON.parse(item['origin']))
                    setIsload(false)
                  }} key={index} className="oneflowversion">
                    <div className="oneflow1">{flowversion == item['id'] ? '√' : ''}</div>
                    <div className="oneflow2">流程版本(V{item['id']})</div>
                    <div className={`oneflow3 ${item['enable'] == true ? 'true' : ""}`}>{item['enable'] == true ? '启用中' : '设计'}</div>
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
            if (canOb == true) {
              app.commandService.executeCommand(
                XFlowGraphCommands.SAVE_GRAPH_DATA.id,
                {
                  saveGraphDataService: async (meta, data) => {
                    console.log(changeFlow(data, firstFormId, flowProperty['flowProperty']))
                    FlowStore.createFlow(changeFlow(data, firstFormId, flowProperty['flowProperty'])).then(() => {
                      FlowStore.getOneFlow({ 'formId': firstFormId });
                    })
                  },
                },
              )
              forceUpdate()
              FlowStore.setValue('canOb', false);
            } else {
              app.commandService.executeCommand(
                XFlowGraphCommands.SAVE_GRAPH_DATA.id,
                {
                  saveGraphDataService: async (meta, data) => {
                    console.log(meta);
                    console.log({ ...changeFlow(data, firstFormId, flowProperty['flowProperty']) })
                    // FlowStore.createFlow(changeFlow(data, firstFormId, flowProperty['flowProperty']))
                  },
                },
              )
            }
          }}>保存</button>
          {
            flowversion != ableversion && canOb == false && (
              <button className='edit_save edit_open' onClick={() => {
                FlowStore.openFlow({ 'flowId': flowversion }).then(() => {
                  FlowStore.getOneFlow({ 'formId': firstFormId })
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
            // config={graphConfig}
            className="xflow-workspace"
            graphData={flowProperty}
          >
            {
              canOb == true && (
                <CanvasToolbar
                  config={toolbarConfig}
                  position={{ left: 200 }}
                  style={{ zIndex: 100 }}
                />
              )
            }
            <CanvasScaleToolbar
              layout='horizontal'
              position={{ right: 500 }} />
            <FlowchartCanvas
              config={configCanvas}
              useConfig={(config) => {
                config.setDefaultNodeRender(props => {
                  if (props.data.typeId == '1') {
                    return <div className="react-node"><FormOutlined style={{ marginRight: '10px' }} /> {props.data.label} </div>;
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
              }}
              position={{ top: 0, left: 0, height: 800 }}
            >
              <FlowchartExtension />
              <CanvasSnapline />
              <CanvasNodePortTooltip />
              <JsonSchemaForm
                getCustomRenderComponent={NsJsonForm.getCustomRenderComponent}
                controlMapService={controlMapService}
                formSchemaService={NsJsonForm.formSchemaService}
                formValueUpdateService={NsJsonForm.formValueUpdateService}
                position={{ top: 0, bottom: 0, right: 0, width: 290 }} />
            </FlowchartCanvas>
          </XFlow>
        </Spin>
      </div>
    </div >
  )
})

export default inject((stores) => ({ FlowStore: stores.FlowStore, HomeStore: stores.HomeStore, TableStore: stores.TableStore, SocketStore: stores.SocketStore }))(FlowManage)