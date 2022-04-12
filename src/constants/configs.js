export const MenuObj = {
  id: 'root',
  name: '首页',
  path: '/index',
  activeRouter: [],
  displayNone: false,
  leafMenuModels: [
    {
      id: -1,
      name: '备品备件管理',
      iconfont: 'icon-instrument',
      path: '/spare',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 16,
          parentId: 1,
          name: '备件台账',
          path: '/spare/standing',
          action: false,
          displayNone: false
        },
        {
          id: 17,
          name: '备件入库单',
          parentId: 1,
          path: '/spare/storage',
          action: false,
          displayNone: false
        },
        {
          id: 18,
          name: '备件领用单',
          parentId: 1,
          path: '/spare/receive',
          action: false,
          displayNone: false
        }
      ]
    },
    {
      id: -2,
      name: '经营分析报表',
      iconfontFont: '&#xe629;',
      iconfont: 'icon-device',
      path: '/manage',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 201,
          name: '设备动态推送',
          parentId: 1,
          path: '/manage/dynamic',
          action: false,
          displayNone: false
        },
        {
          id: 202,
          name: '点检巡检推送',
          icon: 'profile',
          parentId: 1,
          path: '/manage/check',
          action: false,
          displayNone: false,
        },
        {
          id: 203,
          name: '保养维护统计',
          parentId: 1,
          path: '/manage/protect',
          action: false,
          displayNone: false
        },{
          id: 204,
          name: '设备维修统计',
          parentId: 1,
          path: '/manage/repair',
          action: false,
          displayNone: false
        },
      ]
    },
    {
      id: -3,
      name: '基础信息',
      iconfont: 'icon-part',
      path: '/basic',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 1,
          parentId: 3,
          name: '机房',
          path: '/basic/computer',
          action: false,
          displayNone: false
        },
        {
          id: 2,
          name: '设备类型',
          parentId: 3,
          path: '/basic/type',
          action: false,
          displayNone: false
        },
        {
          id: 3,
          name: '部门',
          parentId: 3,
          path: '/basic/department',
          action: false,
          displayNone: false
        },
        {
          id: 4,
          parentId: 3,
          name: '设备状态',
          path: '/basic/state',
          action: false,
          displayNone: false
        },
        {
          id: 5,
          name: '保养等级与频次',
          parentId: 3,
          path: '/basic/level',
          action: false,
          displayNone: false
        },
        {
          id: 6,
          name: '仓库',
          parentId: 3,
          path: '/basic/storage',
          action: false,
          displayNone: false
        },
        {
          id: 7,
          parentId: 3,
          name: '单位',
          path: '/basic/unit',
          action: false,
          displayNone: false
        },
        {
          id: 8,
          name: '安装地点',
          parentId: 3,
          path: '/basic/location',
          action: false,
          displayNone: false
        }
      ]
    },
    {
      id: -4,
      name: '设备点检巡检',
      iconfont: 'icon-chart',
      path: '/device',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 9,
          parentId: 4,
          name: '设备巡检单',
          path: '/device/list',
          action: false,
          displayNone: false
        },
        {
          id: 10,
          parentId: 4,
          name: '巡检方案',
          path: '/device/plan',
          action: false,
          displayNone: false
        },
        {
          id: 11,
          parentId: 4,
          name: '巡检内容计划',
          path: '/device/content',
          action: false,
          displayNone: false
        },
        {
          id: 12,
          parentId: 4,
          name: '巡检时间计划',
          path: '/device/time',
          action: false,
          displayNone: false
        }
      ]
    },
    {
      id: -5,
      name: '设备维修报修',
      iconfont: 'icon-system',
      path: '/equipment',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 13,
          parentId: 5,
          name: '设备报修单',
          path: '/equipment/list',
          action: false,
          displayNone: false
        },
      ]
    },
    {
      id: -6,
      name: '设备维护保养',
      iconfont: 'icon-system',
      path: '/maintenance',
      action: false,
      displayNone: false,
      leafMenuModels: [
        {
          id: 14,
          parentId: 6,
          name: '设备保养单',
          path: '/maintenance/list',
          action: false,
          displayNone: false
        },
        {
          id: 15,
          parentId: 6,
          name: '保养计划基础表',
          path: '/maintenance/base',
          action: false,
          displayNone: false
        },
        {
          id: 603,
          parentId: 6,
          name: '设备保养日历',
          path: '/maintenance/date',
          action: false,
          displayNone: false
        }
      ]
    },
  ]
};





// 媒体查询 ： 条件
export const Media_Query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
};
export const s_size = ['screen-xs'];
export const m_size = ['screen-sm', 'screen-md'];
export const l_size = ['screen-lg', 'screen-xl', 'screen-xxl'];
