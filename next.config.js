/* eslint-disable */
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const CONFIG = require('./config')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './pages/common/styles/antd-custom.less'),
    'utf8'
  )
)
// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}


let assetPrefixFormConfig = CONFIG.getInitConfig().LOCATION_PREFIX;
let currentEnvName   = CONFIG.getCurrentEnvName();
console.log('assetProfix in next.config.js===>'  + assetPrefixFormConfig);

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables // make your antd custom effective
  },
  
  publicRuntimeConfig: { // Will be available on both server and client
    staticFolder: '/static',
    envName: currentEnvName
  },
  assetPrefix: "/" + assetPrefixFormConfig

})

