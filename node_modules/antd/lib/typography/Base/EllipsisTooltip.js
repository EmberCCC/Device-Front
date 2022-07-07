"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _tooltip = _interopRequireDefault(require("../../tooltip"));

var EllipsisTooltip = function EllipsisTooltip(_ref) {
  var title = _ref.title,
      enabledEllipsis = _ref.enabledEllipsis,
      isEllipsis = _ref.isEllipsis,
      children = _ref.children;

  if (!title || !enabledEllipsis) {
    return children;
  }

  return /*#__PURE__*/React.createElement(_tooltip["default"], {
    title: title,
    visible: isEllipsis ? undefined : false
  }, children);
};

if (process.env.NODE_ENV !== 'production') {
  EllipsisTooltip.displayName = 'EllipsisTooltip';
}

var _default = EllipsisTooltip;
exports["default"] = _default;