import { observable, action, toJS } from 'mobx';
import { isDataExist } from 'Utils/dataTools';
import * as services from '../services/home';
import { isEmpty, uniqBy, } from 'lodash';
import { checkCurrentMenu } from 'utils/dataTools';
import { MenuObj } from '../constants/configs';

class Home {
  @observable contentScrollHeight = 0; //当前content滚动高度
  @observable collapsed = false;
  @observable menuObj = MenuObj.leafMenuModels;
  @observable openKeys = ['1']; // 菜单初始化默认打开的key数组
  @observable selectedKeys = ['1']; // 菜单初始化默认选中的key数组
  @observable crumbsList = []; // 全局crumbs需求
  @observable size_class = '';
  @observable isClickCollapsed = false;
  @observable isRecommend = true; // 是否需要推荐菜单
  @observable customMenu = [];// 首页自定义菜单
  @observable isLoading = false;
  @observable toggledActionId = 0;
  @observable isAuth = false;
  @observable model = "submit"; //模式控制;
  @observable firstFormId = 1
  @observable secondFormId = 0
  @observable columns = [];
  @observable dataSource = [];
  @observable itemDataT = []
  @observable uploadData = {}
  @observable PageInfo = { pageIndex: 1, pageSize: 2, total: 0 }
  @observable viewModel = 'my1'
  @observable viewVisiable = false

  /* 设置登陆信息 */
  @action async setLogin(params, finished) {
    this.isLoading = true;
    let result = { success: false, token: null };
    try {
      let res = await services.posts('setLogin')(params);
      this.isLoading = false;
      if (isDataExist(res)) {
        console.log(res);
        result.success = true;
        result.token = res.data.value;
      }

    } catch (error) {
      console.log(error)
    }
    if (finished)
      finished(result);
  }

  /* 首页初始化获取菜单信息 */
  @action async getMenuList() {
    let menuObj = toJS(this.menuObj);
    // try {
    //   let res = await services.gets('getMenuList')();
    //   if (isDataExist(res)) {
    //     let data = res.data.data.children;
    //     /* 一级菜单 */
    //     menuObj.map(lv => {
    //       Object.assign(lv, {
    //         id: uuid(),
    //         displayNone: true
    //       });
    //       data.map(item => {
    //         if (lv.name === item.text) {
    //           if (item.children) {
    //             lv.children = item.children;
    //           }
    //           Object.assign(lv, {
    //             id: item.id,
    //             displayNone: false
    //           });
    //         }
    //       })
    //     })
    //     /* 二级菜单 */
    //     menuObj.map(lv => {
    //       if (!lv.displayNone) {
    //         lv.leafMenuModels.map(lv2 => {
    //           Object.assign(lv2, {
    //             id: uuid(),
    //             displayNone: false
    //           });
    //           lv.children.map(item => {
    //             if (item.parentId === lv.id) {
    //               if (item.text === lv2.name) {
    //                 Object.assign(lv2, {
    //                   id: item.id,
    //                   displayNone: false
    //                 })
    //               }
    //             }
    //           })
    //         })
    //       }

    //     })
    //     this.isAuth = !isEmpty(data);
    //     this.menuObj = menuObj;
    //     /* 设置当前登录页面 */
    //     let current = {
    //       id: -1, parentId: -1
    //     }
    //     data.map(item => {
    //       if (current.id > 0) return;
    //       if (!isEmpty(item.children)) {
    //         current = item.children[0]
    //       }
    //     })
    //     menuObj.map(lv => {
    //       if (lv.id === current.parentId) {
    //         current.url = lv.leafMenuModels.filter(lv2 => lv2.id === current.id)[0].path
    //       }
    //     })
    //     return current.url
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  /* 菜单加载的初始化 */
  @action initMenu(pathname) {
    // pathname=['/device']

    try {
      let menuObj = toJS(this.menuObj);
      let currentMenu = [], crumbsList = [];
      /* 菜单查询 */
      currentMenu = menuObj.filter(leaf => leaf.path === pathname)[0];
      if (isEmpty(currentMenu)) {
        menuObj.map(lv => {
          if (!isEmpty(currentMenu)) return lv.id;
          currentMenu = (pathname.indexOf(lv.path) > -1) ? lv : {};
        });
      }
      if (!isEmpty(currentMenu)) {
        crumbsList.push({
          id: currentMenu.id, name: currentMenu.name, path: currentMenu.path
        });
      }
      /**
       * 
       */
      if (currentMenu.path === pathname) {
        this.selectedKeys = [`${currentMenu.id}`];
        this.openKeys = [`${currentMenu.parentId}`];
      } else {
        /* 判断二级 */
        currentMenu.leafMenuModels.map(lv2 => {

          if (lv2.path === pathname) {
            this.selectedKeys = [`${lv2.id}`];
            this.openKeys = [`${lv2.parentId}`];
            crumbsList.push({
              id: lv2.id, name: lv2.name, path: lv2.path
            });
          } else {
            if (lv2.activeRouter) {
              if (lv2.activeRouter.indexOf(pathname) > -1) {
                this.selectedKeys = [`${lv2.id}`];
                this.openKeys = [`${lv2.parentId}`];
              }
            } else {
              /* 判断三级 */
              if (!isEmpty(lv2.leafMenuModels)) {
                lv2.leafMenuModels.map(lv3 => {
                  if (lv3.path === pathname) {
                    this.selectedKeys = [`${lv3.id}`];
                    this.openKeys = [`${lv2.parentId}`];
                  }
                })
              }
            }
          }
        })
      }
      let history = sessionStorage.getItem('menu') || [];
      if (!isEmpty(history)) {
        history = JSON.parse(history);
        history = uniqBy(history, 'id');
      }
      sessionStorage.setItem('menu', JSON.stringify(history));
      this.crumbsList = crumbsList;
    } catch (error) {
      console.log(error);
    }
  }
  @action toggleMenu({ actionItem, actionId }, finished) {
    try {
      let menuObj = toJS(this.menuObj); // 根菜单节点
      // actionId = actionId;
      /* 查询当前菜单item */
      let current = checkCurrentMenu({ menuObj, actionId });
      let currentMenu = current.currentMenu, crumbsList = current.crumbsList;
      finished(currentMenu[0].path);
      this.crumbsList = crumbsList;
      /* 记录历史-浏览记录 */
      this.setLastMenuHistory(currentMenu[0], actionId);
      this.toggledActionId = currentMenu[0].id;
      this.selectedKeys = [`${currentMenu[0].id}`];
      this.openKeys = [`${currentMenu[0].parentId}`];
      this.model = 'submit'
      this.firstFormId = currentMenu[0].id;
      this.secondFormId = 0
    } catch (error) {
      console.log(error)
    }
  }
  setLastMenuHistory = (actionItem, actionId) => {
    let history = sessionStorage.getItem('menu') || [];
    let index = -1;
    if (!isEmpty(history)) history = JSON.parse(history);
    for (let i = 0; i < history.length; i++) {
      if (history[i].id === actionId) {
        index = i;
      }
    }
    if (index > -1) {
      history.splice(index, 1);
    }
    history.push(actionItem);
    if (history.length >= 4) {
      history.splice(0, 1);
    }
    history = uniqBy(history, 'id');
    sessionStorage.setItem('menu', JSON.stringify(history));
  }
  @action getModel() {
    return this.model;
  }
  @action.bound addCrumbs(obj) {
    this.crumbsList.push(obj);
  }

  @action changeValue(key, value) {
    this[key] = value;
  }

  //修改展示模式
  @action changeModel(value) {
    this.reSavePage();
    this.model = value;
  }

  //修改展示模式
  @action changeViewModel(value) {
    this.viewModel = value;
  }

  //修改展示模式
  @action chnageViewVisiable(value) {
    this.viewVisiable = value;
  }

  //修改二级表单
  @action changeSecondFormId(value) {
    this.secondFormId = value;
  }

  //获取所有数据以及字段
  @action.bound async queryAll(params) {
    this.isLoading = true;
    this.dataSource = []
    this.columns = []
    params.pageIndex = params.pageIndex - 1;
    try {
      let res = await services.getRequest(services.requestList.getFieldNameAndType, params);
      this.isLoading = false;
      if (isDataExist(res)) {
        const dataColumns = res.data.data.columns
        const dataDataSource = res.data.data.dataSource
        const columns = [];
        const dataSource = [];
        for (var i = 0; i < dataColumns.length; i++) {
          var obj = {}
          obj.title = dataColumns[i].name || ''
          obj.dataIndex = dataColumns[i].propertyId || ''
          obj.key = dataColumns[i].propertyId || ''
          obj.type = dataColumns[i].typeId
          columns.push(obj)
        }
        columns.push({
          title: '提交人',
          dataIndex: 'lastModifyPeopleNickName',
          key: 'lastModifyPeopleNickName'
        })
        columns.push({
          title: '提交时间',
          dataIndex: 'createTime',
          key: 'createTime'
        })
        columns.push({
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime'
        })
        this.columns = columns
        for (var i = 0; i < dataDataSource.length; i++) {
          var obj = {}
          if (dataDataSource[i].data != null) {
            obj = dataDataSource[i].data;
          }
          obj.lastModifyPeopleNickName = dataDataSource[i].lastModifyPeopleNickName
          obj.createTime = dataDataSource[i].createTime
          obj.updateTime = dataDataSource[i].updateTime
          obj.id = dataDataSource[i].dataId
          obj.key = (i + 1).toString()
          dataSource.push(obj)
        }
        this.dataSource = dataSource;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //添加一条新的数据
  @action.bound async addNew(params) {
    this.isLoading = true;
    try {
      let res = await services.putRequest(services.requestList.saveDatabase, params);
      this.isLoading = false
      if (isDataExist(res)) {
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  }

  @action reSavePage() {
    let params = {};
    params.firstFormId = this.firstFormId
    params.pageIndex = this.PageInfo.pageIndex
    params.pageSize = this.PageInfo.pageSize
    this.PageInfo.pageIndex = 1;
    this.PageInfo.pageSize = 2;
    this.PageInfo.current = 1;
    this.queryAll(params)
  }

  //查询字段
  @action.bound async queryField(params) {
    this.itemDataT = [];
    this.isLoading = true;
    try {
      let res = await services.getRequest(services.requestList.getAllForm, params);
      this.isLoading = false
      if (isDataExist(res)) {
        this.itemDataT = res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //删除一个数据
  @action.bound async deleteObj(params) {
    this.isLoading = true;
    try {
      let res = await services.putRequest(services.requestList.deleteForm, params);
      this.isLoading = false
      if (isDataExist(res)) {
        return res
      }
    } catch (error) {
      console.log(error);
    }
  }

  //更新字段表
  @action.bound async updateField(params) {
    this.isLoading = true;
    try {
      let res = await services.putRequest(services.requestList.updataField, params);
      this.isLoading = false
      if (isDataExist(res)) {
        return res
      }
    } catch (error) {
      console.log(error);
    }
  }

  //更新一条数据
  @action.bound async updataObj(params) {
    console.log(params);
    this.isLoading = true;
    try {
      let res = await services.putRequest(services.requestList.updataObj, params);
      this.isLoading = false
      if (isDataExist(res)) {
        return res
      }
    } catch (error) {
      console.log(error);
    }
  }

  //获取数据总条数
  @action.bound async countObj(params) {
    this.isLoading = true;
    try {
      let res = await services.getRequest(services.requestList.countObj, params);
      this.isLoading = false
      if (isDataExist(res)) {
        this.PageInfo.total = res.data.data
        return res
      }
    } catch (error) {
      console.log(error);
    }
  }
}
let HomeStore = new Home();
export default HomeStore;