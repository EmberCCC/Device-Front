import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';


const FormEdit = Loadable({
  loader: () => import('layouts/FormEdit'),
  loading: LoadingComponent
});

const FlowTable = Loadable({
  loader: () => import('layouts/FlowManage'),
  loading: LoadingComponent
});

const ExpandTable = Loadable({
  loader: () => import('layouts/ExpandManage'),
  loading: LoadingComponent
});

export {
   FlowTable, ExpandTable,FormEdit
};