/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-04-24 12:30:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\routes\HomeRouter\configs.js
 */
import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';


const EditPage = Loadable({
  loader: () => import('layouts/TableEdit'),
  loading: LoadingComponent
});
const BasicManager = Loadable({
  loader: () => import('../BasicRouter'),
  loading: LoadingComponent
}); 
const DeviceManager = Loadable({
  loader: () => import('../DeviceRouter'),
  loading: LoadingComponent
}); 
const EquipmentManager = Loadable({
  loader: () => import('../EquipmentRouter'),
  loading: LoadingComponent
}); 
const ManagerManager = Loadable({
  loader: () => import('../ManagerRouter'),
  loading: LoadingComponent
}); 
const MaintenanceManager = Loadable({
  loader: () => import('../MaintenanceRouter'),
  loading: LoadingComponent
}); 
const SpareManager = Loadable({
  loader: () => import('../SpareRouter'),
  loading: LoadingComponent
});
const MessageManager = Loadable({
  loader: () => import('../MessageRouter'),
  loading: LoadingComponent
})


export {EditPage,BasicManager,DeviceManager,EquipmentManager,MaintenanceManager,ManagerManager,SpareManager,MessageManager
};