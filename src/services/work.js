/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-02-14 10:06:07
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\services\work.js
 */
import { get, put } from '../utils/request';

const requestList = {
  /* 工单设备 */
  getWork: '/manage/work/list',
  saveWork: '/manage/work/save',
  // deleteType :'/manage/base/deviceType/delete',
  getWorkLog: '/manage/work/getInfo',
  getCountByWorkerId: '/manage/work/getCountByWorkerId',
  getWorkAuth: '/uaa/sys/user/adminOrRepair',
  getDetailLog: '/manage/result/getByLogId',

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