function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import React from 'react';
export default function html(_ref) {
  var value = _ref.value,
      _ref$schema = _ref.schema,
      schema = _ref$schema === void 0 ? {} : _ref$schema;
  var __html = '-';

  if (schema.type === 'boolean') {
    __html = value === true ? '✔' : '✘';
  } else if (Array.isArray(schema.enum) && Array.isArray(schema.enumNames)) {
    if (['string', 'number'].indexOf(_typeof(value)) > -1) {
      var idx = schema.enum.indexOf(value);
      __html = schema.enumNames[idx] || '-';
    } else if (Array.isArray(value)) {
      var idxStr = '-';
      value.forEach(function (v) {
        var idx = schema.enum.indexOf(v);
        var name = schema.enumNames[idx];

        if (name) {
          idxStr += ',' + name;
        }
      });
      __html = idxStr.replace('-,', '');
    }
  } else if (typeof value === 'number') {
    __html = String(value);
  } else if (typeof value === 'string') {
    __html = value;
  } else if (schema.type === 'range' && Array.isArray(value) && value[0] && value[1]) {
    __html = "".concat(value[0], " - ").concat(value[1]);
  } else if (value && ['number', 'string'].indexOf(value) === -1) {
    __html = JSON.stringify(value);
  }

  return /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: __html
    }
  });
}