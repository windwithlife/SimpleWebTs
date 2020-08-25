


var DEV = {
   SOA_GATE:'http://local.koudaibook.com:8080/',
   SOA_SERVER_SIDE:'http://local.koudaibook.com:8080/',
   LOCATION_PREFIX:'usercenter'
}
var UAT = {
   SOA_GATE:'https://uat.gateway.koudaibook.com/xauth/',
   SOA_SERVER_SIDE:'https://uat.gateway.koudaibook.com/xauth/',
   LOCATION_PREFIX:''
}
var PRODUCTION = {
   SOA_GATE:'http://gateway.koudaibook.com:30080/xauth/',
   SOA_SERVER_SIDE:'http://gateway.koudaibook.com:30080/xauth/',
   LOCATION_PREFIX:'usercenter'
}
var DOCKER = {
   SOA_GATE:'http://gateway.koudaibook.com/xauth/',
   SOA_SERVER_SIDE:'http://gateway.koudaibook.com/xauth/',
   LOCATION_PREFIX:'usercenter'
}
let configuation ={
   development : DEV,
   uat : UAT,
   production:PRODUCTION,
   docker: DOCKER
}

function getCurrentEnvName(){
   let envConfig = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV;
   return envConfig;
}

function getInitConfigByEnvName(currentEnvName){
   let name = 'development';
   if (currentEnvName){
      name = currentEnvName;
   }else{
      name = getCurrentEnvName();
   }
   return configuation[name];

}

function getServerURL(configName){
   let config = getInitConfigByEnvName(configName);
   const isServer = typeof window === 'undefined';
   if (isServer){
      return config.SOA_SERVER_SIDE
   }else{
      return config.SOA_GATE
   }
}
/* function getCurrentConfigByNextEnvName(configName){
   
   let name = publicRuntimeConfig.envName;
   if (configName){
      name = configName;
   }
   return configuation[name];
} */

module.exports = {
      getCurrentEnvName: getCurrentEnvName,
      getInitConfig: getInitConfigByEnvName,
      getServerURL: getServerURL
   }
/*
module.exports = {
   getCurrentConfig: getCurrentConfigByNextEnvName,
   getInitConfig: getInitConfigByEnvName
}
*/



