/**
 * overrideAllCurrentConfig by zyn on 0512 
 */
const { override, fixBabelImports,addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled:true,
    modifyVars:{
      // 定制主题样式
      'primary-color': '#1DA57A',
    },
  })
);