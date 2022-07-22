/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-07-23 00:21:29
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\services\home.js
 */
import { get, put, putUrl } from '../utils/request';

export const requestList = {
  /* 内部组织接口 */
  getAllUsers: '/uaa/user/show',
  getOneUser: '/uaa/user/getOne',
  getAllDepartment: '/uaa/department/show',
  getOneDepartmentUser: '/uaa/department/getOneDeUser',
  changeDeName: '/uaa/department/changeName',
  addDe: '/uaa/department/add',
  getAllRole: '/uaa/role/show',
  getOneRoleUsers: '/uaa/role/showRoleUser',
  changeRoleName: '/uaa/role/changeRoleName',
  changeRoleGroupName: '/uaa/role/changeGroupName',
  changeRoleGroup: '/uaa/role/changeRoleGroup',
  createRoleGroup: '/uaa/role/addGroup',
  delDepartment: '/uaa/department/delete',
  changeDePre: '/uaa/department/changePre',
  changeUserInfo: '/uaa/user/changeUserInfo',
  saveRoleUser: '/uaa/role/addUser',
  addRole:'/uaa/role/addRole',
  delRole:'/uaa/role/deleteRole',
  delRoleGroup:'/uaa/role/deleteGroup',
  /* 管理员接口 */

  getAllNorList:'/uaa/admin/showNormalAdmins',
  delNormalGroup:'/uaa/admin/deleteNormalGroup',
  createNormalGroup:'/uaa/admin/createNormalAdmin',
  getAllSys:'/uaa/admin/showSysAdmins',
  createSys:'/uaa/admin/createSys',

  
  getUserAuth:'/uaa/isAdmin'

}

export function gets(type) {
  return async function (data, options) {
    return await get(requestList[type], data, options);
  }
}
export function posts(type) {
  return async function (data, options) {
    return await put(requestList[type], data, options);
  }
}

/* 测试接口的数据 */
export async function getRequest(url, data, options) {
  return await get(url, data, options);
}

/* 测试接口的数据 */
export async function putRequest(url, data, options) {
  return await put(url, data, options);
}

export async function putUrlRequest(url, urlData, data, options) {
  return await putUrl(url, urlData, data, options);
}
