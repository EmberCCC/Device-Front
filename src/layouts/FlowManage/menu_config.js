"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.useMenuConfig = exports.NsCustomMenuItems = void 0;
var xflow_1 = require("@antv/xflow");
var xflow_2 = require("@antv/xflow");
var xflow_3 = require("@antv/xflow");
var icons_1 = require("@ant-design/icons");
/** menuitem 配置 */
var NsCustomMenuItems;
(function (NsCustomMenuItems) {
    var _this = this;
    /** 注册菜单依赖的icon */
    xflow_3.IconStore.set('DeleteOutlined', icons_1.DeleteOutlined);
    xflow_3.IconStore.set('EditOutlined', icons_1.EditOutlined);
    xflow_3.IconStore.set('StopOutlined', icons_1.StopOutlined);
    NsCustomMenuItems.DELETE_EDGE = {
        id: xflow_3.XFlowEdgeCommands.DEL_EDGE.id,
        label: '删除边',
        hotkey: 'Delete',
        iconName: 'DeleteOutlined',
        onClick: function (_a) {
            var target = _a.target, commandService = _a.commandService;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    commandService.executeCommand(xflow_3.XFlowEdgeCommands.DEL_EDGE.id, {
                        edgeConfig: target.data
                    });
                    return [2 /*return*/];
                });
            });
        }
    };
    NsCustomMenuItems.DELETE_NODE = {
        id: xflow_3.XFlowNodeCommands.DEL_NODE.id,
        label: '删除节点',
        iconName: 'DeleteOutlined',
        hotkey: 'Delete',
        onClick: function (_a) {
            var target = _a.target, commandService = _a.commandService;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    commandService.executeCommand(xflow_3.XFlowNodeCommands.DEL_NODE.id, {
                        nodeConfig: { id: target.data.id }
                    });
                    return [2 /*return*/];
                });
            });
        }
    };
    NsCustomMenuItems.EMPTY_MENU = {
        id: 'EMPTY_MENU_ITEM',
        label: '暂无可用',
        isEnabled: false,
        iconName: 'DeleteOutlined',
        onClick: function (_a) {
            var target = _a.target, commandService = _a.commandService;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    commandService.executeCommand(xflow_3.XFlowNodeCommands.DEL_NODE.id, {
                        nodeConfig: { id: target.data.id }
                    });
                    return [2 /*return*/];
                });
            });
        }
    };
    NsCustomMenuItems.SEPARATOR = {
        id: 'separator',
        type: xflow_2.MenuItemType.Separator
    };
})(NsCustomMenuItems = exports.NsCustomMenuItems || (exports.NsCustomMenuItems = {}));
exports.useMenuConfig = (0, xflow_1.createCtxMenuConfig)(function (config) {
    config.setMenuModelService(function (data, model, modelService, toDispose) { return __awaiter(void 0, void 0, void 0, function () {
        var type, cell;
        return __generator(this, function (_a) {
            type = data.type, cell = data.cell;
            console.log(type);
            switch (type) {
                case 'node':
                    model.setValue({
                        id: 'root',
                        type: xflow_2.MenuItemType.Root,
                        submenu: [NsCustomMenuItems.DELETE_NODE]
                    });
                    break;
                case 'edge':
                    model.setValue({
                        id: 'root',
                        type: xflow_2.MenuItemType.Root,
                        submenu: [NsCustomMenuItems.DELETE_EDGE]
                    });
                    break;
                case 'blank':
                    model.setValue({
                        id: 'root',
                        type: xflow_2.MenuItemType.Root,
                        submenu: [NsCustomMenuItems.EMPTY_MENU]
                    });
                    break;
                default:
                    model.setValue({
                        id: 'root',
                        type: xflow_2.MenuItemType.Root,
                        submenu: [NsCustomMenuItems.EMPTY_MENU]
                    });
                    break;
            }
            return [2 /*return*/];
        });
    }); });
});
