
const INIT_CONFIG = require('../../../config')
import getConfig from 'next/config'
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()

const globalEnvName = publicRuntimeConfig.envName;

console.log('config-tools globalEnvName===>' + globalEnvName);

module.exports = {
  initConfig: INIT_CONFIG.getInitConfig(globalEnvName),
  serverURL: INIT_CONFIG.getServerURL(globalEnvName),
  locationPrefix: INIT_CONFIG.getInitConfig(globalEnvName).LOCATION_PREFIX
}

