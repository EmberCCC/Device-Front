/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-08-01 11:05:32
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\services\home.js
 */
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
