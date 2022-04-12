/**
 * @description 项目中复用到的工具方法
 */

import { isEmpty } from 'lodash';

/* 判断数据是否存在 */
export function isDataExist(res){
  let isExist = false;
  if(res){
    if(res.data){
      if(res.data.data)
        isExist = true;
      if(res.code.toString() == '0')
        isExist = true; 
    }
  }
  return isExist;
}

/* 关于解析路径上的query传参 */
export function initSearchQuery(search){
  let data = {};
  search = search.split('?')[1];
  if(search.indexOf('&') > -1){
    search = search.split('&');
    search.map(item=>{
      let per = item.split('=');
      data[per[0]] = per[1];
      return item;
    });
  }else{
    search = search.split('=');
    data[search[0]] = search[1];
  }
  return data;
}

/* 判断当前终端 */
export function judgeIsMobile(type) {
  if(type == 'pc') return false;
  if(type == 'mobile') return true;
}

/* 校验当前menu选择 */
export function checkCurrentMenu({
  menuObj,actionId,
}){
  let currentMenu = [],crumbsList = [];
  /* 一级菜单查询 */
  currentMenu = menuObj.filter(leaf => leaf.id == actionId);
  try {
    if (isEmpty(currentMenu)) {
      /* 二级菜单查询 */
      for(let lv2 of menuObj){
        if( lv2.leafMenuModels.length > 0 ){
          currentMenu = lv2.leafMenuModels.filter(leaf=>leaf.id == actionId);
          if(!isEmpty(currentMenu)){
            crumbsList = crumbsList.concat([{
              id:lv2.id,name:lv2.name,path:lv2.path
            },{
              id:currentMenu[0].id,name:currentMenu[0].name,path:currentMenu[0].path
            }]);
            // finished(currentMenu[0].path);
            return { currentMenu,crumbsList };
          } else {
            /* 三级菜单查询 */
            for (let lv3 of lv2.leafMenuModels){
              if (lv3.leafMenuModels) {
                currentMenu = lv3.leafMenuModels.filter(leaf => leaf.id == actionId);
                if(!isEmpty(currentMenu)){
                  crumbsList.push({
                    id:currentMenu[0].id,name:currentMenu[0].name,path:currentMenu[0].path
                  });
                }
                return { currentMenu,crumbsList };
                // finished(currentMenu[0].path);
              }
            }
          }
        }
      }
    }else{
      crumbsList.push(currentMenu[0]);
      // finished(currentMenu[0].path);
      return { currentMenu,crumbsList };
    }
  } catch (error) {
    console.log(error);
  }
  return { currentMenu,crumbsList };
}


/* 关于cookie */
export function getCookie(c_name){
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=")
    if (c_start !== -1) {
        c_start = c_start + c_name.length + 1
        let c_end = document.cookie.indexOf(";", c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end)).replace(/\"/g, "");
    }
  }
}
export function setCookie(name,value,seconds){
  seconds = seconds || 0;   //seconds有值就直接赋值，没有为0
  let expires = "";
  if (seconds !== 0) {      //设置cookie生存时间
    let date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expires + "; path=/";   //转码并赋值
}
export function clearCookie(name){
  setCookie(name, "");
  setCookie('isChecked',false);
}
