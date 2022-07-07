"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function map(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "w-100"
  }, children);
}