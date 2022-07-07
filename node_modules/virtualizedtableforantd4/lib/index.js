"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVT = useVT;

var _react = require("react");

var _vt = require("./vt");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _brower = 1;
var _node = 2;

(function () {
  var env = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window instanceof Window ? _brower : _node;

  if (env & _brower) {
    if (!Object.hasOwnProperty.call(window, "requestAnimationFrame") && !window.requestAnimationFrame) throw new Error("Please using the modern browers or appropriate polyfill!");
  }
})();

function useOnce(factory) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var ref = (0, _react.useRef)(null);
  return (0, _react.useMemo)(function () {
    return factory.apply(void 0, args);
  }, [ref.current]);
}
/**
 * @example
 *
 * function MyTableComponent() {
 *
 * // ... your code
 *
 *
 * // `set_components` is the same as the setComponents
 * const [ vt, set_components ] = useVT(() => ({ scroll: { y: 600 } }));
 *
 *
 * return (
 *  <Table
 *   columns={columns}
 *   dataSource={dataSource}
 *   scroll={{ x: 1000, y: 600 }}
 *   components={vt}
 *  />
 * );
 * }
 */


function useVT(fnOpts) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ctx = (0, _vt.init)(fnOpts, deps);
  var set = useOnce(function () {
    return function (components) {
      return (0, _vt._set_components)(ctx, components);
    };
  });
  return [ctx._vtcomponents, set, ctx.ref];
}