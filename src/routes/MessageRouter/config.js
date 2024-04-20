import LoadingComponent from 'Components/ComponentLoading';
import Loadable from 'react-loadable';

// 定义
const ListPage = Loadable({
  loader: () => import('layouts/MessageManage/ListPage'),
  loading: LoadingComponent
});

export {
  ListPage
};