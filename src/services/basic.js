/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-04-05 23:00:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\services\basic.js
 */
import { get, put } from '../utils/request';

export const requestList = {
  /* 基础信息 */
  getFieldNameAndType: '/mongo/base/queryAll',
  saveDatabase : '/mongo/base/add/form'
}

/* 测试接口的数据 */
export async function getRequest(url, data, options) {
  return await get(url, data, options);
}

/* 测试接口的数据 */
export async function putRequest(url, data, options) {
  return await put(url, data, options);
}
