"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extraSchemaList = void 0;
exports.getWidgetName = getWidgetName;
exports.mapping = void 0;
var mapping = {
  default: 'input',
  string: 'input',
  array: 'list',
  boolean: 'checkbox',
  integer: 'number',
  number: 'number',
  object: 'map',
  html: 'html',
  'string:upload': 'upload',
  'string:url': 'url',
  'string:dateTime': 'date',
  'string:date': 'date',
  'string:year': 'date',
  'string:month': 'date',
  'string:week': 'date',
  'string:quarter': 'date',
  'string:time': 'time',
  'string:textarea': 'textarea',
  'string:color': 'color',
  'string:image': 'imageInput',
  'range:time': 'timeRange',
  'range:dateTime': 'dateRange',
  'range:date': 'dateRange',
  'range:year': 'dateRange',
  'range:month': 'dateRange',
  'range:week': 'dateRange',
  'range:quarter': 'dateRange',
  '*?enum': 'radio',
  '*?enum_long': 'select',
  'array?enum': 'checkboxes',
  'array?enum_long': 'multiSelect',
  '*?readOnly': 'html' // TODO: html widgets for list / object

};
exports.mapping = mapping;

function getWidgetName(schema) {
  var _mapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mapping;

  var type = schema.type,
      format = schema.format,
      enums = schema.enum,
      readOnly = schema.readOnly,
      widget = schema.widget; // 如果已经注明了渲染widget，那最好
  // if (schema['ui:widget']) {
  //   return schema['ui:widget'];
  // }

  var list = [];

  if (readOnly) {
    list.push("".concat(type, "?readOnly"));
    list.push('*?readOnly');
  }

  if (enums) {
    // 根据enum长度来智能选择控件
    if (Array.isArray(enums) && (type === 'array' && enums.length > 6 || type !== 'array' && enums.length > 2)) {
      list.push("".concat(type, "?enum_long"));
      list.push('*?enum_long');
    } else {
      list.push("".concat(type, "?enum")); // array 默认使用list，array?enum 默认使用checkboxes，*?enum 默认使用select

      list.push('*?enum');
    }
  }

  var _widget = widget || format;

  if (_widget) {
    list.push("".concat(type, ":").concat(_widget));
  }

  list.push(type); // 放在最后兜底，其他都不match时使用type默认的组件

  var found = '';
  list.some(function (item) {
    found = _mapping[item];
    return !!found;
  });
  return found;
}

var extraSchemaList = {
  checkbox: {
    valuePropName: 'checked'
  },
  switch: {
    valuePropName: 'checked'
  }
};
exports.extraSchemaList = extraSchemaList;