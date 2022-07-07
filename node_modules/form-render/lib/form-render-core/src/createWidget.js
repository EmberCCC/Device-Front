"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformProps = exports.createWidget = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

var _excluded = ["schema"],
    _excluded2 = ["onChange", "value", "defaultValue", "schema", "readOnly"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var createWidget = function createWidget(mapProps, extraSchema) {
  return function (Component) {
    return function (props) {
      var schema = props.schema,
          rest = _objectWithoutProperties(props, _excluded);

      var _schema = _objectSpread(_objectSpread({}, schema), extraSchema);

      var propsMap = typeof mapProps === 'function' ? mapProps(_objectSpread({
        schema: _schema
      }, rest)) : {};

      var _props = _objectSpread(_objectSpread({
        schema: _schema
      }, rest), propsMap);

      var finalProps = transformProps(_props);
      return /*#__PURE__*/_react.default.createElement(Component, finalProps);
    };
  };
};

exports.createWidget = createWidget;

var transformProps = function transformProps(props) {
  var onChange = props.onChange,
      value = props.value,
      defaultValue = props.defaultValue,
      ownSchema = props.schema,
      readOnly = props.readOnly,
      rest = _objectWithoutProperties(props, _excluded2);

  var schema = _objectSpread({}, ownSchema);

  var _ref = schema || {},
      trigger = _ref.trigger,
      valuePropName = _ref.valuePropName;

  var controlProps = {};
  var _valuePropName = 'value';

  var _value = value === undefined ? defaultValue : value;

  if (valuePropName && typeof valuePropName === 'string') {
    _valuePropName = valuePropName;
    controlProps[valuePropName] = _value;
  } else {
    controlProps.value = _value;
  }

  var _onChange = function _onChange() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var newValue = _utils.defaultGetValueFromEvent.apply(void 0, [_valuePropName].concat(args));

    onChange(newValue);
  };

  if (trigger && typeof trigger === 'string') {
    controlProps.onChange = _onChange;
    controlProps[trigger] = _onChange;
  } else {
    controlProps.onChange = _onChange;
  }

  var usefulPropsFromSchema = {
    disabled: schema.disabled || schema['ui:disabled'],
    readOnly: schema.readOnly || schema['ui:readonly'] || readOnly,
    hidden: schema.hidden || schema['ui:hidden']
  };

  var _props = _objectSpread(_objectSpread(_objectSpread({}, controlProps), {}, {
    schema: schema
  }, usefulPropsFromSchema), rest);

  return _props;
};

exports.transformProps = transformProps;