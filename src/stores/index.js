const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');
const stores = {};

for (let i = 0; i < keys.length; i++) {
  let key = keys[i].replace(/\.\/([\w]*)\.js/, (match, p1) => {
    return p1;
  });
  stores[key] = context(keys[i]).default;
}
export default stores;
