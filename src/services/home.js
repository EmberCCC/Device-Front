/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-04-24 09:21:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\services\home.js
 */
import { get, put } from '../utils/request';

export const requestList = {
  getList: 'manage/index/console',
  setLogin: '/uaa/login/token',
  getMenuList: '/uaa/menu/getMenuByUserId',
  getCustomMenu: '/manage/getCustomMenu',
  workEndInfo: '/manage/index/workEndInfo',
  deviceInfo: '/manage/index/deviceInfo',
  staffInfo: '/manage/index/staffInfo',

  /* 基础信息 */
  getFieldNameAndType: '/mongo/base/queryAll',
  saveDatabase : '/mongo/base/add/form',
  getAllForm:'/mongo/field/getAll/form',
  deleteForm:'/mongo/base/delete/form',
  updataField:'/mysql/field/field/user/update/form',
  updataObj:'/mongo/base/update/form',
  countObj:'/mongo/base/count'

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
