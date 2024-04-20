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