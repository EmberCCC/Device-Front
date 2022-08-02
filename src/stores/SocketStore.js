/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-19 23:01:23
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-02 08:53:29
 * @FilePath: \bl-device-manage-test\src\stores\SocketStore.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message, Modal, Popover } from 'antd';
import React from 'react'
import { observable, action, makeObservable, toJS } from 'mobx';
import { isDataExist } from 'utils/dataTools';
import * as services from '../services/socket';
import { GoldFilled, MoreOutlined } from '@ant-design/icons';


class Socket {

    constructor() {
        makeObservable(this)
    }

    @observable userAuth = {}

    @observable SocketId = '1'
    @observable SelectKey = '全部成员';
    @observable allUsers = [];
    @observable selectRowKeys = [];
    @observable selectRow = [];
    @observable visible = false;
    @observable oneUserInfo = {}
    @observable loading = false;
    @observable departments = [];
    @observable items = [];
    @observable itemName = {};
    @observable itemRoles = []
    @observable rolesName = {};
    @observable roleList = [];
    @observable roles = []

    @observable depaertmentTree = []

    @observable initRole = []

    @observable addVisible = false

    @observable changetype = "";
    @observable changeVis = false;
    @observable changeId = null;
    @observable changeName = null;
    @observable changeGroupVis = false
    @observable fatherId = null;

    @observable mulSelect = []
    @observable mulVisible = false;
    @observable fatherIds = {}

    @observable preId = null;

    @observable addUserVis = false;
    @observable addUserList = [];
    @observable addUserIds = [];
    @observable addUserObjs = {};

    @observable sysList = {};

    @observable userName = {};

    @observable deArr = []

    @observable createRoleVis = false
    handleClick = ({ key, domEvent }) => {
        this.setValue('SelectKey', key);
        this.getOneDepartment({ 'departmentId': key })
        this.setValue('selectRow', [])
        this.setValue('selectRowKeys', [])
    }
    getChidren = (arr) => {
        let deArr = this.userAuth?.['authDetails']?.['scope']?.['department']
        let content = (
            <div className='createRole'>
                <div onClick={(e) => {
                    e.stopPropagation()
                    this.setValue('changeVis', true)
                    this.setValue('changetype', 'de')
                }}>修改名称</div>
                <div onClick={(e) => {
                    e.stopPropagation()
                    this.setValue('preId', this.fatherIds[this.changeId])
                    this.setValue('mulVisible', true)

                }}>调整上级部门</div>
                <div onClick={(e) => {
                    e.stopPropagation()
                    this.setValue('addVisible', true)
                }}>添加子部门</div>
                <div onClick={(e) => {
                    e.stopPropagation()
                    Modal.confirm({
                        title: `您确定要删除${this.changeName}吗？`,
                        cancelText: '取消',
                        okText: '确定',
                        onOk: () => {
                            console.log(this.changeId);
                            this.delDepartment({ 'departmentId': this.changeId }).then(() => {
                                this.getAllDepartment();
                                this.setValue('SelectKey', 1)
                                this.getOneDepartment({ 'departmentId': 1 })
                            })
                        },
                        onCancel: () => {
                            Modal.destroyAll();
                        }

                    })
                }}>删除</div>
            </div>
        )
        let iArr = []
        arr.map((item) => {
            let iObj = {
                'label': <div className='de_item' onClick={() => {
                    this.setValue('SelectKey', item['id'])
                    if (this.userAuth['creater'] || this.userAuth['sysAdmin'] || deArr.indexOf(-1) > -1 || deArr.indexOf(item['id']) > -1) {
                        this.getOneDepartment({ 'departmentId': item['id'] })
                    } else {
                        message.info('无权限查看该部门，请联系管理员')
                    }
                }}>
                    <div className='de_name'><GoldFilled /> {item['name']}</div>
                    {
                        (this.userAuth['creater'] || this.userAuth['sysAdmin'] || deArr.indexOf(-1) > -1 || deArr.indexOf(item['id']) > -1) && <Popover placement='right' trigger='hover' content={content} overlayClassName='myPopover' >
                            <div className='de_more'><MoreOutlined onMouseEnter={() => {
                                this.setValue('changeId', item['id'])
                                this.setValue('changeName', item['name'])
                            }} /></div>
                        </Popover>
                    }
                </div>
                , 'key': item['id']
            }
            if (item.hasOwnProperty('nodes')) {
                iObj['children'] = this.getChidren(item['nodes'], iObj['children'])
            }
            iArr.push(iObj)
        })
        return iArr
    }

    exchange = (obj) => {
        let deArr = this.userAuth?.['authDetails']?.['scope']?.['department']
        let iObj = {}
        let item = (
            <div className='createRole'>
                <div onClick={(e) => {
                    e.stopPropagation();
                    this.setValue('changeVis', true)
                    this.setValue('changetype', 'de')
                }}>修改名称</div>
                <div onClick={(e) => {
                    e.stopPropagation()
                    this.setValue('addVisible', true)
                }}>添加子部门</div>
            </div>
        )

        iObj = {
            'label': <div className='de_item' onClick={() => {
                this.setValue('SelectKey', obj['id'])
                if (this.userAuth['creater'] || this.userAuth['sysAdmin'] || deArr.indexOf(-1) > -1 || deArr.indexOf(obj['id']) > -1) {
                    this.getOneDepartment({ 'departmentId': obj['id'] })
                } else {
                    message.info('无权限查看该部门，请联系管理员')
                }
            }}>
                <div className='de_name'><GoldFilled />  {obj['name']}</div>
                {
                    this.userAuth['creater'] || this.userAuth['sysAdmin'] || deArr.indexOf(-1) > -1 || deArr.indexOf(obj['id']) > -1 && (
                        <Popover placement='right' trigger='hover' content={item} overlayClassName='myPopover' >
                            <div className='de_more'><MoreOutlined onMouseEnter={() => {
                                this.setValue('changeId', obj['id'])
                                this.setValue('changeName', obj['name'])
                            }} /></div>
                        </Popover>
                    )
                }
            </div>, 'key': obj['id']
        }
        if (obj.hasOwnProperty('nodes')) {
            iObj['children'] = this.getChidren(obj['nodes'], iObj['children'])
        }
        return iObj;
    }

    getChidrenMul = (arr) => {
        let iArr = []
        let deArr = this.userAuth?.['authDetails']?.['scope']?.['department']
        arr.map((item) => {
            let iObj = {
                'title': <div className='de_item'>
                    <div className='de_name1'><GoldFilled /> {item['name']}</div>
                </div>
                , 'value': item['id'], 'selectable': this.userAuth['creater'] || this.userAuth['sysAdmin'] || deArr.indexOf(-1) > -1 || deArr.indexOf(item['id']) > -1
            }
            if (item.hasOwnProperty('nodes')) {
                iObj['children'] = this.getChidrenMul(item['nodes'], iObj['children'])
            }
            iArr.push(iObj)
        })
        return iArr
    }

    getMul = (obj, arr) => {
        obj[arr['id']] = arr['preId'];
        if (arr.hasOwnProperty('nodes')) {
            arr['nodes'].map((item, index) => {
                this.getMul(obj, item);
            })
        }
        return obj
    }
    getMulFather = (obj, arr) => {
        obj[arr['id']] = arr['preId'];
        if (arr.hasOwnProperty('nodes')) {
            arr['nodes'].map((item, index) => {
                this.getMul(obj, item);
            })
        }
        return obj;
    }

    exchangeMul = (obj) => {
        console.log(toJS(this.userAuth));
        let deArr = this.userAuth?.['authDetails']?.['scope']?.['department']
        console.log(deArr);
        let iObj = {
            'title': <div className='de_item'>
                <div className='de_name1'><GoldFilled />  {obj['name']}</div>
            </div>, 'value': obj['id'], 'selectable': this.userAuth['creater'] || this.userAuth['sysAdmin'] || deArr.indexOf(-1) > -1 || deArr.indexOf(obj['id']) > -1
        }
        if (obj.hasOwnProperty('nodes')) {
            iObj['children'] = this.getChidrenMul(obj['nodes'], iObj['children'])
        }
        return iObj;
    }
    getNameObj = (nameObj, obj) => {
        nameObj[obj['id']] = obj['name'];
        if (obj.hasOwnProperty('nodes')) {
            obj['nodes'].map((item, index) => {
                this.getNameObj(nameObj, item);
            })
        }
        return nameObj;
    }
    handleRoleClick = (label) => {
        console.log(label);
    }
    @action.bound setValue(key, value) {
        this[key] = value;
    }
    @action.bound async searchAllUsers(params, type) {
        this.setValue('loading', true)
        try {
            let res = await services.putUrlRequest(services.requestList.searchAllUser, params);
            this.setValue('loading', false)
            if (isDataExist(res)) {
                console.log(res.data);
                console.log(type);
                if (type['type'] == '全部成员') {
                    this.setValue('allUsers', res.data.data.filter((item) => item['state'] == 1 || item['state'] == 0))

                } else {
                    this.setValue('allUsers', res.data.data.filter((item) => item['state'] == 2))

                }
                let obj = {}
                res.data.data.map((item, index) => {
                    obj[item['userId']] = item['name'];
                })
                this.setValue('userName', obj)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async searchDeUsers(params) {
        this.setValue('loading', true)
        try {
            let res = await services.putUrlRequest(services.requestList.searchDeUser, params);
            this.setValue('loading', false)
            if (isDataExist(res)) {
                console.log(res.data);
                this.setValue('allUsers', res.data.data)
                let obj = {}
                res.data.data.map((item, index) => {
                    obj[item['userId']] = item['name'];
                })
                this.setValue('userName', obj)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getAllUsers(params) {
        this.setValue('loading', true)
        try {
            let res = await services.getRequest(services.requestList.getAllUsers, params);
            this.setValue('loading', false)
            if (isDataExist(res)) {
                console.log(res.data);
                if (params == 'all') {
                    this.setValue('allUsers', res.data.data.filter((item) => item['state'] == 1 || item['state'] == 0))
                    console.log(res.data.data.filter((item) => item['state'] == 0));
                } else if (params == 'leave') {
                    this.setValue('allUsers', res.data.data.filter((item) => item['state'] == 2))
                } else {
                    this.setValue('allUsers', res.data.data)
                }
                let obj = {}
                res.data.data.map((item, index) => {
                    obj[item['userId']] = item['name'];
                })
                this.setValue('userName', obj)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getOneUser(params) {
        this.setValue('loading', true)
        this.setValue('oneUserInfo', {})
        try {
            let res = await services.getRequest(services.requestList.getOneUser, params);
            this.setValue('loading', false)

            if (isDataExist(res)) {
                let depaermentIds = []
                let roleIds = []
                for (const key in res.data.data['departments']) {
                    if (Object.hasOwnProperty.call(res.data.data['departments'], key)) {
                        depaermentIds.push(parseInt(key))
                    }
                }
                for (const key in res.data.data['roles']) {
                    if (Object.hasOwnProperty.call(res.data.data['roles'], key)) {
                        roleIds.push(key)
                    }
                }
                this.setValue('oneUserInfo', { ...res.data.data, 'departmentsIds': depaermentIds, 'roleIds': roleIds, 'userId': params['userId'] })
                console.log({ ...res.data.data, 'departmentsIds': depaermentIds, 'roleIds': roleIds });
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async getAllDepartment(params) {
        try {
            await this.getMyInfo();
            let res = await services.getRequest(services.requestList.getAllDepartment, params);
            if (isDataExist(res)) {
                this.setValue('departments', res.data.data)
                let iArr = [
                    {
                        "key": "g1",
                        "icon": null,
                        "children": [
                            {
                                "key": "全部成员",
                                "label": "全部成员"
                            },
                            {
                                "key": "离职成员",
                                "label": "离职成员"
                            }
                        ],
                        "label": "成员",
                        "type": "group"
                    }
                ]
                let arr = []
                let nameObj = { '全部成员': '全部成员', "离职成员": '离职成员' }
                let jsonArr = []
                arr.push(this.exchange(res.data.data))
                console.log(this.userAuth);
                if (this.userAuth['creater'] || this.userAuth['sysAdmin'] || this.userAuth?.['authDetails']?.['addressBook']?.['department']) {
                    iArr.push({ 'children': arr, 'type': 'group', 'label': '部门' })
                }
                jsonArr.push(this.exchangeMul(res.data.data))

                this.setValue('items', iArr)
                this.setValue('mulSelect', jsonArr)
                this.setValue('fatherIds', this.getMulFather({}, res.data.data))
                this.setValue('itemName', this.getNameObj(nameObj, res.data.data))
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getOneDepartment(params) {
        this.setValue('loading', true);
        this.setValue('allUsers', [])
        try {
            let res = await services.getRequest(services.requestList.getOneDepartmentUser, params)
            if (isDataExist(res)) {
                console.log(res.data.data);
                this.setValue('allUsers', res.data.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.setValue('loading', false)
        }
    }
    @action.bound async getAddUserList(params) {
        this.setValue('addUserList', [])
        try {
            let res = await services.getRequest(services.requestList.getOneDepartmentUser, params)
            if (isDataExist(res)) {
                this.setValue('addUserList', res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async changeDeName(params) {
        try {
            let res = await services.putRequest(services.requestList.changeDeName, params);
            if (isDataExist(res)) {
                message.success('修改成功');
                return true;
            } else {
                message.error('修改失败')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async addDe(params) {
        try {
            let res = await services.putRequest(services.requestList.addDe, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                message.success(res.data.msg)
                return true
            } else {
                message.error(res.data.msg)
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async getAllRoles(params) {
        try {
            await this.getMyInfo();
            let res = await services.getRequest(services.requestList.getAllRole, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                console.log(toJS(this.userAuth));
                this.setValue('initRole', res.data.data)
                let iArr = []
                let nameObj = {}
                const roleGroup = (
                    <div className='createRole'>
                        <div onClick={(e) => {
                            e.stopPropagation()
                            this.setValue('changeVis', true)
                            this.setValue('changetype', 'roleg')
                        }}>修改名称</div>
                        <div onClick={(e) => {
                            e.stopPropagation()
                            this.setValue('createRoleVis', true);
                        }}>添加角色</div>
                        <div onClick={(e) => {
                            e.stopPropagation()
                            Modal.confirm({
                                title: '您确定删除',
                                cancelText: "取消",
                                onCancel: () => {
                                    Modal.destroyAll()
                                },
                                onOk: () => {
                                    this.delRoleGroup({ 'groupId': this.changeId }).then(() => {
                                        this.getAllRoles();
                                        this.setValue('SelectKey', this.initRole[0]['groupId'])
                                        this.getOneRoleUser({ 'roleId': this.SelectKey })
                                    })
                                }
                            })
                        }}>删除</div>
                    </div>
                )
                const roleItem = (
                    <div className='createRole'>
                        <div onClick={(e) => {
                            e.stopPropagation()
                            this.setValue('changeVis', true)
                            this.setValue('changetype', 'role')
                        }}>修改名称</div>
                        <div onClick={(e) => {
                            e.stopPropagation()
                            this.setValue('changeGroupVis', true)
                        }}>调整分组</div>
                        <div onClick={(e) => {
                            e.stopPropagation()
                            Modal.confirm({
                                title: '您确定删除',
                                content: "删除角色同时会删除权限",
                                cancelText: '取消',
                                onOk: () => {
                                    this.delRole({ 'roleId': this.changeId }).then(() => {
                                        this.getAllRoles();
                                        this.setValue('SelectKey', this.initRole[0]['groupId'])
                                        this.getOneRoleUser({ 'roleId': this.SelectKey })
                                    })
                                }
                            })
                        }}>删除</div>
                    </div>
                )
                let preId = {}
                res.data.data.map((item, index) => {
                    let iObj = {
                        'key': -item['groupId'], 'label': <div className='item_role'>
                            <div className='role_name'>
                                {item['name']}
                            </div>
                            {
                                (this.userAuth['creater'] || this.userAuth['sysAdmin'] || this.userAuth?.['authDetails']?.['addressBook']?.['role'][1]) && (
                                    <Popover placement='right' trigger='hover' content={roleGroup} overlayClassName='myPopover'>
                                        <div className='role_more'>
                                            <MoreOutlined onMouseEnter={() => {
                                                this.setValue('changeId', item['groupId'])
                                                this.setValue('changeName', item['name'])
                                            }} />
                                        </div>
                                    </Popover>
                                )
                            }
                        </div>, children: []
                    }
                    if (item.hasOwnProperty('roles') && JSON.stringify(item['roles']) != '{}') {
                        for (const key in item['roles']) {
                            if (Object.hasOwnProperty.call(item['roles'], key)) {
                                preId[key] = item['groupId']
                                const element = item['roles'][key];
                                nameObj[key] = element
                                iObj['children'].push({
                                    'key': key, 'label': <div className='item_role'>
                                        <div className='role_name'>
                                            {element}
                                        </div>
                                        {
                                            (this.userAuth['creater'] || this.userAuth['sysAdmin'] || this.userAuth?.['authDetails']?.['addressBook']?.['role'][1]) && (
                                                <Popover placement='right' trigger='hover' content={roleItem} overlayClassName='myPopover'>
                                                    <div className='role_more'>
                                                        <MoreOutlined onMouseEnter={() => {
                                                            this.setValue('changeId', key)
                                                            this.setValue('changeName', element)
                                                            this.setValue('fatherId', item['groupId'])
                                                        }} />
                                                    </div>
                                                </Popover>
                                            )
                                        }
                                    </div>
                                })
                            }
                        }
                    }
                    iArr.push(iObj);
                })
                console.log(iArr);
                console.log(preId);
                this.setValue('fatherIds', preId)
                this.setValue('itemRoles', iArr)
                this.setValue('rolesName', nameObj)
                console.log(nameObj);
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getOneRoleUser(params) {
        try {
            let res = await services.getRequest(services.requestList.getOneRoleUsers, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                this.setValue('roleList', res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async searchOneRoleUser(params) {
        try {
            let res = await services.putUrlRequest(services.requestList.searchRoUser, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                this.setValue('roleList', res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async changeRoleName(params) {
        try {
            let res = await services.putRequest(services.requestList.changeRoleName, params);
            if (isDataExist(res)) {
                message.success('修改成功')
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async changeRoleGroupName(params) {
        try {
            let res = await services.putRequest(services.requestList.changeRoleGroupName, params);
            if (isDataExist(res)) {
                message.success('修改成功')
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async changeRoleGroup(params) {
        try {
            let res = await services.putRequest(services.requestList.changeRoleGroup, params);
            if (isDataExist(res)) {
                message.success('修改成功')
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async createRoleGroup(params) {
        try {
            let res = await services.putRequest(services.requestList.createRoleGroup, params);
            if (isDataExist(res)) {
                message.success('添加成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async delDepartment(params) {
        try {
            let res = await services.putUrlRequest(services.requestList.delDepartment, params);
            if (isDataExist(res)) {
                message.success('删除成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async changeDePre(params) {
        try {
            let res = await services.putRequest(services.requestList.changeDePre, params);
            if (isDataExist(res)) {
                message.success('修改成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async changeUserInfo(params) {
        try {
            let res = await services.putRequest(services.requestList.changeUserInfo, params);
            if (isDataExist(res)) {
                message.success('修改成功')
            }
            SocketStore.setValue('visible', false)
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async saveRoleUser(urlData, params) {
        try {
            let res = await services.putUrlRequest(services.requestList.saveRoleUser, urlData, params);
            if (isDataExist(res)) {
                message.success('保存成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async addRole(params) {
        try {
            let res = await services.putRequest(services.requestList.addRole, params);
            if (isDataExist(res)) {
                message.success('创建成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async delRole(params) {
        try {
            let res = await services.putUrlRequest(services.requestList.delRole, params)
            if (isDataExist(res)) {
                message.success('删除成功');
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async delRoleGroup(params) {
        try {
            let res = await services.putUrlRequest(services.requestList.delRoleGroup, params)
            if (isDataExist(res)) {
                message.success('删除成功');
            }
        } catch (error) {
            console.log(error);
        }
    }


    @observable normalList = []
    @observable maSelectObj = {}
    @observable maSelectKey = '-1'
    @observable canClick = true

    @observable deValue = 'all'
    @observable roValue = 'all'
    @observable inDCheck = false
    @observable inRLCheck = false
    @observable inRMCheck = false
    @observable editForm = false;
    @observable maId = null;
    @observable norName = {}

    @observable groupUserIdObj = {}
    @observable deObj = {}
    @observable cantList = []

    @observable initList = [];

    @action.bound async getNormalList(params) {
        this.setValue('canClick', false)
        try {
            let res = await services.getRequest(services.requestList.getAllNorList, params);
            if (isDataExist(res)) {
                let iDeObj = {}
                res.data.data.map(item => {
                    iDeObj[item['id']] = item['admins']
                    if (this.maSelectKey != '-1') {
                        if (item['id'] == this.maSelectKey) {
                            this.setValue('maSelectObj', item)
                            this.setValue('deValue', item['authDto']['scope']['department'].length > 0 && item['authDto']['scope']['department'][0] == -1 ? 'all' : 'scope')
                            this.setValue('roValue', item['authDto']['scope']['role'].length > 0 && item['authDto']['scope']['role'][0] == -1 ? 'all' : 'scope')
                            this.setValue('inDCheck', item['authDto']['addressBook']['department'])
                            this.setValue('inRLCheck', item['authDto']['addressBook']['role'][0])
                            this.setValue('inRMCheck', item['authDto']['addressBook']['role'][1])
                            this.setValue('editForm', item['authDto']['editForm'])
                        }
                    }
                })

                console.log(iDeObj);
                this.setValue('normalList', res.data.data)
                this.setValue('deObj', iDeObj)
                let obj = {}
                let gObj = {}
                res.data.data.map((item, index) => {
                    obj[item['id']] = item['name']
                    item['admins'].map((one, oIndex) => {
                        gObj[one['userId']] = item['id'];
                    })
                })
                this.setValue('norName', obj)
                this.setValue('groupUserIdObj', gObj)
                this.setValue('canClick', true)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async delNormalGroup(params) {
        try {
            let res = await services.putUrlRequest(services.requestList.delNormalGroup, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                message.success('删除成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async creNormalGroup(params) {
        try {
            let res = await services.putRequest(services.requestList.createNormalGroup, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                message.success('创建成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getAllSys(params) {
        try {
            let res = await services.getRequest(services.requestList.getAllSys, params);
            if (isDataExist(res)) {
                this.setValue('sysList', res.data.data)
                let arr = []
                Object.keys(res.data.data).map((item, index) => {
                    arr.push(parseInt(item))
                })
                this.setValue('addUserIds', arr)
                this.setValue('initList', arr)
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async createSys(params) {
        try {
            let res = await services.putRequest(services.requestList.createSys, params);
            if (isDataExist(res)) {
                message.success('创建成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async createNor(params) {
        try {
            let res = await services.putRequest(services.requestList.setNorMan, params);
            if (isDataExist(res)) {
                message.success('设置成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async updateNor(urlData, params) {
        try {
            let res = await services.putUrlRequest(services.requestList.updateNor, urlData, params);
            if (isDataExist(res)) {
                message.success('修改已保存')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async changeNorName(urlData, params) {
        try {
            let res = await services.putUrlRequest(services.requestList.changeNorName, urlData, params);
            if (isDataExist(res)) {
                message.success('修改成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async delSys(urlData, params) {
        try {
            let res = await services.putUrlRequest(services.requestList.delSys, urlData, params);
            if (isDataExist(res)) {
                message.success('删除成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async delNor(urlData, params) {
        try {
            let res = await services.putUrlRequest(services.requestList.delNor, urlData, params);
            if (isDataExist(res)) {
                message.success('删除成功')
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action.bound async getMyInfo(params) {
        try {
            let res = await services.getRequest(services.requestList.getUserAuth, params);
            if (isDataExist(res)) {
                console.log(res.data.data);
                sessionStorage.setItem('auth', JSON.stringify(res.data.data))
                this.setValue('userAuth', res.data.data)
                this.setValue('deArr', res.data.data?.['authDetails']?.['scope']?.['department'])
            }
        } catch (error) {
            console.log(error);
        }
    }
}

let SocketStore = new Socket()
export default SocketStore