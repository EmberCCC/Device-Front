import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';


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

const CommonForm = Loadable({
  loader: () => import('Layouts/CommonTable'),
  loading: LoadingComponent
})


export {BasicManager,DeviceManager,EquipmentManager,MaintenanceManager,ManagerManager,SpareManager,MessageManager,CommonForm
};