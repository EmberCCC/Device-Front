/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-25 04:05:07
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-25 04:05:14
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\config-cmd.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createCmdConfig, DisposableCollection, uuidv4 } from '@antv/xflow'


export const useCmdConfig = createCmdConfig(config => {
    config.setRegisterHookFn(hooks => {
        const list = [

            hooks.addNode.registerHook({
                name: 'set node config',
                handler: async args => {
                    args.nodeConfig = {
                        ...args.nodeConfig,
                        id: args.nodeConfig.id || `node-${uuidv4()}`,
                    }
                },
            }),
        ]
        const toDispose = new DisposableCollection()
        toDispose.pushAll(list)
        return toDispose
    })
})