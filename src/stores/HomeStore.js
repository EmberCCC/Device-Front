import { observable, action, toJS, makeObservable } from 'mobx';
import { isDataExist } from 'Utils/dataTools';
import * as services from '../services/home';
import { isEmpty, uniqBy, } from 'lodash';
import { checkCurrentMenu } from 'utils/dataTools';
import { MenuObj } from '../constants/configs';

class Home {
  constructor() {
    makeObservable(this)
  }
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
  @observable firstFormId = 1
  @observable secondFormId = 0
  @observable columns = [];
  @observable dataSource = [];
  @observable itemDataT = []
  @observable uploadData = {}
  @observable viewModel = 'my1'
  @observable viewVisiable = false
  @observable myInfo = {}
  @observable showColumns = [];
  @observable lastColumns = [];
  @observable fieldValue = [];

  @observable openMenuKeys = []

  @observable formInfo = {}
  @observable menu = []


  @action.bound setValue(key, value) {
    this[key] = value
  }

  @action.bound setFieldValue(value) {
    this.fieldValue = value
  }

  @action.bound setLastColumns() {
    this.lastColumns = []
    this.columns.forEach((item) => {
      if (this.fieldValue.indexOf(item.key) > -1) {
        this.lastColumns.push(item);
      }
    })
  }
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
  @action async getMenuList(params) {
    try {
      console.log(params['type']);
      let res = await services.getRequest(services.requestList.getMenuInfo);
      if (isDataExist(res)) {
        let flag = false
        this.setValue('menu', res.data.data)
        if(params['type'] == 1){
          res.data.data.forEach(item => {
            if(item.simpleForms.length > 0){
              this.setValue('firstFormId',item.simpleForms[0]['formId'])
              this.setValue('formInfo',item.simpleForms[0])
              flag = true
              return;
            }
          })
        }
      }
    } catch (error) {
      console.log(error);
    }
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
            this.firstFormId = lv2.id;
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
      this.selectedKeys = [`${actionId}`];
      this.openKeys = [`${currentMenu[0].parentId}`];
      this.model = 'submit'
      this.firstFormId = actionId;
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

  @action.bound addCrumbs(obj) {
    this.crumbsList.push(obj);
  }

  @action changeValue(key, value) {
    this[key] = value;
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

  @action.bound changeShowColumns(value) {
    this.showColumns = value;
  }

  @action.bound initColumns() {
    this.showColumns = [];
    this.itemDataT[0].properties.map((item) => {
      this.showColumns.push(item.propertyId);
    })
    this.showColumns.push('lastModifyPeopleNickName')
    this.showColumns.push('createTime')
    this.showColumns.push('updateTime')
    this.fieldValue = this.showColumns;
    console.log(this.showColumns);
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
    this.PageInfo.pageSize = 10;
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
        this.initColumns();
        console.log(toJS(this.itemDataT));
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

  //删除一个数据
  @action.bound async deleteObjs(params) {
    this.isLoading = true;
    try {
      let res = await services.putRequest(services.requestList.deleteForms, params);
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