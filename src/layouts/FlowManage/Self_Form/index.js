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