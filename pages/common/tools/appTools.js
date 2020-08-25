

import { observable, computed, action } from "mobx";


class AppToolsTest {
    constructor(stores){
        if (stores){
            this._appStore = stores.appStore;
        }
    }
    setLayout(name){
        if (name){
              this._appStore.setLayout(name);
         }
    }
  
    testLayout(name){ 
        this._appStore.setLayout(name);
    }
    
  }





  class AppTools {
    
    light = false
    constructor (stores) {
      this._appStore = stores.appStore;
    }
    setLayout(name){ 
        this._appStore.setLayout(name);
        console.log('testlayoutyyy');
    }
    startx = () => {
    }
    updateHeader = (message) => {
        console.log(message);
        this.statusInfo = message;
    }
  }




export default AppTools;
