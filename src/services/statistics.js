import { get, put } from '../utils/request';

export const requestUrl = {
    deviceList: '/manage/statistics/device/list',
    exportDevice: '/manage/statistics/device/export',
    spareList: '/manage/statistics/spare/list',
    exportSpare: '/manage/statistics/spare/export',
    breakenList: '/manage/statistics/breaken/list',
    exportBreaken: '/manage/statistics/breaken/export',
    staffList: '/manage/statistics/staff/list',
    exportStaff: '/manage/statistics/staff/export',
    getBreakenInfo: '/manage/statistics/breaken/getBreakenInfo',
    getAllWorkInfo: '/manage/statistics/staff/getAllWorkInfo',
    getByLogId: '/manage/result/getByLogId',
}

/* 测试接口的数据 */
export async function getRequest(url, data, options) {
    return await get(url, data, options);
}

/* 测试接口的数据 */
export async function putRequest(url, data, options) {
    return await put(url, data, options);
}