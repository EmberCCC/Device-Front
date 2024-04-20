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
