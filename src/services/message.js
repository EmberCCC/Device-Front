/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-07-30 02:11:32
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\services\home.js
 */
import { get, put} from '../utils/request';

export const requestList = {
  getWaitList:'/data/work/queryWorkLog/wait',
  getLaunchList:'/data/work/queryWorkLog/launch',
  getHandleList:'/data/work/queryWorkLog/handle',
  getCopyList:'/data/work/queryWorkLog/copy',

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
