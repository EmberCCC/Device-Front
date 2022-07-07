import "antd/es/time-picker/style";
import _TimePicker from "antd/es/time-picker";
var _excluded = ["onChange", "format", "value", "style"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import moment from 'moment';
import React from 'react';
import { getFormat } from '../../utils'; // TODO: 不要使用moment，使用dayjs

export default (function (_ref) {
  var onChange = _ref.onChange,
      format = _ref.format,
      value = _ref.value,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, _excluded);

  var timeFormat = getFormat(format);

  var _value = value ? moment(value, timeFormat) : undefined;

  var handleChange = function handleChange(value, string) {
    onChange(string);
  };

  var timeParams = _objectSpread({
    value: _value,
    style: _objectSpread({
      width: '100%'
    }, style),
    onChange: handleChange,
    format: timeFormat
  }, rest);

  return /*#__PURE__*/React.createElement(_TimePicker, timeParams);
});