// import React from 'react';
import LoadingComponent from '../components/ComponentLoading';
import Loadable from 'react-loadable';

const HomeRouter = Loadable({
  loader: () => import('./HomeRouter'),
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

const SocketManage = Loadable({
  loader: () => import('./SocketRouter'),
  loading:LoadingComponent
})

const ManageManage = Loadable({
  loader: () => import('../layouts/BehindManage'),
  loading: LoadingComponent
})

const RegisterPage=Loadable({
  loader:()=> import('../layouts/RegisterPage'),
  loading:LoadingComponent
})

const SettingPage=Loadable({
  loader:()=> import('../layouts/PersonalSetting'),
  loading:LoadingComponent
})

export {
  HomeRouter,
  LoginPage,
  FlowPage,
  DesignPage,
  MessageManage,
  SocketManage,
  ManageManage,
  RegisterPage,
  SettingPage
};