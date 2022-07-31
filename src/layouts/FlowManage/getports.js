/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-25 01:42:40
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-29 05:31:43
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\getports.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { uuidv4 } from '@antv/xflow';
import { nanoid } from 'nanoid';

const getAnchorStyle = (position) => {
    return {
        position: { name: position },
        attrs: {
            circle: {
                r: 3,
                magnet: true,
                stroke: '#31d0c6',
                fill: '#fff',
                // style: {
                //     visibility: 'hidden',
                // },
            },
        },
        zIndex: 10,
    };
};

const getPorts = (position = ['top', 'right', 'bottom', 'left']) => {
    return {
        groups: {
            top: {
              position: 'top',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#5F95FF',
                  strokeWidth: 1,
                  fill: '#fff',
                },
              },
            },
            right: {
              position: 'right',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#5F95FF',
                  strokeWidth: 1,
                  fill: '#fff',
                },
              },
            },
            bottom: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#5F95FF',
                  strokeWidth: 1,
                  fill: '#fff',
                },
              },
            },
            left: {
              position: 'left',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#5F95FF',
                  strokeWidth: 1,
                  fill: '#fff',
                },
              },
            },
          },
          items: [
            {
              group: 'top',
              id:nanoid()
            },
            {
              group: 'right',
              id:nanoid()
            },
            {
              group: 'bottom',
              id:nanoid()
            },
            {
              group: 'left',
              id:nanoid()
            },
          ],
    };
};

export default getPorts;