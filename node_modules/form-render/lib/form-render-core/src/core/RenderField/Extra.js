"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _hooks = require("../../hooks");

require("./Extra.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var Extra = function Extra(_ref) {
  var schema = _ref.schema;
  var extra = schema.extra;

  var _useTools = (0, _hooks.useTools)(),
      widgets = _useTools.widgets;

  if (!extra) return null; // widget 这个api也可以不对外

  var widgetName = extra.widget;
  var Widget = widgets[widgetName];
  if (Widget) return /*#__PURE__*/_react.default.createElement(Widget, {
    schema: schema
  });
  var __html = '';

  if (typeof extra === 'string') {
    __html = extra;
  } // 内部BU使用的口子，这个api不对外，也没有必要


  if (_typeof(extra) === 'object' && extra.text) {
    __html = extra.text;
  }

  return __html && /*#__PURE__*/_react.default.createElement("div", {
    className: "fr-form-item-extra",
    dangerouslySetInnerHTML: {
      __html: __html
    }
  });
};

var _default = Extra;
exports.default = _default;