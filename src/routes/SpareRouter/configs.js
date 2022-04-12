/*
 * @Author: your name
 * @Date: 2022-03-31 23:35:23
 * @LastEditTime: 2022-03-31 23:35:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\SpareRouter\configs.js
 */
import React from 'react';
import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';

// 定义
const StandingPage = Loadable({
  loader: () => import('layouts/SpareManage/StandingPage'),
  loading: LoadingComponent
});



export {
    StandingPage
};