import { get, put } from '../utils/request';

export const requestUrl = {
    getSpareType: '/manage/spare/spareType/list',//备件类型列表
    saveSpareType: '/manage/spare/spareType/save',//新增备件类型
    deleteSpareType: '/manage/spare/spareType/delete',//删除备件类型
    allSpareType: '/manage/spare/spareType/listAll',//所有备件类型
    getSpare: '/manage/spare/spare/list',//备件列表
    saveSpare: '/manage/spare/spare/save',//新增备件
    spareAll: '/manage/spare/spare/listAll',//新增备件
    deleteSpare: '/manage/spare/spare/delete',//删除备件
    getDeviceType: '/manage/base/deviceModel/listAll',//设备型号
    operationSpare: '/manage/spare/spareRecord/operation',//设备类型出入库
    spareRecordList: '/manage/spare/spareRecord/list',//出入库记录
    warnList: '/manage/spare/warn/list',//库存预警
    getByType: '/manage/work/getByType',//工单
    export:'/manage/spare/spare/export',
    // modelList: '/manage/base/deviceModel/listByTypeId',//类型获取设备型号

}

/* 测试接口的数据 */
export async function getRequest(url, data, options) {
    return await get(url, data, options);
}

/* 测试接口的数据 */
export async function putRequest(url, data, options) {
    return await put(url, data, options);
}