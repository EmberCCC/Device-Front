import { get, post, put } from '../utils/request';

export const requestList = {
  setLogin: '/uaa/login/token',
  getMenuList: '/uaa/menu/getMenuByUserId',
  mulChangeData: '/data/batch/change',
  getBatchLog: '/data/batchLog',
  delBatchDel: '/data/batch/delete',
  getScreenData:'/data/screen/all',
  getScreenDataUser:'/data/screen/user',
  getMenuInfo:'/data/form/menu',


  /* 基础信息 */
  getAllData: '/data/queryOneForm',
  getUserData: '/data/queryUserOneForm',
  delOneData: '/data/delete',
  getOneData: '/data/queryOneData',

  /* 人员信息 */
  queryPerson: '/uaa/user/users/getAll',
  ownMessage:'/uaa/user/showSelf',
  editMessage:'/uaa/user/editSelf',
  registerUser:'/uaa/user/registerUser',
  registerEmployee:'/uaa/user/registerEmployee',
  confirmPwd:'/uaa/user/confirmPwd'
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

export async function putRequestFormData(url, data, options) {
  return await post(url, data, options)
}
