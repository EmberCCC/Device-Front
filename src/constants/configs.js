export const MenuObj = [
  {
    "menuId": 1,
    "menuName": "经营分析报表",
    "simpleForms": []
  },
  {
    "menuId": 2,
    "menuName": "设备点检巡检",
    "simpleForms": [
      {
        "formId": 9,
        "formName": "设备巡检单",
        "type": 0
      },
      {
        "formId": 19,
        "formName": "巡检方案",
        "type": 1
      },
      {
        "formId": 20,
        "formName": "巡检内容计划",
        "type": 0
      },
      {
        "formId": 21,
        "formName": "巡检时间计划",
        "type": 0
      }
    ]
  },
  {
    "menuId": 3,
    "menuName": "设备维修保修",
    "simpleForms": [
      {
        "formId": 14,
        "formName": "设备报修单",
        "type": 1
      }
    ]
  },
  {
    "menuId": 4,
    "menuName": "设备维护保养",
    "simpleForms": [
      {
        "formId": 12,
        "formName": "设备保养单",
        "type": 0
      },
      {
        "formId": 13,
        "formName": "保养计划基础表",
        "type": 0
      }
    ]
  },
  {
    "menuId": 5,
    "menuName": "备品备件管理",
    "simpleForms": [
      {
        "formId": 10,
        "formName": "备件入库单",
        "type": 0
      },
      {
        "formId": 11,
        "formName": "备件领用单",
        "type": 0
      },
      {
        "formId": 16,
        "formName": "备件台账",
        "type": 0
      }
    ]
  },
  {
    "menuId": 6,
    "menuName": "基础信息",
    "simpleForms": [
      {
        "formId": 1,
        "formName": "机房",
        "type": 1
      },
      {
        "formId": 2,
        "formName": "设备类型",
        "type": 0
      },
      {
        "formId": 3,
        "formName": "部门",
        "type": 0
      },
      {
        "formId": 4,
        "formName": "设备状态",
        "type": 0
      },
      {
        "formId": 5,
        "formName": "保养等级与频次",
        "type": 0
      },
      {
        "formId": 6,
        "formName": "仓库",
        "type": 0
      },
      {
        "formId": 7,
        "formName": "单位",
        "type": 0
      },
      {
        "formId": 8,
        "formName": "安装地点",
        "type": 0
      }
    ]
  }
]





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
