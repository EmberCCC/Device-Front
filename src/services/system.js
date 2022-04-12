/*
 * @Author: your name
 * @Date: 2021-11-02 14:29:58
 * @LastEditTime: 2022-02-14 10:07:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bl-device-manage\src\services\system.js
 */
import { get, post, put } from '../utils/request';

/* 存储请求地址*/
export const requestUrl = {
    departmentList: '/manage/sys/sysDept/list',//部门列表
    departmentTree: '/manage/sys/sysDept/tree',//部门列表树
    removeDepartment: '/manage/sys/sysDept/delete',//删除部门
    saveDepartment: '/manage/sys/sysDept/add',//新增部门
    updataDepartment: '/manage/sys/sysDept/update',//编辑部门
    roleList: '/uaa/sys/role/list',//角色列表
    allRoleList: '/uaa/sys/role/listAll',//角色列表
    saveRole: '/uaa/sys/role/add',//新增角色
    updataRole: '/uaa/sys/role/update',//编辑角色
    removeRole: '/uaa/sys/role/delete',//删除角色
    batchRemoveRole: '/uaa/sys/role/batchDelete',//批量删除角色
    treeMenu: '/uaa/menu/tree',//获取菜单树
    getMenuIdsByRole: '/uaa/menu/getMenuIdsByRole',//查询角色当前权限
    menuList: '/uaa/menu/list',//菜单列表
    removeMenu: '/uaa/menu/delete',//删除菜单
    userList: '/uaa/sys/user/list',//用户列表
    saveMenu: '/uaa/menu/add',//新增菜单
    updateMenu: '/uaa/menu/update',//编辑菜单
    saveUser: '/uaa/sys/user/add',//保存用户
    updataUser: '/uaa/sys/user/update',//编辑用户
    removeUser: '/uaa/sys/user/delete',//删除用户
    batchRemoveUser: '/uaa/sys/user/batchDelete',//批量删除用户
    adminResetPwd: '/uaa/sys/user/adminResetPwd',//修改用户密码
    getUserRoles: '/uaa/sys/user/getRoles',//查询用户所有角色
    getCustomer: '/manage/sys/customer/list',//客户列表
    addCustomer: '/manage/sys/customer/add',//客户新增
    updateCustomer: '/manage/sys/customer/update',//客户编辑
    deleteCus: '/manage/sys/customer/delete',//客户删除
    exist: '/uaa/sys/user/exist',//客户删除
}

/* 测试接口的数据 */
export async function getRequest(url, data, options) {
    return await get(url, data, options);
}

/* 测试接口的数据 */
export async function postRequest(url, data, options) {
    return await post(url, data, options);
}
/* 测试接口的数据 */
export async function putRequest(url, data, options) {
    return await put(url, data, options);
}