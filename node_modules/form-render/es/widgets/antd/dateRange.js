import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";
var _excluded = ["onChange", "format", "value", "style"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import moment from 'moment';
import React from 'react';
import { getFormat } from '../../utils';
var RangePicker = _DatePicker.RangePicker;

var DateRange = function DateRange(_ref) {
  var onChange = _ref.onChange,
      format = _ref.format,
      value = _ref.value,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, _excluded);

  var dateFormat = getFormat(format);

  var _ref2 = Array.isArray(value) ? value : [],
      _ref3 = _slicedToArray(_ref2, 2),
      start = _ref3[0],
      end = _ref3[1]; // week的时候会返回 2020-31周 quarter会返回 2020-Q2 需要处理之后才能被 moment


  if (typeof start === 'string' && typeof end === 'string') {
    if (format === 'week') {
      start = start.substring(0, start.length - 1);
      end = end.substring(0, end.length - 1);
    }

    if (format === 'quarter') {
      start = start.replace('Q', '');
      end = end.replace('Q', '');
    }
  }

  var _value = [];

  if (start && end) {
    _value = [moment(start, dateFormat), moment(end, dateFormat)];
  }

  var handleChange = function handleChange(val, stringList) {
    var emptyList1 = stringList[0] === '' || stringList[1] === '';
    var emptyList2 = stringList[0] === undefined || stringList[1] === undefined;

    if (emptyList1 || emptyList2) {
      onChange(null);
    } else {
      onChange(stringList);
    }
  };

  var dateParams = {
    value: _value,
    style: _objectSpread({
      width: '100%'
    }, style),
    onChange: handleChange
  }; // TODO: format是在options里自定义的情况，是否要判断一下要不要showTime

  if (format === 'dateTime') {
    dateParams.showTime = true;
  }

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  dateParams = _objectSpread(_objectSpread({}, dateParams), rest);

  if (dateFormat === format) {
    dateParams.format = format;
  }

  return /*#__PURE__*/React.createElement(RangePicker, dateParams);
};

export default DateRange;