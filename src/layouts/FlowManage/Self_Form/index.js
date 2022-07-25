/*
 * @Author: EmberCCC 1810888456@qq.com
 * @Date: 2022-07-24 16:59:45
 * @LastEditors: EmberCCC 1810888456@qq.com
 * @LastEditTime: 2022-07-24 17:07:28
 * @FilePath: \bl-device-manage-test\src\layouts\FlowManage\Self_Form\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import AuthShape from './field_auth';
/** 自定义form控件 */
export var ControlShapeEnum;
(function (ControlShapeEnum) {
    ControlShapeEnum["AUTH_SHAPE"] = "AUTHSHAPE";
})(ControlShapeEnum || (ControlShapeEnum = {}));
export const controlMapService = controlMap => {
    controlMap.set(ControlShapeEnum.AUTH_SHAPE, AuthShape);
    return controlMap;
};