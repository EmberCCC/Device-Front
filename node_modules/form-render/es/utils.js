export function isUrl(string) {
  var protocolRE = /^(?:\w+:)?\/\/(\S+)$/; // const domainRE = /^[^\s\.]+\.\S{2,}$/;

  if (typeof string !== 'string') return false;
  return protocolRE.test(string);
}
export var getArray = function getArray(arr) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (Array.isArray(arr)) return arr;
  return defaultValue;
};
export function getFormat(format) {
  var dateFormat;

  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD';
      break;

    case 'time':
      dateFormat = 'HH:mm:ss';
      break;

    case 'dateTime':
      dateFormat = 'YYYY-MM-DD HH:mm:ss';
      break;

    case 'week':
      dateFormat = 'YYYY-w';
      break;

    case 'year':
      dateFormat = 'YYYY';
      break;

    case 'quarter':
      dateFormat = 'YYYY-Q';
      break;

    case 'month':
      dateFormat = 'YYYY-MM';
      break;

    default:
      // dateTime
      if (typeof format === 'string') {
        dateFormat = format;
      } else {
        dateFormat = 'YYYY-MM-DD';
      }

  }

  return dateFormat;
}