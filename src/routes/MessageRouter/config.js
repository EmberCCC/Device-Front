/*
 * @Author: your name
 * @Date: 2022-04-13 08:27:33
 * @LastEditTime: 2022-04-24 12:39:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\ManagerRouter\configs.js
 */
/*
 * @Author: your name
 * @Date: 2022-04-02 11:06:09
 * @LastEditTime: 2022-04-13 08:26:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage-test\src\routes\BasicRouter\configs.js
 */
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