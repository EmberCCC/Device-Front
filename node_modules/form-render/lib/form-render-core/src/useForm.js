"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodashEs = require("lodash-es");

var _react = require("react");

var _hooks = require("./hooks");

var _processData = require("./processData");

var _utils = require("./utils");

var _validator = require("./validator");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useForm = function useForm(props) {
  var _ref = props || {},
      _formData = _ref.formData,
      _onChange = _ref.onChange,
      _onValidate = _ref.onValidate,
      _showValidate = _ref.showValidate,
      _logOnMount = _ref.logOnMount,
      _logOnSubmit = _ref.logOnSubmit;

  var logOnMount = _logOnMount || window.FR_LOGGER && window.FR_LOGGER.logOnMount;
  var logOnSubmit = _logOnSubmit || window.FR_LOGGER && window.FR_LOGGER.logOnSubmit;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      renderCount = _useState2[0],
      forceRender = _useState2[1];

  var _useSet = (0, _hooks.useSet)({
    formData: {},
    submitData: {},
    errorFields: [],
    outErrorFields: [],
    isValidating: false,
    // 是否在提交状态
    outsideValidating: false,
    // 是否开始外部校验，没有外部校验回传的场景，一直是false
    isSubmitting: false,
    isEditing: false,
    // 是否在编辑状态。主要用于优化体验，用户编辑时减少不必要的运算
    allTouched: false,
    // 是否所有表单元素都被碰过了（一键开关，用于提交的时候，默认所有都被touch了）
    touchedKeys: [],
    // 碰过的key（用于submit之前，判断哪些被碰过了）
    flatten: {},
    // schema 的转换结构，便于处理
    finalFlatten: {},
    // 表达式等被处理过的flatten，用于渲染
    firstMount: true
  }),
      _useSet2 = _slicedToArray(_useSet, 2),
      state = _useSet2[0],
      setState = _useSet2[1];

  var schemaRef = (0, _react.useRef)();
  var beforeFinishRef = (0, _react.useRef)();
  var localeRef = (0, _react.useRef)('cn');
  var removeHiddenDataRef = (0, _react.useRef)();
  var validateMessagesRef = (0, _react.useRef)();

  var _data = (0, _react.useRef)({}); // 用ref是为了破除闭包的影响


  var _flatten = (0, _react.useRef)({}); // 用ref是为了破除闭包的影响


  var _finalFlatten = (0, _react.useRef)({}); // 用ref是为了破除闭包的影响


  var _touchedKeys = (0, _react.useRef)([]); // 用ref是为了破除闭包的影响


  var _errorFields = (0, _react.useRef)();

  var _outErrorFields = (0, _react.useRef)();

  var _allErrors = (0, _react.useRef)([]); // 内部和外部的错误的合并


  var innerData = state.formData,
      submitData = state.submitData,
      _state$errorFields = state.errorFields,
      errorFields = _state$errorFields === void 0 ? [] : _state$errorFields,
      _state$outErrorFields = state.outErrorFields,
      outErrorFields = _state$outErrorFields === void 0 ? [] : _state$outErrorFields,
      isValidating = state.isValidating,
      outsideValidating = state.outsideValidating,
      isSubmitting = state.isSubmitting,
      isEditing = state.isEditing,
      allTouched = state.allTouched,
      touchedKeys = state.touchedKeys,
      flatten = state.flatten,
      finalFlatten = state.finalFlatten,
      firstMount = state.firstMount;
  _errorFields.current = errorFields;
  _outErrorFields.current = outErrorFields;
  _touchedKeys.current = touchedKeys;
  _flatten.current = flatten;
  _finalFlatten.current = finalFlatten;
  var dataFromOutside = props && props.hasOwnProperty('formData');
  var formData = dataFromOutside ? _formData : innerData; // 生成一个基础结构，确保对象内的必填元素也被校验

  _data.current = (0, _react.useMemo)(function () {
    if (schemaRef.current) {
      return (0, _utils.generateDataSkeleton)(schemaRef.current, formData);
    }

    return {};
  }, [JSON.stringify(formData), JSON.stringify(schemaRef.current)]);
  _allErrors.current = (0, _react.useMemo)(function () {
    if (Array.isArray(_errorFields.current) && Array.isArray(_outErrorFields.current) && _outErrorFields.current.length > 0) {
      var mergeErrors = [].concat(_toConsumableArray(_errorFields.current), _toConsumableArray(_outErrorFields.current));
      return (0, _lodashEs.sortedUniqBy)(mergeErrors, function (item) {
        return item.name;
      });
    } else {
      return _errorFields.current;
    }
  }, [JSON.stringify(_errorFields.current), JSON.stringify(_outErrorFields.current)]);
  (0, _react.useEffect)(function () {
    if (schemaRef.current && firstMount) {
      var _flatten2 = (0, _utils.flattenSchema)(schemaRef.current);

      setState({
        flatten: _flatten2,
        firstMount: false
      });
    }
  }, [JSON.stringify(schemaRef.current), firstMount]); // 统一的处理expression

  (0, _react.useEffect)(function () {
    if (firstMount) {
      return;
    }

    var newFlatten = (0, _utils.clone)(_flatten.current);
    Object.entries(_flatten.current).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          path = _ref3[0],
          info = _ref3[1];

      if ((0, _utils.schemaContainsExpression)(info.schema)) {
        var arrayLikeIndex = path.indexOf(']');
        var isArrayItem = arrayLikeIndex > -1 && arrayLikeIndex < path.length - 1;
        var hasRootValue = JSON.stringify(info.schema).indexOf('rootValue') > -1;

        if (isArrayItem && hasRootValue) {// do nothing
        } else {
          newFlatten[path].schema = (0, _utils.parseAllExpression)(info.schema, _data.current, path);
        }
      }
    });
    setState({
      finalFlatten: newFlatten
    });
  }, [JSON.stringify(_flatten.current), JSON.stringify(_data.current), firstMount]); // All form methods are down here ----------------------------------------------------------------
  // 两个兼容 0.x 的函数

  var _setData = function _setData(data) {
    if (typeof _onChange === 'function') {
      _onChange(data);
    } else {
      setState({
        formData: data
      });
    }
  }; // Allow function to get the old value


  var _setErrors = function _setErrors(errors) {
    if (typeof _onValidate === 'function') {
      var oldFormatErrors = errors ? errors.map(function (item) {
        return item.name;
      }) : [];

      _onValidate(oldFormatErrors);
    }

    if (typeof errors === 'function') {
      setState(function (_ref4) {
        var errorFields = _ref4.errorFields;
        return {
          errorFields: errors(errorFields)
        };
      });
    } else {
      setState({
        errorFields: errors
      });
    }
  };

  var setFirstMount = function setFirstMount(value) {
    setState({
      firstMount: value
    });
  };

  var touchKey = function touchKey(key) {
    if (_touchedKeys.current.indexOf(key) > -1) {
      return;
    }

    var newKeyList = [].concat(_toConsumableArray(_touchedKeys.current), [key]);
    setState({
      touchedKeys: newKeyList
    });
  };

  var removeTouched = function removeTouched(key) {
    var newTouch = _touchedKeys.current.filter(function (item) {
      return item.indexOf(key) === -1;
    });

    setState({
      touchedKeys: newTouch
    });
  };

  var changeTouchedKeys = function changeTouchedKeys(newTouchedKeys) {
    setState({
      touchedKeys: newTouchedKeys
    });
  };

  var setEditing = function setEditing(isEditing) {
    setState({
      isEditing: isEditing
    });
  };

  var onItemChange = function onItemChange(path, value) {
    if (typeof path !== 'string') return;

    if (path === '#') {
      _setData(_objectSpread({}, value));

      return;
    }

    (0, _lodashEs.set)(_data.current, path, value);

    _setData(_objectSpread({}, _data.current));
  }; // errorFields: [
  //   { name: 'a.b.c', errors: ['Please input your Password!', 'something else is wrong'] },
  // ]


  var syncStuff = function syncStuff(_ref5) {
    var schema = _ref5.schema,
        locale = _ref5.locale,
        validateMessages = _ref5.validateMessages,
        beforeFinish = _ref5.beforeFinish,
        removeHiddenData = _ref5.removeHiddenData;
    schemaRef.current = schema;
    localeRef.current = locale;
    validateMessagesRef.current = validateMessages;
    beforeFinishRef.current = beforeFinish;
    removeHiddenDataRef.current = removeHiddenData;
    forceRender(renderCount + 1);
  };

  var setSchema = function setSchema(settings) {
    var newFlatten = (0, _utils.clone)(_flatten.current);

    try {
      Object.keys(settings).forEach(function (path) {
        if (!_flatten.current[path]) {
          console.error("path\uFF1A'".concat(path, "' \u4E0D\u5B58\u5728(form.setSchemaByPath)"));
        } else {
          var newSchema = settings[path];

          var _newSchema = typeof newSchema === 'function' ? newSchema(newFlatten[path].schema) : newSchema;

          newFlatten[path].schema = _objectSpread(_objectSpread({}, newFlatten[path].schema), _newSchema);
        }
      });
      setState({
        flatten: newFlatten
      });
      _flatten.current = newFlatten;
    } catch (error) {
      console.error(error, 'setSchema');
    }
  };

  var setSchemaByPath = function setSchemaByPath(path, newSchema) {
    if (!_flatten.current[path]) {
      console.error("path\uFF1A'".concat(path, "' \u4E0D\u5B58\u5728(form.setSchemaByPath)"));
      return;
    }

    var newFlatten = (0, _utils.clone)(_flatten.current);

    try {
      var _newSchema = typeof newSchema === 'function' ? newSchema(newFlatten[path].schema) : newSchema;

      newFlatten[path].schema = _objectSpread(_objectSpread({}, newFlatten[path].schema), _newSchema);
      setState({
        flatten: newFlatten
      });
      _flatten.current = newFlatten;
    } catch (error) {
      console.error(error, 'setSchemaByPath');
    }
  };

  var getSchemaByPath = function getSchemaByPath(path) {
    try {
      return _flatten.current[path].schema;
    } catch (error) {
      console.log(error, 'getSchemaByPath');
      return {};
    }
  }; // TODO: better implementation needed


  var setErrorFields = function setErrorFields(error) {
    var newErrorFields = [];

    if (Array.isArray(error)) {
      newErrorFields = [].concat(_toConsumableArray(error), _toConsumableArray(_outErrorFields.current));
    } else if (error && error.name) {
      newErrorFields = [error].concat(_toConsumableArray(_outErrorFields.current));
    } else {
      console.log('error format is wrong');
    }

    newErrorFields = (0, _lodashEs.sortedUniqBy)(newErrorFields, function (item) {
      return item.name;
    });
    setState({
      outErrorFields: newErrorFields
    });
  };

  var removeErrorField = function removeErrorField(path) {
    var newError = _errorFields.current.filter(function (item) {
      return item.name.indexOf(path) === -1;
    });

    var newOutError = _outErrorFields.current.filter(function (item) {
      return item.name.indexOf(path) === -1;
    });

    setState({
      errorFields: newError,
      outErrorFields: newOutError
    });
  };

  var getValues = function getValues() {
    return (0, _processData.processData)(_data.current, _finalFlatten.current, removeHiddenDataRef.current);
  };

  var setValues = function setValues(newFormData) {
    var newData = (0, _processData.transformDataWithBind2)(newFormData, _flatten.current);

    _setData(newData);
  };

  var submit = function submit() {
    setState({
      isValidating: true,
      allTouched: true,
      isSubmitting: false
    }); //  https://formik.org/docs/guides/form-submission

    return (0, _validator.validateAll)({
      formData: _data.current,
      flatten: _finalFlatten.current,
      options: {
        locale: localeRef.current,
        validateMessages: validateMessagesRef.current
      }
    }).then(function (errors) {
      setState({
        errorFields: errors
      });

      var _errors = (0, _lodashEs.sortedUniqBy)([].concat(_toConsumableArray(errors || []), _toConsumableArray(_outErrorFields.current)), function (item) {
        return item.name;
      });

      if (typeof beforeFinishRef.current === 'function') {
        return Promise.resolve((0, _processData.processData)(_data.current, _finalFlatten.current, removeHiddenDataRef.current)).then(function (res) {
          setState({
            isValidating: true,
            isSubmitting: false,
            outsideValidating: true,
            submitData: res
          });
          return {
            data: res,
            errors: _errors
          };
        });
      }

      return Promise.resolve((0, _processData.processData)(_data.current, _finalFlatten.current, removeHiddenDataRef.current)).then(function (res) {
        setState({
          isValidating: false,
          isSubmitting: true,
          submitData: res
        });
        return {
          data: res,
          errors: _errors
        };
      });
    }).catch(function (err) {
      // 不应该走到这边的
      console.log('submit error:', err);
      return err;
    });
  };

  var resetFields = function resetFields(options) {
    setState({
      formData: (options === null || options === void 0 ? void 0 : options.formData) || {},
      submitData: (options === null || options === void 0 ? void 0 : options.submitData) || {},
      errorFields: (options === null || options === void 0 ? void 0 : options.errorFields) || [],
      touchedKeys: (options === null || options === void 0 ? void 0 : options.touchedKeys) || [],
      allTouched: (options === null || options === void 0 ? void 0 : options.allTouched) || false
    });
  };

  var endValidating = function endValidating() {
    return setState({
      isValidating: false,
      outsideValidating: false,
      isSubmitting: true
    });
  };

  var endSubmitting = function endSubmitting() {
    return setState({
      isSubmitting: false,
      isValidating: false,
      outsideValidating: false
    });
  };

  var form = {
    // state
    formData: _data.current,
    schema: schemaRef.current,
    flatten: finalFlatten,
    touchedKeys: _touchedKeys.current,
    allTouched: allTouched,
    // methods
    touchKey: touchKey,
    removeTouched: removeTouched,
    changeTouchedKeys: changeTouchedKeys,
    onItemChange: onItemChange,
    setValueByPath: onItemChange,
    // 单个
    getSchemaByPath: getSchemaByPath,
    setSchemaByPath: setSchemaByPath,
    setSchema: setSchema,
    setValues: setValues,
    getValues: getValues,
    resetFields: resetFields,
    submit: submit,
    init: submit,
    // 简版的迁移方案里用，正常用不到，换个名字迁移的时候大家更好接受点
    submitData: submitData,
    errorFields: _allErrors.current,
    isValidating: isValidating,
    outsideValidating: outsideValidating,
    isSubmitting: isSubmitting,
    endValidating: endValidating,
    endSubmitting: endSubmitting,
    setErrorFields: setErrorFields,
    removeErrorField: removeErrorField,
    isEditing: isEditing,
    setEditing: setEditing,
    syncStuff: syncStuff,
    showValidate: _showValidate,
    // firstMount,
    setFirstMount: setFirstMount,
    // logs
    logOnMount: logOnMount,
    logOnSubmit: logOnSubmit,
    // inner api, DON'T USE
    _setErrors: _setErrors
  };
  return form;
};

var _default = useForm;
exports.default = _default;