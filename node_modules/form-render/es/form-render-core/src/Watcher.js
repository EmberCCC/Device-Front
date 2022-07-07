/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { getValueByPath } from './utils';

var Watcher = function Watcher(_ref) {
  var watchKey = _ref.watchKey,
      watch = _ref.watch,
      formData = _ref.formData,
      firstMount = _ref.firstMount;
  var value = getValueByPath(formData, watchKey);
  var watchObj = watch[watchKey];
  useEffect(function () {
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

export default Watcher;