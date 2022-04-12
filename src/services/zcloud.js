import { get,put } from '../utils/request';

const requestList = {
  getDevice :'/studio/basic/deviceType/devTypeList',
  getDeviceList :'/studio/basic/device/getDevice',

  /* -------------点检 && 保养--------------- */
  /* 库 */
  getMaintain:'/studio/device/maintain/list',
  batchRemove:'/studio/device/maintain/batchRemove',
  singleRemove:'/studio/device/maintain/remove',
  addMaintain:'/studio/device/maintain/save',
  updateMaintain:'/studio/device/maintain/update',
  getServeInfo:'/studio/device/maintain/getInfo',

  /* 方案 */
  getScheme:'/studio/device/maintainSchema/list',
  batchDelSchema:'/studio/device/maintainSchema/batchRemove',
  delSchema:'/studio/device/maintainSchema/remove',
  saveSchema:'/studio/device/maintainSchema/save',
  updateSchema:'/studio/device/maintainSchema/update',
  schemaInfo:'/studio/device/maintainSchema/getInfo',

  /* 计划 */
  getPlan:'/studio/device/maintainPlan/listMaintainPlanExcute',
  toDetail:'/studio/device/maintainPlan/detail',
  savePlan:'/studio/device/maintainPlan/save',
  delPlan:'/studio/device/maintainPlan/remove',
  batchDelPlan:'/studio/device/maintainPlan/batchRemove',
  getPlanInfo:'/studio/device/maintainPlan/getInfo',
  getDeviceByType:'/studio/basic/device/listByType',
  getSchemaByType:'/studio/device/maintainSchema/listTypeId',


  /* 操作 */
  getDeviceByOp:'/studio/basic/device/listByType',
  getOperateList:'/studio/device/maintainPlan/listOperator',
  getListByContentIds:'/studio/device/maintain/listByContentIds', //弹窗内获取列表数据
  saveOperate:'/studio/device/checkPlanExecution/execution',


  /* 查询 */
  getQuery:'/studio/device/maintainRecord/listNew',

  /* ------------设备监控------------- */
  getMonitor:'/studio/device/listStatus',

}

export function gets(type){
  return async function(data,options){
    return await get(requestList[type],data,options);
  }
}
export function posts(type){
  return async function(data,options){
    return await put(requestList[type],data,options);
  }
}