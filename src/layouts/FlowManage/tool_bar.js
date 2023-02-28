/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-23 09:47:05
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-29 05:32:05
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\tool_bar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createToolbarConfig, randomInt, XFlowGraphCommands } from '@antv/xflow';
import { MODELS, XFlowNodeCommands, IconStore } from '@antv/xflow';
import { SaveOutlined, PlusCircleOutlined, DeleteOutlined, FormOutlined, CopyOutlined, NodeExpandOutlined } from '@ant-design/icons';
import { message } from 'antd';
import getPorts from './getports';
import { customAlphabet, nanoid } from 'nanoid';
import { changeFlow } from './changeTool';
export var NSToolbarConfig;
(function (NSToolbarConfig) {
    /** 注册icon 类型 */
    const nanoid = customAlphabet('1234567890',7)
    IconStore.set('PlusCircleOutlined', PlusCircleOutlined);
    IconStore.set('DeleteOutlined', DeleteOutlined);
    IconStore.set('SaveOutlined', SaveOutlined);
    IconStore.set('FormOutlined', FormOutlined);
    IconStore.set('CopyOutlined', CopyOutlined);
    IconStore.set('NodeExpandOutlined', NodeExpandOutlined);
    /** 获取toolbar依赖的状态 */
    NSToolbarConfig.getToolbarState = async (modelService) => {
        // nodes
        const nodes = await MODELS.SELECTED_NODES.useValue(modelService);
        return {
            isNodeSelected: nodes.length > 0 && nodes[0].data.typeId != '-1' && nodes[0].data.typeId != '-2',
        };
    };
    /** toolbar依赖的配置项 */
    NSToolbarConfig.getToolbarItems = async (state) => {
        const toolbarGroup1 = [];
        toolbarGroup1.push({
            id: 1,
            text: '',
            iconName: 'DeleteOutlined',
            tooltip: '删除节点',
            isEnabled: state.isNodeSelected,
            onClick: async ({ modelService, commandService }) => {
                MODELS.SELECTED_NODE.useValue(modelService).then(res => {
                    commandService.executeCommand(
                        XFlowNodeCommands.DEL_NODE.id,
                        {
                            nodeConfig: res.data
                        }
                    )
                })
            }
        });
        toolbarGroup1.push({
            id: 2,
            text: '流程节点',
            iconName: 'FormOutlined',
            tooltip: '流程节点',
            onClick: async ({ modelService, commandService }) => {
                commandService.executeCommand(
                    XFlowNodeCommands.ADD_NODE.id,
                    {
                        nodeConfig: {
                            id: parseInt(nanoid()),
                            name: 'flow',
                            label: `流程节点`,
                            typeId: '1',
                            auth_info: {},
                            charge_person: {
                                'department': [],
                                'role': [],
                                'user': []
                            },
                            copy: false,
                            x: randomInt(50, 100),
                            y: randomInt(50, 100),
                            width: 180,
                            height: 38,
                            ports: getPorts()
                        }
                    }
                )
            }
        });
        toolbarGroup1.push({
            id: 3,
            text: '抄送节点',
            iconName: 'FormOutlined',
            tooltip: '抄送节点',
            onClick: async ({ modelService, commandService }) => {
                commandService.executeCommand(
                    XFlowNodeCommands.ADD_NODE.id,
                    {
                        nodeConfig: {
                            id: parseInt(nanoid()),
                            label: `抄送节点`,
                            name: 'copy',
                            typeId: '2',
                            auth_info: {},
                            charge_person: {
                                'department': [],
                                'role': [],
                                'user': []
                            },
                            copy: false,
                            x: randomInt(50, 100),
                            y: randomInt(50, 100),
                            width: 180,
                            height: 38,
                            ports: getPorts()
                        }
                    }
                )
            }
        });
        // toolbarGroup1.push({
        //     id: 4,
        //     text: '子流程',
        //     iconName: 'FormOutlined',
        //     tooltip: '子流程',
        //     onClick: async ({ modelService, commandService }) => {
        //         commandService.executeCommand(
        //             XFlowNodeCommands.ADD_NODE.id,
        //             {
        //                 nodeConfig: {
        //                     id: parseInt(nanoid()),
        //                     label: `子流程`,
        //                     name: 'copy',
        //                     typeId: '3',
        //                     child: "",
        //                     charge_person: {
        //                         'department': [],
        //                         'role': [],
        //                         'user': []
        //                     },
        //                     x: randomInt(50, 100),
        //                     y: randomInt(50, 100),
        //                     width: 180,
        //                     height: 38,
        //                     ports: getPorts()
        //                 }
        //             }
        //         )
        //     }
        // });
        return [{ name: 'toolbar', items: toolbarGroup1 }];
    };
})(NSToolbarConfig || (NSToolbarConfig = {}));
/** toolbar依赖的配置项 */
export const useToolbarConfig = createToolbarConfig(toolbarConfig => {
    /** 生产 toolbar item */
    toolbarConfig.setToolbarModelService(async (toolbarModel, modelService) => {
        // 更新toolbar model
        const updateToolbarState = async () => {
            const toolbarState = await NSToolbarConfig.getToolbarState(modelService);
            const toolbarItems = await NSToolbarConfig.getToolbarItems(toolbarState);
            toolbarModel.setValue(toolbar => {
                toolbar.mainGroups = toolbarItems;
            });
        };
        // 监听对应的model
        const model = await MODELS.SELECTED_NODES.getModel(modelService);
        model.watch(() => {
            updateToolbarState();
        });
    });
});
