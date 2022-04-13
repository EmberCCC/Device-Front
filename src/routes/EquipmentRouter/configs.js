/*
 * @Author: your name
 * @Date: 2022-04-13 08:27:21
 * @LastEditTime: 2022-04-13 08:27:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\EquimentRouter\configs.js
 */
/*
 * @Author: your name
 * @Date: 2022-04-02 11:06:09
 * @LastEditTime: 2022-04-13 08:26:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\BasicRouter\configs.js
 */
import React from 'react';
import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';

// 定义
const CommonTable = Loadable({
  loader: () => import('layouts/CommonTable'),
  loading: LoadingComponent
});

export {
  CommonTable
};