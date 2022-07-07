"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _utils = require("./utils");

/* eslint-disable react-hooks/exhaustive-deps */
var Watcher = function Watcher(_ref) {
  var watchKey = _ref.watchKey,
      watch = _ref.watch,
      formData = _ref.formData,
      firstMount = _ref.firstMount;
  var value = (0, _utils.getValueByPath)(formData, watchKey);
  var watchObj = watch[watchKey];
  (0, _react.useEffect)(function () {
    var runWatcher = function runWatcher() {
      if (typeof watchObj === 'function') {
        try {
          watchObj(value);
        } catch (error) {
          console.log("".concat(watchKey, "\u5BF9\u5E94\u7684watch\u51FD\u6570\u6267\u884C\u62A5\u9519\uFF1A"), error);
        }
      } else if (watchObj && typeof watchObj.handler === 'function') {
        try {
          watchObj.handler(value);
        } catch (error) {
          console.log("".concat(watchKey, "\u5BF9\u5E94\u7684watch\u51FD\u6570\u6267\u884C\u62A5\u9519\uFF1A"), error);
        }
      }
    };

    if (firstMount) {
      var immediate = watchObj && watchObj.immediate;

      if (immediate) {
        runWatcher();
      }
    } else {
      runWatcher();
    }
  }, [JSON.stringify(value), firstMount]);
  return null;
};

var _default = Watcher;
exports.default = _default;