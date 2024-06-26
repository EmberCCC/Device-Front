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
  setNorMan:'/uaa/admin/setupNormal',
  updateNor:'/uaa/admin/updateNormalAdmin',
  changeNorName:'/uaa/admin/updateNormalAdminName',
  delSys:'/uaa/admin/deleteSys',
  delNor:'/uaa/admin/deleteNormal',

  searchAllUser:'/uaa/user/searchAll',
  searchDeUser:'/uaa/user/searchDepart',
  searchRoUser:'/uaa/role/search',

  
  getUserAuth:'/uaa/isAdmin',
  getUserInfo:'/uaa/user/showSelf',//获取本人信息
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
