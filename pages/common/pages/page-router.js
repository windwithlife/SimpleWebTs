import React, {Component} from 'react'
import router from 'next/router';
import Config from '../tools/config-tools'

let locationPrefix = "/" + Config.locationPrefix;
export default class RouterComponent extends Component {
        constructor(props) {
          super(props)
        }  
        back(){
          router.back();
        }
        goto(pathName,params){
           router.push({pathname: locationPrefix + pathName,query:params});
        }
       
    }
   