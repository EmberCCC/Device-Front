import { get, put, putUrl } from '../utils/request';

export const requestList = {
  getFieldInfo: '/data/form/get',
  submitData: '/data/submit',
  submitDataCheck: '/data/submit/check',
  saveForm: '/data/form/change',
  changeData: '/data/change',
  changeDataCheck: '/data/change/check',
  getAuthInfo: '/uaa/authF/show',

  getAuthForm: '/uaa/authF/showDetails',
  updateSubmit: '/uaa/authF/updateSubmit',
  updateSubmitSelf: '/uaa/authF/updateSubmitSelf',
  updateManage: '/uaa/authF/updateManage',
  updateWatch: '/uaa/authF/updateWatch',

  changeMenuName:'/data/form/change/menuName',

  getSimpleStru: '/data/form/getFormSimpleStruc',
  getLinkData: '/data/link/other',
  getData:'/data/link',
  getSearchData:'/data/link/form/search',
  fastQuery:'/data/link/form/fastQuery',

  initMenu:'/data/form/initMenu',
  initTemplate:'/data/form/initTemplate'
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
