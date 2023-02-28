import {createCtxMenuConfig, MenuItemType, XFlowEdgeCommands, XFlowNodeCommands} from '@antv/xflow'






export const DELETE_EDGE = {
    id: XFlowEdgeCommands.DEL_EDGE.id,
    label: '删除边',
    iconName: 'DeleteOutlined',
    onClick: async ({ target, commandService }) => {
        commandService.executeCommand(XFlowEdgeCommands.DEL_EDGE.id, {
            edgeConfig: target.data,
        })
    },
}

export const EMPTY_MENU = {
    id: 'EMPTY_MENU_ITEM',
    label: '暂无可用',
    isEnabled: false,
    iconName: 'DeleteOutlined',
}
export const ClOSE_MENU = {
    id: 'ClOSE_MENU_ITEM',
    label: '关闭窗口',
    isEnabled: true,
    iconName: 'Close',
    onClick:()=>{

    }
}



export const useMenuConfig = createCtxMenuConfig(config => {
    config.setMenuModelService(async (target, model, modelService, toDispose) => {
        const { type, cell } = target
        console.log(type)
        switch (type) {
            /** 节点菜单 */
            case 'edge':
                model.setValue({
                    id: 'root',
                    type: MenuItemType.Root,
                    submenu: [ClOSE_MENU,DELETE_EDGE],
                })
                break
            default:
                model.setValue({
                    id: 'root',
                    type: MenuItemType.Root,
                    submenu: [ClOSE_MENU,EMPTY_MENU],
                })
                break

        }
    })
})

