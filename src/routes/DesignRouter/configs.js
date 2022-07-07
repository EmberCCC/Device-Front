/*
 * @Author: your name
 * @Date: 2022-04-02 11:06:09
 * @LastEditTime: 2022-07-07 09:04:28
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\BasicRouter\configs.js
 */
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