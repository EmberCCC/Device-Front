/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-04-24 12:23:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\routes\home.js
 */
// import React from 'react';
import LoadingComponent from '../components/ComponentLoading';
import Loadable from 'react-loadable';

const HomeRouter = Loadable({
  loader: () => import('./HomeRouter'),
  loading: LoadingComponent
});

const EditPage = Loadable({
  loader: () => import('../layouts/TableEdit'),
  loading: LoadingComponent
});

const FlowPage = Loadable({
  loader: () => import('../layouts/FlowManage'),
  loading: LoadingComponent
});

const LoginPage = Loadable({
  loader: () => import('../layouts/LoginPage'),
  loading: LoadingComponent
});

const DesignPage = Loadable({
  loader: () => import('./DesignRouter'),
  loading: LoadingComponent
});

const MessageManage = Loadable({
  loader: () => import('../layouts/MessageManage'),
  loading: LoadingComponent
})

export {
  HomeRouter,
  EditPage,
  LoginPage,
  FlowPage,
  DesignPage,
  MessageManage
};