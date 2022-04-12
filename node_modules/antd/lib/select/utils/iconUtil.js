"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getIcons;

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getIcons(_ref) {
  var suffixIcon = _ref.suffixIcon,
      clearIcon = _ref.clearIcon,
      menuItemSelectedIcon = _ref.menuItemSelectedIcon,
      removeIcon = _ref.removeIcon,
      loading = _ref.loading,
      multiple = _ref.multiple;
  // Clear Icon
  var mergedClearIcon = clearIcon;

  if (!clearIcon) {
    mergedClearIcon = _react["default"].createElement(_icons.CloseCircleFilled, null);
  } // Arrow item icon


  var mergedSuffixIcon = null;

  if (suffixIcon !== undefined) {
    mergedSuffixIcon = suffixIcon;
  } else if (loading) {
    mergedSuffixIcon = _react["default"].createElement(_icons.LoadingOutlined, {
      spin: true
    });
  } else {
    mergedSuffixIcon = function mergedSuffixIcon(_ref2) {
      var open = _ref2.open,
          showSearch = _ref2.showSearch;

      if (open && showSearch) {
        return _react["default"].createElement(_icons.SearchOutlined, null);
      }

      return _react["default"].createElement(_icons.DownOutlined, null);
    };
  } // Checked item icon


  var mergedItemIcon = null;

  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    mergedItemIcon = _react["default"].createElement(_icons.CheckOutlined, null);
  } else {
    mergedItemIcon = null;
  }

  var mergedRemoveIcon = null;

  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon;
  } else {
    mergedRemoveIcon = _react["default"].createElement(_icons.CloseOutlined, null);
  }

  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon
  };
}
//# sourceMappingURL=iconUtil.js.map
