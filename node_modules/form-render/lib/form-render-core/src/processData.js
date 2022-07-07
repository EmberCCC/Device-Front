"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformDataWithBind2 = exports.transformDataWithBind = exports.processData = void 0;

var _lodashEs = require("lodash-es");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 提交前需要先处理formData的逻辑
var processData = function processData(data, flatten, removeHiddenData) {
  // 1. 去掉 hidden = true 的元素
  var _data = (0, _utils.clone)(data);

  if (removeHiddenData) {
    _data = (0, _utils.removeHiddenFromResult)(data, flatten);
  } // 2. bind 的处理


  _data = transformDataWithBind(_data, flatten); // 3. 去掉list里面所有的空值

  _data = (0, _utils.removeEmptyItemFromList)(_data); // 4. 去掉所有的 undefined

  _data = (0, _utils.cleanEmpty)(_data);
  return _data;
};

exports.processData = processData;

var transformDataWithBind = function transformDataWithBind(data, flatten) {
  var _data = data;
  var unbindKeys = [];
  var bindKeys = [];
  var bindArrKeys = [];

  var isMultiBind = function isMultiBind(bind) {
    return Array.isArray(bind) && bind.every(function (item) {
      return typeof item === 'string';
    });
  };

  Object.keys(flatten).forEach(function (key) {
    var bind = flatten[key] && flatten[key].schema && flatten[key].schema.bind;

    var _key = key.replace('[]', '');

    if (bind === false) {
      unbindKeys.push(_key);
    } else if (typeof bind === 'string') {
      bindKeys.push({
        key: _key,
        bind: bind
      });
    } else if (isMultiBind(bind)) {
      bindArrKeys.push({
        key: _key,
        bind: bind
      });
    }
  });

  var handleBindData = function handleBindData(formData) {
    unbindKeys.forEach(function (key) {
      (0, _lodashEs.unset)(formData, key); // TODO: maybe removing upper structure
    });
    bindKeys.forEach(function (item) {
      var key = item.key,
          bind = item.bind;
      var temp = (0, _lodashEs.get)(formData, key);
      var oldVal = (0, _lodashEs.get)(formData, bind);

      if ((0, _utils.isObject)(oldVal)) {
        temp = _objectSpread(_objectSpread({}, oldVal), temp);
      }

      (0, _lodashEs.set)(formData, bind, temp);
      (0, _lodashEs.unset)(formData, key);
    });
    bindArrKeys.forEach(function (item) {
      var key = item.key,
          bind = item.bind;
      var temp = (0, _lodashEs.get)(formData, key);
      (0, _lodashEs.unset)(formData, key);

      if (Array.isArray(temp)) {
        temp.forEach(function (t, i) {
          if (bind[i]) {
            (0, _lodashEs.set)(formData, bind[i], t);
          }
        });
      }
    });
  };

  handleBindData(_data);
  return _data;
};

exports.transformDataWithBind = transformDataWithBind;

var transformDataWithBind2 = function transformDataWithBind2(data, flatten) {
  var _data = (0, _utils.clone)(data);

  var bindKeys = [];
  var bindArrKeys = [];

  var isMultiBind = function isMultiBind(bind) {
    return Array.isArray(bind) && bind.every(function (item) {
      return typeof item === 'string';
    });
  };

  Object.keys(flatten).forEach(function (key) {
    var bind = flatten[key] && flatten[key].schema && flatten[key].schema.bind;

    var _key = key.replace('[]', '');

    if (typeof bind === 'string') {
      bindKeys.push({
        key: _key,
        bind: bind
      });
    } else if (isMultiBind(bind)) {
      bindArrKeys.push({
        key: _key,
        bind: bind
      });
    }
  });

  var handleBindData2 = function handleBindData2(newData) {
    bindKeys.forEach(function (item) {
      var key = item.key,
          bind = item.bind;
      var temp = (0, _lodashEs.get)(newData, bind); // 如果已经有值了，要和原来的值合并，而不是覆盖

      var oldVal = (0, _lodashEs.get)(newData, key);

      if ((0, _utils.isObject)(oldVal)) {
        temp = _objectSpread(_objectSpread({}, oldVal), temp);
      }

      (0, _lodashEs.set)(newData, key, temp);
      (0, _lodashEs.unset)(newData, bind);
    });
    bindArrKeys.forEach(function (item) {
      var key = item.key,
          bind = item.bind;
      var temp = [];
      bind.forEach(function (b) {
        var bindValue = (0, _lodashEs.get)(newData, b);

        if (bindValue !== undefined) {
          temp.push(bindValue);
        }

        (0, _lodashEs.unset)(newData, b);
      });

      if (temp.length > 0) {
        (0, _lodashEs.set)(newData, key, temp);
      }
    });
  };

  handleBindData2(_data);
  return _data;
};

exports.transformDataWithBind2 = transformDataWithBind2;