import { get, put, putUrl } from '../utils/request';

export const requestList = {
  /* 内部组织接口 */
  getOneFlow:'/data/flow/showFlow/form',
  createFlow:'/data/flow/create',
  showOneFlow:'/data/flow/showUsingFlow',
  openFlow:'/data/flow/enable',
  updateFlow:'/data/flow/update',
  agreeFlow:'/data/flow/agree',

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
