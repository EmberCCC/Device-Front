/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-09 09:58:45
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-13 21:49:35
 * @FilePath: \bl-device-manage-test\src\constants\select_config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const select_condtion = [
    {
        title: '等于',
        value: '='
    }, {
        title: '不等于',
        value: '#'
    }, {
        title: '等于任意一个',
        value: '$'
    }, {
        title: '不等于任意一个',
        value: '*'
    }, {
        title: '包含',
        value: '|'
    }, {
        title: '不包含',
        value: '-'
    }, {
        title: '为空',
        value: '%'
    }, {
        title: '不为空',
        value: '@'
    }, {
        title: '大于',
        value: '>'
    }, {
        title: '小于',
        value: '<'
    }, {
        title: '大于等于',
        value: ']'
    }, {
        title: '小于等于',
        value: '['
    }, {
        title: '选择范围',
        value: '~'
    }, {
        title: '动态筛选',
        value: ','
    }, {
        title: '包含任意一个',
        value: ')'
    },
    {
        title: '同时包含',
        value: '('
    }
]

export const select_arr = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [4, 5, 6, 7],
    [0, 1, 6, 7, 8, 9, 10, 11],
    [0, 1, 6, 7, 10, 11, 12, 13],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 6, 7, 14, 15],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 6, 7, 14, 15],
    [],
    [0, 1, 2, 3, 6, 7],
    [0, 1, 6, 7, 10, 11, 12, 13],
    [0, 1, 6, 7, 10, 11, 12, 13]
]