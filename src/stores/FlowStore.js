/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-25 14:57:26
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-08-01 07:22:50
 * @FilePath: \bl-device-manage-test\src\stores\FlowStore.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import * as services from '../services/flow';
import { action, makeObservable, observable } from "mobx"
import { isDataExist } from 'utils/dataTools';
import { message } from 'antd';

class Flow {
    constructor() {
        makeObservable(this)
    }
    @observable loading = true;
    @observable flowProperty = {
        'nodes': [],
        'edges': [],
        "flowProperty": {
            "wx": false,
            "mail": false,
            "withdraw": false,
            "cuiBan": false,
            "see": false,
            "rule": 0,
        }
    }
    @observable type = 1
    @observable canOb = false;
    @observable allFlowList = []
    @observable flowversion = 0 /** 0:未启用 -1:没有流程 */
    @observable ableversion = 0

    @observable picture = {
        'nodes': [],
        'edges': [],
        "flowProperty": {
            "wx": false,
            "mail": false,
            "withdraw": false,
            "cuiBan": false,
            "see": false,
            "rule": 0,
        }
    }
    @action.bound setValue(key, value) {
        this[key] = value
    }
    @action.bound async getOneFlow(params) {
        try {
            let res = await services.getRequest(services.requestList.getOneFlow, params)
            if (isDataExist(res)) {
                console.log(res.data.data);
                this.setValue('allFlowList', res.data.data)
                if (this.canOb == false) {
                    if (res.data.data.length == 0) {
                        this.setValue('flowversion', -1)
                    } else {
                        res.data.data.forEach(element => {
                            if (element['enable'] == true) {
                                this.setValue('flowversion', element['id'])
                                this.setValue('ableversion', element['id'])
                                this.setValue('flowProperty', JSON.parse(element['origin']))
                                return;
                            }
                        });
                    }
                }
                if (res.data.data.length == 0) {
                    this.setValue('canOb', true);
                    this.setValue('flowProperty', {
                        "nodes": [
                            {
                                "id": -1,
                                "name": "开始节点",
                                "label": "开始节点",
                                "typeId": "-1",
                                "auth_info": {

                                },
                                "charge_person": {
                                    "department": [

                                    ],
                                    "role": [

                                    ],
                                    "user": [

                                    ]
                                },
                                "copy": false,
                                "x": 410,
                                "y": 120,
                                "width": 180,
                                "height": 38,
                                "ports": {
                                    "groups": {
                                        "top": {
                                            "position": "top",
                                            "attrs": {
                                                "circle": {
                                                    "r": 4,
                                                    "magnet": true,
                                                    "stroke": "#5F95FF",
                                                    "strokeWidth": 1,
                                                    "fill": "#fff"
                                                }
                                            }
                                        },
                                        "right": {
                                            "position": "right",
                                            "attrs": {
                                                "circle": {
                                                    "r": 4,
                                                    "magnet": true,
                                                    "stroke": "#5F95FF",
                                                    "strokeWidth": 1,
                                                    "fill": "#fff"
                                                }
                                            }
                                        },
                                        "bottom": {
                                            "position": "bottom",
                                            "attrs": {
                                                "circle": {
                                                    "r": 4,
                                                    "magnet": true,
                                                    "stroke": "#5F95FF",
                                                    "strokeWidth": 1,
                                                    "fill": "#fff"
                                                }
                                            }
                                        },
                                        "left": {
                                            "position": "left",
                                            "attrs": {
                                                "circle": {
                                                    "r": 4,
                                                    "magnet": true,
                                                    "stroke": "#5F95FF",
                                                    "strokeWidth": 1,
                                                    "fill": "#fff"
                                                }
                                            }
                                        }
                                    },
                                    "items": [
                                        {
                                            "group": "top",
                                            "id": "fuImaKPSV-UIdAa8rT8pm"
                                        },
                                        {
                                            "group": "right",
                                            "id": "Iy3ivGVELoZwmp_Z8pDak"
                                        },
                                        {
                                            "group": "bottom",
                                            "id": "1sOowdo1pCRmA0KW3sXKj"
                                        },
                                        {
                                            "group": "left",
                                            "id": "0QJUiwOKXWSYIqXaFXDd6"
                                        }
                                    ]
                                }
                            },
                            {
                                "id": -2,
                                "name": "结束节点",
                                "label": "结束节点",
                                "typeId": "-2",
                                "auth_info": {

                                },
                                "charge_person": {
                                    "department": [

                                    ],
                                    "role": [

                                    ],
                                    "user": [

                                    ]
                                },
                                "copy": false,
                                "x": 410,
                                "y": 360,
                                "width": 180,
                                "height": 38,
                                "ports": {
                                    "groups": {
                                        "top": {
                                            "position": "top",
                                            "attrs": {
                                                "circle": {
                                                    "r": 4,
                                                    "magnet": true,
                                                    "stroke": "#5F95FF",
                                                    "strokeWidth": 1,
                                                    "fill": "#fff"
                                                }
                                            }
                                        },
                                        "right": {
                                            "position": "right",
                                            "attrs": {
                                                "circle": {
                                                    "r": 4,
                                                    "magnet": true,
                                                    "stroke": "#5F95FF",
                                                    "strokeWidth": 1,
                                                    "fill": "#fff"
                                                }
                                            }
                                        },
                                        "bottom": {
                                            "position": "bottom",
                                            "attrs": {
                                                "circle": {
                                                    "r": 4,
                                                    "magnet": true,
                                                    "stroke": "#5F95FF",
                                                    "strokeWidth": 1,
                                                    "fill": "#fff"
                                                }
                                            }
                                        },
                                        "left": {
                                            "position": "left",
                                            "attrs": {
                                                "circle": {
                                                    "r": 4,
                                                    "magnet": true,
                                                    "stroke": "#5F95FF",
                                                    "strokeWidth": 1,
                                                    "fill": "#fff"
                                                }
                                            }
                                        }
                                    },
                                    "items": [
                                        {
                                            "group": "top",
                                            "id": "zTE8F8NBaOKm51De-Wn3Q"
                                        },
                                        {
                                            "group": "right",
                                            "id": "QwASLVDGdtc4TUIPC2b4_"
                                        },
                                        {
                                            "group": "bottom",
                                            "id": "glfIPhpnA3iDu28ycQKlR"
                                        },
                                        {
                                            "group": "left",
                                            "id": "P89GfZ-Qvzx9jriu9-00O"
                                        }
                                    ]
                                }
                            }
                        ],
                        "edges": [],
                        "flowProperty": {
                            "wx": false,
                            "mail": false,
                            "withdraw": false,
                            "cuiBan": false,
                            "see": true,
                            "rule": 0
                        }
                    })
                }
                if (this.flowversion == 0) {
                    this.setValue('flowversion', res.data.data[res.data.data.length - 1]['id'])
                    this.setValue('flowProperty', JSON.parse(res.data.data[res.data.data.length - 1]['origin']))
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async getShowFlow(params) {
        try {
            let res = await services.getRequest(services.requestList.showOneFlow, params)
            if (isDataExist(res)) {
                console.log(JSON.parse(res.data.data));
                this.setValue('picture', JSON.parse(res.data.data))
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async createFlow(params) {
        try {
            let res = await services.putRequest(services.requestList.createFlow, params)
            if (isDataExist(res)) {
                message.success('创建成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async openFlow(params) {
        try {
            let res = await services.putUrlRequest(services.requestList.openFlow, params)
            if (isDataExist(res)) {
                message.success('启用成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async updateFlow(params) {
        try {
            let res = await services.putRequest(services.requestList.updateFlow, params)
            if (isDataExist(res)) {
                message.success('修改成功')
            }
        } catch (error) {
            console.log(error);
        }
    }
    @action.bound async agreeFlow(urlData, params) {
        try {
            let res = await services.putUrlRequest(services.requestList.agreeFlow, urlData, params)
            if (isDataExist(res)) {
                message.success('成功')
            }
        } catch (error) {
            console.log(error);
        }
    }

}


let FlowStore = new Flow()
export default FlowStore