/*
 * @Author: your name
 * @Date: 2022-04-02 11:06:09
 * @LastEditTime: 2022-04-04 20:04:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\BasicRouter\configs.js
 */
import React from 'react';
import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';

// 定义
const ComputerPage = Loadable({
  loader: () => import('layouts/BasicManage/ComputerPage'),
  loading: LoadingComponent
});
const DepartPage = Loadable({
  loader: () => import('layouts/BasicManage/DepartPage'),
  loading: LoadingComponent
});

const LevelPage = Loadable({
  loader: () => import('layouts/BasicManage/LevelPage'),
  loading: LoadingComponent
});

const LocationPage = Loadable({
  loader: () => import('layouts/BasicManage/LocationPage'),
  loading: LoadingComponent
});

const StatePage = Loadable({
  loader: () => import('layouts/BasicManage/StatePage'),
  loading: LoadingComponent
});

const StoragePage = Loadable({
  loader: () => import('layouts/BasicManage/StoragePage'),
  loading: LoadingComponent
});

const TypePage = Loadable({
  loader: () => import('layouts/BasicManage/TypePage'),
  loading: LoadingComponent
});

const UnitPage = Loadable({
  loader: () => import('layouts/BasicManage/UnitPage'),
  loading: LoadingComponent
});






export {
    ComputerPage,DepartPage,LevelPage,LocationPage,StatePage,StoragePage,TypePage,UnitPage
};